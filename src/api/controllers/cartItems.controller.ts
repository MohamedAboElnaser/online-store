import { Request, Response, NextFunction } from "express";
import { asyncHandler, notImplementedHandler } from "../../utils";
import { CartItemsService } from "../services";
import { IUser } from "user";

class CartItemsController {
    private constructor() {}
    public static addItem = asyncHandler(
        async (
            req: Request<any, any, { productId: string; quantity?: number }>,
            res: Response,
            next: NextFunction
        ) => {
            // console.log('req.user.Cart', (req.user as IUser).Cart[0]);
            const {
                id: customerId,
                Cart: [{ id: cartId }],
            } = req.user as IUser;
            const { productId, quantity } = req.body;
            const cartItem = await CartItemsService.addItemToCart(
                cartId,
                customerId,
                productId,
                quantity
            );
            res.status(201).json({
                status: "success",
                message: "Item added to cart",
                data: {
                    cartItem,
                },
            });
            // notImplementedHandler(req, res);
        }
    );

    public static updateItem = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            notImplementedHandler(req, res);
        }
    );

    public static fetchItems = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            notImplementedHandler(req, res);
        }
    );

    public static deleteItems = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            notImplementedHandler(req, res);
        }
    );
}

export default CartItemsController;
export { CartItemsController };
