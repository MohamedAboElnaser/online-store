"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const internal_utils_1 = require("../../utils/internal-utils");
class AuthHandler {
    constructor() { }
}
// Custom middleware for handling JWT authentication
AuthHandler.authenticate = (req, res, next) => {
    passport_1.default.authenticate("jwt", { session: false }, (err, user) => {
        if (err || !user) {
            return next(new internal_utils_1.AppError(" Unauthorized access! 🚫🛑 Please login to continue.", 401));
        }
        // Authentication successful, attach user to request object
        req.user = user;
        next();
    })(req, res, next); //
};
AuthHandler.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new internal_utils_1.AppError("You do not have permission to perform this action", 403));
        }
        next();
    };
};
exports.default = AuthHandler;
//# sourceMappingURL=auth.middleware.js.map