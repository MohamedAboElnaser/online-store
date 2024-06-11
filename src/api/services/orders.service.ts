import { AppError } from "../../utils";
import { DatabaseManager } from "../../../config";

class OrderService {
    private constructor() {}
    //TODO Do some refactoring here
    public static async createOrder(
        cartItemsIds: string[],
        customerId: string
    ) {
        // Fetch cartItems
        const cartItems = await DatabaseManager.getInstance().cartItem.findMany(
            {
                where: {
                    id: {
                        in: cartItemsIds,
                    },
                    cart: {
                        customerId,
                    },
                },
                select: {
                    id: true,
                    quantity: true,
                    product: {
                        select: {
                            id: true,
                            price: true,
                        },
                    },
                },
            }
        );
        // Check if all cartItems are found
        if (cartItems?.length != cartItemsIds.length)
            throw new AppError("Some cart items are not found", 404);

        // Create OrderItems array from cartItems
        const orderItems = cartItems.map((item) => {
            return {
                quantity: item.quantity,
                unitPrice: item.product.price,
                productId: item.product.id,
            };
        });

        // Start a transaction to create Order and remove CartItems
        const [order] = await DatabaseManager.getInstance().$transaction([
            // Create Order and attach orderItems to it
            DatabaseManager.getInstance().order.create({
                data: {
                    customerId,
                    OrderItems: {
                        create: orderItems,
                    },
                },
                select: {
                    id: true,
                    orderStatus: true,
                    OrderItems: {
                        select: {
                            id: true,
                            quantity: true,
                            unitPrice: true,
                            product: {
                                select: {
                                    id: true,
                                    name: true,
                                    images: true,
                                },
                            },
                        },
                    },
                },
            }),
            // Remove CartItems from the Customer's Cart
            DatabaseManager.getInstance().cartItem.deleteMany({
                where: {
                    id: {
                        in: cartItemsIds,
                    },
                },
            }),
        ]);
        // Derive the total price of the order
        (order as any).totalPrice = order.OrderItems.reduce(
            (total, item) => total + item.quantity * item.unitPrice,
            0
        );
        return order;
    }

    public static async getOrders(customerId: string, status?: string) {
        const orders = await DatabaseManager.getInstance().order.findMany({
            where: {
                customerId,
                orderStatus: status as any,
            },
            select: {
                id: true,
                orderStatus: true,
                createdAt: true,
                paidAt: true,
                OrderItems: {
                    select: {
                        id: true,
                        quantity: true,
                        unitPrice: true,
                        product: {
                            select: {
                                id: true,
                                name: true,
                                images: true,
                            },
                        },
                    },
                },
            },
        });
        // Derive the total price of each order
        orders.forEach((order) => {
            (order as any).totalPrice = order.OrderItems.reduce(
                (total, item) => total + item.quantity * item.unitPrice,
                0
            );
        });
        return orders;
    }

    public static async getOrder(orderId: string, customerId: string) {
        try {
            const order = await DatabaseManager.getInstance().order.findFirst({
                where: {
                    id: orderId,
                    customerId,
                },
                select: {
                    id: true,
                    orderStatus: true,
                    createdAt: true,
                    paidAt: true,
                    OrderItems: {
                        select: {
                            id: true,
                            quantity: true,
                            unitPrice: true,
                            product: {
                                select: {
                                    id: true,
                                    name: true,
                                    images: true,
                                },
                            },
                        },
                    },
                },
            });
            // Derive the total price of the order
            (order as any).totalPrice = order.OrderItems.reduce(
                (total, item) => total + item.quantity * item.unitPrice,
                0
            );
            return order;
        } catch (err) {
            throw new AppError("Order not found", 404);
        }
    }

    public static async deleteOrder(
        orderId: string,
        customerId: string
    ): Promise<void> {
        const order = await DatabaseManager.getInstance().order.findFirst({
            where: {
                id: orderId,
                customerId,
            },
            select: {
                id: true,
            },
        });
        if (!order) throw new AppError("Order not found", 404);
        await DatabaseManager.getInstance().order.delete({
            where: {
                id: orderId,
            },
        });
    }
}

export default OrderService;
