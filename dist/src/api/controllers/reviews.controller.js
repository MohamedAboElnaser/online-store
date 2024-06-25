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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsController = void 0;
const utils_1 = require("../../utils");
const services_1 = require("../services");
class ReviewsController {
    constructor() { }
}
exports.ReviewsController = ReviewsController;
_a = ReviewsController;
ReviewsController.addReview = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: customerId } = req.user;
    const { productId } = req.params;
    const review = yield services_1.ReviewsService.addOne(productId, customerId, req.body);
    res.status(201).json({
        status: "success",
        message: "Review added successfully",
        data: {
            review,
        },
    });
}));
ReviewsController.updateReview = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: customerId } = req.user;
    const { productId, reviewId } = req.params;
    const updatedReview = yield services_1.ReviewsService.updateOne(reviewId, customerId, productId, req.body);
    res.status(200).json({
        status: "success",
        message: "Review updated successfully",
        data: {
            updatedReview,
        },
    });
}));
ReviewsController.deleteReview = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: customerId } = req.user;
    const { productId, reviewId } = req.params;
    yield services_1.ReviewsService.deleteOne(productId, reviewId, customerId);
    res.status(204).send();
}));
exports.default = ReviewsController;
//# sourceMappingURL=reviews.controller.js.map