import * as joi from "joi";
import { it } from "node:test";
import { TEndpointSchema, TValidationSchema } from "validationSchema";

const ordersSchema: TEndpointSchema[] = [
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
    {
        method: "GET",
        target: "query",
        schema: joi
            .object({
                status: joi
                    .string()
                    .uppercase()
                    .valid("PENDING", "COMPLETED")
                    .optional(),
            })
            .prefs({ abortEarly: false, stripUnknown: true }),
    },
];

const endpoints: TValidationSchema = {
    "/": ordersSchema,
};

export default endpoints;
