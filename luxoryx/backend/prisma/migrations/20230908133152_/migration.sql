/*
  Warnings:

  - Made the column `user_id` on table `Shipping` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Shipping" ALTER COLUMN "user_id" SET NOT NULL;
