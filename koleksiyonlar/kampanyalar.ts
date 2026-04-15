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
    group: 'Kurumsal İçerik',
    useAsTitle: 'baslik',
  },
  labels: {
    plural: 'Kampanyalar',
    singular: 'Kampanya',
  },
  fields: [
    ...ortakMetinAlanlari(),
    {
      editor: lexicalEditor(),
      label: 'Kampanya İçeriği',
      name: 'icerik',
      type: 'richText',
    },
    {
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      label: 'Başlangıç Tarihi',
      name: 'baslangic_tarihi',
      required: true,
      type: 'date',
    },
    {
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      label: 'Bitiş Tarihi',
      name: 'bitis_tarihi',
      required: true,
      type: 'date',
    },
    {
      defaultValue: false,
      label: 'Öne Çıkart',
      name: 'one_cikart',
      type: 'checkbox',
    },
    {
      defaultValue: true,
      label: 'Sayaç Göster',
      name: 'sayac_goster',
      type: 'checkbox',
    },
    ...yayinTarihiAlanlari(),
    seoAlanlari(),
    seoKontrolPaneli(),
  ],
  slug: 'kampanyalar',
}
