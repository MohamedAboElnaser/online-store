import { IOrderItem } from "orderItem";

interface ISessionOrder {
    orderId:string;
    email: string;
    items: {
        name: string;
        unitePrice: number;
        quantity: number;
    }[];
}

export type { ISessionOrder };
