import { Router } from "express";
import { AuthController } from "../../controllers";
import { validator, MulterService } from "../../middlewares";
import { authSchemas } from "../../../validation/schemas";

const authRouter = Router();

authRouter
    .route("/register")
    .post(
        MulterService.getNoneMethod(),
        validator(authSchemas),
        AuthController.register
    );
authRouter
    .route("/verify-account")
    .post(
        MulterService.getNoneMethod(),
        validator(authSchemas),
        AuthController.verifyAccount
    );
authRouter
    .route("/resend-otp")
    .post(
        MulterService.getNoneMethod(),
        validator(authSchemas),
        AuthController.resendOTP
    );
authRouter
    .route("/login")
    .post(
        MulterService.getNoneMethod(),
        validator(authSchemas),
        AuthController.login
    );

export { authRouter };
