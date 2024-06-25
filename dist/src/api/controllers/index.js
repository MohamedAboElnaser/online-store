"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = exports.ReviewsController = exports.PaymentController = exports.OrderItemsController = exports.OrdersController = exports.CartItemsController = exports.WishListController = exports.ProductsController = exports.CategoriesController = exports.AuthController = void 0;
const auth_controller_1 = __importDefault(require("./auth.controller"));
exports.AuthController = auth_controller_1.default;
const categories_controller_1 = __importDefault(require("./categories.controller"));
exports.CategoriesController = categories_controller_1.default;
const products_controller_1 = __importDefault(require("./products.controller"));
exports.ProductsController = products_controller_1.default;
const wishList_controller_1 = __importDefault(require("./wishList.controller"));
exports.WishListController = wishList_controller_1.default;
const cartItems_controller_1 = __importDefault(require("./cartItems.controller"));
exports.CartItemsController = cartItems_controller_1.default;
const orders_controller_1 = __importDefault(require("./orders.controller"));
exports.OrdersController = orders_controller_1.default;
const orderItems_Controller_1 = __importDefault(require("./orderItems.Controller"));
exports.OrderItemsController = orderItems_Controller_1.default;
const payment_controller_1 = __importDefault(require("./payment.controller"));
exports.PaymentController = payment_controller_1.default;
const reviews_controller_1 = __importDefault(require("./reviews.controller"));
exports.ReviewsController = reviews_controller_1.default;
const user_controller_1 = __importDefault(require("./user.controller"));
exports.UsersController = user_controller_1.default;
//# sourceMappingURL=index.js.map