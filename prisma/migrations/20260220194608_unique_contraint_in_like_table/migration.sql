/*
  Warnings:

  - A unique constraint covering the columns `[user_id,monologue_id]` on the table `liked_monologues` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "liked_monologues_user_id_monologue_id_key" ON "liked_monologues"("user_id", "monologue_id");
