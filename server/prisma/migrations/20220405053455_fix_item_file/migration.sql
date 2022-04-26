/*
  Warnings:

  - You are about to drop the column `itemId` on the `BlancFile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "BlancFile" DROP CONSTRAINT "BlancFile_itemId_fkey";

-- DropIndex
DROP INDEX "BlancFile_itemId_key";

-- AlterTable
ALTER TABLE "BlancFile" DROP COLUMN "itemId";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "thumbnailId" TEXT;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "BlancFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
