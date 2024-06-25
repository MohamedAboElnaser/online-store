"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRouter = void 0;
const express_1 = require("express");
const middlewares_1 = require("../../middlewares");
const controllers_1 = require("../../controllers");
const schemas_1 = require("../../../validation/schemas");
const categoriesRouter = (0, express_1.Router)();
exports.categoriesRouter = categoriesRouter;
categoriesRouter
    .route("/")
    .post(middlewares_1.AuthHandler.authenticate, middlewares_1.AuthHandler.authorize("ADMIN"), middlewares_1.MulterService.getNoneMethod(), (0, middlewares_1.validator)(schemas_1.categoriesSchemas), controllers_1.CategoriesController.createCategory)
    .delete(middlewares_1.AuthHandler.authenticate, middlewares_1.AuthHandler.authorize("ADMIN"), middlewares_1.MulterService.getNoneMethod(), (0, middlewares_1.validator)(schemas_1.categoriesSchemas), controllers_1.CategoriesController.deleteCategories);
categoriesRouter
    .route("/:categoryId")
    .patch(middlewares_1.AuthHandler.authenticate, middlewares_1.AuthHandler.authorize("ADMIN"), middlewares_1.MulterService.getNoneMethod(), (0, middlewares_1.validator)(schemas_1.categoriesSchemas), controllers_1.CategoriesController.updateCategory)
    .get(controllers_1.CategoriesController.fetchCategory);
categoriesRouter
    .route("/")
    .get((0, middlewares_1.rateLimiter)(20, 60), controllers_1.CategoriesController.fetchCategories);
exports.default = categoriesRouter;
//# sourceMappingURL=categories.rout.js.map