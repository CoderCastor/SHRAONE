/*
  Warnings:

  - A unique constraint covering the columns `[title,created_by]` on the table `monologues` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "monologues_title_created_by_key" ON "monologues"("title", "created_by");
