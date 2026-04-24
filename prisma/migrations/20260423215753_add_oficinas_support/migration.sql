-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('MESA', 'OFICINA');

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_masterId_fkey";

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "type" "EventType" NOT NULL DEFAULT 'MESA',
ALTER COLUMN "system" DROP NOT NULL,
ALTER COLUMN "masterId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "SessionFacilitator" (
    "id" UUID NOT NULL,
    "sessionId" UUID NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "SessionFacilitator_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SessionFacilitator_sessionId_userId_key" ON "SessionFacilitator"("sessionId", "userId");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionFacilitator" ADD CONSTRAINT "SessionFacilitator_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionFacilitator" ADD CONSTRAINT "SessionFacilitator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
