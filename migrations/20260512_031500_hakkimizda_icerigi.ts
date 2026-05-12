import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "hakkimizda_icerigi" (
      "id" serial PRIMARY KEY NOT NULL,
      "sol_gorsel_id" integer,
      "aciklama_metni" varchar,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    DO $$ BEGIN
      ALTER TABLE "hakkimizda_icerigi" ADD CONSTRAINT "hakkimizda_icerigi_sol_gorsel_id_medyalar_id_fk" FOREIGN KEY ("sol_gorsel_id") REFERENCES "public"."medyalar"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "hakkimizda_icerigi_sol_gorsel_idx" ON "hakkimizda_icerigi" USING btree ("sol_gorsel_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "hakkimizda_icerigi" CASCADE;
  `)
}
