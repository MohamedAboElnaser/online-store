/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `whishlists` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "review"."reviews" DROP CONSTRAINT "reviews_product_id_fkey";

-- DropForeignKey
ALTER TABLE "review"."reviews" DROP CONSTRAINT "reviews_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user"."whishlists" DROP CONSTRAINT "whishlists_product_id_fkey";

-- AlterTable
ALTER TABLE "user"."whishlists" DROP COLUMN "updatedAt";

-- AddForeignKey
ALTER TABLE "review"."reviews" ADD CONSTRAINT "reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review"."reviews" ADD CONSTRAINT "reviews_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"."products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."whishlists" ADD CONSTRAINT "whishlists_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"."products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
