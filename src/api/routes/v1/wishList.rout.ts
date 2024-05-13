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
        validator(wishlistSchemas),
        WishListController.AddToWishList
    )
    .get(
        AuthHandler.authenticate,
        AuthHandler.authorize("CUSTOMER"),
        WishListController.fetchWishList
    );

export default wishListRouter;
export { wishListRouter };
