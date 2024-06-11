import { Request, Response, NextFunction } from "express";
import { asyncHandler, notImplementedHandler } from "../../utils";
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
}

export default OrderController;
