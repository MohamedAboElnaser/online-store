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
const orderItemsEndpoints = [
    {
        method: "PATCH",
        target: "params",
        schema: joi
            .object({
            orderId: joi.string().guid({ version: "uuidv4" }).required(),
            itemId: joi.string().guid({ version: "uuidv4" }).required(),
        })
            .prefs({ abortEarly: false, stripUnknown: true }),
    },
    {
        method: "PATCH",
        target: "body",
        schema: joi
            .object({
            quantity: joi.number().min(1).required(),
        })
            .prefs({ abortEarly: false, stripUnknown: true }),
    },
    {
        method: "DELETE",
        target: "params",
        schema: joi
            .object({
            orderId: joi.string().guid({ version: "uuidv4" }).required(),
            itemId: joi.string().guid({ version: "uuidv4" }).required(),
        })
            .prefs({ abortEarly: false, stripUnknown: true }),
    },
];
const endpoints = {
    "/:id": orderItemsEndpoints,
};
exports.default = endpoints;
//# sourceMappingURL=orderItems.schema.js.map