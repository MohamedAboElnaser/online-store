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
                    "Error happen while creating the product",
                    500
                );
            }
        }
    }
}

export default ProductsService;
