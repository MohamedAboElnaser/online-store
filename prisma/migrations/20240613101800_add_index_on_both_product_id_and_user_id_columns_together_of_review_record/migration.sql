/*
  Warnings:

  - A unique constraint covering the columns `[user_id,product_id]` on the table `reviews` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "reviews_user_id_product_id_key" ON "review"."reviews"("user_id", "product_id");
