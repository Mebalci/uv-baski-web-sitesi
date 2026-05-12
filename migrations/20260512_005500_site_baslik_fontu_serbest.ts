import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_ayarlari" ADD COLUMN IF NOT EXISTS "baslik_font_adi" varchar DEFAULT 'Parisienne';
    ALTER TABLE "site_ayarlari" ADD COLUMN IF NOT EXISTS "baslik_font_css_url" varchar;
    ALTER TABLE "site_ayarlari" ADD COLUMN IF NOT EXISTS "baslik_font_family" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_ayarlari" DROP COLUMN IF EXISTS "baslik_font_adi";
    ALTER TABLE "site_ayarlari" DROP COLUMN IF EXISTS "baslik_font_css_url";
    ALTER TABLE "site_ayarlari" DROP COLUMN IF EXISTS "baslik_font_family";
  `)
}
