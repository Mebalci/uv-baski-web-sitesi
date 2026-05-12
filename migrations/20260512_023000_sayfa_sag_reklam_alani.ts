import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "sayfalar" ADD COLUMN IF NOT EXISTS "sag_reklam_gorseli_id" integer;
    ALTER TABLE "sayfalar" ADD COLUMN IF NOT EXISTS "sag_reklam_link" varchar;
    ALTER TABLE "sayfalar" ADD COLUMN IF NOT EXISTS "sag_reklam_yeni_sekmede_acilsin_mi" boolean DEFAULT false;
    ALTER TABLE "sayfalar" ADD COLUMN IF NOT EXISTS "sag_reklam_alt_metin" varchar;

    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'sayfalar_sag_reklam_gorseli_id_medyalar_id_fk'
      ) THEN
        ALTER TABLE "sayfalar"
        ADD CONSTRAINT "sayfalar_sag_reklam_gorseli_id_medyalar_id_fk"
        FOREIGN KEY ("sag_reklam_gorseli_id") REFERENCES "public"."medyalar"("id")
        ON DELETE set null ON UPDATE no action;
      END IF;
    END $$;

    CREATE INDEX IF NOT EXISTS "sayfalar_sag_reklam_gorseli_idx"
    ON "sayfalar" USING btree ("sag_reklam_gorseli_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "sayfalar_sag_reklam_gorseli_idx";
    ALTER TABLE "sayfalar" DROP CONSTRAINT IF EXISTS "sayfalar_sag_reklam_gorseli_id_medyalar_id_fk";
    ALTER TABLE "sayfalar" DROP COLUMN IF EXISTS "sag_reklam_alt_metin";
    ALTER TABLE "sayfalar" DROP COLUMN IF EXISTS "sag_reklam_yeni_sekmede_acilsin_mi";
    ALTER TABLE "sayfalar" DROP COLUMN IF EXISTS "sag_reklam_link";
    ALTER TABLE "sayfalar" DROP COLUMN IF EXISTS "sag_reklam_gorseli_id";
  `)
}
