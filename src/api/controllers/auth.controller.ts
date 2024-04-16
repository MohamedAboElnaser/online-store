import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../util";
import { AuthService } from "../services";

class AuthController {
    private constructor() {}

    public static register = asyncHandler(
        async (
            req: Request<
                any,
                any,
                {
                    email: string;
                    password: string;
                    firstName: string;
                    lastName?: string;
                }
            >,
            res: Response,
            next: NextFunction
        ) => {
            const { email, password, firstName, lastName } = req.body;
            const otp = await AuthService.register(
                email,
                password,
                firstName,
                lastName
            );
            res.json({
                status: "success",
                message: `User registered successfully. Check the confirmation otp code at ${email}`,
                otp: process.env.NODE_ENV != "production" ? otp : undefined,
            });
        }
    );

    public static verifyAccount = asyncHandler(
        async (
            req: Request<any, any, { otp: number }>,
            res: Response,
            next: NextFunction
        ) => {
            const { otp } = req.body;
            await AuthService.verify(otp);
            res.json({
                status: "success",
                message: "Account verified successfully, You can login now.",
            });
        }
    );

    public static resendOTP = asyncHandler(
        async (
            req: Request<any, any, { email: string }>,
            res: Response,
            next: NextFunction
        ) => {
            const { email } = req.body;
            const otp = await AuthService.regenerateOTP(email);
            res.json({
                status: "success",
                message: `Check the confirmation otp code at ${email}`,
                otp: process.env.NODE_ENV != "production" ? otp : undefined,
            });
        }
    );

    public static login = asyncHandler(
        async (
            req: Request<any, any, { email: string; password: string }>,
            res: Response,
            next: NextFunction
        ) => {
            const { email, password } = req.body;
            const token = await AuthService.login(email, password);

            //attach token to the response cookie
            res.cookie("jwt", token, {
                expires: new Date(
                    Date.now() + Number(process.env.COOKIE_EXPIRES_IN)
                ),
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            });

            res.json({
                status: "success",
                message: "You login successfully 🔓",
                token,
            });
        }
    );
}

export default AuthController;
