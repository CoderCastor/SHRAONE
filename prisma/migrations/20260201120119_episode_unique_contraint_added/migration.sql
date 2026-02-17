/*
  Warnings:

  - A unique constraint covering the columns `[monologue_id,id]` on the table `episodes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "episodes_monologue_id_id_key" ON "episodes"("monologue_id", "id");
