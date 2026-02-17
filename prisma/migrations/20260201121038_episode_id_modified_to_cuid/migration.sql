/*
  Warnings:

  - The primary key for the `episodes` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "episodes" DROP CONSTRAINT "episodes_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "episodes_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "episodes_id_seq";
