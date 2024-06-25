"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewsRouter = void 0;
const express_1 = require("express");
const middlewares_1 = require("../../middlewares");
const schemas_1 = require("../../../validation/schemas");
const controllers_1 = require("../../controllers");
exports.reviewsRouter = (0, express_1.Router)({ mergeParams: true });
exports.reviewsRouter
    .route("/")
    .post(middlewares_1.AuthHandler.authenticate, middlewares_1.AuthHandler.authorize("CUSTOMER"), middlewares_1.MulterService.getNoneMethod(), (0, middlewares_1.validator)(schemas_1.reviewsSchemas), controllers_1.ReviewsController.addReview);
exports.reviewsRouter
    .route("/:reviewId")
    .patch(middlewares_1.AuthHandler.authenticate, middlewares_1.AuthHandler.authorize("CUSTOMER"), middlewares_1.MulterService.getNoneMethod(), (0, middlewares_1.validator)(schemas_1.reviewsSchemas), controllers_1.ReviewsController.updateReview).delete(middlewares_1.AuthHandler.authenticate, middlewares_1.AuthHandler.authorize("CUSTOMER"), (0, middlewares_1.validator)(schemas_1.reviewsSchemas), controllers_1.ReviewsController.deleteReview);
//# sourceMappingURL=review.rout.js.map