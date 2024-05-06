-- DropForeignKey
ALTER TABLE "product"."products" DROP CONSTRAINT "products_category_id_fkey";

-- AddForeignKey
ALTER TABLE "product"."products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "product"."categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
