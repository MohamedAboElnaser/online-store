import type { ICartItem } from "cartItem";
import type { IUser } from "user";

interface ICart{
    id:string;
    user:IUser;
    customerId:string;
    CartItem:ICartItem[];
}

export type { ICart };