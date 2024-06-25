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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const stripe_1 = __importDefault(require("stripe"));
const services_1 = require("../services");
class PaymentController {
    constructor() { }
}
_a = PaymentController;
PaymentController.createCheckoutSession = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.body;
    const paymentUrl = yield services_1.PaymentService.createCheckoutSession(req.user, orderId);
    res.status(200).json({
        status: "success",
        message: "Payment session created successfully",
        data: {
            paymentUrl,
        },
    });
}));
PaymentController.webhook = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const signature = req.headers["stripe-signature"];
    let event;
    try {
        event = stripe_1.default.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);
    }
    catch (err) {
        throw new utils_1.AppError("Error happen while constructing the webhook event", 400);
    }
    if (event.type === "checkout.session.completed")
        console.log("webhook endpoint works fine");
    console.log("event.data.object", event.data.object);
    res.status(200).json({ received: true });
}));
exports.default = PaymentController;
//# sourceMappingURL=payment.controller.js.map