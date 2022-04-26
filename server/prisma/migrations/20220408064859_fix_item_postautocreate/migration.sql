/*
  Warnings:

  - A unique constraint covering the columns `[postId]` on the table `Item` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "isAutoPostCreateWithItem" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "postId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Item_postId_key" ON "Item"("postId");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
