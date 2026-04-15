import type { GlobalConfig } from 'payload'

export const UstBilgi: GlobalConfig = {
  admin: {
    description: 'Sitenin üst menüsünde görünecek bağlantıları bu bölümden yönetin.',
    group: 'Genel Ayarlar',
  },
  label: 'Üst Bilgi',
  fields: [
    {
      admin: {
        description:
          'Üst menü sıralaması buradaki listeye göre oluşur. Her satır bir menü bağlantısıdır.',
      },
      label: 'Menü Öğeleri',
      name: 'menu_ogeleri',
      type: 'array',
      fields: [
        {
          admin: {
            description: 'Menüde görünen kısa bağlantı adı.',
          },
          label: 'Etiket',
          name: 'etiket',
          required: true,
          type: 'text',
        },
        {
          admin: {
            description: 'Örnek: /urunler, /portfoy veya https://... şeklinde bağlantı yazın.',
          },
          label: 'Bağlantı',
          name: 'baglanti',
          required: true,
          type: 'text',
        },
      ],
    },
  ],
  slug: 'ust_bilgi',
}
