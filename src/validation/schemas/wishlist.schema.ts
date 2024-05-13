import * as joi from "joi";
import { TEndpointSchema, TValidationSchema } from "validationSchema";

const createWishlistSchema: TEndpointSchema[] = [
    {
        method: "POST",
        target: "body",
        schema: joi
            .object({
                productId: joi.string().guid({ version: "uuidv4" }).required(),
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
                    .required()
                    .min(1),
            })
            .prefs({ abortEarly: false, stripUnknown: true }),
    },
];

const endpoints: TValidationSchema = {
    "/": createWishlistSchema,
};

export default endpoints;
