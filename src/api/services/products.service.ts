import { DatabaseManager } from "../../../config";
import { IProduct } from "product";
import { AppError, CloudStorageService } from "../../utils";

class ProductsService {
    private constructor() {}

    public static async createProduct(
        product: Pick<
            IProduct,
            "name" | "description" | "price" | "countInStock" | "categoryId"
        >,
        imagesFiles: Express.Multer.File[]
    ): Promise<Omit<IProduct, "category">> {
        let newProduct;
        try {
            /* 
                First create record in database using text fields
            */
            newProduct = await DatabaseManager.getInstance().product.create({
                data: {
                    ...product,
                },
            });
            /* 
               Then save images to cloud storage naming it using the product id 
            */
            const imagesURLs = await CloudStorageService.uploadFiles(
                imagesFiles,
                newProduct.id
            );
            /* 
                Then update the product record in the database with the image urls
            */
            newProduct = await DatabaseManager.getInstance().product.update({
                where: {
                    id: newProduct.id,
                },
                data: {
                    images: imagesURLs,
                },
            });

            return newProduct;
        } catch (err) {
            //rollback
            if (newProduct) {
                await DatabaseManager.getInstance().product.delete({
                    where: {
                        id: newProduct.id,
                    },
                });
                throw err;
            } else {
                throw new AppError(
                    "Error happen while creating the product , categoryId is invalid",
                    500
                );
            }
        }
    }

    public static async getProduct(id: string) {
        const product = await DatabaseManager.getInstance().product.findUnique({
            where: {
                id,
            },
            include: {
                Reviews: {
                    /*TODO 
                        Add aggregation to get the average rating and photo of the user
                    */
                    select: {
                        comment: true,
                        rating: true,
                        user: {
                            select: {
                                firstName: true,
                            },
                        },
                    },
                },
            },
        });
        if (!product) {
            throw new AppError(`No product found with this id:${id}`, 404);
        }
        return product;
    }

    public static async updateProduct(
        id: string,
        product: Pick<
            IProduct,
            "name" | "description" | "price" | "countInStock" | "categoryId"
        >,
        imagesFiles: Express.Multer.File[] | undefined
    ) {
        const productRecord =
            await DatabaseManager.getInstance().product.findUnique({
                where: {
                    id,
                },
            });
        if (!productRecord)
            throw new AppError(`No product found with this id:${id}`, 404);

        let updatedProduct, imagesURLs;
        try {
            if (imagesFiles && imagesFiles.length > 0) {
                // delete the existing images
                await CloudStorageService.deleteFolder(productRecord.id);
                //upload the new images
                imagesURLs = await CloudStorageService.uploadFiles(
                    imagesFiles,
                    productRecord.id
                );
            }
            updatedProduct = await DatabaseManager.getInstance().product.update(
                {
                    where: {
                        id,
                    },
                    data: {
                        ...product,
                        images: imagesURLs,
                    },
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        price: true,
                        countInStock: true,
                        categoryId: true,
                        images: true,
                        updatedAt: true,
                    },
                }
            );
            return updatedProduct;
        } catch (err) {
            throw new AppError(
                "Error happened while updating the product",
                500
            );
        }
    }

    public static async deleteMany(ids: string[]) {
        try {
            await DatabaseManager.getInstance().product.deleteMany({
                where: {
                    id: {
                        in: ids,
                    },
                },
            });
        } catch (err) {
            throw new AppError(
                "Error happened while deleting the products",
                500
            );
        }
    }

    public static async fetchProducts(opts: {
        name?: string;
        price_min?: number;
        price_max?: number;
        page?: number;
        limit?: number;
    }) {
        let query = `SELECT id, name, price, description, images FROM product.products WHERE 1=1`;

        if (opts.name) {
            query += ` AND name ILIKE '%${opts.name}%'`;
        }

        if (opts.price_min) {
            query += ` AND price >= ${opts.price_min}`;
        }

        if (opts.price_max) {
            query += ` AND price <= ${opts.price_max}`;
        }

        query += ` ORDER BY price ASC`;

        if (opts.page && opts.limit) {
            const offset = opts.limit * (opts.page - 1);
            query += ` LIMIT ${opts.limit} OFFSET ${offset}`;
        } else {
            query += ` LIMIT 20`;
        }
        console.log("Generated query", query);
        const products = await DatabaseManager.getInstance().$queryRawUnsafe(
            `${query}`
        );
        //TODO - add rating filter
        return products;
    }

    public static async countProducts() {
        return await DatabaseManager.getInstance().product.count();
    }
}

export default ProductsService;
