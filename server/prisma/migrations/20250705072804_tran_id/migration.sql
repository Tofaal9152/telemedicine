/*
  Warnings:

  - A unique constraint covering the columns `[transId]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN "transId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_transId_key" ON "Appointment"("transId");
