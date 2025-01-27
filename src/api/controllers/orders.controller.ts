import { Request, Response, NextFunction } from "express";
import {
    asyncHandler,
    notImplementedHandler,
} from "../../utils";
import { OrdersService } from "../services";
import { IUser } from "user";
class OrderController {
    private constructor() {}

    public static createOrder = asyncHandler(
        async (
            req: Request<any, any, { cartItemsIds: string[] }>,
            res: Response,
            next: NextFunction
        ) => {
            const { id: customerId } = req.user as IUser;
            const { cartItemsIds } = req.body;
            const order = await OrdersService.createOrder(
                cartItemsIds,
                customerId
            );
            res.status(201).json({
                status: "success",
                message: "Order created successfully. Now you can pay for it",
                data: {
                    order,
                },
            });
        }
    );

    public static getOrders = asyncHandler(
        async (
            req: Request<any, any, any, { status: "PENDING" | "COMPLETED" }>,
            res: Response,
            next: NextFunction
        ) => {
            const { id: customerId } = req.user as IUser;
            const orders = await OrdersService.getOrders(
                customerId,
                req.query.status as string
            );

            res.status(200).json({
                status: "success",
                message: "Orders fetched successfully",
                data: {
                    length: orders.length,
                    orders,
                },
            });
        }
    );

    public static getOrder = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            const { id: customerId } = req.user as IUser;
            const order = await OrdersService.getOrder(
                req.params.id,
                customerId
            );

            res.status(200).json({
                status: "success",
                message: "Order fetched successfully",
                data: {
                    order,
                },
            });
        }
    );

    public static deleteOrder = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            const { id: customerId } = req.user as IUser;
            await OrdersService.deleteOrder(req.params.id, customerId);
            res.status(204).json({
                status: "success",
                message: "Order deleted successfully",
                data: null,
            });
        }
    );
}

export default OrderController;
