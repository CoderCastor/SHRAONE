-- CreateEnum
CREATE TYPE "categories" AS ENUM ('Motivation', 'Science', 'Dramatic', 'Comedy', 'Soliloquy', 'Interior', 'Action', 'Serio_comic', 'Narrative', 'Storytelling', 'Classical', 'Contemporary', 'Villain_Speech', 'Rant', 'Direct_Address', 'Historical');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "liked_categories" "categories"[];

-- CreateTable
CREATE TABLE "monologues" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "played_count" INTEGER NOT NULL,
    "like_count" INTEGER NOT NULL,
    "comment_count" INTEGER NOT NULL,
    "categories" "categories" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "monologues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "played_by" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "monologue_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "played_by_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "liked_monologues" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "monologue_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "liked_monologues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "monologue_id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "played_by" ADD CONSTRAINT "played_by_monologue_id_fkey" FOREIGN KEY ("monologue_id") REFERENCES "monologues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "played_by" ADD CONSTRAINT "played_by_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "liked_monologues" ADD CONSTRAINT "liked_monologues_monologue_id_fkey" FOREIGN KEY ("monologue_id") REFERENCES "monologues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "liked_monologues" ADD CONSTRAINT "liked_monologues_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
