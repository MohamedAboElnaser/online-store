import * as joi from "joi";
import { it } from "node:test";
import { TEndpointSchema, TValidationSchema } from "validationSchema";

const createOrderSchema: TEndpointSchema[] = [
    {
        method: "POST",
        target: "body",
        schema: joi
            .object({
                cartItemsIds: joi
                    .array()
                    .items(joi.string().guid({ version: "uuidv4" }))
                    .min(1)
                    .required(),
            })
            .prefs({ abortEarly: false, stripUnknown: true }),
    },
];

const endpoints: TValidationSchema = {
    "/": createOrderSchema,
};

export default endpoints;
