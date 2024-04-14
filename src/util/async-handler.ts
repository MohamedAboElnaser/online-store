import { Request, Response, NextFunction } from "express";

function asyncHandler(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
    return function (req: Request, res: Response, next: NextFunction) {
        fn(req, res, next).catch(next);
    };
}

export default asyncHandler;
export { asyncHandler };