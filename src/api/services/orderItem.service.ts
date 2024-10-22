import { AppError } from "../../utils/internal-utils";
import { DatabaseManager } from "../../../config";
class OrderItemsService {
    private constructor() {}

    public static async updateOrderItem(
        orderId: string,
        itemId: string,
        quantity: number
    ) {
        // First fetch order item and validate orderStatus.
        const orderItem = await OrderItemsService.validateOrderItem(
            orderId,
            itemId
        );

        // Check if the quantity is greater than the countInStock
        if (quantity > orderItem.product.countInStock) {
            throw new AppError(
                `There are only ${orderItem.product.countInStock} items in stock, quantity must be less than or equal to ${orderItem.product.countInStock}`,
                400
            );
        }

        // Update the order item quantity
        const updatedOrderItem =
            await DatabaseManager.getInstance().orderItem.update({
                where: {
                    id: itemId,
                    orderId,
                },
                data: {
                    quantity,
                },
                select: {
                    id: true,
                    quantity: true,
                    orderId: true,
                },
            });

        return updatedOrderItem;
    }

    public static async deleteOrderItem(orderId: string, itemId: string) {
        // First fetch order item and validate orderStatus.
        await OrderItemsService.validateOrderItem(orderId, itemId);

        // Delete the order item
        await DatabaseManager.getInstance().orderItem.delete({
            where: {
                id: itemId,
                orderId,
            },
        });

        return {
            message: "Order item deleted successfully",
        };
    }

    public static async validateOrderItem(orderId: string, itemId: string) {
        // First fetch order item.
        const orderItem =
            await DatabaseManager.getInstance().orderItem.findUnique({
                where: {
                    id: itemId,
                    orderId,
                },
                select: {
                    product: {
                        select: {
                            id: true,
                            countInStock: true,
                        },
                    },
                    order: {
                        select: {
                            orderStatus: true,
                        },
                    },
                },
            });

        // Check if order item exists
        if (!orderItem) {
            throw new AppError("Order item not found", 404);
        }

        // Check if the order status is not pending
        if (orderItem.order.orderStatus !== "PENDING") {
            throw new AppError(
                "Order item can only be updated when the order status is pending",
                400
            );
        }

        return orderItem;
    }
}

export default OrderItemsService;
