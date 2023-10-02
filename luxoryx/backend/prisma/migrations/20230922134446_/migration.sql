/*
  Warnings:

  - You are about to alter the column `subject` on the `OrderReport` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - Added the required column `user_id` to the `OrderReport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderReport" ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "subject" SET DATA TYPE VARCHAR(100);

-- AddForeignKey
ALTER TABLE "OrderReport" ADD CONSTRAINT "OrderReport_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
