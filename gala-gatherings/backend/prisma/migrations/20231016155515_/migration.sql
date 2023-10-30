-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL,
    "service" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "title" VARCHAR(40) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "price" VARCHAR(10) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeaturedOffer" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "FeaturedOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortfolioProject" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(25) NOT NULL,
    "content" TEXT NOT NULL,
    "date" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "PortfolioProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortfolioProjectImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "portfolioProjectId" TEXT NOT NULL,

    CONSTRAINT "PortfolioProjectImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "standard" INTEGER NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobApplication" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "email" VARCHAR(55) NOT NULL,
    "phoneNumber" VARCHAR(30) NOT NULL,
    "jobPosition" VARCHAR(255) NOT NULL,
    "cvUrl" TEXT,
    "details" TEXT,

    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL,
    "fullName" VARCHAR(200) NOT NULL,
    "companyName" VARCHAR(255),
    "email" VARCHAR(55) NOT NULL,
    "phoneNumber" VARCHAR(30) NOT NULL,
    "subject" VARCHAR(255) NOT NULL,
    "details" TEXT NOT NULL,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FeaturedOffer_serviceId_key" ON "FeaturedOffer"("serviceId");

-- AddForeignKey
ALTER TABLE "FeaturedOffer" ADD CONSTRAINT "FeaturedOffer_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioProjectImage" ADD CONSTRAINT "PortfolioProjectImage_portfolioProjectId_fkey" FOREIGN KEY ("portfolioProjectId") REFERENCES "PortfolioProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
