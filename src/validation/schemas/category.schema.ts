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
];

const endpoints: TValidationSchema = {
    "/": createCategorySchema,
};
export default endpoints;
