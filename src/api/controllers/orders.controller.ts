import { asyncHandler, notImplementedHandler } from "../../utils";

class OrderController {
    private constructor() {}

    public static createOrder = asyncHandler(async (req, res, next) => {
        notImplementedHandler(req, res);
    });
}

export default OrderController;
