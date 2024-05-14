import { Router } from "express";
import { WishListController } from "../../controllers";
import { validator, AuthHandler, MulterService } from "../../middlewares";
import { wishlistSchemas } from "../../../validation/schemas";

const wishListRouter = Router();

wishListRouter
    .route("/")
    .post(
        AuthHandler.authenticate,
        AuthHandler.authorize("CUSTOMER"),
        MulterService.getNoneMethod(),
        validator(wishlistSchemas),
        WishListController.AddToWishList
    )
    .get(
        AuthHandler.authenticate,
        AuthHandler.authorize("CUSTOMER"),
        MulterService.getNoneMethod(),
        WishListController.fetchWishList
    )
    .delete(
        AuthHandler.authenticate,
        AuthHandler.authorize("CUSTOMER"),
        MulterService.getNoneMethod(),
        validator(wishlistSchemas),
        WishListController.removeFromWishList
    );

export default wishListRouter;
export { wishListRouter };
