/*
  Warnings:

  - You are about to drop the column `orderGroup_id` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `paid` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `OrderGroup` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `shippingMethod` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_orderGroup_id_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "orderGroup_id",
DROP COLUMN "paid",
ADD COLUMN     "shippingMethod" TEXT NOT NULL;

-- DropTable
DROP TABLE "OrderGroup";
