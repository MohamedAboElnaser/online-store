import * as joi from "joi";
import { TEndpointSchema, TValidationSchema } from "validationSchema";

const registerSchema: TEndpointSchema[] = [
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

const verifyAccountSchema: TEndpointSchema[] = [
    {
        method: "POST",
        target: "body",
        schema: joi
            .object({
                otp: joi.number().integer().min(100000).max(999999).required(),
            })
            .prefs({ abortEarly: false, stripUnknown: true }),
    },
];

const resendOTPSchema: TEndpointSchema[] = [
    {
        method: "POST",
        target: "body",
        schema: joi
            .object({
                email: joi.string().email().required(),
            })
            .prefs({ abortEarly: false, stripUnknown: true }),
    },
];
const endpoints: TValidationSchema = {
    "/register": registerSchema,
    "/verify-account": verifyAccountSchema,
    "/resend-otp": resendOTPSchema,
};

export default endpoints;
