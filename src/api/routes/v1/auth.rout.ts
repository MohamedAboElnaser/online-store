import { Router } from "express";
import { AuthController } from "../../controllers";
import { validator } from "../../middlewares";
import { authSchemas } from "../../../validation/schemas";

const authRouter = Router();

authRouter.use(validator(authSchemas));
authRouter.route("/register").post(AuthController.register);

export { authRouter };
