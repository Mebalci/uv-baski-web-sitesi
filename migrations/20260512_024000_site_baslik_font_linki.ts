import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_ayarlari" ADD COLUMN IF NOT EXISTS "baslik_font_linki" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_ayarlari" DROP COLUMN IF EXISTS "baslik_font_linki";
  `)
}
