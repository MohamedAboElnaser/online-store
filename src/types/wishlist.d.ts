import type { IProduct } from "product";
import type { IUser } from "user";

interface IWishlist {
    id: string;
    user: IUser;
    userId: string;
    product: IProduct;
    productId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type { IWishlist };
