/*
  Warnings:

  - You are about to alter the column `targetAmount` on the `Fundraising` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "Fundraising" ALTER COLUMN "targetAmount" SET DATA TYPE DECIMAL(10,2);
