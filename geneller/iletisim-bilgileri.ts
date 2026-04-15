import type { GlobalConfig } from 'payload'

export const IletisimBilgileri: GlobalConfig = {
  admin: {
    description: 'İletişim sayfası ve footer iletişim alanı bu verilerle beslenir.',
    group: 'Genel Ayarlar',
  },
  label: 'İletişim Bilgileri',
  fields: [
    {
      admin: {
        description: 'Müşterilerin sizi arayacağı ana telefon numarası.',
      },
      label: 'Telefon',
      name: 'telefon',
      type: 'text',
    },
    {
      admin: {
        description: 'İletişim sayfasında ve teklif dönüşlerinde kullanılacak e-posta.',
      },
      label: 'E-posta',
      name: 'eposta',
      type: 'email',
    },
    {
      admin: {
        description: 'Harita yanında ya da iletişim kartında gösterilecek açık adres.',
      },
      label: 'Adres',
      name: 'adres',
      type: 'textarea',
    },
    {
      admin: {
        description: 'Örnek: Hafta içi 09:00 - 18:00',
      },
      label: 'Çalışma Saatleri',
      name: 'calisma_saatleri',
      type: 'text',
    },
  ],
  slug: 'iletisim_bilgileri',
}
