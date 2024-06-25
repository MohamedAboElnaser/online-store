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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const services_1 = require("../services");
class AuthController {
    constructor() { }
}
_a = AuthController;
AuthController.register = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, firstName, lastName } = req.body;
    const otp = yield services_1.AuthService.register(email, password, firstName, lastName);
    res.json({
        status: "success",
        message: `User registered successfully. Check the confirmation otp code at ${email}`,
        otp: process.env.NODE_ENV != "production" ? otp : undefined,
    });
}));
AuthController.verifyAccount = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp } = req.body;
    yield services_1.AuthService.verify(otp);
    res.json({
        status: "success",
        message: "Account verified successfully, You can login now.",
    });
}));
AuthController.resendOTP = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const otp = yield services_1.AuthService.regenerateOTP(email);
    res.json({
        status: "success",
        message: `Check the confirmation otp code at ${email}`,
        otp: process.env.NODE_ENV != "production" ? otp : undefined,
    });
}));
AuthController.login = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const token = yield services_1.AuthService.login(email, password);
    //attach token to the response cookie
    res.cookie("jwt", token, {
        expires: new Date(Date.now() + Number(process.env.COOKIE_EXPIRES_IN)),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });
    res.json({
        status: "success",
        message: "You login successfully 🔓",
        token,
    });
}));
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map