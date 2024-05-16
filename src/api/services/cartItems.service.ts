import { ICartItem } from "cartItem";
import { DatabaseManager } from "../../../config";
import { AppError } from "../../utils";

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
        try {
            const cartItem =
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

            return cartItem as ICartItem;
        } catch (err) {
            throw new AppError(
                `No Item found in Cart with id: ${cartItemId}`,
                404
            );
        }
    }
}

export default CartItemsService;
export { CartItemsService };
