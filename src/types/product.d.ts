import type { ICartItem } from "cartItem";
import type { ICategory } from "category";
import type { IOrderItem } from "orderItem";
import type { IReview } from "reviews";
import type { IWishlist } from "wishlist";

interface IProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    countInStock: number;
    category: ICategory;
    categoryId: string;
    createdAt?: Date;
    updatedAt?: Date;
    images: string[];
    Reviews?: IReview[];
    OrderItem?: IOrderItem[];
    whishlist?: IWishlist[];
    CartItem?: ICartItem[];
}

export type { IProduct };
