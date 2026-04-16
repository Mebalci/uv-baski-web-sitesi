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
    group: 'Icerik Pazarlamasi',
    useAsTitle: 'baslik',
  },
  labels: {
    plural: 'Blog Yazilari',
    singular: 'Blog Yazisi',
  },
  fields: [
    ...ortakMetinAlanlari(),
    {
      admin: {
        description:
          'Blog detay sayfasinda ve SEO tarafinda kullanilan ana icerik alanidir. Baslik hiyerarsisi, listeler ve gorsellerle zenginlestirebilirsiniz.',
      },
      editor: lexicalEditor(),
      label: 'Yazi Icerigi',
      name: 'icerik',
      type: 'richText',
    },
    {
      admin: {
        description:
          'Benzer konulari gruplamak icin etiket yazin. Arama niyetini destekleyen 2-5 kisa etiket yeterlidir.',
      },
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
