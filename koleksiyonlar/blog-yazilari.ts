import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { editorVeyaUstu, yayinTarihiAlanlari, yayinVeyaEditor } from '@/payload/erisim'
import { ortakMetinAlanlari, seoAlanlari, seoKontrolPaneli } from '@/payload/alanlar'
import type { CollectionConfig } from 'payload'

export const BlogYazilari: CollectionConfig = {
  access: {
    create: editorVeyaUstu,
    delete: editorVeyaUstu,
    read: yayinVeyaEditor,
    update: editorVeyaUstu,
  },
  admin: {
    defaultColumns: ['baslik', 'slug', 'durum', 'yayin_tarihi'],
    group: 'İçerik Pazarlaması',
    useAsTitle: 'baslik',
  },
  labels: {
    plural: 'Blog Yazıları',
    singular: 'Blog Yazısı',
  },
  fields: [
    ...ortakMetinAlanlari(),
    {
      editor: lexicalEditor(),
      label: 'Yazı İçeriği',
      name: 'icerik',
      type: 'richText',
    },
    {
      label: 'Etiketler',
      name: 'etiketler',
      type: 'text',
      hasMany: true,
    },
    ...yayinTarihiAlanlari(),
    seoAlanlari(),
    seoKontrolPaneli(),
  ],
  slug: 'blog_yazilari',
}
