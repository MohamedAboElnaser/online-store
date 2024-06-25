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
const library_1 = require("@prisma/client/runtime/library");
const config_1 = require("../../../config");
const internal_utils_1 = require("../../utils/internal-utils");
class WishListService {
    constructor() { }
    /**
     * @description Add product to customer's wishlist
     * @param customerId
     * @param productId
     * @returns
     */
    static addToWishList(customerId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wishListItem = yield config_1.DatabaseManager.getInstance().wishList.create({
                    data: {
                        customerId,
                        productId,
                    },
                });
                return wishListItem;
            }
            catch (err) {
                if (err instanceof library_1.PrismaClientKnownRequestError) {
                    if (err.code === "P2002") {
                        throw new internal_utils_1.AppError("Product already in wishlist", 400);
                    }
                    else if (err.code === "P2003") {
                        throw new internal_utils_1.AppError(`No such product with the given id ${productId}`, 404);
                    }
                    else {
                        throw new internal_utils_1.AppError("error while adding to wishlist");
                    }
                }
                throw new internal_utils_1.AppError("error while adding to wishlist");
            }
        });
    }
    static fetchWishList(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wishListItems = yield config_1.DatabaseManager.getInstance().wishList.findMany({
                    where: {
                        customerId,
                    },
                    select: {
                        id: true,
                        product: {
                            select: {
                                id: true,
                                name: true,
                                price: true,
                                description: true,
                                images: true,
                            },
                        },
                    },
                });
                return wishListItems;
            }
            catch (err) {
                throw new internal_utils_1.AppError("error while fetching wishlist");
            }
        });
    }
    static removeWishListItems(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield config_1.DatabaseManager.getInstance().wishList.deleteMany({
                    where: {
                        id: {
                            in: ids,
                        },
                    },
                });
            }
            catch (err) {
                throw new internal_utils_1.AppError("error while removing items from wishlist");
            }
        });
    }
}
exports.default = WishListService;
//# sourceMappingURL=wishList.service.js.map