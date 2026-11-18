/*
  Warnings:

  - You are about to drop the column `industryCategoryId` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the `IndustryCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `organizationCategoryId` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_industryCategoryId_fkey";

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "industryCategoryId",
ADD COLUMN     "organizationCategoryId" TEXT NOT NULL;

-- DropTable
DROP TABLE "IndustryCategory";

-- CreateTable
CREATE TABLE "OrganizationCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrganizationCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_organizationCategoryId_fkey" FOREIGN KEY ("organizationCategoryId") REFERENCES "OrganizationCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
