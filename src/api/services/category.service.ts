import { AppError } from "../../utils";
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
                    select: {
                        id: true,
                        name: true,
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
                    select: {
                        id: true,
                        name: true,
                        updatedAt: true,
                    },
                });
            return category;
        } catch (err) {
            throw new AppError("Category not found", 404);
        }
    }

    public static async deleteMany(ids: string[]) {
        try {
            const categories =
                await DatabaseManager.getInstance().category.deleteMany({
                    where: {
                        id: {
                            in: ids,
                        },
                    },
                });
            return categories;
        } catch (err) {
            throw err;
        }
    }

    public static async getCategories(): Promise<ICategory[]> {
        const categories =
            await DatabaseManager.getInstance().category.findMany({
                select: {
                    id: true,
                    name: true,
                },
            });

        return categories;
    }

    public static async getOne(categoryId: string) {
        const category =
            await DatabaseManager.getInstance().category.findUnique({
                where: {
                    id: categoryId,
                },
                select: {
                    id: true,
                    name: true,
                    Product: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                            description: true,
                            countInStock: true,
                            images: true,
                            // TODO
                            /*
                                aggregate over ratings for each product 
                                and return average rating and number of ratings 
                            */
                        },
                    },
                },
            });

        if (!category) {
            throw new AppError("Category not found", 404);
        }

        return category;
    }
}

export default CategoriesService;
export { CategoriesService };
