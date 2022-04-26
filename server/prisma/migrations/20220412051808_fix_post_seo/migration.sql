/*
  Warnings:

  - A unique constraint covering the columns `[metaOgImageId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "metaDescription" TEXT,
ADD COLUMN     "metaOgImageId" TEXT,
ADD COLUMN     "metaOgType" TEXT,
ADD COLUMN     "metaTitle" TEXT,
ADD COLUMN     "metaTwitterCardType" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Post_metaOgImageId_key" ON "Post"("metaOgImageId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_metaOgImageId_fkey" FOREIGN KEY ("metaOgImageId") REFERENCES "BlancFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
