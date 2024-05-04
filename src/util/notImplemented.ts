import { Request, Response } from "express";

export function notImplementedHandler(req:Request,res:Response){
    res.status(501).json({
        message: "Not Implemented Yet",
    });
}