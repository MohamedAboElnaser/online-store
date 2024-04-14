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
}

export default AuthController;
