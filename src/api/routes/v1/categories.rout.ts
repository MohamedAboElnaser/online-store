import { Router } from "express";
import { AuthHandler, validator } from "../../middlewares";
import { CategoriesController } from "../../controllers";
import { categoriesSchemas } from "../../../validation/schemas";

const categoriesRouter = Router();

categoriesRouter
    .route("/")
    .post(
        AuthHandler.authenticate,
        AuthHandler.authorize("ADMIN"),
        validator(categoriesSchemas),
        CategoriesController.createCategory
    )
    .delete(
        AuthHandler.authenticate,
        AuthHandler.authorize("ADMIN"),
        validator(categoriesSchemas),
        CategoriesController.deleteCategories
    );

categoriesRouter
    .route("/:categoryId")
    .patch(
        AuthHandler.authenticate,
        AuthHandler.authorize("ADMIN"),
        validator(categoriesSchemas),
        CategoriesController.updateCategory
    );
export default categoriesRouter;
export { categoriesRouter };
