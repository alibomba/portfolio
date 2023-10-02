/*
  Warnings:

  - Added the required column `user_id` to the `CartElement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartElement" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "CartElement" ADD CONSTRAINT "CartElement_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
