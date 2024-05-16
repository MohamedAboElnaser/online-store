import * as joi from "joi";
import { TEndpointSchema, TValidationSchema } from "validationSchema";

const cartItemsEndpoints: TEndpointSchema[] = [
    {
        method: "POST",
        target: "body",
        schema: joi
            .object({
                productId: joi.string().guid({ version: "uuidv4" }).required(),
                quantity: joi.number().optional(),
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
                    .min(1)
                    .required(),
            })
            .prefs({ abortEarly: false, stripUnknown: true }),
    },
];

const endpoints: TValidationSchema = {
    "/": cartItemsEndpoints,
};

export default endpoints;
