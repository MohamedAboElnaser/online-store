import { AppError } from "../../util";
import { DatabaseManager } from "../../../config";
import { ICategory } from "category";

class CategoriesService {
    private constructor() {}

    public static async createOne(categoryName: string): Promise<ICategory> {
        try {
            const category =
                await DatabaseManager.getInstance().category.create({
                    data: {
                        name: categoryName,
                    },
                });
            return category;
        } catch (err) {
            throw err;
        }
    }

    public static async updateOne(
        categoryId: string,
        name: string
    ): Promise<ICategory> {
        try {
            const category =
                await DatabaseManager.getInstance().category.update({
                    where: {
                        id: categoryId,
                    },
                    data: {
                        name: name,
                    },
                });
            return category;
        } catch (err) {
            throw new AppError("Category not found", 404);
        }
    }
}

export default CategoriesService;
