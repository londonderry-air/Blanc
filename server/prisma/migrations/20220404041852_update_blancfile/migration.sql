/*
  Warnings:

  - Added the required column `size` to the `BlancFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BlancFile" ADD COLUMN     "size" INTEGER NOT NULL,
ALTER COLUMN "url" DROP NOT NULL,
ALTER COLUMN "deleted" DROP NOT NULL,
ALTER COLUMN "deleted" DROP DEFAULT;
