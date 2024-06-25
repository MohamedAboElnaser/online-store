"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const middlewares_1 = require("../../middlewares");
const schemas_1 = require("../../../validation/schemas");
const orderItemsRouter = (0, express_1.Router)({ mergeParams: true });
orderItemsRouter
    .route("/:itemId")
    .patch(middlewares_1.AuthHandler.authenticate, middlewares_1.AuthHandler.authorize("CUSTOMER"), middlewares_1.MulterService.getNoneMethod(), (0, middlewares_1.validator)(schemas_1.orderItemSchemas), controllers_1.OrderItemsController.updateOrderItem)
    .delete(middlewares_1.AuthHandler.authenticate, middlewares_1.AuthHandler.authorize("CUSTOMER"), (0, middlewares_1.validator)(schemas_1.orderItemSchemas), controllers_1.OrderItemsController.deleteOrderItem);
exports.default = orderItemsRouter;
//# sourceMappingURL=orderItems.rout.js.map