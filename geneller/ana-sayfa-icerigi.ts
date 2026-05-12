import type { GlobalConfig } from 'payload'

export const AnaSayfaIcerigi: GlobalConfig = {
  admin: {
    description:
      'Ana sayfadaki sol metin alani bu ekrandan yonetilir. Reklamlar Site Reklamlari, hizmet kartlari Urun Kategorileri uzerinden duzenlenir.',
    group: 'Genel Ayarlar',
  },
  label: 'Ana Sayfa Icerigi',
  fields: [
    {
      admin: {
        description: 'Ana sayfada sol sutunda reklam alaninin altinda gorunecek metin. Paragraflari bos satirla ayirabilirsiniz.',
      },
      label: 'Ana Sayfa Metni',
      name: 'kategori_aciklama',
      type: 'textarea',
    },
  ],
  slug: 'ana_sayfa_icerigi',
}
