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
exports.WishListController = void 0;
const utils_1 = require("../../utils");
const services_1 = require("../services");
class WishListController {
    constructor() { }
}
exports.WishListController = WishListController;
_a = WishListController;
WishListController.AddToWishList = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: customerId } = req.user;
    const { productId } = req.body;
    const wishListItem = yield services_1.WishListService.addToWishList(customerId, productId);
    res.status(201).json({
        message: "Product added successfully to your wishlist",
        data: wishListItem,
    });
}));
WishListController.fetchWishList = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const { id: customerId } = req.user;
    const wishListItems = yield services_1.WishListService.fetchWishList(customerId);
    res.status(200).json({
        message: "Wishlist Items fetched successfully",
        data: wishListItems,
    });
}));
WishListController.removeFromWishList = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield services_1.WishListService.removeWishListItems(req.body.ids);
    res.status(204).json({
        message: "Items removed from wishlist successfully",
    });
}));
exports.default = WishListController;
//# sourceMappingURL=wishList.controller.js.map