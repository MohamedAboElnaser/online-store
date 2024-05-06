import { PrismaClient } from "@prisma/client";
import { categories, products } from "./dev-data";

const prisma = new PrismaClient();

async function seed() {
    //seed categories
    await prisma.category.createMany({
        data: categories,
        skipDuplicates: true,
    });
    console.log("Categories seeded successfully 🌱🌱");
    //seed products
    await prisma.product.createMany({
        data: products,
        skipDuplicates: true,
    });

    console.log("Products seeded successfully 🌱🌱");
}

seed();
