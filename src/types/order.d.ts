import type { IOrderItem } from "orderItem";
import type { IUser } from "user";

interface IOrder {
    id: string;
    user: IUser;
    customerId: string;
    paidAt?: Date;
    orderStatus: "PENDING" | "COMPLETED";
    createdAt?: Date;
    updatedAt?: Date;
    OrderItem: IOrderItem[];
}

export type { IOrder };
