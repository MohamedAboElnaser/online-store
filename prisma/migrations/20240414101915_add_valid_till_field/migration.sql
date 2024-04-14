/*
  Warnings:

  - You are about to drop the column `validTill` on the `otps` table. All the data in the column will be lost.
  - Added the required column `valid_till` to the `otps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user"."otps" DROP COLUMN "validTill",
ADD COLUMN     "valid_till" TIMESTAMP(3) NOT NULL;
