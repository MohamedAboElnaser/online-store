"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const middlewares_1 = require("../../middlewares");
const schemas_1 = require("../../../validation/schemas");
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
authRouter
    .route("/register")
    .post(middlewares_1.MulterService.getNoneMethod(), (0, middlewares_1.validator)(schemas_1.authSchemas), controllers_1.AuthController.register);
authRouter
    .route("/verify-account")
    .post(middlewares_1.MulterService.getNoneMethod(), (0, middlewares_1.validator)(schemas_1.authSchemas), controllers_1.AuthController.verifyAccount);
authRouter
    .route("/resend-otp")
    .post(middlewares_1.MulterService.getNoneMethod(), (0, middlewares_1.validator)(schemas_1.authSchemas), controllers_1.AuthController.resendOTP);
authRouter
    .route("/login")
    .post(middlewares_1.MulterService.getNoneMethod(), (0, middlewares_1.validator)(schemas_1.authSchemas), controllers_1.AuthController.login);
//# sourceMappingURL=auth.rout.js.map