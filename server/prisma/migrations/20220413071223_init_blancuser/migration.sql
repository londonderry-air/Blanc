-- CreateTable
CREATE TABLE "BlancUser" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "imageId" TEXT,

    CONSTRAINT "BlancUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BlancUser_email_key" ON "BlancUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BlancUser_imageId_key" ON "BlancUser"("imageId");

-- AddForeignKey
ALTER TABLE "BlancUser" ADD CONSTRAINT "BlancUser_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "BlancFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
