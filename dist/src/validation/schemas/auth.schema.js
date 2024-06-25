"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi = __importStar(require("joi"));
const registerSchema = [
    {
        method: "POST",
        schema: joi
            .object({
            email: joi.string().email().required(),
            password: joi.string().min(8).required(),
            firstName: joi.string().required().min(3),
            lastName: joi.string().min(3).optional(),
        })
            .prefs({ abortEarly: false, stripUnknown: true }),
        target: "body",
    },
];
const verifyAccountSchema = [
    {
        method: "POST",
        target: "body",
        schema: joi
            .object({
            otp: joi.number().integer().min(100000).max(999999).required(),
        })
            .prefs({ abortEarly: false, stripUnknown: true }),
    },
];
const resendOTPSchema = [
    {
        method: "POST",
        target: "body",
        schema: joi
            .object({
            email: joi.string().email().required(),
        })
            .prefs({ abortEarly: false, stripUnknown: true }),
    },
];
const loginSchema = [
    {
        method: "POST",
        schema: joi
            .object({
            email: joi.string().email().required(),
            password: joi.string().min(8).required(),
        })
            .prefs({ abortEarly: false, stripUnknown: true }),
        target: "body",
    },
];
const endpoints = {
    "/register": registerSchema,
    "/verify-account": verifyAccountSchema,
    "/resend-otp": resendOTPSchema,
    "/login": loginSchema,
};
exports.default = endpoints;
//# sourceMappingURL=auth.schema.js.map