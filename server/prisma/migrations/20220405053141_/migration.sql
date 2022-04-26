/*
  Warnings:

  - You are about to drop the column `thumbnailId` on the `Item` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[itemId]` on the table `BlancFile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `itemId` to the `BlancFile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_thumbnailId_fkey";

-- AlterTable
ALTER TABLE "BlancFile" ADD COLUMN     "itemId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "thumbnailId";

-- CreateIndex
CREATE UNIQUE INDEX "BlancFile_itemId_key" ON "BlancFile"("itemId");

-- AddForeignKey
ALTER TABLE "BlancFile" ADD CONSTRAINT "BlancFile_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
