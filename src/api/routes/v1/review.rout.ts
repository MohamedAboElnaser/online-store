import { Router } from "express";
import { validator, AuthHandler, MulterService } from "../../middlewares";
import { reviewsSchemas } from "../../../validation/schemas";
import { ReviewsController } from "../../controllers";
export const reviewsRouter = Router({ mergeParams: true });

reviewsRouter
    .route("/")
    .post(
        AuthHandler.authenticate,
        AuthHandler.authorize("CUSTOMER"),
        MulterService.getNoneMethod(),
        validator(reviewsSchemas),
        ReviewsController.addReview
    );
