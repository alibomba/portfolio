-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "title" VARCHAR(25) NOT NULL,
    "content" TEXT NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Advice" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(35) NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Advice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsletterMember" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(55) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsletterMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "title" VARCHAR(25) NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fundraising" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(35) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "currentAmount" DECIMAL(10,2) NOT NULL,
    "targetAmount" INTEGER NOT NULL,

    CONSTRAINT "Fundraising_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL,
    "fullName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(55) NOT NULL,
    "phoneNumber" VARCHAR(30) NOT NULL,
    "subject" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);
