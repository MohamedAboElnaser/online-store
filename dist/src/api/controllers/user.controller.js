"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const services_1 = require("../services");
class UsersController {
    constructor() { }
}
_a = UsersController;
UsersController.getUser = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    res.status(200).json({
        status: "success",
        message: "User Record retrieved successfully",
        data: {
            user,
        },
    });
}));
UsersController.updateUser = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const updatedUserRecord = yield services_1.UsersService.updateUserData(id, req.body, req.files);
    res.status(200).json({
        status: "success",
        message: "User Record updated successfully",
        data: {
            user: updatedUserRecord,
        },
    });
}));
exports.default = UsersController;
//# sourceMappingURL=user.controller.js.map