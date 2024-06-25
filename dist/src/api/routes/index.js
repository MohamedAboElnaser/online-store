"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = require("express");
const v1_1 = __importDefault(require("./v1"));
const mainRouter = (0, express_1.Router)();
exports.mainRouter = mainRouter;
mainRouter.get("/api", (req, res) => {
    res.json({
        message: "api is working 🚀🚀",
    });
});
//mount v1 router
mainRouter.use("/api/v1", v1_1.default);
exports.default = mainRouter;
//# sourceMappingURL=index.js.map