/*
  Warnings:

  - You are about to drop the `ItemParamType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `ItemParam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ItemParam" ADD COLUMN     "type" TEXT NOT NULL;

-- DropTable
DROP TABLE "ItemParamType";
