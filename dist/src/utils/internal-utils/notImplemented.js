"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notImplementedHandler = void 0;
function notImplementedHandler(req, res) {
    res.status(501).json({
        message: "Not Implemented Yet",
    });
}
exports.notImplementedHandler = notImplementedHandler;
//# sourceMappingURL=notImplemented.js.map