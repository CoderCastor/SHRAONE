-- DropForeignKey
ALTER TABLE "public"."episodes" DROP CONSTRAINT "episodes_monologue_id_fkey";

-- AddForeignKey
ALTER TABLE "episodes" ADD CONSTRAINT "episodes_monologue_id_fkey" FOREIGN KEY ("monologue_id") REFERENCES "monologues"("id") ON DELETE CASCADE ON UPDATE CASCADE;
