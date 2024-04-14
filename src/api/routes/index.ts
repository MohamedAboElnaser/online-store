import { Router } from "express";
import v1Router from "./v1";
const mainRouter = Router();

mainRouter.get("/api", (req, res) => {
    res.json({
        message: "api is working 🚀🚀",
    });
});

//mount v1 router
mainRouter.use("/api/v1", v1Router);

export default mainRouter;
export { mainRouter };
