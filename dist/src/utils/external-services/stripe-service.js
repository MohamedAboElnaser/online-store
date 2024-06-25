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
exports.StripeService = void 0;
const stripe_1 = __importDefault(require("stripe"));
class StripeService {
    constructor() {
        this.stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
    }
    static getInstance() {
        if (!StripeService.instance) {
            StripeService.instance = new StripeService();
        }
        return StripeService.instance;
    }
    createCheckoutSession(order, success_url, cancel_url) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield this.stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                customer_email: order.email,
                client_reference_id: order.orderId,
                line_items: order.items.map((item) => ({
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: item.name,
                        },
                        unit_amount: item.unitePrice * 100,
                    },
                    quantity: item.quantity,
                })),
                mode: "payment",
                success_url: this.getServerUrl(success_url),
                cancel_url: this.getServerUrl(cancel_url),
            });
            return session;
        });
    }
    getServerUrl(url) {
        return `${process.env.NODE_ENV !== "production"
            ? process.env.DEV_SERVER_URL
            : process.env.PROD_SERVER_URL}/${url}`;
    }
}
exports.StripeService = StripeService;
//# sourceMappingURL=stripe-service.js.map