declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: "development" | "test" | "production";
        PORT: string;
        DATABASE_DEV_URL: string;
        DATABASE_TEST_URL: string;
        DATABASE_PROD_URL: string;
        EMAIL_HOST: string;
        EMAIL_PORT: string;
        EMAIL_USER: string;
        EMAIL_PASSWORD: string;
        SendinBlue_HOST: string;
        SendinBlue_PORT: string;
        SendinBlue_USER: string;
        SendinBlue_PASSWORD: string;
        EMAIL_FROM: string;
        JWT_SECRET: string;
        JWT_VALIDITY: string;
    }
}
