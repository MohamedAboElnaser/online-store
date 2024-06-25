"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const middlewares_1 = require("../../middlewares");
const schemas_1 = require("../../../validation/schemas");
const review_rout_1 = require("./review.rout");
const productsRouter = (0, express_1.Router)();
exports.productsRouter = productsRouter;
productsRouter
    .route("/")
    .post(middlewares_1.AuthHandler.authenticate, middlewares_1.AuthHandler.authorize("ADMIN"), middlewares_1.MulterService.multipleFiles("images", 4), (0, middlewares_1.validator)(schemas_1.productsSchemas), controllers_1.ProductsController.createOne)
    .delete(middlewares_1.AuthHandler.authenticate, middlewares_1.AuthHandler.authorize("ADMIN"), middlewares_1.MulterService.getNoneMethod(), (0, middlewares_1.validator)(schemas_1.productsSchemas), controllers_1.ProductsController.deleteProducts)
    .get((0, middlewares_1.validator)(schemas_1.productsSchemas), controllers_1.ProductsController.getAll);
productsRouter
    .route("/:productId")
    .get((0, middlewares_1.rateLimiter)(50, 60), controllers_1.ProductsController.getOne)
    .patch(middlewares_1.AuthHandler.authenticate, middlewares_1.AuthHandler.authorize("ADMIN"), middlewares_1.MulterService.multipleFiles("images"), (0, middlewares_1.validator)(schemas_1.productsSchemas), controllers_1.ProductsController.updateOne);
// Mount Review Router
productsRouter.use("/:productId/reviews", review_rout_1.reviewsRouter);
exports.default = productsRouter;
//# sourceMappingURL=products.rout.js.map