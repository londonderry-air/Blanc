/*
  Warnings:

  - A unique constraint covering the columns `[blancId]` on the table `BlancUser` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "BlancUser" ADD COLUMN     "blancId" TEXT NOT NULL DEFAULT E'';

-- CreateIndex
CREATE UNIQUE INDEX "BlancUser_blancId_key" ON "BlancUser"("blancId");
