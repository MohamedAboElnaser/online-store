import * as joi from "joi";
import { TEndpointSchema, TValidationSchema } from "validationSchema";

const createReviewSchema: TEndpointSchema[] = [
    {
        method: "POST",
        target: "params",
        schema: joi
            .object({
                productId: joi.string().guid({ version: "uuidv4" }).required(),
            })
            .prefs({ abortEarly: false, stripUnknown: true }),
    },
    {
        method: "POST",
        target: "body",
        schema: joi
            .object({
                rating: joi.number().min(1).max(5).required(),
                comment: joi.string().min(3),
            })
            .prefs({ abortEarly: false, stripUnknown: true }),
    },
];

const updateReviewSchema: TEndpointSchema[] = [
    {
        method: "PATCH",
        target: "params",
        schema: joi
            .object({
                productId: joi.string().guid({ version: "uuidv4" }).required(),
                reviewId: joi.string().guid({ version: "uuidv4" }).required(),
            })
            .prefs({ abortEarly: false, stripUnknown: true }),
    },
    {
        method: "PATCH",
        target: "body",
        schema: joi
            .object({
                rating: joi.number().min(1).max(5),
                comment: joi.string().min(3),
            })
            .prefs({ abortEarly: false, stripUnknown: true }),
    },
];
const endpoints: TValidationSchema = {
    "/": createReviewSchema,
    "/:id": updateReviewSchema,
};

export default endpoints;
