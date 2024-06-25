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
exports.CategoriesController = void 0;
const internal_utils_1 = require("../../utils/internal-utils");
const services_1 = require("../services");
class CategoriesController {
    constructor() { }
}
exports.CategoriesController = CategoriesController;
_a = CategoriesController;
/**
 * @access private - only accessible to Admin users
 * @route POST /api/v1/categories
 */
CategoriesController.createCategory = (0, internal_utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield services_1.CategoriesService.createOne(req.body.name);
    res.status(201).json({
        status: "success",
        message: "Category created successfully",
        data: category,
    });
}));
/**
 * @access private - only accessible to Admin users
 * @route PATCH /api/v1/categories/:categoryId
 */
CategoriesController.updateCategory = (0, internal_utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield services_1.CategoriesService.updateOne(req.params.categoryId, req.body.name);
    res.status(200).json({
        status: "success",
        message: "Category updated successfully",
        data: category,
    });
}));
/**
 * @access private - only accessible to Admin users
 * @route DELETE /api/v1/categories
 */
CategoriesController.deleteCategories = (0, internal_utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield services_1.CategoriesService.deleteMany(req.body.ids);
    res.status(204).json({
        status: "success",
        message: "Categories deleted successfully",
    });
}));
/**
 * @route GET /api/v1/categories
 * @access public
 */
CategoriesController.fetchCategories = (0, internal_utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield services_1.CategoriesService.getCategories();
    res.status(200).json({
        status: "success",
        message: "Categories fetched successfully",
        length: categories.length,
        data: categories,
    });
}));
/**
 * @route GET /api/v1/categories/:categoryId
 * @access public
 */
CategoriesController.fetchCategory = (0, internal_utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield services_1.CategoriesService.getOne(req.params.categoryId);
    res.status(200).json({
        status: "success",
        message: "Category fetched successfully",
        data: category,
    });
}));
exports.default = CategoriesController;
//# sourceMappingURL=categories.controller.js.map