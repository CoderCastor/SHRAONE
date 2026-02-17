/*
  Warnings:

  - Added the required column `number` to the `episodes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "episodes" ADD COLUMN     "number" INTEGER NOT NULL;
