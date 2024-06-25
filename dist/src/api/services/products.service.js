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
class ProductsService {
    constructor() { }
    static createProduct(product, imagesFiles) {
        return __awaiter(this, void 0, void 0, function* () {
            let newProduct;
            try {
                /*
                    First create record in database using text fields
                */
                newProduct = yield config_1.DatabaseManager.getInstance().product.create({
                    data: Object.assign({}, product),
                });
                /*
                   Then save images to cloud storage naming it using the product id
                */
                const imagesURLs = yield utils_1.CloudStorageService.uploadFiles(imagesFiles, newProduct.id);
                /*
                    Then update the product record in the database with the image urls
                */
                newProduct = yield config_1.DatabaseManager.getInstance().product.update({
                    where: {
                        id: newProduct.id,
                    },
                    data: {
                        images: imagesURLs,
                    },
                });
                return newProduct;
            }
            catch (err) {
                //rollback
                if (newProduct) {
                    yield config_1.DatabaseManager.getInstance().product.delete({
                        where: {
                            id: newProduct.id,
                        },
                    });
                    throw err;
                }
                else {
                    throw new utils_1.AppError("Error happen while creating the product , categoryId is invalid", 500);
                }
            }
        });
    }
    static getProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield config_1.DatabaseManager.getInstance().product.findUnique({
                where: {
                    id,
                },
                select: {
                    id: true,
                    categoryId: true,
                    name: true,
                    description: true,
                    price: true,
                    countInStock: true,
                    images: true,
                    Reviews: {
                        select: {
                            rating: true,
                            comment: true,
                            user: {
                                select: {
                                    firstName: true,
                                    lastName: true,
                                },
                            },
                        },
                    },
                },
            });
            if (!product) {
                throw new utils_1.AppError(`No product found with this id:${id}`, 404);
            }
            return product;
        });
    }
    static updateProduct(id, product, imagesFiles) {
        return __awaiter(this, void 0, void 0, function* () {
            const productRecord = yield config_1.DatabaseManager.getInstance().product.findUnique({
                where: {
                    id,
                },
            });
            if (!productRecord)
                throw new utils_1.AppError(`No product found with this id:${id}`, 404);
            let updatedProduct, imagesURLs;
            try {
                if (imagesFiles && imagesFiles.length > 0) {
                    // delete the existing images
                    yield utils_1.CloudStorageService.deleteFolder(productRecord.id);
                    //upload the new images
                    imagesURLs = yield utils_1.CloudStorageService.uploadFiles(imagesFiles, productRecord.id);
                }
                updatedProduct = yield config_1.DatabaseManager.getInstance().product.update({
                    where: {
                        id,
                    },
                    data: Object.assign(Object.assign({}, product), { images: imagesURLs }),
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        price: true,
                        countInStock: true,
                        categoryId: true,
                        images: true,
                        updatedAt: true,
                    },
                });
                return updatedProduct;
            }
            catch (err) {
                throw new utils_1.AppError("Error happened while updating the product", 500);
            }
        });
    }
    static deleteMany(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield config_1.DatabaseManager.getInstance().product.deleteMany({
                    where: {
                        id: {
                            in: ids,
                        },
                    },
                });
            }
            catch (err) {
                throw new utils_1.AppError("Error happened while deleting the products", 500);
            }
        });
    }
    static fetchProducts(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `SELECT id, name, price, description, images FROM product.products WHERE 1=1`;
            if (opts.name) {
                query += ` AND (name ILIKE '%${opts.name}%' OR description ILIKE '%${opts.name}%')`;
            }
            if (opts.price_min) {
                query += ` AND price >= ${opts.price_min}`;
            }
            if (opts.price_max) {
                query += ` AND price <= ${opts.price_max}`;
            }
            query += ` ORDER BY price ASC`;
            if (opts.page && opts.limit) {
                const offset = opts.limit * (opts.page - 1);
                query += ` LIMIT ${opts.limit} OFFSET ${offset}`;
            }
            else {
                query += ` LIMIT 20`;
            }
            const products = yield config_1.DatabaseManager.getInstance().$queryRawUnsafe(`${query}`);
            return products;
        });
    }
    static countProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield config_1.DatabaseManager.getInstance().product.count();
        });
    }
}
exports.default = ProductsService;
//# sourceMappingURL=products.service.js.map