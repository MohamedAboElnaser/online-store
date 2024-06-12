-- CreateTable
CREATE TABLE "product"."customers_products" (
    "product_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_products_product_id_customer_id_key" ON "product"."customers_products"("product_id", "customer_id");

-- AddForeignKey
ALTER TABLE "product"."customers_products" ADD CONSTRAINT "customers_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"."products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product"."customers_products" ADD CONSTRAINT "customers_products_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "user"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
