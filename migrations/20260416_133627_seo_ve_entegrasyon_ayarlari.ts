import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "entegrasyon_ayarlari" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_indekslensin_mi" boolean DEFAULT true,
  	"google_search_console_dogrulama" varchar,
  	"robots_engellenen_yollar" varchar,
  	"google_analytics_olcum_kimligi" varchar,
  	"google_tag_manager_kimligi" varchar,
  	"yayin_kontrol_notu" varchar DEFAULT 'Yayin sonrasi kontrol: Search Console dogrulandi mi, GA4 veri geliyor mu, sitemap.xml gorunuyor mu, robots.txt dogru mu?',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "urunler" ALTER COLUMN "seo_kontrol_notu" SET DEFAULT 'Kontrol et: slug sabit mi, SEO basligi ozgun mu, aciklama 160 karakter altinda mi, indeksleme tercihi dogru mu?';
  ALTER TABLE "urun_kategorileri" ALTER COLUMN "seo_kontrol_notu" SET DEFAULT 'Kontrol et: slug sabit mi, SEO basligi ozgun mu, aciklama 160 karakter altinda mi, indeksleme tercihi dogru mu?';
  ALTER TABLE "portfoy_projeleri" ALTER COLUMN "seo_kontrol_notu" SET DEFAULT 'Kontrol et: slug sabit mi, SEO basligi ozgun mu, aciklama 160 karakter altinda mi, indeksleme tercihi dogru mu?';
  ALTER TABLE "kampanyalar" ALTER COLUMN "seo_kontrol_notu" SET DEFAULT 'Kontrol et: slug sabit mi, SEO basligi ozgun mu, aciklama 160 karakter altinda mi, indeksleme tercihi dogru mu?';
  ALTER TABLE "sayfalar" ALTER COLUMN "seo_kontrol_notu" SET DEFAULT 'Kontrol et: slug sabit mi, SEO basligi ozgun mu, aciklama 160 karakter altinda mi, indeksleme tercihi dogru mu?';
  ALTER TABLE "blog_yazilari" ALTER COLUMN "seo_kontrol_notu" SET DEFAULT 'Kontrol et: slug sabit mi, SEO basligi ozgun mu, aciklama 160 karakter altinda mi, indeksleme tercihi dogru mu?';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "entegrasyon_ayarlari" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "entegrasyon_ayarlari" CASCADE;
  ALTER TABLE "urunler" ALTER COLUMN "seo_kontrol_notu" SET DEFAULT 'Kontrol et: slug dolu mu, SEO başlığı 70 karakter altında mı, açıklama 160 karakteri geçmiyor mu?';
  ALTER TABLE "urun_kategorileri" ALTER COLUMN "seo_kontrol_notu" SET DEFAULT 'Kontrol et: slug dolu mu, SEO başlığı 70 karakter altında mı, açıklama 160 karakteri geçmiyor mu?';
  ALTER TABLE "portfoy_projeleri" ALTER COLUMN "seo_kontrol_notu" SET DEFAULT 'Kontrol et: slug dolu mu, SEO başlığı 70 karakter altında mı, açıklama 160 karakteri geçmiyor mu?';
  ALTER TABLE "kampanyalar" ALTER COLUMN "seo_kontrol_notu" SET DEFAULT 'Kontrol et: slug dolu mu, SEO başlığı 70 karakter altında mı, açıklama 160 karakteri geçmiyor mu?';
  ALTER TABLE "sayfalar" ALTER COLUMN "seo_kontrol_notu" SET DEFAULT 'Kontrol et: slug dolu mu, SEO başlığı 70 karakter altında mı, açıklama 160 karakteri geçmiyor mu?';
  ALTER TABLE "blog_yazilari" ALTER COLUMN "seo_kontrol_notu" SET DEFAULT 'Kontrol et: slug dolu mu, SEO başlığı 70 karakter altında mı, açıklama 160 karakteri geçmiyor mu?';`)
}
