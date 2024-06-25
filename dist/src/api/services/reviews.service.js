"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsService = void 0;
const config_1 = require("../../../config");
const utils_1 = require("../../utils");
class ReviewsService {
    constructor() { }
    static addOne(productId, customerId, review) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Verify That product exist and customer purchased the product
             * Add Review to the product
             */
            const product = yield config_1.DatabaseManager.getInstance().product.findUnique({
                where: {
                    id: productId,
                },
                select: {
                    price: true,
                },
            });
            if (!product) {
                throw new utils_1.AppError(`Product not found with id: ${productId}`, 404);
            }
            const customerProduct = yield config_1.DatabaseManager.getInstance().customerProduct.findUnique({
                where: {
                    productId_customerId: {
                        customerId,
                        productId,
                    },
                },
            });
            if (!customerProduct) {
                throw new utils_1.AppError("You have to buy the product first to add review", 403);
            }
            try {
                const reviewRecord = yield config_1.DatabaseManager.getInstance().reviews.create({
                    data: {
                        rating: review.rating,
                        comment: review === null || review === void 0 ? void 0 : review.comment,
                        productId,
                        userId: customerId,
                    },
                    select: {
                        id: true,
                        rating: true,
                        comment: true,
                    },
                });
                return reviewRecord;
            }
            catch (err) {
                throw new utils_1.AppError("You have already reviewed this product", 400);
            }
        });
    }
    static updateOne(reviewId, customerId, productId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const review = yield config_1.DatabaseManager.getInstance().reviews.findUnique({
                where: {
                    id: reviewId,
                    productId,
                    userId: customerId,
                },
            });
            if (!review) {
                throw new utils_1.AppError("Review not found", 404);
            }
            const updatedReview = yield config_1.DatabaseManager.getInstance().reviews.update({
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
            return updatedReview;
        });
    }
    static deleteOne(productId, reviewId, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const review = yield config_1.DatabaseManager.getInstance().reviews.findUnique({
                where: {
                    id: reviewId,
                    userId: customerId,
                    productId,
                },
            });
            if (!review) {
                throw new utils_1.AppError("Review not found", 404);
            }
            yield config_1.DatabaseManager.getInstance().reviews.delete({
                where: {
                    id: reviewId,
                },
            });
        });
    }
}
exports.ReviewsService = ReviewsService;
exports.default = ReviewsService;
//# sourceMappingURL=reviews.service.js.map