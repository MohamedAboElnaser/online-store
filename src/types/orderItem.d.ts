import type { IOrder } from "order";
import type { IProduct } from "product";

interface IOrderItem {
    id: string;
    order: IOrder;
    orderId: string;
    product: IProduct;
    productId: string;
    quantity: number;
    unitPrice: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export type { IOrderItem };
