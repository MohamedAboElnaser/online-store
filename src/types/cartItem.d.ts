import type { ICart } from "cart";
import type { IProduct } from "product";

interface ICartItem {
    id: string;
    cart: ICart;
    cartId: string;
    product: IProduct;
    productId: string;
    quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export type { ICartItem };