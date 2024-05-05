import { Request, Response, NextFunction } from "express";
import { asyncHandler, notImplementedHandler } from "../../util";
import { ProductsService } from "../services";

class ProductsController {
    private constructor() {}

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

    public static updateOne = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            notImplementedHandler(req, res);
        }
    );

    public static deleteOne = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            notImplementedHandler(req, res);
        }
    );

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
