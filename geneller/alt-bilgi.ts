import type { GlobalConfig } from 'payload'

export const AltBilgi: GlobalConfig = {
  admin: {
    description: 'Footer metni ve footer bağlantıları bu bölümden yönetilir.',
    group: 'Genel Ayarlar',
  },
  label: 'Alt Bilgi',
  fields: [
    {
      admin: {
        description: 'Footer içinde firmanızı özetleyen kısa açıklama veya telif metni.',
      },
      label: 'Alt Bilgi Metni',
      name: 'metin',
      type: 'textarea',
    },
    {
      admin: {
        description: 'Footer içinde yan yana veya alt alta gösterilecek hızlı bağlantılar.',
      },
      label: 'Linkler',
      name: 'linkler',
      type: 'array',
      fields: [
        {
          admin: {
            description: 'Footer bağlantısında görünen sosyal medya .',
          },
          label: 'Etiket',
          name: 'etiket',
          required: true,
          type: 'text',
        },
        {
          admin: {
            description: 'Örnek: /iletisim, /kvkk /https veya harici bağlantı.',
          },
          label: 'Bağlantı',
          name: 'baglanti',
          required: true,
          type: 'text',
        },
      ],
    },
  ],
  slug: 'alt_bilgi',
}
