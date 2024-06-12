import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import passport from "passport";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import { mainRouter } from "./api/routes";
import { globalErrorHandler } from "./api/middlewares";
import {  AppError } from "./utils";
import { DatabaseManager, passportConfig } from "../config";

//load env variables
dotenv.config();

// Configuring cloudinary
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
});
const app: Express = express();

//configure passport middleware
passportConfig(passport);

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

(async () => {
    await DatabaseManager.getInstance().$connect();
    console.log(`connected to ${DatabaseManager.getDatabaseName()} DB 🛢️`);
})();

if (!(process.env.NODE_ENV === "production")) app.use(morgan("dev"));

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
