"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const middlewares_1 = require("../../middlewares");
const schemas_1 = require("../../../validation/schemas");
const orderItems_rout_1 = __importDefault(require("./orderItems.rout"));
const ordersRouter = (0, express_1.Router)();
exports.ordersRouter = ordersRouter;
ordersRouter
    .route("/")
    .post(middlewares_1.AuthHandler.authenticate, middlewares_1.AuthHandler.authorize("CUSTOMER"), middlewares_1.MulterService.getNoneMethod(), (0, middlewares_1.validator)(schemas_1.orderSchemas), controllers_1.OrdersController.createOrder)
    .get(middlewares_1.AuthHandler.authenticate, middlewares_1.AuthHandler.authorize("CUSTOMER"), (0, middlewares_1.validator)(schemas_1.orderSchemas), controllers_1.OrdersController.getOrders);
ordersRouter
    .route("/:id")
    .get(middlewares_1.AuthHandler.authenticate, middlewares_1.AuthHandler.authorize("CUSTOMER"), (0, middlewares_1.validator)(schemas_1.orderSchemas), controllers_1.OrdersController.getOrder)
    .delete(middlewares_1.AuthHandler.authenticate, middlewares_1.AuthHandler.authorize("CUSTOMER"), (0, middlewares_1.validator)(schemas_1.orderSchemas), controllers_1.OrdersController.deleteOrder);
ordersRouter.use("/:orderId/items/", orderItems_rout_1.default);
exports.default = ordersRouter;
//# sourceMappingURL=orders.rout.js.map