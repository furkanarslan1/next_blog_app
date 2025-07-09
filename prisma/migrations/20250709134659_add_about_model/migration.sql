-- CreateTable
CREATE TABLE "About" (
    "id" SERIAL NOT NULL,
    "aboutImage" TEXT NOT NULL,
    "aboutTitle" TEXT NOT NULL,
    "aboutText" TEXT NOT NULL,

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);
