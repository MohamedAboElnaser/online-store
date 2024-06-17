import { rateLimit } from "express-rate-limit";

export function rateLimiter(numberOfRequests: number, timeWindow: number) {
    return rateLimit({
        windowMs: timeWindow * 60 * 1000,
        limit: numberOfRequests,
        standardHeaders: "draft-7",
        legacyHeaders: false,
    });
}
