"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportConfig = exports.DatabaseManager = void 0;
const db_1 = require("./db");
Object.defineProperty(exports, "DatabaseManager", { enumerable: true, get: function () { return db_1.DatabaseManager; } });
const passport_config_1 = __importDefault(require("./passport-config"));
exports.passportConfig = passport_config_1.default;
//# sourceMappingURL=index.js.map