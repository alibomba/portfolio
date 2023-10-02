/*
  Warnings:

  - You are about to drop the column `address` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingMethod` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Order` table. All the data in the column will be lost.
  - Added the required column `orderGroup_id` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "address",
DROP COLUMN "city",
DROP COLUMN "email",
DROP COLUMN "phone_number",
DROP COLUMN "shippingMethod",
DROP COLUMN "status",
ADD COLUMN     "orderGroup_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "OrderGroup" (
    "id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "shippingMethod" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "OrderGroup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_orderGroup_id_fkey" FOREIGN KEY ("orderGroup_id") REFERENCES "OrderGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
