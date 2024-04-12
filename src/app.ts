import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { mainRouter } from "./api/routes";
import { globalErrorHandler } from "./api/middlewares"
import { AppError } from "./util";

const app: Express = express();

dotenv.config();
if (!(process.env.NODE_ENV === "production")) app.use(morgan("dev"));

app.use(express.json());
app.get("/", (req, res) => {
    res.json({
        message: "Server is  up and running!",
    });
});

// mount main router
app.use(mainRouter);

//unhandled routes
app.use("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//error handling middleware
app.use(globalErrorHandler);

export default app;
