import { IUser } from "user";
import { DatabaseManager } from "../../../config";
import { AppError, StripeService } from "../../utils";
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
        const { order, totalAmount } = await PaymentService.verifyOrderState(
            orderId,
            customer
        );

        const session = await StripeService.getInstance().createCheckoutSession(
            {
                name: `${customer.firstName}-${customer.lastName} Order`,
                email: customer.email,
                price: totalAmount,
                quantity: 1,
            },
            "api/v1/payments/success",
            "api/v1/payments/cancel"
        );

        // TODO
        /**
         * Implement Webhook endpoint to:
         * => Update the order status and set the paidAt date after payment is successful.
         * => Update number of items in stock after payment is successful.
         * => Send an email to the customer after payment is successful.
         * => Add a record to customerProducts table to mark the product as purchased
         *    by the customer so he can add a review to the product.
         * */
        // TODO Delete below queries after implementing the webhook endpoint
        /* 
          Mark that customer bought these order items so he can add reviews to them
          Update status of the order to COMPLETED
        */
        const upsertPromises = order.OrderItems.map((item) =>
            DatabaseManager.getInstance().customerProduct.upsert({
                where: {
                    productId_customerId: {
                        customerId: customer.id,
                        productId: item.product.id,
                    },
                },
                update: {},
                create: {
                    customerId: customer.id,
                    productId: item.product.id,
                },
            })
        );
        await Promise.all(upsertPromises);
        await DatabaseManager.getInstance().order.update({
            where: {
                id: orderId,
            },
            data: {
                orderStatus: "COMPLETED",
                paidAt: new Date(),
            },
        });

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

        const totalAmount = order.OrderItems.reduce(
            (acc, orderItem) => acc + orderItem.quantity * orderItem.unitPrice,
            0
        );
        // return the order details and total amount
        return { order, totalAmount };
    }
}

export default PaymentService;
