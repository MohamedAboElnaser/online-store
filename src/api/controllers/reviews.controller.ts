import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../utils";
import { IUser } from "user";
import { ReviewsService } from "../services";

export class ReviewsController {
    private constructor() {}

    public static addReview = asyncHandler(
        async (
            req: Request<{ productId: string }>,
            res: Response,
            next: NextFunction
        ) => {
            const { id: customerId } = req.user as IUser;
            const { productId } = req.params;

            const review = await ReviewsService.addOne(
                productId,
                customerId,
                req.body
            );

            res.status(201).json({
                status: "success",
                message: "Review added successfully",
                data: {
                    review,
                },
            });
        }
    );

    public static updateReview = asyncHandler(
        async (
            req: Request<
                { productId: string; reviewId: string },
                any,
                { rating: number; comment?: string }
            >,
            res: Response,
            next: NextFunction
        ) => {
            const { id: customerId } = req.user as IUser;
            const { productId, reviewId } = req.params;
            const updatedReview = await ReviewsService.updateOne(
                reviewId,
                customerId,
                productId,
                req.body
            );

            res.status(200).json({
                status: "success",
                message: "Review updated successfully",
                data: {
                    updatedReview,
                },
            });
        }
    );

    public static deleteReview = asyncHandler(
        async (
            req: Request<{ productId: string; reviewId: string }>,
            res: Response,
            next: NextFunction
        ) => {
            const { id: customerId } = req.user as IUser;
            const { productId, reviewId } = req.params;

            await ReviewsService.deleteOne(productId, reviewId, customerId);

            res.status(204).send();
        }
    );
}

export default ReviewsController;
