import { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/internal-utils";

const developmentError = (err: AppError, req: Request, res: Response) => {
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        errStack: err.stack,
    });
};

const productionError = (err: AppError, req: Request, res: Response) => {
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

const globalErrorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    // custom multer error
    if (err.name === "MulterError") {
        err.statusCode = 400;
        err.isOperational = true;
        err.message = `Invalid field name or file count, please check the field name and the number of files you are sending.`;
    }
    if (process.env.NODE_ENV === "production") productionError(err, req, res);
    else developmentError(err, req, res);
};

export default globalErrorHandler;
export { globalErrorHandler };
