import { Request, Response, NextFunction } from "express";
import { asyncHandler, notImplementedHandler } from "../../utils";
import {UsersService} from "../services";
import { IUser } from "user";

class UsersController {
    private constructor() {}

    public static getUser = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            const { user } = req;
            res.status(200).json({
                status: "success",
                message: "User Record retrieved successfully",
                data: {
                    user,
                },
            });
        }
    );

    public static updateUser = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            const { id } = req.user as IUser;

            const updatedUserRecord = await UsersService.updateUserData(
                id,
                req.body,
                req.files as Express.Multer.File[]
            );
            res.status(200).json({
                status: "success",
                message: "User Record updated successfully",
                data: {
                    user: updatedUserRecord,
                },
            });
        }
    );
}

export default UsersController;
