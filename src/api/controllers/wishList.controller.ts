import { Request, Response, NextFunction } from "express";
import { asyncHandler, notImplementedHandler } from "../../utils";
import { WishListService } from "../services";

class WishListController {
    private constructor() {}

    public static AddToWishList = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            // BUG
            /*
                ts complains about req.user.id 
                although it is defined in src/types/request-user.d.ts 😲
                and  when i log the req object , i find the user object with id property
            */
            // @ts-ignore
            const { id: customerId } = req.user;
            const { productId } = req.body;

            const wishListItem = await WishListService.addToWishList(
                customerId,
                productId
            );
            res.status(201).json({
                message: "Product added successfully to your wishlist",
                data: wishListItem,
            });
        }
    );

    public static fetchWishList = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            notImplementedHandler(req, res);
        }
    );

    public static removeFromWishList = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            notImplementedHandler(req, res);
        }
    );
}

export { WishListController };
export default WishListController;
