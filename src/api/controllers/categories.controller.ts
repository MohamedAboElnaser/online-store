import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../util";
import { CategoriesService } from "../services";

class CategoriesController {
    private constructor() {}
    /**
     * @access private - only accessible to Admin users
     */
    public static createCategory = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            const category = await CategoriesService.createOne(req.body.name);
            res.status(201).json({
                status: "success",
                message: "Category created successfully",
                data: category,
            });
        }
    );

    public static updateCategory = asyncHandler(
        async (
            req: Request<{ categoryId: string }>,
            res: Response,
            next: NextFunction
        ) => {
            const category = await CategoriesService.updateOne(
                req.params.categoryId,
                req.body.name
            );
            res.status(200).json({
                status: "success",
                message: "Category updated successfully",
                data: category,
            });
        }
    );

    public static deleteCategories = asyncHandler(
        async (
            req: Request<any, any, { ids: string[] }>,
            res: Response,
            next: NextFunction
        ) => {
            await CategoriesService.deleteMany(req.body.ids);
            res.status(204).json({
                status: "success",
                message: "Categories deleted successfully",
            });
        }
    );

    public static fetchCategories = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            const categories = await CategoriesService.getCategories();
            res.status(200).json({
                status: "success",
                message: "Categories fetched successfully",
                length: categories.length,
                data: categories,
            });
        }
    );

    public static fetchCategory = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            const category = await CategoriesService.getOne(
                req.params.categoryId
            );
            res.status(200).json({
                status: "success",
                message: "Category fetched successfully",
                data: category,
            });
        }
    );
}

export default CategoriesController;
export { CategoriesController };
