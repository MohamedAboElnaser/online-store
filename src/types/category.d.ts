import type { IProduct } from "product";

interface ICategory {
    id: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    Product?: IProduct[];
}

export type { ICategory };
