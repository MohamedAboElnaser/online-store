"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi = __importStar(require("joi"));
const slashSchemas = [
    {
        method: "POST",
        target: "body",
        schema: joi
            .object({
            name: joi.string().min(3).required(),
            description: joi.string().min(3).required(),
            price: joi.number().required(),
            countInStock: joi.number().required(),
            categoryId: joi.string().guid({ version: "uuidv4" }).required(),
        })
            .prefs({ abortEarly: false, stripUnknown: true }),
    },
    {
        method: "POST",
        target: "files",
        schema: joi
            .array()
            .items(joi.object({
            fieldname: joi.string().required(),
            originalname: joi.string().required(),
            encoding: joi.string().required(),
            mimetype: joi.string().required(),
            buffer: joi.binary().required(),
        }))
            .min(1)
            .required()
            .messages({
            "array.min": "At least one image file is required",
        })
            .prefs({ abortEarly: false, stripUnknown: true }),
    },
    {
        method: "DELETE",
        target: "body",
        schema: joi
            .object({
            ids: joi
                .array()
                .items(joi.string().guid({ version: "uuidv4" }))
                .required(),
        })
            .prefs({ abortEarly: false, stripUnknown: true }),
    },
    {
        method: "GET",
        target: "query",
        schema: joi
            .object({
            page: joi.number().min(1).optional(),
            limit: joi.number().min(1).optional(),
            price_min: joi.number().min(1).optional(),
            price_max: joi.number().optional(),
        })
            .custom((value, helpers) => {
            if (value.page && !value.limit) {
                return helpers.error("limit.page");
            }
            if (value.limit && !value.page) {
                return helpers.error("limit.page");
            }
            if (value.price_min &&
                value.price_max &&
                value.price_min > value.price_max) {
                return helpers.error("price_min.price_max");
            }
            return value;
        })
            .messages({
            "limit.page": "limit and page are both required ",
            "price_min.price_max": "price_min should be less than price_max",
        })
            .prefs({ abortEarly: false, allowUnknown: true }),
    },
];
const patchProductSchema = [
    {
        method: "PATCH",
        target: "body",
        schema: joi
            .object({
            name: joi.string().min(3).optional(),
            description: joi.string().min(3).optional(),
            price: joi.number().optional(),
            countInStock: joi.number().optional(),
            categoryId: joi.string().guid({ version: "uuidv4" }).optional(),
        })
            .prefs({ abortEarly: false, stripUnknown: true }),
    },
    {
        method: "PATCH",
        target: "files",
        schema: joi
            .array()
            .items(joi.object({
            fieldname: joi.string().required(),
            originalname: joi.string().required(),
            encoding: joi.string().required(),
            mimetype: joi.string().required(),
            buffer: joi.binary().required(),
        }))
            .optional()
            .prefs({ abortEarly: false, stripUnknown: true }),
    },
];
const endpoints = {
    "/": slashSchemas,
    "/:id": patchProductSchema,
};
exports.default = endpoints;
//# sourceMappingURL=product.schema.js.map