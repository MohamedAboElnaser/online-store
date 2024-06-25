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
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const config_1 = require("../../../config");
class UsersService {
    static updateUserData(id, data, imagesFiles) {
        return __awaiter(this, void 0, void 0, function* () {
            // update userPhoto if exist
            let photo;
            if (imagesFiles) {
                photo = yield utils_1.CloudStorageService.uploadFiles(imagesFiles, `users/${id}`);
            }
            const updatedUserRecord = yield config_1.DatabaseManager.getInstance().user.update({
                where: {
                    id,
                },
                data: {
                    firstName: data === null || data === void 0 ? void 0 : data.firstName,
                    lastName: data === null || data === void 0 ? void 0 : data.lastName,
                    email: data === null || data === void 0 ? void 0 : data.email,
                    photo: photo ? photo[0] : undefined,
                },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    photo: true,
                    updatedAt: true,
                },
            });
            return updatedUserRecord;
        });
    }
}
exports.default = UsersService;
//# sourceMappingURL=user.service.js.map