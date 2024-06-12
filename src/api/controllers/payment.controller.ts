import { Request, Response } from "express";
import { asyncHandler, notImplementedHandler } from "../../utils";
import { PaymentService } from "../services";
import { IUser } from "user";

class PaymentController {
    private constructor() {}

    public static createCheckoutSession = asyncHandler(
        async (req: Request<any, any, { orderId: string }>, res: Response) => {
            const { orderId } = req.body;
            const paymentUrl = await PaymentService.createCheckoutSession(
                req.user as IUser,
                orderId
            );

            notImplementedHandler(req, res);
        }
    );
}

export default PaymentController;
