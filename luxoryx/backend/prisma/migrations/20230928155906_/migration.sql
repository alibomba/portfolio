/*
  Warnings:

  - You are about to drop the column `shippingMethod` on the `Order` table. All the data in the column will be lost.
  - Added the required column `orderGroup_id` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "shippingMethod",
ADD COLUMN     "orderGroup_id" TEXT NOT NULL,
ADD COLUMN     "paid" BOOLEAN NOT NULL DEFAULT false;

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
