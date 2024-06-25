"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const passport_1 = __importDefault(require("passport"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cloudinary_1 = require("cloudinary");
const routes_1 = require("./api/routes");
const middlewares_1 = require("./api/middlewares");
const utils_1 = require("./utils");
const config_1 = require("../config");
//load env variables
dotenv_1.default.config();
// Configuring cloudinary
cloudinary_1.v2.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
});
const app = (0, express_1.default)();
//configure passport middleware
(0, config_1.passportConfig)(passport_1.default);
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(passport_1.default.initialize());
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield config_1.DatabaseManager.getInstance().$connect();
    console.log(`connected to ${config_1.DatabaseManager.getDatabaseName()} DB 🛢️`);
}))();
if (!(process.env.NODE_ENV === "production"))
    app.use((0, morgan_1.default)("dev"));
app.get("/", (req, res) => {
    res.json({
        message: "Server is  up and running!",
    });
});
// mount main router
app.use(routes_1.mainRouter);
//unhandled routes
app.use("*", (req, res, next) => {
    next(new utils_1.AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
//error handling middleware
app.use(middlewares_1.globalErrorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map