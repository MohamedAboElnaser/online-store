import { ISessionOrder } from "sessionOrder";
import Stripe from "stripe";

export class StripeService {
    private static instance: StripeService;
    private stripe: Stripe;

    private constructor() {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    }

    public static getInstance(): StripeService {
        if (!StripeService.instance) {
            StripeService.instance = new StripeService();
        }
        return StripeService.instance;
    }

    public async createCheckoutSession(
        order: ISessionOrder,
        success_url: string,
        cancel_url: string
    ) {
        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            customer_email: order.email,
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: order.name,
                        },
                        unit_amount: order.price * 100,
                    },
                    quantity: order?.quantity || 1,
                },
            ],
            mode: "payment",
            success_url: this.getServerUrl(success_url),
            cancel_url: this.getServerUrl(cancel_url),
        });
        return session;
    }

    private getServerUrl(url: string): string {
        return `${
            process.env.NODE_ENV !== "production"
                ? process.env.DEV_SERVER_URL
                : process.env.PROD_SERVER_URL
        }/${url}`;
    }
}
