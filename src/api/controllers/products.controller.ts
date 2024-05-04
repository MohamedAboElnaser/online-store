import { Request, Response, NextFunction } from "express";
import { asyncHandler, notImplementedHandler } from "../../util";

class ProductsController {
    private constructor() {}

    public static createOne = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            notImplementedHandler(req, res);
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
        async (req: Request, res: Response, next: NextFunction) => {
            notImplementedHandler(req, res);
        }
    );
}

export { ProductsController };
export default ProductsController;
