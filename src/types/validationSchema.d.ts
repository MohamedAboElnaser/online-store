import * as joi from "joi";

export type TEndpointSchema = {
    method: "POST" | "GET" | "PATCH" | "DELETE" | "PUT";
    schema: joi.Schema;
    target: "body" | "query" | "params";
};

export type TValidationSchema = {
    [endpoint: string]: TEndpointSchema[];
};
