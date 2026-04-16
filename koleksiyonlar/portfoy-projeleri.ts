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
    group: 'Kurumsal Icerik',
    useAsTitle: 'baslik',
  },
  labels: {
    plural: 'Portfoy Projeleri',
    singular: 'Portfoy Projesi',
  },
  fields: [
    ...ortakMetinAlanlari(),
    {
      admin: {
        description:
          'Referansin hangi marka veya musteriye ait oldugunu yazin. Gorunmesini istemiyorsaniz bos birakabilirsiniz.',
      },
      label: 'Musteri Adi',
      name: 'musteri_adi',
      type: 'text',
    },
    {
      admin: {
        description:
          'Detay sayfasinda kapak gorseline ek olarak gosterilecek ek proje gorselleri. Once kapak gorselini secin, sonra galeri ekleyin.',
      },
      label: 'Galeri',
      name: 'galeri',
      relationTo: 'medyalar',
      type: 'upload',
      hasMany: true,
    },
    {
      admin: {
        description:
          'Projenin hedefini, uygulama detaylarini ve ortaya cikan sonucu anlatan zengin icerik alanidir.',
      },
      editor: lexicalEditor(),
      label: 'Proje Ozeti',
      name: 'icerik',
      type: 'richText',
    },
    {
      admin: {
        description:
          'Kisa bir referans yorumu, ozet not veya proje sonucu metni yazabilirsiniz. Liste ve detay anlatimini destekler.',
      },
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
