import { IOrderItem } from "orderItem";

interface ISessionOrder {
    email: string;
    items: {
        name: string;
        unitePrice: number;
        quantity: number;
    }[];
}

export type { ISessionOrder };
