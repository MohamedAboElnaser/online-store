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
exports.CategoriesService = void 0;
const internal_utils_1 = require("../../utils/internal-utils");
const config_1 = require("../../../config");
class CategoriesService {
    constructor() { }
    static createOne(categoryName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield config_1.DatabaseManager.getInstance().category.create({
                    data: {
                        name: categoryName,
                    },
                    select: {
                        id: true,
                        name: true,
                    },
                });
                return category;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static updateOne(categoryId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield config_1.DatabaseManager.getInstance().category.update({
                    where: {
                        id: categoryId,
                    },
                    data: {
                        name: name,
                    },
                    select: {
                        id: true,
                        name: true,
                        updatedAt: true,
                    },
                });
                return category;
            }
            catch (err) {
                throw new internal_utils_1.AppError("Category not found", 404);
            }
        });
    }
    static deleteMany(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield config_1.DatabaseManager.getInstance().category.deleteMany({
                    where: {
                        id: {
                            in: ids,
                        },
                    },
                });
                return categories;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield config_1.DatabaseManager.getInstance().category.findMany({
                select: {
                    id: true,
                    name: true,
                },
            });
            return categories;
        });
    }
    static getOne(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield config_1.DatabaseManager.getInstance().category.findUnique({
                where: {
                    id: categoryId,
                },
                select: {
                    id: true,
                    name: true,
                    Product: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                            description: true,
                            countInStock: true,
                            images: true,
                            // TODO
                            /*
                                aggregate over ratings for each product
                                and return average rating and number of ratings
                            */
                        },
                    },
                },
            });
            if (!category) {
                throw new internal_utils_1.AppError("Category not found", 404);
            }
            return category;
        });
    }
}
exports.CategoriesService = CategoriesService;
exports.default = CategoriesService;
//# sourceMappingURL=category.service.js.map