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
}

export default ReviewsController;
