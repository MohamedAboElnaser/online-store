declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: "development" | "testing" | "production";
        PORT: string;
        // Add other environment variables here
    }
}
