import { Router } from "express";
import { OrdersController } from "../../controllers";
import { validator, AuthHandler, MulterService } from "../../middlewares";
import { orderSchemas } from "../../../validation/schemas";

const ordersRouter = Router();

ordersRouter
    .route("/")
    .post(
        AuthHandler.authenticate,
        AuthHandler.authorize("CUSTOMER"),
        MulterService.getNoneMethod(),
        validator(orderSchemas),
        OrdersController.createOrder
    );

export default ordersRouter;
export { ordersRouter };
