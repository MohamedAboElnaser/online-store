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
class OrderService {
    constructor() { }
    //TODO Do some refactoring here
    static createOrder(cartItemsIds, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Fetch cartItems
            const cartItems = yield config_1.DatabaseManager.getInstance().cartItem.findMany({
                where: {
                    id: {
                        in: cartItemsIds,
                    },
                    cart: {
                        customerId,
                    },
                },
                select: {
                    id: true,
                    quantity: true,
                    product: {
                        select: {
                            id: true,
                            price: true,
                        },
                    },
                },
            });
            // Check if all cartItems are found
            if ((cartItems === null || cartItems === void 0 ? void 0 : cartItems.length) != cartItemsIds.length)
                throw new internal_utils_1.AppError("Some cart items are not found", 404);
            // Create OrderItems array from cartItems
            const orderItems = cartItems.map((item) => {
                return {
                    quantity: item.quantity,
                    unitPrice: item.product.price,
                    productId: item.product.id,
                };
            });
            // Start a transaction to create Order and remove CartItems
            const [order] = yield config_1.DatabaseManager.getInstance().$transaction([
                // Create Order and attach orderItems to it
                config_1.DatabaseManager.getInstance().order.create({
                    data: {
                        customerId,
                        OrderItems: {
                            create: orderItems,
                        },
                    },
                    select: {
                        id: true,
                        orderStatus: true,
                        OrderItems: {
                            select: {
                                id: true,
                                quantity: true,
                                unitPrice: true,
                                product: {
                                    select: {
                                        id: true,
                                        name: true,
                                        images: true,
                                    },
                                },
                            },
                        },
                    },
                }),
                // Remove CartItems from the Customer's Cart
                config_1.DatabaseManager.getInstance().cartItem.deleteMany({
                    where: {
                        id: {
                            in: cartItemsIds,
                        },
                    },
                }),
            ]);
            // Derive the total price of the order
            order.totalPrice = order.OrderItems.reduce((total, item) => total + item.quantity * item.unitPrice, 0);
            return order;
        });
    }
    static getOrders(customerId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield config_1.DatabaseManager.getInstance().order.findMany({
                where: {
                    customerId,
                    orderStatus: status,
                },
                select: {
                    id: true,
                    orderStatus: true,
                    createdAt: true,
                    paidAt: true,
                    OrderItems: {
                        select: {
                            id: true,
                            quantity: true,
                            unitPrice: true,
                            product: {
                                select: {
                                    id: true,
                                    name: true,
                                    images: true,
                                },
                            },
                        },
                    },
                },
            });
            // Derive the total price of each order
            orders.forEach((order) => {
                order.totalPrice = order.OrderItems.reduce((total, item) => total + item.quantity * item.unitPrice, 0);
            });
            return orders;
        });
    }
    static getOrder(orderId, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield config_1.DatabaseManager.getInstance().order.findFirst({
                    where: {
                        id: orderId,
                        customerId,
                    },
                    select: {
                        id: true,
                        orderStatus: true,
                        createdAt: true,
                        paidAt: true,
                        OrderItems: {
                            select: {
                                id: true,
                                quantity: true,
                                unitPrice: true,
                                product: {
                                    select: {
                                        id: true,
                                        name: true,
                                        images: true,
                                    },
                                },
                            },
                        },
                    },
                });
                // Derive the total price of the order
                order.totalPrice = order.OrderItems.reduce((total, item) => total + item.quantity * item.unitPrice, 0);
                return order;
            }
            catch (err) {
                throw new internal_utils_1.AppError("Order not found", 404);
            }
        });
    }
    static deleteOrder(orderId, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield config_1.DatabaseManager.getInstance().order.findFirst({
                where: {
                    id: orderId,
                    customerId,
                },
                select: {
                    id: true,
                },
            });
            if (!order)
                throw new internal_utils_1.AppError("Order not found", 404);
            yield config_1.DatabaseManager.getInstance().order.delete({
                where: {
                    id: orderId,
                },
            });
        });
    }
}
exports.default = OrderService;
//# sourceMappingURL=orders.service.js.map