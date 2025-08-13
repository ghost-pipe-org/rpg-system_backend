/*
  Warnings:

  - You are about to drop the column `currentPlayers` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `possibleDates` on the `Session` table. All the data in the column will be lost.
  - The `status` column on the `Session` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `approvedDate` column on the `Session` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `period` column on the `Session` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `password_hash` on the `User` table. All the data in the column will be lost.
  - Added the required column `status` to the `SessionEnrollment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordHash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('PLAYER', 'MASTER', 'ADMIN');

-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('CANCELADA', 'REJEITADA', 'APROVADA', 'PENDENTE');

-- CreateEnum
CREATE TYPE "SessionPeriod" AS ENUM ('MANHA', 'TARDE', 'NOITE');

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "currentPlayers",
DROP COLUMN "possibleDates",
ALTER COLUMN "title" SET DATA TYPE VARCHAR(255),
DROP COLUMN "status",
ADD COLUMN     "status" "SessionStatus" NOT NULL DEFAULT 'PENDENTE',
ALTER COLUMN "system" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "location" SET DATA TYPE VARCHAR(255),
DROP COLUMN "approvedDate",
ADD COLUMN     "approvedDate" TIMESTAMP(3),
DROP COLUMN "period",
ADD COLUMN     "period" "SessionPeriod";

-- AlterTable
ALTER TABLE "SessionEnrollment" ADD COLUMN     "status" VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password_hash",
ADD COLUMN     "passwordHash" VARCHAR(255) NOT NULL,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'PLAYER';

-- CreateTable
CREATE TABLE "SessionPossibleDate" (
    "id" UUID NOT NULL,
    "sessionId" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SessionPossibleDate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SessionPossibleDate" ADD CONSTRAINT "SessionPossibleDate_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
