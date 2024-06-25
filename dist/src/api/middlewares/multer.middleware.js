"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MulterService = void 0;
const multer_1 = __importDefault(require("multer"));
class MulterService {
    constructor() { }
    static getMulter() {
        if (!this.multerInstance) {
            this.multerInstance = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
        }
        return this.multerInstance;
    }
    /**
     * It populate text fields to req.body and files to req.files
     */
    static getNoneMethod() {
        return MulterService.getMulter().none();
    }
    static multipleFiles(fieldName, maxCount = 4) {
        return MulterService.getMulter().array(fieldName, maxCount);
    }
}
exports.MulterService = MulterService;
exports.default = MulterService;
//# sourceMappingURL=multer.middleware.js.map