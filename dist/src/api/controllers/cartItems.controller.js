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
exports.CartItemsController = void 0;
const internal_utils_1 = require("../../utils/internal-utils");
const services_1 = require("../services");
class CartItemsController {
    constructor() { }
}
exports.CartItemsController = CartItemsController;
_a = CartItemsController;
CartItemsController.addItem = (0, internal_utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('req.user.Cart', (req.user as IUser).Cart[0]);
    const { Cart: [{ id: cartId }], } = req.user;
    const { productId, quantity } = req.body;
    const cartItem = yield services_1.CartItemsService.addItemToCart(cartId, productId, quantity);
    res.status(201).json({
        status: "success",
        message: "Item added to cart",
        data: {
            cartItem,
        },
    });
    // notImplementedHandler(req, res);
}));
CartItemsController.updateItem = (0, internal_utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: cartItemId } = req.params;
    const { quantity } = req.body;
    const updatedItem = yield services_1.CartItemsService.updateItemInCart(cartItemId, quantity);
    res.status(200).json({
        status: "success",
        message: "Item updated in cart",
        data: {
            updatedItem,
        },
    });
}));
CartItemsController.fetchItems = (0, internal_utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { Cart: [{ id: cartId }], } = req.user;
    const cartItems = yield services_1.CartItemsService.fetchCartItems(cartId);
    res.status(200).json({
        status: "success",
        message: "Cart items fetched successfully",
        length: cartItems.length,
        data: {
            cartItems,
        },
    });
}));
CartItemsController.deleteItems = (0, internal_utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { ids } = req.body;
    const { Cart: [{ id: cartId }], } = req.user;
    yield services_1.CartItemsService.removeItemsFromCart(cartId, ids);
    res.status(204).json({
        status: "success",
        message: "Items removed from cart",
    });
    // notImplementedHandler(req, res);
}));
exports.default = CartItemsController;
//# sourceMappingURL=cartItems.controller.js.map