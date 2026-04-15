# UV Baskı Web Sitesi

Next.js 16, TypeScript, PostgreSQL ve Payload CMS ile hazırlanmış Türkçe odaklı UV baskı katalog sitesidir. Aynı uygulama içinde ön yüz, admin paneli ve içerik API'leri birlikte çalışır.

## Özellikler

- Türkçe içerik yapısı ve URL kurgusu
- Payload CMS ile ürün, kategori, portföy, kampanya, sayfa ve blog yönetimi
- `yoneticiler` koleksiyonu ile rol bazlı giriş
- Cloudflare R2 için S3 uyumlu medya hazırlığı
- SEO metadata, JSON-LD, sitemap ve robots üretimi
- Teklif odaklı iletişim formu ve Resend entegrasyonuna hazır bildirim akışı

## Geliştirme

1. `.env.example` dosyasını `.env.local` olarak kopyalayın.
2. PostgreSQL bağlantınızı `VERITABANI_URL` alanına yazın.
3. Gerekliyse R2 ve Resend bilgilerini ekleyin.
4. Kurulum:

```bash
npm install
```

5. Geliştirme sunucusu:

```bash
npm run dev
```

## Yönetim Paneli

- Yönetim paneli yolu: `/yonetim`
- REST API yolu: `/api/[...slug]`
- GraphQL yolu: `/api/graphql`

İlk kullanıcı oluşturma akışı Payload tarafından yönetilir. Veritabanı hazır ve `yoneticiler` auth koleksiyonu erişilebilir olduğunda ilk admin hesabı oluşturulabilir.

## Doğrulama

```bash
npm run build
npm run test
```

## Önerilen Yayın Mimarisi

- Uygulama: Vercel
- Veritabanı: Neon PostgreSQL
- Medya: Cloudflare R2
- Form bildirimleri: Resend

Bu kombinasyon başlangıç maliyeti düşük, bakım yükü az ve güvenlik açısından VPS'e göre daha rahattır.
