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
exports.paymentsRouter = void 0;
const express_1 = __importStar(require("express"));
const middlewares_1 = require("../../middlewares");
const schemas_1 = require("../../../validation/schemas");
const controllers_1 = require("../../controllers");
exports.paymentsRouter = (0, express_1.Router)();
exports.paymentsRouter.post("/create-checkout-session", middlewares_1.AuthHandler.authenticate, middlewares_1.AuthHandler.authorize("CUSTOMER"), (0, middlewares_1.validator)(schemas_1.paymentSchemas), controllers_1.PaymentController.createCheckoutSession);
exports.paymentsRouter.post("/webhooks", express_1.default.raw({ type: "application/json" }), controllers_1.PaymentController.webhook);
exports.paymentsRouter.get("/success", (req, res) => {
    res.status(200).json({
        message: "Payment done successfully ✅, Check your email for the receipt",
    });
});
exports.paymentsRouter.get("/cancel", (req, res) => {
    res.status(200).json({
        message: "Payment was canceled ❌, Please try again",
    });
});
//# sourceMappingURL=payment.rout.js.map