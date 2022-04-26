/*
  Warnings:

  - You are about to drop the column `postId` on the `Item` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[itemId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_postId_fkey";

-- DropIndex
DROP INDEX "Item_postId_key";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "postId";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "itemId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Post_itemId_key" ON "Post"("itemId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;
