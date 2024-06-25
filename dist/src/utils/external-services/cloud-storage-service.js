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
exports.CloudStorageService = void 0;
const cloudinary_1 = require("cloudinary");
const internal_utils_1 = require("../internal-utils");
class CloudStorageService {
    constructor() { }
    static uploadFiles(files, folderName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // upload images to cloud storage
                const promises = files.map((file, idx) => {
                    return new Promise((resolve, reject) => {
                        cloudinary_1.v2.uploader
                            .upload_stream({
                            folder: `${folderName}`,
                            public_id: `0${idx}`,
                        }, (error, result) => {
                            if (error) {
                                reject(error);
                            }
                            else {
                                resolve(result.secure_url);
                            }
                        })
                            .end(file.buffer);
                    });
                });
                const filesURLs = yield Promise.all(promises);
                return filesURLs;
            }
            catch (err) {
                throw new internal_utils_1.AppError("Error occurred while saving images to cloud storage", 500);
            }
        });
    }
    static deleteFolder(folderName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield cloudinary_1.v2.api.delete_resources_by_prefix(folderName);
                // console.log("Response from delete operation==>", res);
            }
            catch (err) {
                throw new internal_utils_1.AppError("Error occurred while deleting files", 500);
            }
        });
    }
}
exports.CloudStorageService = CloudStorageService;
exports.default = CloudStorageService;
//# sourceMappingURL=cloud-storage-service.js.map