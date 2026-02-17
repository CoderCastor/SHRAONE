/*
  Warnings:

  - A unique constraint covering the columns `[monologue_id,number]` on the table `episodes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."episodes_monologue_id_id_key";

-- AlterTable
ALTER TABLE "monologues" ADD COLUMN     "thumbnail_url" TEXT NOT NULL DEFAULT 'PENDING';

-- CreateIndex
CREATE UNIQUE INDEX "episodes_monologue_id_number_key" ON "episodes"("monologue_id", "number");
