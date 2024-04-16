import { Router } from "express";
import v1Router from "./v1";
const mainRouter = Router();
import passport from "passport";
mainRouter.get("/api", (req, res) => {
    res.json({
        message: "api is working 🚀🚀",
    });
});

//mount v1 router
mainRouter.use("/api/v1", v1Router);
//protected rout
mainRouter.get(
    "/protect",
    passport.authenticate("jwt", { session: false }),
    (req, res) =>
        res.json({
            status: "success",
            message: "You are authenticated",
            user: req.user,
        })
);
export default mainRouter;
export { mainRouter };
