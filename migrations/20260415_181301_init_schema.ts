import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_urunler_durum" AS ENUM('taslak', 'yayinda');
  CREATE TYPE "public"."enum_urun_kategorileri_durum" AS ENUM('taslak', 'yayinda');
  CREATE TYPE "public"."enum_portfoy_projeleri_durum" AS ENUM('taslak', 'yayinda');
  CREATE TYPE "public"."enum_kampanyalar_durum" AS ENUM('taslak', 'yayinda');
  CREATE TYPE "public"."enum_sayfalar_durum" AS ENUM('taslak', 'yayinda');
  CREATE TYPE "public"."enum_blog_yazilari_durum" AS ENUM('taslak', 'yayinda');
  CREATE TYPE "public"."enum_yoneticiler_rol" AS ENUM('super_admin', 'editor');
  CREATE TABLE "medyalar" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"kaynak" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_kucuk_url" varchar,
  	"sizes_kucuk_width" numeric,
  	"sizes_kucuk_height" numeric,
  	"sizes_kucuk_mime_type" varchar,
  	"sizes_kucuk_filesize" numeric,
  	"sizes_kucuk_filename" varchar,
  	"sizes_buyuk_url" varchar,
  	"sizes_buyuk_width" numeric,
  	"sizes_buyuk_height" numeric,
  	"sizes_buyuk_mime_type" varchar,
  	"sizes_buyuk_filesize" numeric,
  	"sizes_buyuk_filename" varchar
  );
  
  CREATE TABLE "urunler" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"baslik" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"kisa_aciklama" varchar,
  	"kapak_gorseli_id" integer,
  	"kategori_id" integer NOT NULL,
  	"icerik" jsonb,
  	"baslangic_fiyati" numeric,
  	"fiyat_gosterilsin_mi" boolean DEFAULT false,
  	"teklif_formu_aktif_mi" boolean DEFAULT true,
  	"teklif_konusu" varchar,
  	"whatsapp_mesaji" varchar,
  	"durum" "enum_urunler_durum" DEFAULT 'yayinda' NOT NULL,
  	"yayin_tarihi" timestamp(3) with time zone,
  	"sira_no" numeric,
  	"seo_seo_baslik" varchar,
  	"seo_seo_aciklama" varchar,
  	"seo_kanonik_url" varchar,
  	"seo_open_graph_gorseli_id" integer,
  	"seo_indekslensin_mi" boolean DEFAULT true,
  	"seo_yapilandirilmis_veri" jsonb,
  	"seo_kontrol_notu" varchar DEFAULT 'Kontrol et: slug dolu mu, SEO başlığı 70 karakter altında mı, açıklama 160 karakteri geçmiyor mu?',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "urunler_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"medyalar_id" integer
  );
  
  CREATE TABLE "urun_kategorileri" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"baslik" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"kisa_aciklama" varchar,
  	"kapak_gorseli_id" integer,
  	"one_cikan" boolean DEFAULT false,
  	"durum" "enum_urun_kategorileri_durum" DEFAULT 'yayinda' NOT NULL,
  	"yayin_tarihi" timestamp(3) with time zone,
  	"sira_no" numeric,
  	"seo_seo_baslik" varchar,
  	"seo_seo_aciklama" varchar,
  	"seo_kanonik_url" varchar,
  	"seo_open_graph_gorseli_id" integer,
  	"seo_indekslensin_mi" boolean DEFAULT true,
  	"seo_yapilandirilmis_veri" jsonb,
  	"seo_kontrol_notu" varchar DEFAULT 'Kontrol et: slug dolu mu, SEO başlığı 70 karakter altında mı, açıklama 160 karakteri geçmiyor mu?',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "portfoy_projeleri" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"baslik" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"kisa_aciklama" varchar,
  	"kapak_gorseli_id" integer,
  	"musteri_adi" varchar,
  	"icerik" jsonb,
  	"referans_notu" varchar,
  	"durum" "enum_portfoy_projeleri_durum" DEFAULT 'yayinda' NOT NULL,
  	"yayin_tarihi" timestamp(3) with time zone,
  	"sira_no" numeric,
  	"seo_seo_baslik" varchar,
  	"seo_seo_aciklama" varchar,
  	"seo_kanonik_url" varchar,
  	"seo_open_graph_gorseli_id" integer,
  	"seo_indekslensin_mi" boolean DEFAULT true,
  	"seo_yapilandirilmis_veri" jsonb,
  	"seo_kontrol_notu" varchar DEFAULT 'Kontrol et: slug dolu mu, SEO başlığı 70 karakter altında mı, açıklama 160 karakteri geçmiyor mu?',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "portfoy_projeleri_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"medyalar_id" integer
  );
  
  CREATE TABLE "kampanyalar" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"baslik" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"kisa_aciklama" varchar,
  	"kapak_gorseli_id" integer,
  	"icerik" jsonb,
  	"baslangic_tarihi" timestamp(3) with time zone NOT NULL,
  	"bitis_tarihi" timestamp(3) with time zone NOT NULL,
  	"one_cikart" boolean DEFAULT false,
  	"sayac_goster" boolean DEFAULT true,
  	"durum" "enum_kampanyalar_durum" DEFAULT 'yayinda' NOT NULL,
  	"yayin_tarihi" timestamp(3) with time zone,
  	"sira_no" numeric,
  	"seo_seo_baslik" varchar,
  	"seo_seo_aciklama" varchar,
  	"seo_kanonik_url" varchar,
  	"seo_open_graph_gorseli_id" integer,
  	"seo_indekslensin_mi" boolean DEFAULT true,
  	"seo_yapilandirilmis_veri" jsonb,
  	"seo_kontrol_notu" varchar DEFAULT 'Kontrol et: slug dolu mu, SEO başlığı 70 karakter altında mı, açıklama 160 karakteri geçmiyor mu?',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "sayfalar" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"baslik" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"kisa_aciklama" varchar,
  	"kapak_gorseli_id" integer,
  	"icerik" jsonb,
  	"durum" "enum_sayfalar_durum" DEFAULT 'yayinda' NOT NULL,
  	"yayin_tarihi" timestamp(3) with time zone,
  	"sira_no" numeric,
  	"seo_seo_baslik" varchar,
  	"seo_seo_aciklama" varchar,
  	"seo_kanonik_url" varchar,
  	"seo_open_graph_gorseli_id" integer,
  	"seo_indekslensin_mi" boolean DEFAULT true,
  	"seo_yapilandirilmis_veri" jsonb,
  	"seo_kontrol_notu" varchar DEFAULT 'Kontrol et: slug dolu mu, SEO başlığı 70 karakter altında mı, açıklama 160 karakteri geçmiyor mu?',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "blog_yazilari" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"baslik" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"kisa_aciklama" varchar,
  	"kapak_gorseli_id" integer,
  	"icerik" jsonb,
  	"durum" "enum_blog_yazilari_durum" DEFAULT 'yayinda' NOT NULL,
  	"yayin_tarihi" timestamp(3) with time zone,
  	"sira_no" numeric,
  	"seo_seo_baslik" varchar,
  	"seo_seo_aciklama" varchar,
  	"seo_kanonik_url" varchar,
  	"seo_open_graph_gorseli_id" integer,
  	"seo_indekslensin_mi" boolean DEFAULT true,
  	"seo_yapilandirilmis_veri" jsonb,
  	"seo_kontrol_notu" varchar DEFAULT 'Kontrol et: slug dolu mu, SEO başlığı 70 karakter altında mı, açıklama 160 karakteri geçmiyor mu?',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "blog_yazilari_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "yoneticiler_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "yoneticiler" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"ad" varchar NOT NULL,
  	"rol" "enum_yoneticiler_rol" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"medyalar_id" integer,
  	"urunler_id" integer,
  	"urun_kategorileri_id" integer,
  	"portfoy_projeleri_id" integer,
  	"kampanyalar_id" integer,
  	"sayfalar_id" integer,
  	"blog_yazilari_id" integer,
  	"yoneticiler_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"yoneticiler_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_ayarlari" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"firma_adi" varchar NOT NULL,
  	"aciklama" varchar NOT NULL,
  	"telefon" varchar,
  	"eposta" varchar,
  	"adres" varchar,
  	"seo_seo_baslik" varchar,
  	"seo_seo_aciklama" varchar,
  	"seo_kanonik_url" varchar,
  	"seo_open_graph_gorseli_id" integer,
  	"seo_indekslensin_mi" boolean DEFAULT true,
  	"seo_yapilandirilmis_veri" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "ust_bilgi_menu_ogeleri" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"etiket" varchar NOT NULL,
  	"baglanti" varchar NOT NULL
  );
  
  CREATE TABLE "ust_bilgi" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "alt_bilgi_linkler" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"etiket" varchar NOT NULL,
  	"baglanti" varchar NOT NULL
  );
  
  CREATE TABLE "alt_bilgi" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"metin" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "iletisim_bilgileri" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"telefon" varchar,
  	"eposta" varchar,
  	"adres" varchar,
  	"calisma_saatleri" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
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
  
  CREATE TABLE "ana_sayfa_icerigi" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"kategori_baslik" varchar,
  	"kategori_aciklama" varchar,
  	"urun_baslik" varchar,
  	"urun_aciklama" varchar,
  	"portfoy_baslik" varchar,
  	"portfoy_aciklama" varchar,
  	"kampanya_baslik" varchar,
  	"kampanya_aciklama" varchar,
  	"blog_baslik" varchar,
  	"blog_aciklama" varchar,
  	"teklif_baslik" varchar,
  	"teklif_aciklama" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "urunler" ADD CONSTRAINT "urunler_kapak_gorseli_id_medyalar_id_fk" FOREIGN KEY ("kapak_gorseli_id") REFERENCES "public"."medyalar"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "urunler" ADD CONSTRAINT "urunler_kategori_id_urun_kategorileri_id_fk" FOREIGN KEY ("kategori_id") REFERENCES "public"."urun_kategorileri"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "urunler" ADD CONSTRAINT "urunler_seo_open_graph_gorseli_id_medyalar_id_fk" FOREIGN KEY ("seo_open_graph_gorseli_id") REFERENCES "public"."medyalar"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "urunler_rels" ADD CONSTRAINT "urunler_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."urunler"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "urunler_rels" ADD CONSTRAINT "urunler_rels_medyalar_fk" FOREIGN KEY ("medyalar_id") REFERENCES "public"."medyalar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "urun_kategorileri" ADD CONSTRAINT "urun_kategorileri_kapak_gorseli_id_medyalar_id_fk" FOREIGN KEY ("kapak_gorseli_id") REFERENCES "public"."medyalar"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "urun_kategorileri" ADD CONSTRAINT "urun_kategorileri_seo_open_graph_gorseli_id_medyalar_id_fk" FOREIGN KEY ("seo_open_graph_gorseli_id") REFERENCES "public"."medyalar"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfoy_projeleri" ADD CONSTRAINT "portfoy_projeleri_kapak_gorseli_id_medyalar_id_fk" FOREIGN KEY ("kapak_gorseli_id") REFERENCES "public"."medyalar"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfoy_projeleri" ADD CONSTRAINT "portfoy_projeleri_seo_open_graph_gorseli_id_medyalar_id_fk" FOREIGN KEY ("seo_open_graph_gorseli_id") REFERENCES "public"."medyalar"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfoy_projeleri_rels" ADD CONSTRAINT "portfoy_projeleri_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."portfoy_projeleri"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfoy_projeleri_rels" ADD CONSTRAINT "portfoy_projeleri_rels_medyalar_fk" FOREIGN KEY ("medyalar_id") REFERENCES "public"."medyalar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kampanyalar" ADD CONSTRAINT "kampanyalar_kapak_gorseli_id_medyalar_id_fk" FOREIGN KEY ("kapak_gorseli_id") REFERENCES "public"."medyalar"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "kampanyalar" ADD CONSTRAINT "kampanyalar_seo_open_graph_gorseli_id_medyalar_id_fk" FOREIGN KEY ("seo_open_graph_gorseli_id") REFERENCES "public"."medyalar"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sayfalar" ADD CONSTRAINT "sayfalar_kapak_gorseli_id_medyalar_id_fk" FOREIGN KEY ("kapak_gorseli_id") REFERENCES "public"."medyalar"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sayfalar" ADD CONSTRAINT "sayfalar_seo_open_graph_gorseli_id_medyalar_id_fk" FOREIGN KEY ("seo_open_graph_gorseli_id") REFERENCES "public"."medyalar"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_yazilari" ADD CONSTRAINT "blog_yazilari_kapak_gorseli_id_medyalar_id_fk" FOREIGN KEY ("kapak_gorseli_id") REFERENCES "public"."medyalar"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_yazilari" ADD CONSTRAINT "blog_yazilari_seo_open_graph_gorseli_id_medyalar_id_fk" FOREIGN KEY ("seo_open_graph_gorseli_id") REFERENCES "public"."medyalar"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_yazilari_texts" ADD CONSTRAINT "blog_yazilari_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_yazilari"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "yoneticiler_sessions" ADD CONSTRAINT "yoneticiler_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."yoneticiler"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_medyalar_fk" FOREIGN KEY ("medyalar_id") REFERENCES "public"."medyalar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_urunler_fk" FOREIGN KEY ("urunler_id") REFERENCES "public"."urunler"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_urun_kategorileri_fk" FOREIGN KEY ("urun_kategorileri_id") REFERENCES "public"."urun_kategorileri"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_portfoy_projeleri_fk" FOREIGN KEY ("portfoy_projeleri_id") REFERENCES "public"."portfoy_projeleri"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_kampanyalar_fk" FOREIGN KEY ("kampanyalar_id") REFERENCES "public"."kampanyalar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sayfalar_fk" FOREIGN KEY ("sayfalar_id") REFERENCES "public"."sayfalar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_yazilari_fk" FOREIGN KEY ("blog_yazilari_id") REFERENCES "public"."blog_yazilari"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_yoneticiler_fk" FOREIGN KEY ("yoneticiler_id") REFERENCES "public"."yoneticiler"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_yoneticiler_fk" FOREIGN KEY ("yoneticiler_id") REFERENCES "public"."yoneticiler"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_ayarlari" ADD CONSTRAINT "site_ayarlari_seo_open_graph_gorseli_id_medyalar_id_fk" FOREIGN KEY ("seo_open_graph_gorseli_id") REFERENCES "public"."medyalar"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ust_bilgi_menu_ogeleri" ADD CONSTRAINT "ust_bilgi_menu_ogeleri_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ust_bilgi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "alt_bilgi_linkler" ADD CONSTRAINT "alt_bilgi_linkler_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."alt_bilgi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ana_sayfa_icerigi_hero_kayitlari" ADD CONSTRAINT "ana_sayfa_icerigi_hero_kayitlari_gorsel_id_medyalar_id_fk" FOREIGN KEY ("gorsel_id") REFERENCES "public"."medyalar"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ana_sayfa_icerigi_hero_kayitlari" ADD CONSTRAINT "ana_sayfa_icerigi_hero_kayitlari_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ana_sayfa_icerigi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ana_sayfa_icerigi_istatistikler" ADD CONSTRAINT "ana_sayfa_icerigi_istatistikler_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ana_sayfa_icerigi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ana_sayfa_icerigi_surec_adimlari" ADD CONSTRAINT "ana_sayfa_icerigi_surec_adimlari_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ana_sayfa_icerigi"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "medyalar_updated_at_idx" ON "medyalar" USING btree ("updated_at");
  CREATE INDEX "medyalar_created_at_idx" ON "medyalar" USING btree ("created_at");
  CREATE UNIQUE INDEX "medyalar_filename_idx" ON "medyalar" USING btree ("filename");
  CREATE INDEX "medyalar_sizes_kucuk_sizes_kucuk_filename_idx" ON "medyalar" USING btree ("sizes_kucuk_filename");
  CREATE INDEX "medyalar_sizes_buyuk_sizes_buyuk_filename_idx" ON "medyalar" USING btree ("sizes_buyuk_filename");
  CREATE UNIQUE INDEX "urunler_slug_idx" ON "urunler" USING btree ("slug");
  CREATE INDEX "urunler_kapak_gorseli_idx" ON "urunler" USING btree ("kapak_gorseli_id");
  CREATE INDEX "urunler_kategori_idx" ON "urunler" USING btree ("kategori_id");
  CREATE INDEX "urunler_seo_seo_open_graph_gorseli_idx" ON "urunler" USING btree ("seo_open_graph_gorseli_id");
  CREATE INDEX "urunler_updated_at_idx" ON "urunler" USING btree ("updated_at");
  CREATE INDEX "urunler_created_at_idx" ON "urunler" USING btree ("created_at");
  CREATE INDEX "urunler_rels_order_idx" ON "urunler_rels" USING btree ("order");
  CREATE INDEX "urunler_rels_parent_idx" ON "urunler_rels" USING btree ("parent_id");
  CREATE INDEX "urunler_rels_path_idx" ON "urunler_rels" USING btree ("path");
  CREATE INDEX "urunler_rels_medyalar_id_idx" ON "urunler_rels" USING btree ("medyalar_id");
  CREATE UNIQUE INDEX "urun_kategorileri_slug_idx" ON "urun_kategorileri" USING btree ("slug");
  CREATE INDEX "urun_kategorileri_kapak_gorseli_idx" ON "urun_kategorileri" USING btree ("kapak_gorseli_id");
  CREATE INDEX "urun_kategorileri_seo_seo_open_graph_gorseli_idx" ON "urun_kategorileri" USING btree ("seo_open_graph_gorseli_id");
  CREATE INDEX "urun_kategorileri_updated_at_idx" ON "urun_kategorileri" USING btree ("updated_at");
  CREATE INDEX "urun_kategorileri_created_at_idx" ON "urun_kategorileri" USING btree ("created_at");
  CREATE UNIQUE INDEX "portfoy_projeleri_slug_idx" ON "portfoy_projeleri" USING btree ("slug");
  CREATE INDEX "portfoy_projeleri_kapak_gorseli_idx" ON "portfoy_projeleri" USING btree ("kapak_gorseli_id");
  CREATE INDEX "portfoy_projeleri_seo_seo_open_graph_gorseli_idx" ON "portfoy_projeleri" USING btree ("seo_open_graph_gorseli_id");
  CREATE INDEX "portfoy_projeleri_updated_at_idx" ON "portfoy_projeleri" USING btree ("updated_at");
  CREATE INDEX "portfoy_projeleri_created_at_idx" ON "portfoy_projeleri" USING btree ("created_at");
  CREATE INDEX "portfoy_projeleri_rels_order_idx" ON "portfoy_projeleri_rels" USING btree ("order");
  CREATE INDEX "portfoy_projeleri_rels_parent_idx" ON "portfoy_projeleri_rels" USING btree ("parent_id");
  CREATE INDEX "portfoy_projeleri_rels_path_idx" ON "portfoy_projeleri_rels" USING btree ("path");
  CREATE INDEX "portfoy_projeleri_rels_medyalar_id_idx" ON "portfoy_projeleri_rels" USING btree ("medyalar_id");
  CREATE UNIQUE INDEX "kampanyalar_slug_idx" ON "kampanyalar" USING btree ("slug");
  CREATE INDEX "kampanyalar_kapak_gorseli_idx" ON "kampanyalar" USING btree ("kapak_gorseli_id");
  CREATE INDEX "kampanyalar_seo_seo_open_graph_gorseli_idx" ON "kampanyalar" USING btree ("seo_open_graph_gorseli_id");
  CREATE INDEX "kampanyalar_updated_at_idx" ON "kampanyalar" USING btree ("updated_at");
  CREATE INDEX "kampanyalar_created_at_idx" ON "kampanyalar" USING btree ("created_at");
  CREATE UNIQUE INDEX "sayfalar_slug_idx" ON "sayfalar" USING btree ("slug");
  CREATE INDEX "sayfalar_kapak_gorseli_idx" ON "sayfalar" USING btree ("kapak_gorseli_id");
  CREATE INDEX "sayfalar_seo_seo_open_graph_gorseli_idx" ON "sayfalar" USING btree ("seo_open_graph_gorseli_id");
  CREATE INDEX "sayfalar_updated_at_idx" ON "sayfalar" USING btree ("updated_at");
  CREATE INDEX "sayfalar_created_at_idx" ON "sayfalar" USING btree ("created_at");
  CREATE UNIQUE INDEX "blog_yazilari_slug_idx" ON "blog_yazilari" USING btree ("slug");
  CREATE INDEX "blog_yazilari_kapak_gorseli_idx" ON "blog_yazilari" USING btree ("kapak_gorseli_id");
  CREATE INDEX "blog_yazilari_seo_seo_open_graph_gorseli_idx" ON "blog_yazilari" USING btree ("seo_open_graph_gorseli_id");
  CREATE INDEX "blog_yazilari_updated_at_idx" ON "blog_yazilari" USING btree ("updated_at");
  CREATE INDEX "blog_yazilari_created_at_idx" ON "blog_yazilari" USING btree ("created_at");
  CREATE INDEX "blog_yazilari_texts_order_parent" ON "blog_yazilari_texts" USING btree ("order","parent_id");
  CREATE INDEX "yoneticiler_sessions_order_idx" ON "yoneticiler_sessions" USING btree ("_order");
  CREATE INDEX "yoneticiler_sessions_parent_id_idx" ON "yoneticiler_sessions" USING btree ("_parent_id");
  CREATE INDEX "yoneticiler_updated_at_idx" ON "yoneticiler" USING btree ("updated_at");
  CREATE INDEX "yoneticiler_created_at_idx" ON "yoneticiler" USING btree ("created_at");
  CREATE UNIQUE INDEX "yoneticiler_email_idx" ON "yoneticiler" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_medyalar_id_idx" ON "payload_locked_documents_rels" USING btree ("medyalar_id");
  CREATE INDEX "payload_locked_documents_rels_urunler_id_idx" ON "payload_locked_documents_rels" USING btree ("urunler_id");
  CREATE INDEX "payload_locked_documents_rels_urun_kategorileri_id_idx" ON "payload_locked_documents_rels" USING btree ("urun_kategorileri_id");
  CREATE INDEX "payload_locked_documents_rels_portfoy_projeleri_id_idx" ON "payload_locked_documents_rels" USING btree ("portfoy_projeleri_id");
  CREATE INDEX "payload_locked_documents_rels_kampanyalar_id_idx" ON "payload_locked_documents_rels" USING btree ("kampanyalar_id");
  CREATE INDEX "payload_locked_documents_rels_sayfalar_id_idx" ON "payload_locked_documents_rels" USING btree ("sayfalar_id");
  CREATE INDEX "payload_locked_documents_rels_blog_yazilari_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_yazilari_id");
  CREATE INDEX "payload_locked_documents_rels_yoneticiler_id_idx" ON "payload_locked_documents_rels" USING btree ("yoneticiler_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_yoneticiler_id_idx" ON "payload_preferences_rels" USING btree ("yoneticiler_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_ayarlari_seo_seo_open_graph_gorseli_idx" ON "site_ayarlari" USING btree ("seo_open_graph_gorseli_id");
  CREATE INDEX "ust_bilgi_menu_ogeleri_order_idx" ON "ust_bilgi_menu_ogeleri" USING btree ("_order");
  CREATE INDEX "ust_bilgi_menu_ogeleri_parent_id_idx" ON "ust_bilgi_menu_ogeleri" USING btree ("_parent_id");
  CREATE INDEX "alt_bilgi_linkler_order_idx" ON "alt_bilgi_linkler" USING btree ("_order");
  CREATE INDEX "alt_bilgi_linkler_parent_id_idx" ON "alt_bilgi_linkler" USING btree ("_parent_id");
  CREATE INDEX "ana_sayfa_icerigi_hero_kayitlari_order_idx" ON "ana_sayfa_icerigi_hero_kayitlari" USING btree ("_order");
  CREATE INDEX "ana_sayfa_icerigi_hero_kayitlari_parent_id_idx" ON "ana_sayfa_icerigi_hero_kayitlari" USING btree ("_parent_id");
  CREATE INDEX "ana_sayfa_icerigi_hero_kayitlari_gorsel_idx" ON "ana_sayfa_icerigi_hero_kayitlari" USING btree ("gorsel_id");
  CREATE INDEX "ana_sayfa_icerigi_istatistikler_order_idx" ON "ana_sayfa_icerigi_istatistikler" USING btree ("_order");
  CREATE INDEX "ana_sayfa_icerigi_istatistikler_parent_id_idx" ON "ana_sayfa_icerigi_istatistikler" USING btree ("_parent_id");
  CREATE INDEX "ana_sayfa_icerigi_surec_adimlari_order_idx" ON "ana_sayfa_icerigi_surec_adimlari" USING btree ("_order");
  CREATE INDEX "ana_sayfa_icerigi_surec_adimlari_parent_id_idx" ON "ana_sayfa_icerigi_surec_adimlari" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "medyalar" CASCADE;
  DROP TABLE "urunler" CASCADE;
  DROP TABLE "urunler_rels" CASCADE;
  DROP TABLE "urun_kategorileri" CASCADE;
  DROP TABLE "portfoy_projeleri" CASCADE;
  DROP TABLE "portfoy_projeleri_rels" CASCADE;
  DROP TABLE "kampanyalar" CASCADE;
  DROP TABLE "sayfalar" CASCADE;
  DROP TABLE "blog_yazilari" CASCADE;
  DROP TABLE "blog_yazilari_texts" CASCADE;
  DROP TABLE "yoneticiler_sessions" CASCADE;
  DROP TABLE "yoneticiler" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_ayarlari" CASCADE;
  DROP TABLE "ust_bilgi_menu_ogeleri" CASCADE;
  DROP TABLE "ust_bilgi" CASCADE;
  DROP TABLE "alt_bilgi_linkler" CASCADE;
  DROP TABLE "alt_bilgi" CASCADE;
  DROP TABLE "iletisim_bilgileri" CASCADE;
  DROP TABLE "ana_sayfa_icerigi_hero_kayitlari" CASCADE;
  DROP TABLE "ana_sayfa_icerigi_istatistikler" CASCADE;
  DROP TABLE "ana_sayfa_icerigi_surec_adimlari" CASCADE;
  DROP TABLE "ana_sayfa_icerigi" CASCADE;
  DROP TYPE "public"."enum_urunler_durum";
  DROP TYPE "public"."enum_urun_kategorileri_durum";
  DROP TYPE "public"."enum_portfoy_projeleri_durum";
  DROP TYPE "public"."enum_kampanyalar_durum";
  DROP TYPE "public"."enum_sayfalar_durum";
  DROP TYPE "public"."enum_blog_yazilari_durum";
  DROP TYPE "public"."enum_yoneticiler_rol";`)
}
