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
        const order = await DatabaseManager.getInstance().order.findUnique({
            where: {
                id: orderId,
                customerId: customer.id,
            },
            select: {
                OrderItems: {
                    select: {
                        id: true,
                        quantity: true,
                        unitPrice: true,
                        product: {
                            select: {
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
        // Create a checkout session
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
        return session.url;
    }
}

export default PaymentService;