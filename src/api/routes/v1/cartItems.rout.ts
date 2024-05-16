import { Router } from "express";
import { CartItemsController } from "../../controllers";
import { AuthHandler, MulterService, validator } from "../../middlewares";
import { cartItemsSchemas } from "../../../validation/schemas";

const CartItemsRouter = Router();

CartItemsRouter.route("/")
    .post(
        AuthHandler.authenticate,
        AuthHandler.authorize("CUSTOMER"),
        MulterService.getNoneMethod(),
        validator(cartItemsSchemas),
        CartItemsController.addItem
    )
    .get(CartItemsController.fetchItems)
    .delete(
        AuthHandler.authenticate,
        AuthHandler.authorize("CUSTOMER"),
        MulterService.getNoneMethod(),
        validator(cartItemsSchemas),
        CartItemsController.deleteItems
    );

CartItemsRouter.route("/:id").patch(CartItemsController.updateItem);

export { CartItemsRouter };
