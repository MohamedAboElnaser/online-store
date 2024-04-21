import { Router } from "express";
import { authRouter } from "./auth.rout";
import { categoriesRouter } from "./categories.rout";

const v1Router = Router();

v1Router.use("/auth", authRouter);
v1Router.use("/categories", categoriesRouter);

export default v1Router;
