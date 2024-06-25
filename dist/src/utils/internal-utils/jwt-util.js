"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTUtil = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWTUtil {
    constructor() { }
    static issueJWT(id) {
        const payload = {
            id,
            iat: Date.now(),
        };
        const validFor = process.env.JWT_VALIDITY;
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
            expiresIn: validFor,
            algorithm: "HS256",
        });
        return token;
    }
}
exports.JWTUtil = JWTUtil;
exports.default = JWTUtil;
//# sourceMappingURL=jwt-util.js.map