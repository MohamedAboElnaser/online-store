"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemsRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const middlewares_1 = require("../../middlewares");
const schemas_1 = require("../../../validation/schemas");
const CartItemsRouter = (0, express_1.Router)();
exports.CartItemsRouter = CartItemsRouter;
CartItemsRouter.route("/")
    .post(middlewares_1.AuthHandler.authenticate, middlewares_1.AuthHandler.authorize("CUSTOMER"), middlewares_1.MulterService.getNoneMethod(), (0, middlewares_1.validator)(schemas_1.cartItemsSchemas), controllers_1.CartItemsController.addItem)
    .get(middlewares_1.AuthHandler.authenticate, middlewares_1.AuthHandler.authorize("CUSTOMER"), controllers_1.CartItemsController.fetchItems)
    .delete(middlewares_1.AuthHandler.authenticate, middlewares_1.AuthHandler.authorize("CUSTOMER"), middlewares_1.MulterService.getNoneMethod(), (0, middlewares_1.validator)(schemas_1.cartItemsSchemas), controllers_1.CartItemsController.deleteItems);
CartItemsRouter.route("/:id").patch(middlewares_1.AuthHandler.authenticate, middlewares_1.AuthHandler.authorize("CUSTOMER"), middlewares_1.MulterService.getNoneMethod(), (0, middlewares_1.validator)(schemas_1.cartItemsSchemas), controllers_1.CartItemsController.updateItem);
//# sourceMappingURL=cartItems.rout.js.map