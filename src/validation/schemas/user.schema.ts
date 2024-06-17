import * as joi from "joi";
import { TEndpointSchema, TValidationSchema } from "validationSchema";

const userEndpointSchema: TEndpointSchema[] = [
    {
        method: "PATCH",
        target: "files",
        schema: joi
            .array()
            .items(
                joi.object({
                    buffer: joi.binary().required(),
                    originalname: joi.string().required(),
                })
            )
            .max(1)
            .optional()
            .prefs({ stripUnknown: true, abortEarly: false }),
    },
    {
        method: "PATCH",
        target: "body",
        schema: joi
            .object({
                firstName: joi.string().min(3).optional(),
                lastName: joi.string().min(3).optional(),
                email: joi.string().email().optional(),
            })
            .prefs({ stripUnknown: true, abortEarly: false }),
    },
];

const endpoints: TValidationSchema = {
    "/me": userEndpointSchema,
};

export default endpoints;
