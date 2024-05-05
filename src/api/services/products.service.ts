import { IProduct } from "product";

class ProductsService {
    private constructor() {}

    public static createProduct(
        product: Partial<IProduct>,
        images: Express.Multer.File[]
    ) {
        // first create record in database using text fields

        // then save images to cloud storage naming it using the product id

        // then update the product record in the database with the image urls
    }
}

export default ProductsService;
