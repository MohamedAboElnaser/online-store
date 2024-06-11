import { Router } from "express";
import { OrderItemsController } from "../../controllers";
import { validator, AuthHandler, MulterService } from "../../middlewares";
import { orderItemSchemas } from "../../../validation/schemas";

const orderItemsRouter = Router({ mergeParams: true });
orderItemsRouter
    .route("/:itemId")
    .patch(
        AuthHandler.authenticate,
        AuthHandler.authorize("CUSTOMER"),
        MulterService.getNoneMethod(),
        validator(orderItemSchemas),
        OrderItemsController.updateOrderItem
    )
    .delete(
        AuthHandler.authenticate,
        AuthHandler.authorize("CUSTOMER"),
        validator(orderItemSchemas),
        OrderItemsController.deleteOrderItem
    );

export default orderItemsRouter;
