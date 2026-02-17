-- CreateTable
CREATE TABLE "Episodes" (
    "id" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT NOT NULL,
    "script" TEXT NOT NULL,
    "audio_url" TEXT NOT NULL,
    "monologue_id" TEXT NOT NULL,

    CONSTRAINT "Episodes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Episodes_monologue_id_id_key" ON "Episodes"("monologue_id", "id");

-- AddForeignKey
ALTER TABLE "Episodes" ADD CONSTRAINT "Episodes_monologue_id_fkey" FOREIGN KEY ("monologue_id") REFERENCES "monologues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
