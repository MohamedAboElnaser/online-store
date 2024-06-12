import * as joi from "joi";
import { TEndpointSchema, TValidationSchema } from "validationSchema";

const createCheckoutSession: TEndpointSchema[] = [
    {
        method: "POST",
        schema: joi
            .object({
                orderId: joi.string().guid({ version: "uuidv4" }).required(),
            })
            .prefs({ abortEarly: false, stripUnknown: true }),
        target: "body",
    },
];

  const endpoints: TValidationSchema = {
    "/create-checkout-session": createCheckoutSession,
};

export default endpoints;