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
const internal_utils_1 = require("../../utils/internal-utils");
const services_1 = require("../services");
class OrderItemsController {
    constructor() { }
}
_a = OrderItemsController;
OrderItemsController.updateOrderItem = (0, internal_utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId, itemId } = req.params;
    const { quantity } = req.body;
    const updatedOrderItem = yield services_1.OrderItemsService.updateOrderItem(orderId, itemId, quantity);
    res.status(200).json({
        status: "success",
        message: "Order item updated successfully",
        data: updatedOrderItem,
    });
}));
OrderItemsController.deleteOrderItem = (0, internal_utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId, itemId } = req.params;
    yield services_1.OrderItemsService.deleteOrderItem(orderId, itemId);
    res.status(204).json({
        status: "success",
        message: "Order item deleted successfully",
    });
}));
exports.default = OrderItemsController;
//# sourceMappingURL=orderItems.Controller.js.map