import { Request, Response } from "express";
import { AppError, asyncHandler, notImplementedHandler } from "../../utils";
import stripe from "stripe";
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
            res.status(200).json({
                status: "success",
                message: "Payment session created successfully",
                data: {
                    paymentUrl,
                },
            });
        }
    );

    public static webhook = asyncHandler(
        async (req: Request, res: Response) => {
            const signature = req.headers["stripe-signature"];

            let event;
            try {
                event = stripe.webhooks.constructEvent(
                    req.body,
                    signature,
                    process.env.STRIPE_WEBHOOK_SECRET
                );
            } catch (err) {
                throw new AppError(
                    "Error happen while constructing the webhook event",
                    400
                );
            }

            if (event.type === "checkout.session.completed")
                console.log("webhook endpoint works fine");
            console.log("event.data.object", event.data.object);

            res.status(200).json({ received: true });
        }
    );
}

export default PaymentController;
