import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "iletisim_bilgileri" ADD COLUMN IF NOT EXISTS "sol_gorsel_id" integer;

    DO $$ BEGIN
      ALTER TABLE "iletisim_bilgileri" ADD CONSTRAINT "iletisim_bilgileri_sol_gorsel_id_medyalar_id_fk" FOREIGN KEY ("sol_gorsel_id") REFERENCES "public"."medyalar"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "iletisim_bilgileri_sol_gorsel_idx" ON "iletisim_bilgileri" USING btree ("sol_gorsel_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "iletisim_bilgileri" DROP COLUMN IF EXISTS "sol_gorsel_id";
  `)
}
