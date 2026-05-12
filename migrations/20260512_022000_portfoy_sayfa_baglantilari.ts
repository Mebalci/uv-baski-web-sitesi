import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "portfoy_projeleri" ADD COLUMN IF NOT EXISTS "sayfa_bolum_basligi" varchar;
    ALTER TABLE "portfoy_projeleri" ADD COLUMN IF NOT EXISTS "fiyat_metni" varchar;
    ALTER TABLE "portfoy_projeleri_rels" ADD COLUMN IF NOT EXISTS "sayfalar_id" integer;

    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'portfoy_projeleri_rels_sayfalar_fk'
      ) THEN
        ALTER TABLE "portfoy_projeleri_rels"
        ADD CONSTRAINT "portfoy_projeleri_rels_sayfalar_fk"
        FOREIGN KEY ("sayfalar_id") REFERENCES "public"."sayfalar"("id")
        ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;

    CREATE INDEX IF NOT EXISTS "portfoy_projeleri_rels_sayfalar_id_idx"
    ON "portfoy_projeleri_rels" USING btree ("sayfalar_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "portfoy_projeleri_rels_sayfalar_id_idx";
    ALTER TABLE "portfoy_projeleri_rels" DROP CONSTRAINT IF EXISTS "portfoy_projeleri_rels_sayfalar_fk";
    ALTER TABLE "portfoy_projeleri_rels" DROP COLUMN IF EXISTS "sayfalar_id";
    ALTER TABLE "portfoy_projeleri" DROP COLUMN IF EXISTS "fiyat_metni";
    ALTER TABLE "portfoy_projeleri" DROP COLUMN IF EXISTS "sayfa_bolum_basligi";
  `)
}
