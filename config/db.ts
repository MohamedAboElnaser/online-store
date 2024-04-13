import { PrismaClient } from "@prisma/client";

class DatabaseManager {
    private static prisma: PrismaClient;

    private constructor() {}

    public static getInstance(db_URL?: string): PrismaClient {
        db_URL = db_URL ? db_URL : DatabaseManager.getDatabaseURL();
        if (!DatabaseManager.prisma) {
            try {
                DatabaseManager.prisma = new PrismaClient({
                    datasources: {
                        db: {
                            url: db_URL,
                        },
                    },
                });
            } catch (error) {
                console.error(
                    "Error while initializing Prisma Client: ",
                    error
                );
                throw error;
            }
        }

        return DatabaseManager.prisma;
    }

    public static getDatabaseURL(): string {
        let databaseURL: string;

        const { NODE_ENV } = process.env;

        if (NODE_ENV === "development") {
            databaseURL = process.env?.DATABASE_DEV_URL;
        } else if (NODE_ENV === "test") {
            databaseURL = process.env?.DATABASE_TEST_URL;
        } else if (NODE_ENV === "production") {
            databaseURL = process.env?.DATABASE_PROD_URL;
        }
        return databaseURL;
    }

    public static getDatabaseName(): string | undefined {
        return DatabaseManager.getDatabaseURL()?.split("/")?.pop();
    }

    public static async disconnect(): Promise<void> {
        await DatabaseManager?.prisma.$disconnect();
    }
}
export { DatabaseManager };
