import { Router } from "express";
import { authRouter } from "./auth.rout";
import { categoriesRouter } from "./categories.rout";
import { productsRouter } from "./products.rout";
import { wishListRouter } from "./wishList.rout";
import { CartItemsRouter } from "./cartItems.rout";
import { ordersRouter } from "./orders.rout";

const v1Router = Router();

v1Router.use("/auth", authRouter);
v1Router.use("/categories", categoriesRouter);
v1Router.use("/products", productsRouter);
v1Router.use("/wishlists", wishListRouter);
v1Router.use("/cart/items", CartItemsRouter);
v1Router.use("/orders", ordersRouter);

export default v1Router;
