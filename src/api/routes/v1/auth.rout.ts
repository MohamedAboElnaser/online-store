import { Router } from "express";
import { AuthController } from "../../controllers";

const authRouter = Router();

authRouter.route("/register").post(AuthController.register);

export { authRouter };
