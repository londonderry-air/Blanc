-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "data" JSONB NOT NULL DEFAULT '{}';

-- CreateTable
CREATE TABLE "ItemParam" (
    "id" TEXT NOT NULL,
    "paramId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isRequired" BOOLEAN NOT NULL DEFAULT false,
    "contentId" TEXT,

    CONSTRAINT "ItemParam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemParamType" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "ItemParamType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ItemParam_paramId_key" ON "ItemParam"("paramId");

-- CreateIndex
CREATE UNIQUE INDEX "ItemParamType_type_key" ON "ItemParamType"("type");

-- AddForeignKey
ALTER TABLE "ItemParam" ADD CONSTRAINT "ItemParam_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE SET NULL ON UPDATE CASCADE;
