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
exports.ProductsController = void 0;
const internal_utils_1 = require("../../utils/internal-utils");
const services_1 = require("../services");
class ProductsController {
    constructor() { }
}
exports.ProductsController = ProductsController;
_a = ProductsController;
/**
 * @access private - only accessible to Admin users
 * @route POST /api/v1/products
 */
ProductsController.createOne = (0, internal_utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield services_1.ProductsService.createProduct(req.body, req.files);
    res.status(201).json({
        message: "Product created successfully",
        product,
    });
}));
/**
 * @access private - only accessible to Admin users
 * @route PATCH /api/v1/products/:productId
 */
ProductsController.updateOne = (0, internal_utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const updatedProduct = yield services_1.ProductsService.updateProduct(productId, req.body, req.files);
    res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
    });
}));
/**
 * @access private - only accessible to Admin users
 * @route DELETE /api/v1/products
 */
ProductsController.deleteProducts = (0, internal_utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield services_1.ProductsService.deleteMany(req.body.ids);
    res.status(204).json({
        status: "success",
        message: "Products deleted successfully",
    });
}));
/**
 * @route GET /api/v1/products
 * @access public
 */
ProductsController.getOne = (0, internal_utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield services_1.ProductsService.getProduct(req.params.productId);
    res.status(200).json({
        message: "Product fetched successfully",
        product,
    });
}));
ProductsController.getAll = (0, internal_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = (yield services_1.ProductsService.fetchProducts(req.query));
    const totalCount = yield services_1.ProductsService.countProducts();
    res.status(200).json({
        message: "products fetched successfully",
        totalCount,
        dataLength: products.length,
        data: products,
    });
}));
exports.default = ProductsController;
//# sourceMappingURL=products.controller.js.map