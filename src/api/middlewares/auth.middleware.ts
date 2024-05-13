import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils";

class AuthHandler {
    private constructor() {}
    // Custom middleware for handling JWT authentication
    public static authenticate = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        passport.authenticate(
            "jwt",
            { session: false },
            (err: any, user: any) => {
                if (err || !user) {
                    return next(
                        new AppError(
                            " Unauthorized access! 🚫🛑 Please login to continue.",
                            401
                        )
                    );
                }
                // Authentication successful, attach user to request object
                req.user = user;
                next();
            }
        )(req, res, next); //
    };

    public static authorize = (...roles: string[]) => {
        return (req: Request, res: Response, next: NextFunction) => {
            //BUG
            // @ts-ignore
            if (!roles.includes(req.user.role as string)) {
                return next(
                    new AppError(
                        "You do not have permission to perform this action",
                        403
                    )
                );
            }
            next();
        };
    };
}

export default AuthHandler;
