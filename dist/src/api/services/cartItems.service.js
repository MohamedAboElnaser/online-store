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
exports.CartItemsService = void 0;
const config_1 = require("../../../config");
const internal_utils_1 = require("../../utils/internal-utils");
class CartItemsService {
    constructor() { }
    static addItemToCart(cartId_1, productId_1) {
        return __awaiter(this, arguments, void 0, function* (cartId, productId, quantity = 1) {
            /** check if the product is already in the cart */
            const cartItemRecord = yield config_1.DatabaseManager.getInstance().cartItem.findFirst({
                where: {
                    cartId,
                    productId,
                },
            });
            if (cartItemRecord) {
                throw new internal_utils_1.AppError("Product already in the cart", 400);
            }
            /** fetch the product from the database */
            const productRecord = yield config_1.DatabaseManager.getInstance().product.findUnique({
                where: {
                    id: productId,
                },
                select: {
                    countInStock: true,
                },
            });
            if (!productRecord) {
                throw new internal_utils_1.AppError("Product not found", 404);
            }
            /** check if the product is in stock*/
            if (productRecord.countInStock < quantity) {
                throw new internal_utils_1.AppError(`There is only ${productRecord.countInStock} item in the stock`, 400);
            }
            /** add the product to the cart */
            const cartItem = yield config_1.DatabaseManager.getInstance().cartItem.create({
                data: {
                    cartId,
                    productId,
                    quantity,
                },
                select: {
                    id: true,
                    quantity: true,
                    product: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                            price: true,
                            images: true,
                        },
                    },
                },
            });
            return cartItem;
        });
    }
    static removeItemsFromCart(cartId, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield config_1.DatabaseManager.getInstance().cartItem.deleteMany({
                where: {
                    cartId,
                    id: {
                        in: ids,
                    },
                },
            });
            if (data.count === 0)
                throw new internal_utils_1.AppError("No items found in the cart to remove", 404);
        });
    }
    static updateItemInCart(cartItemId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * First check if the item is in the cart
             * Second validate that the quantity is available in the stock
             * Third update the quantity of the item in the cart
             */
            const cartItemRecord = yield config_1.DatabaseManager.getInstance().cartItem.findUnique({
                where: {
                    id: cartItemId,
                },
                select: {
                    product: {
                        select: {
                            countInStock: true,
                        },
                    },
                },
            });
            if (!cartItemRecord) {
                throw new internal_utils_1.AppError(`No Item found in Cart with id: ${cartItemId}`, 404);
            }
            if (cartItemRecord.product.countInStock < quantity) {
                throw new internal_utils_1.AppError(`There is only ${cartItemRecord.product.countInStock} item in the stock`, 400);
            }
            const updatedCartItemRecord = yield config_1.DatabaseManager.getInstance().cartItem.update({
                where: {
                    id: cartItemId,
                },
                data: {
                    quantity,
                },
                select: {
                    id: true,
                    quantity: true,
                    product: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                            price: true,
                            images: true,
                        },
                    },
                },
            });
            return updatedCartItemRecord;
        });
    }
    static fetchCartItems(cartId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartItems = yield config_1.DatabaseManager.getInstance().cartItem.findMany({
                where: {
                    cartId,
                },
                select: {
                    id: true,
                    quantity: true,
                    product: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                            price: true,
                            images: true,
                        },
                    },
                },
            });
            return cartItems;
        });
    }
}
exports.CartItemsService = CartItemsService;
exports.default = CartItemsService;
//# sourceMappingURL=cartItems.service.js.map