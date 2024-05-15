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
}

export default CartItemsService;
export { CartItemsService };
