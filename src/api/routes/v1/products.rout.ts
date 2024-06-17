import { Router } from "express";
import { ProductsController } from "../../controllers";
import {
    validator,
    AuthHandler,
    MulterService,
    rateLimiter,
} from "../../middlewares";
import { productsSchemas } from "../../../validation/schemas";
import { reviewsRouter } from "./review.rout";

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
    )
    .get(validator(productsSchemas), ProductsController.getAll);

productsRouter
    .route("/:productId")
    .get(rateLimiter(50, 60), ProductsController.getOne)
    .patch(
        AuthHandler.authenticate,
        AuthHandler.authorize("ADMIN"),
        MulterService.multipleFiles("images"),
        validator(productsSchemas),
        ProductsController.updateOne
    );

// Mount Review Router
productsRouter.use("/:productId/reviews", reviewsRouter);

export default productsRouter;
export { productsRouter };
