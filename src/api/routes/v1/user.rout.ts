import { Router } from "express";
import { UsersController } from "../../controllers";
import { AuthHandler, validator, MulterService } from "../../middlewares";
import { userSchemas } from "../../../validation/schemas";

export const userRouter = Router();

userRouter
    .route("/me")
    .get(AuthHandler.authenticate, UsersController.getUser)
    .patch(
        AuthHandler.authenticate,
        MulterService.multipleFiles('photo',1),
        validator(userSchemas),
        UsersController.updateUser
    );
