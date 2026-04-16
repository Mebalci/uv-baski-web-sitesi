import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { editorVeyaUstu, yayinTarihiAlanlari, yayinVeyaEditor } from '@/payload/erisim'
import { ortakMetinAlanlari, seoAlanlari, seoKontrolPaneli } from '@/payload/alanlar'
import type { CollectionConfig } from 'payload'

export const Kampanyalar: CollectionConfig = {
  access: {
    create: editorVeyaUstu,
    delete: editorVeyaUstu,
    read: yayinVeyaEditor,
    update: editorVeyaUstu,
  },
  admin: {
    defaultColumns: ['baslik', 'baslangic_tarihi', 'bitis_tarihi', 'durum'],
    group: 'Kurumsal Icerik',
    useAsTitle: 'baslik',
  },
  labels: {
    plural: 'Kampanyalar',
    singular: 'Kampanya',
  },
  fields: [
    ...ortakMetinAlanlari(),
    {
      admin: {
        description:
          'Kampanya detay sayfasinda gosterilecek zengin icerik alanidir. Kosullar, kapsam ve teslim detaylari burada anlatilabilir.',
      },
      editor: lexicalEditor(),
      label: 'Kampanya Icerigi',
      name: 'icerik',
      type: 'richText',
    },
    {
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description:
          'Kampanyanin baslayacagi tarih. Sayaç veya listeleme mantigi bu tarihe gore yorumlanabilir.',
      },
      label: 'Baslangic Tarihi',
      name: 'baslangic_tarihi',
      required: true,
      type: 'date',
    },
    {
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description:
          'Kampanyanin sona erecegi tarih. Search ve kullanici deneyimi icin gecmis kampanyalari zamaninda kapatmaniz onerilir.',
      },
      label: 'Bitis Tarihi',
      name: 'bitis_tarihi',
      required: true,
      type: 'date',
    },
    {
      admin: {
        description: 'Acik oldugunda ana sayfa veya liste alanlarinda kampanya one cikarilabilir.',
      },
      defaultValue: false,
      label: 'One Cikart',
      name: 'one_cikart',
      type: 'checkbox',
    },
    {
      admin: {
        description: 'Acik oldugunda kampanya sayfalarinda kalan sure sayaci gostermek icin kullanilir.',
      },
      defaultValue: true,
      label: 'Sayac Goster',
      name: 'sayac_goster',
      type: 'checkbox',
    },
    ...yayinTarihiAlanlari(),
    seoAlanlari(),
    seoKontrolPaneli(),
  ],
  slug: 'kampanyalar',
}
