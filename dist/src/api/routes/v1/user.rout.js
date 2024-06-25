"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const middlewares_1 = require("../../middlewares");
const schemas_1 = require("../../../validation/schemas");
exports.userRouter = (0, express_1.Router)();
exports.userRouter
    .route("/me")
    .get(middlewares_1.AuthHandler.authenticate, controllers_1.UsersController.getUser)
    .patch(middlewares_1.AuthHandler.authenticate, middlewares_1.MulterService.multipleFiles('photo', 1), (0, middlewares_1.validator)(schemas_1.userSchemas), controllers_1.UsersController.updateUser);
//# sourceMappingURL=user.rout.js.map