-- CreateTable
CREATE TABLE "shareable_link" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "monologue_id" TEXT NOT NULL,
    "is_valid" BOOLEAN NOT NULL,

    CONSTRAINT "shareable_link_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "shareable_link" ADD CONSTRAINT "shareable_link_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shareable_link" ADD CONSTRAINT "shareable_link_monologue_id_fkey" FOREIGN KEY ("monologue_id") REFERENCES "monologues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
