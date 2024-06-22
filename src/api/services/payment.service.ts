import { IUser } from "user";
import { DatabaseManager } from "../../../config";
import { AppError, StripeService } from "../../utils";
import { IOrder } from "order";
import { IOrderItem } from "orderItem";
class PaymentService {
    private constructor() {}

    public static async createCheckoutSession(
        customer: IUser,
        orderId: string
    ): Promise<string> {
        /**
         *  Fetch the order and its details from the database.
         *  Validate the required quantity of each orderItem is available.
         *  Create a checkout session using the StripeService.
         *  Return the payment url to the client.
         */
        const { order } = await PaymentService.verifyOrderState(
            orderId,
            customer
        );

        const session = await StripeService.getInstance().createCheckoutSession(
            {
                orderId: orderId,
                email: customer.email,
                items: order.OrderItems.map((orderItem) => ({
                    name: orderItem.product.name,
                    unitePrice: orderItem.unitPrice,
                    quantity: orderItem.quantity,
                })),
            },
            "api/v1/payments/success",
            "api/v1/payments/cancel"
        );

        /* TODO Delete below queries after implementing the webhook endpoint */
        /* 
          Mark that customer bought these order items so he can add reviews to them.
          Update status of the order to COMPLETED
          Subtract the quantity of each order item from the store
        */
        if (process.env.NODE_ENV !== "production") {
            await PaymentService.updateOrderState(
                orderId,
                order.OrderItems as IOrderItem[],
                customer.id
            );
        }

        return session.url;
    }

    /**
     * Verifies an order's existence, status and item availability in the store.
     *
     * @param {string} orderId - The unique identifier of the order.
     * @param {IUser} customer - The customer object containing customer details.
     * @returns {Promise<Object>} - A promise that resolves to the order details if the verification is successful.
     * @throws {AppError} - Throws an error if the order does not exist, is already completed, or if any order items are out of stock.
     */
    public static async verifyOrderState(orderId: string, customer: IUser) {
        const order = await DatabaseManager.getInstance().order.findUnique({
            where: {
                id: orderId,
                customerId: customer.id,
            },
            select: {
                orderStatus: true,
                OrderItems: {
                    select: {
                        id: true,
                        quantity: true,
                        unitPrice: true,
                        product: {
                            select: {
                                id: true,
                                countInStock: true,
                                name: true,
                            },
                        },
                    },
                },
            },
        });

        if (!order) {
            throw new AppError(`No Order exist have id: ${orderId}`, 404);
        }

        if (order.orderStatus === "COMPLETED") {
            throw new AppError(
                `Order with id: ${orderId} is already completed`,
                400
            );
        }
        // Making sure that the required quantity of each orderItem is available in the store
        const isItemsAvailable = order.OrderItems.every((orderItem) => {
            return orderItem.product.countInStock >= orderItem.quantity;
        });

        if (!isItemsAvailable) {
            // Find all items that are out of stock
            const outOfStockItems = order.OrderItems.filter(
                (orderItem) =>
                    orderItem.product.countInStock < orderItem.quantity
            );

            // Generate a descriptive message listing all out-of-stock elements
            const errorMessage = outOfStockItems
                .map(
                    (item) =>
                        `OrderItem:${item.id},${item.product.name} only has ${item.product.countInStock} items in stock but you requested ${item.quantity}`
                )
                .join(". ");

            // Throw the error with the descriptive message
            throw new AppError(errorMessage, 400);
        }

        return { order };
    }

    /**
     * Update the status of the order to COMPLETED and mark the order as paid.
     * Subtract the quantity of each order item from the store.
     */
    public static async updateOrderState(
        orderId: string,
        OrderItems: IOrderItem[],
        customerId: string
    ): Promise<void> {
        const upsertPromises = OrderItems.map((item) =>
            DatabaseManager.getInstance().customerProduct.upsert({
                where: {
                    productId_customerId: {
                        customerId,
                        productId: item.product.id,
                    },
                },
                update: {},
                create: {
                    customerId,
                    productId: item.product.id,
                },
            })
        );
        const updateStockPromises = OrderItems.map((item) =>
            DatabaseManager.getInstance().product.update({
                where: {
                    id: item.product.id,
                },
                data: {
                    countInStock: {
                        decrement: item.quantity,
                    },
                },
            })
        );
        await Promise.all(upsertPromises);
        await Promise.all(updateStockPromises);
        await DatabaseManager.getInstance().order.update({
            where: {
                id: orderId,
            },
            data: {
                orderStatus: "COMPLETED",
                paidAt: new Date(),
            },
        });
    }
}

export default PaymentService;
