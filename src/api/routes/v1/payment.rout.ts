import { Router } from "express";
import { AuthHandler, MulterService, validator } from "../../middlewares";
import { paymentSchemas } from "../../../validation/schemas";
import { PaymentController } from "../../controllers";

export const paymentsRouter = Router();

paymentsRouter.post(
    "/create-checkout-session",
    AuthHandler.authenticate,
    AuthHandler.authorize("CUSTOMER"),
    validator(paymentSchemas),
    PaymentController.createCheckoutSession
);

// paymentsRouter.post('/webhook', MulterService.none, PaymentController.webhook)

paymentsRouter.get("/success", (req, res) => {
    res.status(200).json({ 
        message:
            "Payment done successfully ✅, Check your email for the receipt",
    });
});

paymentsRouter.get("/cancel", (req, res) => {
    res.status(200).json({
        message: "Payment was canceled ❌, Please try again",
    });
});
