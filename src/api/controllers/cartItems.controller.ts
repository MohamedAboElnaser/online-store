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
                Cart: [{ id: cartId }],
            } = req.user as IUser;
            const { productId, quantity } = req.body;
            const cartItem = await CartItemsService.addItemToCart(
                cartId,
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
        async (
            req: Request<{ id: string }, any, { quantity: number }>,
            res: Response,
            next: NextFunction
        ) => {
            const { id: cartItemId } = req.params;
            const { quantity } = req.body;
            const updatedItem = await CartItemsService.updateItemInCart(
                cartItemId,
                quantity
            );

            res.status(200).json({
                status: "success",
                message: "Item updated in cart",
                data: {
                    updatedItem,
                },
            });
        }
    );

    public static fetchItems = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            const {
                Cart: [{ id: cartId }],
            } = req.user as IUser;
            const cartItems = await CartItemsService.fetchCartItems(cartId);
            res.status(200).json({
                status: "success",
                message: "Cart items fetched successfully",
                length: cartItems.length,
                data: {
                    cartItems,
                },
            });
        }
    );

    public static deleteItems = asyncHandler(
        async (
            req: Request<any, any, { ids: string[] }>,
            res: Response,
            next: NextFunction
        ) => {
            const { ids } = req.body;
            const {
                Cart: [{ id: cartId }],
            } = req.user as IUser;
            await CartItemsService.removeItemsFromCart(cartId, ids);

            res.status(204).json({
                status: "success",
                message: "Items removed from cart",
            });

            // notImplementedHandler(req, res);
        }
    );
}

export default CartItemsController;
export { CartItemsController };
