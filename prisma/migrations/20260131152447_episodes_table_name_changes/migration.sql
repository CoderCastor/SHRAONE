/*
  Warnings:

  - You are about to drop the `Episodes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Episodes" DROP CONSTRAINT "Episodes_monologue_id_fkey";

-- DropTable
DROP TABLE "public"."Episodes";

-- CreateTable
CREATE TABLE "episodes" (
    "id" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT NOT NULL,
    "script" TEXT NOT NULL,
    "audio_url" TEXT NOT NULL,
    "monologue_id" TEXT NOT NULL,

    CONSTRAINT "episodes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "episodes_monologue_id_id_key" ON "episodes"("monologue_id", "id");

-- AddForeignKey
ALTER TABLE "episodes" ADD CONSTRAINT "episodes_monologue_id_fkey" FOREIGN KEY ("monologue_id") REFERENCES "monologues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
