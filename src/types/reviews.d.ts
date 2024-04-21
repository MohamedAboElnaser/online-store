import type { IProduct } from "product";
import type { IUser } from "user";

interface IReview {
    id: string;
    rating: number;
    comment: string;
    user: IUser;
    userId: string;
    product: IProduct;
    productId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type { IReview };
