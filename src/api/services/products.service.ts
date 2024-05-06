import { DatabaseManager } from "../../../config";
import { IProduct } from "product";
import { AppError, CloudStorageService } from "../../util";

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
}

export default ProductsService;
