/*
  Warnings:

  - Added the required column `messageType` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MsgType" AS ENUM ('text', 'drawing');

-- AlterTable
ALTER TABLE "Messages" ADD COLUMN     "messageType" "MsgType" NOT NULL,
ALTER COLUMN "senderID" SET DATA TYPE TEXT,
ALTER COLUMN "receiverID" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Users" (
    "userID" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userPassword" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("userID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_userID_key" ON "Users"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Users_userEmail_key" ON "Users"("userEmail");

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_senderID_fkey" FOREIGN KEY ("senderID") REFERENCES "Users"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_receiverID_fkey" FOREIGN KEY ("receiverID") REFERENCES "Users"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
