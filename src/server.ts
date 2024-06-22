import { Server } from "http";
import app from "./app";
import { DatabaseManager } from "../config";

process.on("SIGINT", async () => {
    await DatabaseManager.disconnect();
    console.log("Server shutting down gracefully...");
    process.exit(0); // exit with success
});

const server = new Server(app);

server.listen(process.env.PORT || 3000, () => {
    console.log(
        `Server is running at ${process.env.NODE_ENV} mode at port ${process.env.PORT} 🚀`
    );
});
