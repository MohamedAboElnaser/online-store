import { Router } from "express";
import { OrdersController } from "../../controllers";
import { validator, AuthHandler, MulterService } from "../../middlewares";
import { orderSchemas } from "../../../validation/schemas";
import orderItemsRouter from "./orderItems.rout";

const ordersRouter = Router();

ordersRouter
    .route("/")
    .post(
        AuthHandler.authenticate,
        AuthHandler.authorize("CUSTOMER"),
        MulterService.getNoneMethod(),
        validator(orderSchemas),
        OrdersController.createOrder
    )
    .get(
        AuthHandler.authenticate,
        AuthHandler.authorize("CUSTOMER"),
        validator(orderSchemas),
        OrdersController.getOrders
    );

ordersRouter
    .route("/:id")
    .get(
        AuthHandler.authenticate,
        AuthHandler.authorize("CUSTOMER"),
        validator(orderSchemas),
        OrdersController.getOrder
    )
    .delete(
        AuthHandler.authenticate,
        AuthHandler.authorize("CUSTOMER"),
        validator(orderSchemas),
        OrdersController.deleteOrder
    );

ordersRouter.use("/:orderId/items/", orderItemsRouter);

export default ordersRouter;
export { ordersRouter };
