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

}

export default CategoriesService;
