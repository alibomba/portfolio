-- CreateTable
CREATE TABLE "ReviewReport" (
    "id" TEXT NOT NULL,
    "review_id" TEXT NOT NULL,
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "sent_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReviewReport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReviewReport" ADD CONSTRAINT "ReviewReport_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;
