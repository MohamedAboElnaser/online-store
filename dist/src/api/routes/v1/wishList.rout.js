"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishListRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const middlewares_1 = require("../../middlewares");
const schemas_1 = require("../../../validation/schemas");
const wishListRouter = (0, express_1.Router)();
exports.wishListRouter = wishListRouter;
wishListRouter
    .route("/")
    .post(middlewares_1.AuthHandler.authenticate, middlewares_1.AuthHandler.authorize("CUSTOMER"), middlewares_1.MulterService.getNoneMethod(), (0, middlewares_1.validator)(schemas_1.wishlistSchemas), controllers_1.WishListController.AddToWishList)
    .get(middlewares_1.AuthHandler.authenticate, middlewares_1.AuthHandler.authorize("CUSTOMER"), middlewares_1.MulterService.getNoneMethod(), controllers_1.WishListController.fetchWishList)
    .delete(middlewares_1.AuthHandler.authenticate, middlewares_1.AuthHandler.authorize("CUSTOMER"), middlewares_1.MulterService.getNoneMethod(), (0, middlewares_1.validator)(schemas_1.wishlistSchemas), controllers_1.WishListController.removeFromWishList);
exports.default = wishListRouter;
//# sourceMappingURL=wishList.rout.js.map