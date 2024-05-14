import { Router } from "express";
import { ProductsController } from "../../controllers";
import { validator, AuthHandler, MulterService } from "../../middlewares";
import { productsSchemas } from "../../../validation/schemas";

const productsRouter = Router();

productsRouter
    .route("/")
    .post(
        AuthHandler.authenticate,
        AuthHandler.authorize("ADMIN"),
        MulterService.multipleFiles("images", 4),
        validator(productsSchemas),
        ProductsController.createOne
    )
    .delete(
        AuthHandler.authenticate,
        AuthHandler.authorize("ADMIN"),
        MulterService.getNoneMethod(),
        validator(productsSchemas),
        ProductsController.deleteProducts
    ) //TODO - Add rate limiting middleware to this route as it is public and can be abused
    .get(validator(productsSchemas), ProductsController.getAll);

productsRouter
    .route("/:productId")
    .get(ProductsController.getOne) //TODO - Add rate limiting middleware to this route
    .patch(
        AuthHandler.authenticate,
        AuthHandler.authorize("ADMIN"),
        MulterService.multipleFiles("images"),
        validator(productsSchemas),
        ProductsController.updateOne
    );

export default productsRouter;
export { productsRouter };
