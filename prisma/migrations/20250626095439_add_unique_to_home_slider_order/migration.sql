/*
  Warnings:

  - A unique constraint covering the columns `[order]` on the table `HomeSlider` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "HomeSlider" ALTER COLUMN "order" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "HomeSlider_order_key" ON "HomeSlider"("order");
