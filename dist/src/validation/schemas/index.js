"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchemas = exports.reviewsSchemas = exports.paymentSchemas = exports.orderItemSchemas = exports.orderSchemas = exports.cartItemsSchemas = exports.wishlistSchemas = exports.productsSchemas = exports.categoriesSchemas = exports.authSchemas = void 0;
const auth_schema_1 = __importDefault(require("./auth.schema"));
exports.authSchemas = auth_schema_1.default;
const category_schema_1 = __importDefault(require("./category.schema"));
exports.categoriesSchemas = category_schema_1.default;
const product_schema_1 = __importDefault(require("./product.schema"));
exports.productsSchemas = product_schema_1.default;
const wishlist_schema_1 = __importDefault(require("./wishlist.schema"));
exports.wishlistSchemas = wishlist_schema_1.default;
const cartItem_schema_1 = __importDefault(require("./cartItem.schema"));
exports.cartItemsSchemas = cartItem_schema_1.default;
const order_schema_1 = __importDefault(require("./order.schema"));
exports.orderSchemas = order_schema_1.default;
const orderItems_schema_1 = __importDefault(require("./orderItems.schema"));
exports.orderItemSchemas = orderItems_schema_1.default;
const payment_schema_1 = __importDefault(require("./payment.schema"));
exports.paymentSchemas = payment_schema_1.default;
const review_schema_1 = __importDefault(require("./review.schema"));
exports.reviewsSchemas = review_schema_1.default;
const user_schema_1 = __importDefault(require("./user.schema"));
exports.userSchemas = user_schema_1.default;
//# sourceMappingURL=index.js.map