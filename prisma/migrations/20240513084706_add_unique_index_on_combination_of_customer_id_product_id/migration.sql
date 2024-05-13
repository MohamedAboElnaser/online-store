/*
  Warnings:

  - A unique constraint covering the columns `[customer_id,product_id]` on the table `whishlists` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "whishlists_customer_id_product_id_key" ON "user"."whishlists"("customer_id", "product_id");
