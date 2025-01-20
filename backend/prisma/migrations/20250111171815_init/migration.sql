-- CreateTable
CREATE TABLE "Messages" (
    "id" SERIAL NOT NULL,
    "senderID" INTEGER NOT NULL,
    "receiverID" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);
