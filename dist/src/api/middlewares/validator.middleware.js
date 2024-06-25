"use strict";
/**
 * These functions was originally created by my Bro @m7moudGadallah
 */
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
exports.validator = void 0;
const internal_utils_1 = require("../../utils/internal-utils");
function normalizeURLPath(path) {
    // Replace UUID with :id
    let normalizedPath = path.replace(/\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\b/g, "/:id");
    // Remove trailing slashes
    normalizedPath = normalizedPath.replace(/\/+$/, "");
    // return / if the path is empty
    return normalizedPath === "" ? "/" : normalizedPath;
}
function validator(validationSchema) {
    return (0, internal_utils_1.asyncHandler)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
        // Normalize the URL path
        const endpoint = normalizeURLPath(req.path);
        // Get the schema for the endpoint
        const schemas = validationSchema[endpoint];
        if (!schemas || !schemas.length)
            return next();
        // Validate the request
        for (let _schema of schemas) {
            const { method, target, schema } = _schema;
            //continue if the method is not the same
            if (req.method !== method)
                continue;
            //validate the request
            const { error, value } = schema.validate(req[target]);
            if (error) {
                let errMessage = error.details
                    .map((err) => err.message.replace(/"/g, ""))
                    .join(",");
                // console.log(errMessage);
                return next(new internal_utils_1.AppError(errMessage, 400));
            }
            req[target] = value;
        }
        next();
    }));
}
exports.validator = validator;
//# sourceMappingURL=validator.middleware.js.map