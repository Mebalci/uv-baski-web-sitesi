import { seoAlanlari } from '@/payload/alanlar'
import type { GlobalConfig } from 'payload'

export const SiteAyarlari: GlobalConfig = {
  admin: {
    description: 'Sitenin genel firma bilgileri ve SEO kimliği bu bölümden yönetilir.',
    group: 'Genel Ayarlar',
  },
  label: 'Site Ayarları',
  fields: [
    {
      admin: {
        description: 'Header, footer ve tarayıcı başlığında kullanılacak marka adı.',
      },
      label: 'Firma Adı',
      name: 'firma_adi',
      required: true,
      type: 'text',
    },
    {
      admin: {
        description: 'Ana sayfa ve meta açıklama alanlarında kullanılabilecek kısa firma özeti.',
      },
      label: 'Kısa Site Açıklaması',
      name: 'aciklama',
      required: true,
      type: 'textarea',
    },
    {
      admin: {
        description: 'Üst bilgi, iletişim alanları ve teklif formlarında referans için kullanılır.',
      },
      label: 'Telefon',
      name: 'telefon',
      type: 'text',
    },
    {
      admin: {
        description: 'İletişim ve bildirim alanlarında kullanılacak ana kurumsal e-posta adresi.',
      },
      label: 'E-posta',
      name: 'eposta',
      type: 'email',
    },
    {
      admin: {
        description: 'Footer ve iletişim sayfasında gösterilecek açık adres bilgisi.',
      },
      label: 'Adres',
      name: 'adres',
      type: 'textarea',
    },
    seoAlanlari(),
  ],
  slug: 'site_ayarlari',
}
