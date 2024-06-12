import { ICartItem } from "cartItem";
import { DatabaseManager } from "../../../config";
import { AppError } from "../../utils/internal-utils";

class CartItemsService {
    private constructor() {}

    public static async addItemToCart(
        cartId: string,
        productId: string,
        quantity: number = 1
    ): Promise<ICartItem> {
        /** check if the product is already in the cart */
        const cartItemRecord =
            await DatabaseManager.getInstance().cartItem.findFirst({
                where: {
                    cartId,
                    productId,
                },
            });
        if (cartItemRecord) {
            throw new AppError("Product already in the cart", 400);
        }

        /** fetch the product from the database */
        const productRecord =
            await DatabaseManager.getInstance().product.findUnique({
                where: {
                    id: productId,
                },
                select: {
                    countInStock: true,
                },
            });
        if (!productRecord) {
            throw new AppError("Product not found", 404);
        }

        /** check if the product is in stock*/
        if (productRecord.countInStock < quantity) {
            throw new AppError(
                `There is only ${productRecord.countInStock} item in the stock`,
                400
            );
        }

        /** add the product to the cart */
        const cartItem = await DatabaseManager.getInstance().cartItem.create({
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

        return cartItem as ICartItem;
    }

    public static async removeItemsFromCart(
        cartId: string,
        ids: string[]
    ): Promise<void> {
        const data = await DatabaseManager.getInstance().cartItem.deleteMany({
            where: {
                cartId,
                id: {
                    in: ids,
                },
            },
        });
        if (data.count === 0)
            throw new AppError("No items found in the cart to remove", 404);
    }

    public static async updateItemInCart(cartItemId: string, quantity: number) {
        /**
         * First check if the item is in the cart
         * Second validate that the quantity is available in the stock
         * Third update the quantity of the item in the cart
         */

        const cartItemRecord =
            await DatabaseManager.getInstance().cartItem.findUnique({
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
            throw new AppError(
                `No Item found in Cart with id: ${cartItemId}`,
                404
            );
        }
        if (cartItemRecord.product.countInStock < quantity) {
            throw new AppError(
                `There is only ${cartItemRecord.product.countInStock} item in the stock`,
                400
            );
        }

        const updatedCartItemRecord =
            await DatabaseManager.getInstance().cartItem.update({
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

        return updatedCartItemRecord as ICartItem;
    }

    public static async fetchCartItems(cartId: string) {
        const cartItems = await DatabaseManager.getInstance().cartItem.findMany(
            {
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
            }
        );

        return cartItems;
    }
}

export default CartItemsService;
export { CartItemsService };
