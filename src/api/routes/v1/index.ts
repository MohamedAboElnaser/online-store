import { Router } from "express";
import { authRouter } from "./auth.rout";
import { categoriesRouter } from "./categories.rout";
import { productsRouter } from "./products.rout";
import { wishListRouter } from "./wishList.rout";

const v1Router = Router();

v1Router.use("/auth", authRouter);
v1Router.use("/categories", categoriesRouter);
v1Router.use("/products", productsRouter);
v1Router.use("/wishlists", wishListRouter);

export default v1Router;
