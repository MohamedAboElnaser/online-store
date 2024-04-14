/*
  Warnings:

  - Added the required column `validTill` to the `otps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user"."otps" ADD COLUMN     "validTill" TIMESTAMP(3) NOT NULL;
