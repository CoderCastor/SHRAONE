-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_monologue_id_fkey" FOREIGN KEY ("monologue_id") REFERENCES "monologues"("id") ON DELETE CASCADE ON UPDATE CASCADE;
