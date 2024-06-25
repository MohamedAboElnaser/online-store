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
const internal_utils_1 = require("../../utils/internal-utils");
const config_1 = require("../../../config");
class OrderItemsService {
    constructor() { }
    static updateOrderItem(orderId, itemId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            // First fetch order item and validate orderStatus.
            const orderItem = yield OrderItemsService.validateOrderItem(orderId, itemId);
            // Check if the quantity is greater than the countInStock
            if (quantity > orderItem.product.countInStock) {
                throw new internal_utils_1.AppError(`There are only ${orderItem.product.countInStock} items in stock, quantity must be less than or equal to ${orderItem.product.countInStock}`, 400);
            }
            // Update the order item quantity
            const updatedOrderItem = yield config_1.DatabaseManager.getInstance().orderItem.update({
                where: {
                    id: itemId,
                    orderId,
                },
                data: {
                    quantity,
                },
                select: {
                    id: true,
                    quantity: true,
                    orderId: true,
                },
            });
            return updatedOrderItem;
        });
    }
    static deleteOrderItem(orderId, itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            // First fetch order item and validate orderStatus.
            yield OrderItemsService.validateOrderItem(orderId, itemId);
            // Delete the order item
            yield config_1.DatabaseManager.getInstance().orderItem.delete({
                where: {
                    id: itemId,
                    orderId,
                },
            });
            return {
                message: "Order item deleted successfully",
            };
        });
    }
    static validateOrderItem(orderId, itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            // First fetch order item.
            const orderItem = yield config_1.DatabaseManager.getInstance().orderItem.findUnique({
                where: {
                    id: itemId,
                    orderId,
                },
                select: {
                    product: {
                        select: {
                            id: true,
                            countInStock: true,
                        },
                    },
                    order: {
                        select: {
                            orderStatus: true,
                        },
                    },
                },
            });
            // Check if order item exists
            if (!orderItem) {
                throw new internal_utils_1.AppError("Order item not found", 404);
            }
            // Check if the order status is not pending
            if (orderItem.order.orderStatus !== "PENDING") {
                throw new internal_utils_1.AppError("Order item can only be updated when the order status is pending", 400);
            }
            return orderItem;
        });
    }
}
exports.default = OrderItemsService;
//# sourceMappingURL=orderItem.service.js.map