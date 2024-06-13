import { DatabaseManager } from "../../../config";
import { AppError } from "../../utils";
import { IReview } from "reviews";

class ReviewsService {
    private constructor() {}

    public static async addOne(
        productId: string,
        customerId: string,
        review: IReview
    ): Promise<IReview> {
        /**
         * Verify That product exist and customer purchased the product
         * Add Review to the product
         */
        const product = await DatabaseManager.getInstance().product.findUnique({
            where: {
                id: productId,
            },
            select: {
                price: true,
            },
        });
        if (!product) {
            throw new AppError(`Product not found with id: ${productId}`, 404);
        }
        const customerProduct =
            await DatabaseManager.getInstance().customerProduct.findUnique({
                where: {
                    productId_customerId: {
                        customerId,
                        productId,
                    },
                },
            });

        if (!customerProduct) {
            throw new AppError(
                "You have to buy the product first to add review",
                403
            );
        }

        try {
            const reviewRecord =
                await DatabaseManager.getInstance().reviews.create({
                    data: {
                        rating: review.rating,
                        comment: review?.comment,
                        productId,
                        userId: customerId,
                    },
                    select: {
                        id: true,
                        rating: true,
                        comment: true,
                    },
                });

            return reviewRecord as IReview;
        } catch (err) {
            throw new AppError("You have already reviewed this product", 400);
        }
    }

    public static async updateOne(
        reviewId: string,
        customerId: string,
        productId: string,
        data: { rating: number; comment?: string }
    ) {
        const review = await DatabaseManager.getInstance().reviews.findUnique({
            where: {
                id: reviewId,
                productId,
                userId: customerId,
            },
        });
        if (!review) {
            throw new AppError("Review not found", 404);
        }

        const updatedReview =
            await DatabaseManager.getInstance().reviews.update({
                where: {
                    id: reviewId,
                },
                data: {
                    rating: data.rating,
                    comment: data.comment,
                },
                select: {
                    id: true,
                    rating: true,
                    comment: true,
                },
            });

        return updatedReview as IReview;
    }
}

export { ReviewsService };
export default ReviewsService;
