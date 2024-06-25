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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseManager = void 0;
const client_1 = require("@prisma/client");
class DatabaseManager {
    constructor() { }
    static getInstance(db_URL) {
        db_URL = db_URL ? db_URL : DatabaseManager.getDatabaseURL();
        if (!DatabaseManager.prisma) {
            try {
                DatabaseManager.prisma = new client_1.PrismaClient({
                    datasources: {
                        db: {
                            url: db_URL,
                        },
                    },
                });
            }
            catch (error) {
                console.error("Error while initializing Prisma Client: ", error);
                throw error;
            }
        }
        return DatabaseManager.prisma;
    }
    static getDatabaseURL() {
        var _a, _b, _c;
        let databaseURL;
        const { NODE_ENV } = process.env;
        if (NODE_ENV === "development") {
            databaseURL = (_a = process.env) === null || _a === void 0 ? void 0 : _a.DATABASE_DEV_URL;
        }
        else if (NODE_ENV === "test") {
            databaseURL = (_b = process.env) === null || _b === void 0 ? void 0 : _b.DATABASE_TEST_URL;
        }
        else if (NODE_ENV === "production") {
            databaseURL = (_c = process.env) === null || _c === void 0 ? void 0 : _c.DATABASE_PROD_URL;
        }
        return databaseURL;
    }
    static getDatabaseName() {
        var _a, _b;
        return (_b = (_a = DatabaseManager.getDatabaseURL()) === null || _a === void 0 ? void 0 : _a.split("/")) === null || _b === void 0 ? void 0 : _b.pop();
    }
    static disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (DatabaseManager === null || DatabaseManager === void 0 ? void 0 : DatabaseManager.prisma.$disconnect());
        });
    }
}
exports.DatabaseManager = DatabaseManager;
//# sourceMappingURL=db.js.map