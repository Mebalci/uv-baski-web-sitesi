import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { editorVeyaUstu, yayinTarihiAlanlari, yayinVeyaEditor } from '@/payload/erisim'
import { ortakMetinAlanlari, seoAlanlari, seoKontrolPaneli } from '@/payload/alanlar'
import type { CollectionConfig } from 'payload'

export const Sayfalar: CollectionConfig = {
  access: {
    create: editorVeyaUstu,
    delete: editorVeyaUstu,
    read: yayinVeyaEditor,
    update: editorVeyaUstu,
  },
  admin: {
    defaultColumns: ['baslik', 'slug', 'durum'],
    group: 'Kurumsal Icerik',
    useAsTitle: 'baslik',
  },
  labels: {
    plural: 'Sayfalar',
    singular: 'Sayfa',
  },
  fields: [
    ...ortakMetinAlanlari(),
    {
      admin: {
        description:
          'Bu alan sayfanin govde icerigidir. Hakkimizda, KVKK, Cerez Politikasi, SSS veya kurumsal tanitim sayfalari burada olusturulur.',
      },
      editor: lexicalEditor(),
      label: 'Sayfa Icerigi',
      name: 'icerik',
      type: 'richText',
    },
    ...yayinTarihiAlanlari(),
    seoAlanlari(),
    seoKontrolPaneli(),
  ],
  slug: 'sayfalar',
}
