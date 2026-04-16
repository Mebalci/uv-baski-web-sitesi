import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { BlogYazilari } from '@/koleksiyonlar/blog-yazilari'
import { Kampanyalar } from '@/koleksiyonlar/kampanyalar'
import { Medyalar } from '@/koleksiyonlar/medyalar'
import { PortfoyProjeleri } from '@/koleksiyonlar/portfoy-projeleri'
import { Sayfalar } from '@/koleksiyonlar/sayfalar'
import { UrunKategorileri } from '@/koleksiyonlar/urun-kategorileri'
import { Urunler } from '@/koleksiyonlar/urunler'
import { Yoneticiler } from '@/koleksiyonlar/yoneticiler'
import { AltBilgi } from '@/geneller/alt-bilgi'
import { AnaSayfaIcerigi } from '@/geneller/ana-sayfa-icerigi'
import { EntegrasyonAyarlari } from '@/geneller/entegrasyon-ayarlari'
import { IletisimBilgileri } from '@/geneller/iletisim-bilgileri'
import { SiteAyarlari } from '@/geneller/site-ayarlari'
import { UstBilgi } from '@/geneller/ust-bilgi'
import { epostaAdapterunuOlustur } from '@/payload/e-posta'
import { r2HazirMi } from '@/kutuphane/ortam'
import { siteUrlAl } from '@/kutuphane/yardimcilar'
import { buildConfig } from 'payload'
import sharp from 'sharp'

const r2Etkin = r2HazirMi()
const siteUrl = siteUrlAl()
const izinliOriginler = Array.from(
  new Set(
    [
      process.env.SITE_URL,
      process.env.NEXT_PUBLIC_SITE_URL,
      process.env.VERCEL_PROJECT_PRODUCTION_URL,
      process.env.VERCEL_URL,
      'http://localhost:3000',
    ]
      .filter(Boolean)
      .map((deger) => {
        const temizDeger = String(deger).trim()

        if (/^https?:\/\//i.test(temizDeger)) {
          return temizDeger
        }

        return `https://${temizDeger}`
      }),
  ),
)

export default buildConfig({
  admin: {
    components: {
      beforeDashboard: [
        {
          exportName: 'PanelRehberi',
          path: './app/(yonetim)/admin/bilesenler/PanelRehberi',
        },
      ],
      beforeLogin: [
        {
          exportName: 'GirisYardimi',
          path: './app/(yonetim)/admin/bilesenler/GirisYardimi',
        },
      ],
      graphics: {
        Icon: {
          exportName: 'MebalciIcon',
          path: './app/(yonetim)/admin/bilesenler/MebalciIcon',
        },
        Logo: {
          exportName: 'MebalciLogo',
          path: './app/(yonetim)/admin/bilesenler/MebalciLogo',
        },
      },
    },
    dateFormat: 'dd.MM.yyyy',
    importMap: {
      baseDir: process.cwd(),
      importMapFile: './app/(yonetim)/admin/importMap.ts',
    },
    meta: {
      icons: {
        icon: '/marka/mebalci-logo.png',
      },
      titleSuffix: ' - Mebalci Yönetim',
    },
    theme: 'light',
    user: 'yoneticiler',
  },
  collections: [
    Medyalar,
    Urunler,
    UrunKategorileri,
    PortfoyProjeleri,
    Kampanyalar,
    Sayfalar,
    BlogYazilari,
    Yoneticiler,
  ],
  cookiePrefix: 'mebalci',
  cors: izinliOriginler,
  csrf: izinliOriginler,
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.VERITABANI_URL ||
        'postgresql://postgres:postgres@127.0.0.1:5432/uv_baski_web_sitesi',
    },
  }),
  editor: lexicalEditor(),
  email: epostaAdapterunuOlustur,
  globals: [SiteAyarlari, UstBilgi, AltBilgi, IletisimBilgileri, AnaSayfaIcerigi, EntegrasyonAyarlari],
  plugins: [
    s3Storage({
      acl: 'public-read',
      bucket: process.env.R2_KOVA_ADI || 'uv-baski-medya',
      collections: {
        medyalar: true,
      },
      config: {
        credentials: {
          accessKeyId: process.env.R2_ERISIM_ANAHTARI || 'ornek-erisim',
          secretAccessKey: process.env.R2_GIZLI_ANAHTAR || 'ornek-gizli',
        },
        endpoint: process.env.R2_HESAP_ID
          ? `https://${process.env.R2_HESAP_ID}.r2.cloudflarestorage.com`
          : 'https://example.r2.cloudflarestorage.com',
        region: 'auto',
      },
      disableLocalStorage: r2Etkin,
      enabled: r2Etkin,
    }),
  ],
  routes: {
    admin: '/admin',
  },
  serverURL: siteUrl,
  sharp,
  secret: process.env.PAYLOAD_GIZLI_ANAHTAR || 'gelistirme-icin-guclu-bir-gizli-anahtar',
  typescript: {
    outputFile: 'payload-types.ts',
  },
})
