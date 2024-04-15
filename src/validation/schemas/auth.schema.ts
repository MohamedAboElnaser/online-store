import * as joi from "joi";
import { TEndpointSchema, TValidationSchema } from "validationSchema";

const authSchema: TEndpointSchema[] = [
    {
        method: "POST",
        schema: joi
            .object({
                email: joi.string().email().required(),
                password: joi.string().min(8).required(),
                firstName: joi.string().required().min(3),
                lastName: joi.string().min(3).optional(),
            })
            .prefs({ abortEarly: false, stripUnknown: true }),
        target: "body",
    },
];

const endpoints: TValidationSchema = {
    "/register": authSchema,
};

export default endpoints;