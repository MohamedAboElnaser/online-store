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
];

const endpoints: TValidationSchema = {
    "/": cartItemsEndpoints,
};

export default endpoints;
