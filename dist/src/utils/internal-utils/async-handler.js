"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = void 0;
function asyncHandler(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    };
}
exports.asyncHandler = asyncHandler;
exports.default = asyncHandler;
//# sourceMappingURL=async-handler.js.map