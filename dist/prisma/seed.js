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
const client_1 = require("@prisma/client");
const dev_data_1 = require("./dev-data");
const prisma = new client_1.PrismaClient();
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        //seed categories
        yield prisma.category.createMany({
            data: dev_data_1.categories,
            skipDuplicates: true,
        });
        console.log("Categories seeded successfully 🌱🌱");
        //seed products
        yield prisma.product.createMany({
            data: dev_data_1.products,
            skipDuplicates: true,
        });
        console.log("Products seeded successfully 🌱🌱");
    });
}
seed();
//# sourceMappingURL=seed.js.map