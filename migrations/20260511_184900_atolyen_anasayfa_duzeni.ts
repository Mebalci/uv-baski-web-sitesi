import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_site_reklamlari_konum" AS ENUM(
      'anasayfa_sol_ust',
      'anasayfa_hero',
      'anasayfa_sol_alt',
      'anasayfa_alt',
      'detay_sag',
      'hakkimizda_sag',
      'iletisim_sag'
    );
    CREATE TYPE "public"."enum_site_reklamlari_durum" AS ENUM('taslak', 'yayinda');
    CREATE TYPE "public"."enum_urun_kategorileri_detay_liste_tipi" AS ENUM(
      'gorsel_galeri',
      'fiyatli_urun_grid',
      'fiyatsiz_ornek_grid'
    );

    CREATE TABLE "site_reklamlari" (
      "id" serial PRIMARY KEY NOT NULL,
      "baslik" varchar NOT NULL,
      "konum" "enum_site_reklamlari_konum" NOT NULL,
      "gorsel_id" integer NOT NULL,
      "link" varchar,
      "yeni_sekmede_acilsin_mi" boolean DEFAULT false,
      "alt_metin" varchar,
      "durum" "enum_site_reklamlari_durum" DEFAULT 'yayinda' NOT NULL,
      "yayin_tarihi" timestamp(3) with time zone,
      "sira_no" numeric,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    ALTER TABLE "site_ayarlari" ADD COLUMN "logo_id" integer;
    ALTER TABLE "urun_kategorileri" ADD COLUMN "kart_el_yazisi_baslik" varchar;
    ALTER TABLE "urun_kategorileri" ADD COLUMN "kart_gorseli_id" integer;
    ALTER TABLE "urun_kategorileri" ADD COLUMN "kart_link_metni" varchar;
    ALTER TABLE "urun_kategorileri" ADD COLUMN "kart_logo_gosterilsin_mi" boolean DEFAULT true;
    ALTER TABLE "urun_kategorileri" ADD COLUMN "detay_el_yazisi_baslik" varchar;
    ALTER TABLE "urun_kategorileri" ADD COLUMN "detay_sol_gorsel_id" integer;
    ALTER TABLE "urun_kategorileri" ADD COLUMN "detay_aciklama" varchar;
    ALTER TABLE "urun_kategorileri" ADD COLUMN "detay_liste_basligi" varchar;
    ALTER TABLE "urun_kategorileri" ADD COLUMN "detay_liste_tipi" "enum_urun_kategorileri_detay_liste_tipi" DEFAULT 'fiyatsiz_ornek_grid';
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "site_reklamlari_id" integer;

    ALTER TABLE "ana_sayfa_icerigi" DROP COLUMN IF EXISTS "kategori_baslik";
    ALTER TABLE "ana_sayfa_icerigi" DROP COLUMN IF EXISTS "urun_baslik";
    ALTER TABLE "ana_sayfa_icerigi" DROP COLUMN IF EXISTS "urun_aciklama";
    ALTER TABLE "ana_sayfa_icerigi" DROP COLUMN IF EXISTS "portfoy_baslik";
    ALTER TABLE "ana_sayfa_icerigi" DROP COLUMN IF EXISTS "portfoy_aciklama";
    ALTER TABLE "ana_sayfa_icerigi" DROP COLUMN IF EXISTS "kampanya_baslik";
    ALTER TABLE "ana_sayfa_icerigi" DROP COLUMN IF EXISTS "kampanya_aciklama";
    ALTER TABLE "ana_sayfa_icerigi" DROP COLUMN IF EXISTS "blog_baslik";
    ALTER TABLE "ana_sayfa_icerigi" DROP COLUMN IF EXISTS "blog_aciklama";
    ALTER TABLE "ana_sayfa_icerigi" DROP COLUMN IF EXISTS "teklif_baslik";
    ALTER TABLE "ana_sayfa_icerigi" DROP COLUMN IF EXISTS "teklif_aciklama";

    ALTER TABLE IF EXISTS "ana_sayfa_icerigi_hero_kayitlari" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE IF EXISTS "ana_sayfa_icerigi_istatistikler" DISABLE ROW LEVEL SECURITY;
    ALTER TABLE IF EXISTS "ana_sayfa_icerigi_surec_adimlari" DISABLE ROW LEVEL SECURITY;
    DROP TABLE IF EXISTS "ana_sayfa_icerigi_hero_kayitlari" CASCADE;
    DROP TABLE IF EXISTS "ana_sayfa_icerigi_istatistikler" CASCADE;
    DROP TABLE IF EXISTS "ana_sayfa_icerigi_surec_adimlari" CASCADE;

    ALTER TABLE "site_reklamlari" ADD CONSTRAINT "site_reklamlari_gorsel_id_medyalar_id_fk" FOREIGN KEY ("gorsel_id") REFERENCES "public"."medyalar"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "site_ayarlari" ADD CONSTRAINT "site_ayarlari_logo_id_medyalar_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."medyalar"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "urun_kategorileri" ADD CONSTRAINT "urun_kategorileri_kart_gorseli_id_medyalar_id_fk" FOREIGN KEY ("kart_gorseli_id") REFERENCES "public"."medyalar"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "urun_kategorileri" ADD CONSTRAINT "urun_kategorileri_detay_sol_gorsel_id_medyalar_id_fk" FOREIGN KEY ("detay_sol_gorsel_id") REFERENCES "public"."medyalar"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_site_reklamlari_fk" FOREIGN KEY ("site_reklamlari_id") REFERENCES "public"."site_reklamlari"("id") ON DELETE cascade ON UPDATE no action;

    CREATE INDEX "site_reklamlari_gorsel_idx" ON "site_reklamlari" USING btree ("gorsel_id");
    CREATE INDEX "site_reklamlari_updated_at_idx" ON "site_reklamlari" USING btree ("updated_at");
    CREATE INDEX "site_reklamlari_created_at_idx" ON "site_reklamlari" USING btree ("created_at");
    CREATE INDEX "site_ayarlari_logo_idx" ON "site_ayarlari" USING btree ("logo_id");
    CREATE INDEX "urun_kategorileri_kart_gorseli_idx" ON "urun_kategorileri" USING btree ("kart_gorseli_id");
    CREATE INDEX "urun_kategorileri_detay_sol_gorsel_idx" ON "urun_kategorileri" USING btree ("detay_sol_gorsel_id");
    CREATE INDEX "payload_locked_documents_rels_site_reklamlari_id_idx" ON "payload_locked_documents_rels" USING btree ("site_reklamlari_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_reklamlari" DISABLE ROW LEVEL SECURITY;
    DROP TABLE "site_reklamlari" CASCADE;

    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "site_reklamlari_id";
    ALTER TABLE "site_ayarlari" DROP COLUMN IF EXISTS "logo_id";
    ALTER TABLE "urun_kategorileri" DROP COLUMN IF EXISTS "kart_el_yazisi_baslik";
    ALTER TABLE "urun_kategorileri" DROP COLUMN IF EXISTS "kart_gorseli_id";
    ALTER TABLE "urun_kategorileri" DROP COLUMN IF EXISTS "kart_link_metni";
    ALTER TABLE "urun_kategorileri" DROP COLUMN IF EXISTS "kart_logo_gosterilsin_mi";
    ALTER TABLE "urun_kategorileri" DROP COLUMN IF EXISTS "detay_el_yazisi_baslik";
    ALTER TABLE "urun_kategorileri" DROP COLUMN IF EXISTS "detay_sol_gorsel_id";
    ALTER TABLE "urun_kategorileri" DROP COLUMN IF EXISTS "detay_aciklama";
    ALTER TABLE "urun_kategorileri" DROP COLUMN IF EXISTS "detay_liste_basligi";
    ALTER TABLE "urun_kategorileri" DROP COLUMN IF EXISTS "detay_liste_tipi";

    ALTER TABLE "ana_sayfa_icerigi" ADD COLUMN "kategori_baslik" varchar;
    ALTER TABLE "ana_sayfa_icerigi" ADD COLUMN "urun_baslik" varchar;
    ALTER TABLE "ana_sayfa_icerigi" ADD COLUMN "urun_aciklama" varchar;
    ALTER TABLE "ana_sayfa_icerigi" ADD COLUMN "portfoy_baslik" varchar;
    ALTER TABLE "ana_sayfa_icerigi" ADD COLUMN "portfoy_aciklama" varchar;
    ALTER TABLE "ana_sayfa_icerigi" ADD COLUMN "kampanya_baslik" varchar;
    ALTER TABLE "ana_sayfa_icerigi" ADD COLUMN "kampanya_aciklama" varchar;
    ALTER TABLE "ana_sayfa_icerigi" ADD COLUMN "blog_baslik" varchar;
    ALTER TABLE "ana_sayfa_icerigi" ADD COLUMN "blog_aciklama" varchar;
    ALTER TABLE "ana_sayfa_icerigi" ADD COLUMN "teklif_baslik" varchar;
    ALTER TABLE "ana_sayfa_icerigi" ADD COLUMN "teklif_aciklama" varchar;

    CREATE TABLE "ana_sayfa_icerigi_hero_kayitlari" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "etiket" varchar,
      "baslik" varchar,
      "metin" varchar,
      "gorsel_id" integer,
      "birincil_buton_metin" varchar,
      "birincil_buton_link" varchar,
      "ikincil_buton_metin" varchar,
      "ikincil_buton_link" varchar
    );
    CREATE TABLE "ana_sayfa_icerigi_istatistikler" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "deger" varchar,
      "aciklama" varchar
    );
    CREATE TABLE "ana_sayfa_icerigi_surec_adimlari" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "adim" varchar,
      "aciklama" varchar
    );

    ALTER TABLE "ana_sayfa_icerigi_hero_kayitlari" ADD CONSTRAINT "ana_sayfa_icerigi_hero_kayitlari_gorsel_id_medyalar_id_fk" FOREIGN KEY ("gorsel_id") REFERENCES "public"."medyalar"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "ana_sayfa_icerigi_hero_kayitlari" ADD CONSTRAINT "ana_sayfa_icerigi_hero_kayitlari_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ana_sayfa_icerigi"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "ana_sayfa_icerigi_istatistikler" ADD CONSTRAINT "ana_sayfa_icerigi_istatistikler_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ana_sayfa_icerigi"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "ana_sayfa_icerigi_surec_adimlari" ADD CONSTRAINT "ana_sayfa_icerigi_surec_adimlari_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ana_sayfa_icerigi"("id") ON DELETE cascade ON UPDATE no action;

    CREATE INDEX "ana_sayfa_icerigi_hero_kayitlari_order_idx" ON "ana_sayfa_icerigi_hero_kayitlari" USING btree ("_order");
    CREATE INDEX "ana_sayfa_icerigi_hero_kayitlari_parent_id_idx" ON "ana_sayfa_icerigi_hero_kayitlari" USING btree ("_parent_id");
    CREATE INDEX "ana_sayfa_icerigi_hero_kayitlari_gorsel_idx" ON "ana_sayfa_icerigi_hero_kayitlari" USING btree ("gorsel_id");
    CREATE INDEX "ana_sayfa_icerigi_istatistikler_order_idx" ON "ana_sayfa_icerigi_istatistikler" USING btree ("_order");
    CREATE INDEX "ana_sayfa_icerigi_istatistikler_parent_id_idx" ON "ana_sayfa_icerigi_istatistikler" USING btree ("_parent_id");
    CREATE INDEX "ana_sayfa_icerigi_surec_adimlari_order_idx" ON "ana_sayfa_icerigi_surec_adimlari" USING btree ("_order");
    CREATE INDEX "ana_sayfa_icerigi_surec_adimlari_parent_id_idx" ON "ana_sayfa_icerigi_surec_adimlari" USING btree ("_parent_id");

    DROP TYPE "public"."enum_site_reklamlari_konum";
    DROP TYPE "public"."enum_site_reklamlari_durum";
    DROP TYPE "public"."enum_urun_kategorileri_detay_liste_tipi";
  `)
}
