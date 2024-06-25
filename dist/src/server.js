"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const app_1 = __importDefault(require("./app"));
const config_1 = require("../config");
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    yield config_1.DatabaseManager.disconnect();
    console.log("Server shutting down gracefully...");
    process.exit(0); // exit with success
}));
const server = new http_1.Server(app_1.default);
server.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running at ${process.env.NODE_ENV} mode at port ${process.env.PORT} 🚀`);
});
//# sourceMappingURL=server.js.map