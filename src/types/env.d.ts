declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: "development" | "test" | "production";
        PORT: string;
        DATABASE_DEV_URL: string;
        DATABASE_TEST_URL: string;
        DATABASE_PROD_URL: string;
    }
}
