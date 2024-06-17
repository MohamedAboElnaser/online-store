import { Router } from "express";
import {
    AuthHandler,
    validator,
    MulterService,
    rateLimiter,
} from "../../middlewares";
import { CategoriesController } from "../../controllers";
import { categoriesSchemas } from "../../../validation/schemas";

const categoriesRouter = Router();

categoriesRouter
    .route("/")
    .post(
        AuthHandler.authenticate,
        AuthHandler.authorize("ADMIN"),
        MulterService.getNoneMethod(),
        validator(categoriesSchemas),
        CategoriesController.createCategory
    )
    .delete(
        AuthHandler.authenticate,
        AuthHandler.authorize("ADMIN"),
        MulterService.getNoneMethod(),
        validator(categoriesSchemas),
        CategoriesController.deleteCategories
    );

categoriesRouter
    .route("/:categoryId")
    .patch(
        AuthHandler.authenticate,
        AuthHandler.authorize("ADMIN"),
        MulterService.getNoneMethod(),
        validator(categoriesSchemas),
        CategoriesController.updateCategory
    )
    .get(CategoriesController.fetchCategory);

categoriesRouter
    .route("/")
    .get(rateLimiter(20, 60), CategoriesController.fetchCategories);
export default categoriesRouter;
export { categoriesRouter };
