-- DropIndex
DROP INDEX "public"."episodes_monologue_id_id_key";

-- AlterTable
CREATE SEQUENCE episodes_id_seq;
ALTER TABLE "episodes" ALTER COLUMN "id" SET DEFAULT nextval('episodes_id_seq');
ALTER SEQUENCE episodes_id_seq OWNED BY "episodes"."id";
