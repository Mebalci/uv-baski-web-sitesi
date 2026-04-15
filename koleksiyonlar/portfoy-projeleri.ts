import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { editorVeyaUstu, yayinTarihiAlanlari, yayinVeyaEditor } from '@/payload/erisim'
import { ortakMetinAlanlari, seoAlanlari, seoKontrolPaneli } from '@/payload/alanlar'
import type { CollectionConfig } from 'payload'

export const PortfoyProjeleri: CollectionConfig = {
  access: {
    create: editorVeyaUstu,
    delete: editorVeyaUstu,
    read: yayinVeyaEditor,
    update: editorVeyaUstu,
  },
  admin: {
    defaultColumns: ['baslik', 'musteri_adi', 'durum'],
    group: 'Kurumsal İçerik',
    useAsTitle: 'baslik',
  },
  labels: {
    plural: 'Portföy Projeleri',
    singular: 'Portföy Projesi',
  },
  fields: [
    ...ortakMetinAlanlari(),
    {
      label: 'Müşteri Adı',
      name: 'musteri_adi',
      type: 'text',
    },
    {
      label: 'Galeri',
      name: 'galeri',
      relationTo: 'medyalar',
      type: 'upload',
      hasMany: true,
    },
    {
      editor: lexicalEditor(),
      label: 'Proje Özeti',
      name: 'icerik',
      type: 'richText',
    },
    {
      label: 'Referans Notu',
      name: 'referans_notu',
      type: 'textarea',
    },
    ...yayinTarihiAlanlari(),
    seoAlanlari(),
    seoKontrolPaneli(),
  ],
  slug: 'portfoy_projeleri',
}
