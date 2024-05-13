import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { DatabaseManager } from "../../../config";
import { AppError } from "../../utils";
import { IWishlist } from "wishlist";

class WishListService {
    private constructor() {}
    /**
     * @description Add product to customer's wishlist
     * @param customerId
     * @param productId
     * @returns
     */
    public static async addToWishList(
        customerId: string,
        productId: string
    ): Promise<Partial<IWishlist>> {
        try {
            const wishListItem =
                await DatabaseManager.getInstance().wishList.create({
                    data: {
                        customerId,
                        productId,
                    },
                });
            return wishListItem;
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError) {
                if (err.code === "P2002") {
                    throw new AppError("Product already in wishlist", 400);
                } else if (err.code === "P2003") {
                    throw new AppError(
                        `No such product with the given id ${productId}`,
                        404
                    );
                } else {
                    throw new AppError("error while adding to wishlist");
                }
            }
            throw new AppError("error while adding to wishlist");
        }
    }

    public static async fetchWishList(customerId: string) {
        try {
            const wishListItems =
                await DatabaseManager.getInstance().wishList.findMany({
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
        } catch (err) {
            throw new AppError("error while fetching wishlist");
        }
    }
}

export default WishListService;
