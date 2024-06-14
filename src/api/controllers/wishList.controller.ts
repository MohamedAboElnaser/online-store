import { Request, Response, NextFunction } from "express";
import { asyncHandler, } from "../../utils";
import { WishListService } from "../services";
import { IUser } from "user";

class WishListController {
    private constructor() {}

    public static AddToWishList = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {

            const { id: customerId } = req.user as IUser;
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
            // @ts-ignore
            const { id: customerId } = req.user;

            const wishListItems = await WishListService.fetchWishList(
                customerId
            );
            res.status(200).json({
                message: "Wishlist Items fetched successfully",
                data: wishListItems,
            });
        }
    );

    public static removeFromWishList = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            await WishListService.removeWishListItems(req.body.ids);

            res.status(204).json({
                message: "Items removed from wishlist successfully",
            });
        }
    );
}

export { WishListController };
export default WishListController;
