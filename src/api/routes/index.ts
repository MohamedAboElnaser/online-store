import { Router } from "express";
import v1Router from "./v1";
import { AuthHandler } from "../middlewares";
const mainRouter = Router();

mainRouter.get("/api", (req, res) => {
    res.json({
        message: "api is working 🚀🚀",
    });
});

//mount v1 router
mainRouter.use("/api/v1", v1Router);

// Protected route
mainRouter.get("/protect", AuthHandler.authenticate, (req, res) => {
    res.json({
        status: "success",
        message: "You are authenticated",
        user: req.user,
    });
});
mainRouter.get(
    "/protect-admin",
    AuthHandler.authenticate,
    AuthHandler.authorize("CUSTOMER"),
    (req, res) => {
        res.json({
            status: "success",
            message: "You are authenticated",
        });
    }
);

export default mainRouter;
export { mainRouter };
