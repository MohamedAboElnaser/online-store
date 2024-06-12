import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../utils/internal-utils";
import { CategoriesService } from "../services";

class CategoriesController {
    private constructor() {}
    /**
     * @access private - only accessible to Admin users
     * @route POST /api/v1/categories
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
    /**
     * @access private - only accessible to Admin users
     * @route PATCH /api/v1/categories/:categoryId
     */
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
    /**
     * @access private - only accessible to Admin users
     * @route DELETE /api/v1/categories
     */
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

    /**
     * @route GET /api/v1/categories
     * @access public
     */
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

    /**
     * @route GET /api/v1/categories/:categoryId
     * @access public
     */
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
