/*
  Warnings:

  - You are about to alter the column `currentAmount` on the `Fundraising` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.
  - You are about to alter the column `targetAmount` on the `Fundraising` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Fundraising" ALTER COLUMN "currentAmount" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "targetAmount" SET DATA TYPE DOUBLE PRECISION;
