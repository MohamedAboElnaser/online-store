import { Request, Response, NextFunction } from "express";
import {
    asyncHandler,
    notImplementedHandler,
} from "../../utils/internal-utils";
import { OrderItemsService } from "../services";

class OrderItemsController {
    private constructor() {}

    public static updateOrderItem = asyncHandler(
        async (
            req: Request<
                { orderId: string; itemId: string },
                any,
                { quantity: number }
            >,
            res: Response,
            next: NextFunction
        ) => {
            const { orderId, itemId } = req.params;
            const { quantity } = req.body;
            const updatedOrderItem = await OrderItemsService.updateOrderItem(
                orderId,
                itemId,
                quantity
            );
            res.status(200).json({
                status: "success",
                message: "Order item updated successfully",
                data: updatedOrderItem,
            });
        }
    );

    public static deleteOrderItem = asyncHandler(
        async (
            req: Request<{ orderId: string; itemId: string }, any, any>,
            res: Response,
            next: NextFunction
        ) => {
            const { orderId, itemId } = req.params;
            await OrderItemsService.deleteOrderItem(orderId, itemId);
            res.status(204).json({
                status: "success",
                message: "Order item deleted successfully",
            });
        }
    );
}

export default OrderItemsController;
