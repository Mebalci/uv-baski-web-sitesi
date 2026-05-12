import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "urun_kategorileri" ADD COLUMN IF NOT EXISTS "yonlendirme_linki" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "urun_kategorileri" DROP COLUMN IF EXISTS "yonlendirme_linki";
  `)
}
