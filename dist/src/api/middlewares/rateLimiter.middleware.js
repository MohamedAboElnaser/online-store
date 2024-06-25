"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = void 0;
const express_rate_limit_1 = require("express-rate-limit");
function rateLimiter(numberOfRequests, timeWindow) {
    return (0, express_rate_limit_1.rateLimit)({
        windowMs: timeWindow * 60 * 1000,
        limit: numberOfRequests,
        standardHeaders: "draft-7",
        legacyHeaders: false,
    });
}
exports.rateLimiter = rateLimiter;
//# sourceMappingURL=rateLimiter.middleware.js.map