import { Request, Response, NextFunction } from "express";
import { asyncHandler, notImplementedHandler } from "../../utils";
import { ProductsService } from "../services";

class ProductsController {
    private constructor() {}

    /**
     * @access private - only accessible to Admin users
     * @route POST /api/v1/products
     */
    public static createOne = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            const product = await ProductsService.createProduct(
                req.body,
                req.files as Express.Multer.File[]
            );

            res.status(201).json({
                message: "Product created successfully",
                product,
            });
        }
    );

    /**
     * @access private - only accessible to Admin users
     * @route PATCH /api/v1/products/:productId
     */
    public static updateOne = asyncHandler(
        async (
            req: Request<{ productId: string }>,
            res: Response,
            next: NextFunction
        ) => {
            const { productId } = req.params;
            const updatedProduct = await ProductsService.updateProduct(
                productId,
                req.body,
                req.files as Express.Multer.File[]
            );

            res.status(200).json({
                message: "Product updated successfully",
                product: updatedProduct,
            });
        }
    );

    /**
     * @access private - only accessible to Admin users
     * @route DELETE /api/v1/products
     */
    public static deleteProducts = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            await ProductsService.deleteMany(req.body.ids);
            res.status(204).json({
                status: "success",
                message: "Products deleted successfully",
            });
        }
    );

    /**
     * @route GET /api/v1/products
     * @access public
     */
    public static getOne = asyncHandler(
        async (
            req: Request<{ productId: string }>,
            res: Response,
            next: NextFunction
        ) => {
            const product = await ProductsService.getProduct(
                req.params.productId
            );

            res.status(200).json({
                message: "Product fetched successfully",
                product,
            });
        }
    );
}

export { ProductsController };
export default ProductsController;
