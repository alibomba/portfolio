/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `NewsletterMember` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "NewsletterMember_email_key" ON "NewsletterMember"("email");
