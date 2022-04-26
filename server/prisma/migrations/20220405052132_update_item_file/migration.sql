-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "thumbnailId" TEXT;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "BlancFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
