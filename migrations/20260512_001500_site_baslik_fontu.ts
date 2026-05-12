import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_site_ayarlari_baslik_fontu" AS ENUM(
        'parisienne',
        'segoe_script',
        'newsreader',
        'manrope'
      );
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
    ALTER TABLE "site_ayarlari" ADD COLUMN IF NOT EXISTS "baslik_fontu" "enum_site_ayarlari_baslik_fontu" DEFAULT 'parisienne';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_ayarlari" DROP COLUMN IF EXISTS "baslik_fontu";
    DROP TYPE IF EXISTS "public"."enum_site_ayarlari_baslik_fontu";
  `)
}
