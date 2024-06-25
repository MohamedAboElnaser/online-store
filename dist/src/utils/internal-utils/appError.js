"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;
        //for future reading
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
exports.default = AppError;
//# sourceMappingURL=appError.js.map