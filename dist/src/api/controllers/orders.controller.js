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
const utils_1 = require("../../utils");
const services_1 = require("../services");
class OrderController {
    constructor() { }
}
_a = OrderController;
OrderController.createOrder = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: customerId } = req.user;
    const { cartItemsIds } = req.body;
    const order = yield services_1.OrdersService.createOrder(cartItemsIds, customerId);
    res.status(201).json({
        status: "success",
        message: "Order created successfully. Now you can pay for it",
        data: {
            order,
        },
    });
}));
OrderController.getOrders = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: customerId } = req.user;
    const orders = yield services_1.OrdersService.getOrders(customerId, req.query.status);
    res.status(200).json({
        status: "success",
        message: "Orders fetched successfully",
        data: {
            length: orders.length,
            orders,
        },
    });
}));
OrderController.getOrder = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: customerId } = req.user;
    const order = yield services_1.OrdersService.getOrder(req.params.id, customerId);
    res.status(200).json({
        status: "success",
        message: "Order fetched successfully",
        data: {
            order,
        },
    });
}));
OrderController.deleteOrder = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: customerId } = req.user;
    yield services_1.OrdersService.deleteOrder(req.params.id, customerId);
    res.status(204).json({
        status: "success",
        message: "Order deleted successfully",
        data: null,
    });
}));
exports.default = OrderController;
//# sourceMappingURL=orders.controller.js.map