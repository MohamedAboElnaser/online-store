"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const developmentError = (err, req, res) => {
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        errStack: err.stack,
    });
};
const productionError = (err, req, res) => {
    //trusted error: send message to the client
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
    //programming or other unknown error: don't leak error details
    console.error("UnKnown error happen💥💥 :", err);
    res.status(500).json({
        status: "error",
        message: "Something went very wrong!",
    });
};
const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    // custom multer error
    if (err.name === "MulterError") {
        err.statusCode = 400;
        err.isOperational = true;
        err.message = `Invalid field name or file count, please check the field name and the number of files you are sending.`;
    }
    if (process.env.NODE_ENV === "production")
        productionError(err, req, res);
    else
        developmentError(err, req, res);
};
exports.globalErrorHandler = globalErrorHandler;
exports.default = globalErrorHandler;
//# sourceMappingURL=errorHandler.middleware.js.map