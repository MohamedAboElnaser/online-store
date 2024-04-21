import * as joi from "joi";
import { TEndpointSchema, TValidationSchema } from "validationSchema";

const createCategorySchema: TEndpointSchema[] = [
    {
        method: "POST",
        schema: joi
            .object({
                name: joi.string().min(3).required(),
            })
            .prefs({ abortEarly: false, stripUnknown: true }),
        target: "body",
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

const updateCategorySchema: TEndpointSchema[] = [
    {
        method: "PATCH",
        target: "body",
        schema: joi
            .object({
                name: joi.string().min(3).optional(),
            })
            .prefs({ abortEarly: false, stripUnknown: true }),
    },
];

const endpoints: TValidationSchema = {
    "/": createCategorySchema,
    "/:id": updateCategorySchema,
};
export default endpoints;
