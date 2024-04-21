import type { ICart } from "cart";
import type { IOtp } from "otps";
import type { IReview } from "reviews";
import type { IWishlist } from "wishlist";

interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "ADMIN" | "CUSTOMER";
    createdAt?: Date;
    updatedAt?: Date;
    isVerified: boolean;
    Reviews?: IReview[];
    Orders?: IWishlist[];
    Cart?: ICart[];
    otps?: IOtp[];
}

export type { IUser };
