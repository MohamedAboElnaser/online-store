import * as joi from "joi";
import { TEndpointSchema, TValidationSchema } from "validationSchema";

const orderItemsEndpoints: TEndpointSchema[] = [
    {
        method: "PATCH",
        target: "params",
        schema: joi
            .object({
                orderId: joi.string().guid({ version: "uuidv4" }).required(),
                itemId: joi.string().guid({ version: "uuidv4" }).required(),
            })
            .prefs({ abortEarly: false, stripUnknown: true }),
    },
    {
        method: "PATCH",
        target: "body",
        schema: joi
            .object({
                quantity: joi.number().min(1).required(),
            })
            .prefs({ abortEarly: false, stripUnknown: true }),
    },
];

const endpoints: TValidationSchema = {
    "/:id": orderItemsEndpoints,
};
export default endpoints;
