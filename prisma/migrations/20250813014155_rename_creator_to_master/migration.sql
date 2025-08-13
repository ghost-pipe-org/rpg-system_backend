/*
  Warnings:

  - You are about to drop the column `creatorId` on the `Session` table. All the data in the column will be lost.
  - Added the required column `masterId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_creatorId_fkey";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "creatorId",
ADD COLUMN     "masterId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
