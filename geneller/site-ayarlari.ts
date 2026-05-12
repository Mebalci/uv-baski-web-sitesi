import { seoAlanlari } from '@/payload/alanlar'
import type { GlobalConfig } from 'payload'

export const SiteAyarlari: GlobalConfig = {
  admin: {
    description: 'Sitenin genel firma bilgileri ve SEO kimligi bu bolumden yonetilir.',
    group: 'Genel Ayarlar',
  },
  label: 'Site Ayarlari',
  fields: [
    {
      admin: {
        description: 'Header, footer ve tarayici basliginda kullanilacak marka adi.',
      },
      label: 'Firma Adi',
      name: 'firma_adi',
      required: true,
      type: 'text',
    },
    {
      admin: {
        description: 'Sitede header ve footer alanlarinda gosterilecek logo gorseli.',
      },
      label: 'Site Logosu',
      name: 'logo',
      relationTo: 'medyalar',
      type: 'upload',
    },
    {
      admin: {
        description: 'Ana sayfa ve meta aciklama alanlarinda kullanilabilecek kisa firma ozeti.',
      },
      label: 'Kisa Site Aciklamasi',
      name: 'aciklama',
      required: true,
      type: 'textarea',
    },
    {
      admin: {
        description:
          'Google Fonts sayfasindan kopyaladiginiz font linkini yapistirin. Ornek: https://fonts.google.com/specimen/Mrs+Saint+Delafield. Bos birakilirsa Parisienne kullanilir.',
      },
      label: 'Sayfa Baslik Font Linki',
      name: 'baslik_font_linki',
      type: 'text',
    },
    {
      admin: {
        description: 'Ust bilgi, iletisim alanlari ve teklif formlarinda referans icin kullanilir.',
      },
      label: 'Telefon',
      name: 'telefon',
      type: 'text',
    },
    {
      admin: {
        description: 'Iletisim ve bildirim alanlarinda kullanilacak ana kurumsal e-posta adresi.',
      },
      label: 'E-posta',
      name: 'eposta',
      type: 'email',
    },
    {
      admin: {
        description: 'Footer ve iletisim sayfasinda gosterilecek acik adres bilgisi.',
      },
      label: 'Adres',
      name: 'adres',
      type: 'textarea',
    },
    seoAlanlari(),
  ],
  slug: 'site_ayarlari',
}
