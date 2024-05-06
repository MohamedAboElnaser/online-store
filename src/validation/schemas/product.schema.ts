import * as joi from "joi";
import { TEndpointSchema, TValidationSchema } from "validationSchema";

const createProductSchema: TEndpointSchema[] = [
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
            .items(
                joi.object({
                    fieldname: joi.string().required(),
                    originalname: joi.string().required(),
                    encoding: joi.string().required(),
                    mimetype: joi.string().required(),
                    buffer: joi.binary().required(),
                })
            )
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
];

const patchProductSchema: TEndpointSchema[] = [
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
            .items(
                joi.object({
                    fieldname: joi.string().required(),
                    originalname: joi.string().required(),
                    encoding: joi.string().required(),
                    mimetype: joi.string().required(),
                    buffer: joi.binary().required(),
                })
            )
            .optional()
            .prefs({ abortEarly: false, stripUnknown: true }),
    },
];

const endpoints: TValidationSchema = {
    "/": createProductSchema,
    "/:id": patchProductSchema,
};

export default endpoints;
