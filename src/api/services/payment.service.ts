import { IUser } from "user";

export class PaymentService {
    private constructor() {}

    public static async createCheckoutSession(
        customer: IUser,
        orderId: string
    ): Promise<string> {
        console.log('User object=>', customer);
        console.log('Order Id=>', orderId);
        return "Valid payment url";
    }
}

export default PaymentService;