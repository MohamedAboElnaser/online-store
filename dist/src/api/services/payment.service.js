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
const config_1 = require("../../../config");
const utils_1 = require("../../utils");
class PaymentService {
    constructor() { }
    static createCheckoutSession(customer, orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             *  Fetch the order and its details from the database.
             *  Validate the required quantity of each orderItem is available.
             *  Create a checkout session using the StripeService.
             *  Return the payment url to the client.
             */
            const { order } = yield PaymentService.verifyOrderState(orderId, customer);
            const session = yield utils_1.StripeService.getInstance().createCheckoutSession({
                orderId: orderId,
                email: customer.email,
                items: order.OrderItems.map((orderItem) => ({
                    name: orderItem.product.name,
                    unitePrice: orderItem.unitPrice,
                    quantity: orderItem.quantity,
                })),
            }, "api/v1/payments/success", "api/v1/payments/cancel");
            /* TODO Delete below queries after implementing the webhook endpoint */
            /*
              Mark that customer bought these order items so he can add reviews to them.
              Update status of the order to COMPLETED
              Subtract the quantity of each order item from the store
            */
            if (process.env.NODE_ENV !== "production") {
                yield PaymentService.updateOrderState(orderId, order.OrderItems, customer.id);
            }
            return session.url;
        });
    }
    /**
     * Verifies an order's existence, status and item availability in the store.
     *
     * @param {string} orderId - The unique identifier of the order.
     * @param {IUser} customer - The customer object containing customer details.
     * @returns {Promise<Object>} - A promise that resolves to the order details if the verification is successful.
     * @throws {AppError} - Throws an error if the order does not exist, is already completed, or if any order items are out of stock.
     */
    static verifyOrderState(orderId, customer) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield config_1.DatabaseManager.getInstance().order.findUnique({
                where: {
                    id: orderId,
                    customerId: customer.id,
                },
                select: {
                    orderStatus: true,
                    OrderItems: {
                        select: {
                            id: true,
                            quantity: true,
                            unitPrice: true,
                            product: {
                                select: {
                                    id: true,
                                    countInStock: true,
                                    name: true,
                                },
                            },
                        },
                    },
                },
            });
            if (!order) {
                throw new utils_1.AppError(`No Order exist have id: ${orderId}`, 404);
            }
            if (order.orderStatus === "COMPLETED") {
                throw new utils_1.AppError(`Order with id: ${orderId} is already completed`, 400);
            }
            // Making sure that the required quantity of each orderItem is available in the store
            const isItemsAvailable = order.OrderItems.every((orderItem) => {
                return orderItem.product.countInStock >= orderItem.quantity;
            });
            if (!isItemsAvailable) {
                // Find all items that are out of stock
                const outOfStockItems = order.OrderItems.filter((orderItem) => orderItem.product.countInStock < orderItem.quantity);
                // Generate a descriptive message listing all out-of-stock elements
                const errorMessage = outOfStockItems
                    .map((item) => `OrderItem:${item.id},${item.product.name} only has ${item.product.countInStock} items in stock but you requested ${item.quantity}`)
                    .join(". ");
                // Throw the error with the descriptive message
                throw new utils_1.AppError(errorMessage, 400);
            }
            return { order };
        });
    }
    /**
     * Update the status of the order to COMPLETED and mark the order as paid.
     * Subtract the quantity of each order item from the store.
     */
    static updateOrderState(orderId, OrderItems, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const upsertPromises = OrderItems.map((item) => config_1.DatabaseManager.getInstance().customerProduct.upsert({
                where: {
                    productId_customerId: {
                        customerId,
                        productId: item.product.id,
                    },
                },
                update: {},
                create: {
                    customerId,
                    productId: item.product.id,
                },
            }));
            const updateStockPromises = OrderItems.map((item) => config_1.DatabaseManager.getInstance().product.update({
                where: {
                    id: item.product.id,
                },
                data: {
                    countInStock: {
                        decrement: item.quantity,
                    },
                },
            }));
            yield Promise.all(upsertPromises);
            yield Promise.all(updateStockPromises);
            yield config_1.DatabaseManager.getInstance().order.update({
                where: {
                    id: orderId,
                },
                data: {
                    orderStatus: "COMPLETED",
                    paidAt: new Date(),
                },
            });
        });
    }
}
exports.default = PaymentService;
//# sourceMappingURL=payment.service.js.map