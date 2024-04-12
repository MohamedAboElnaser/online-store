//main router

import { Router } from "express";

const mainRouter = Router();

mainRouter.get("/api", (req, res) => {
    res.json({
        message: "api is working 🚀🚀",
    });
});
export default mainRouter;
export { mainRouter };
