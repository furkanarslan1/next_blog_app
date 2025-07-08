-- DropForeignKey
ALTER TABLE "HomeSlider" DROP CONSTRAINT "HomeSlider_postId_fkey";

-- AddForeignKey
ALTER TABLE "HomeSlider" ADD CONSTRAINT "HomeSlider_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
