/**
 * These functions was originally created by my Bro @m7moudGadallah
 */

import { Request, Response, NextFunction } from "express";
import { AppError, asyncHandler } from "../../utils";
import { TValidationSchema } from "validationSchema";

function normalizeURLPath(path: string): string {
    // Replace UUID with :id
    let normalizedPath = path.replace(
        /\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\b/g,
        "/:id"
    );

    // Remove trailing slashes
    normalizedPath = normalizedPath.replace(/\/+$/, "");

    // return / if the path is empty
    return normalizedPath === "" ? "/" : normalizedPath;
}

export function validator(validationSchema: TValidationSchema) {
    return asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            // Normalize the URL path
            const endpoint = normalizeURLPath(req.path);

            // Get the schema for the endpoint
            const schemas = validationSchema[endpoint];
            if (!schemas || !schemas.length) return next();

            // Validate the request
            for (let _schema of schemas) {
                const { method, target, schema } = _schema;

                //continue if the method is not the same
                if (req.method !== method) continue;

                //validate the request
                const { error, value } = schema.validate(req[target]);
                if (error) {
                    let errMessage = error.details
                        .map((err) => err.message.replace(/"/g, ""))
                        .join(",");
                    // console.log(errMessage);
                    return next(new AppError(errMessage, 400));
                }
                req[target] = value;
            }
            next();
        }
    );
}
