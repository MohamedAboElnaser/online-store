import { Server } from "http";
import app from "./app";

process.on("SIGINT", () => {
    console.log("Server shutting down gracefully...");
    process.exit(0); // exit with success
});

const server = new Server(app);

server.listen(3000, () => {
    console.log(
        `Server is running at ${process.env.NODE_ENV} mode at port ${process.env.PORT} 🚀`
    );
});
