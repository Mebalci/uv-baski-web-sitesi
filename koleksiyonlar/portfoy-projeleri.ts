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
    defaultColumns: ['baslik', 'sayfa_bolum_basligi', 'fiyat_metni', 'durum'],
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
          'Bu proje hangi dinamik sayfalarda gorunsun? Ornek: Baski, Dijital Baski, Sanat, Tasarim. Bir proje birden fazla sayfaya atanabilir.',
      },
      hasMany: true,
      label: 'Gorunecegi Sayfalar',
      name: 'sayfalar',
      relationTo: 'sayfalar',
      type: 'relationship',
    },
    {
      admin: {
        description:
          'Sayfada projelerin ustunde gorunecek bolum basligi. Ayni basligi yazdiginiz projeler ayni bolumde listelenir. Bos birakilirsa "Ornekler" bolumunde gorunur.',
      },
      label: 'Sayfa Bolum Basligi',
      name: 'sayfa_bolum_basligi',
      type: 'text',
    },
    {
      admin: {
        description:
          'Liste kartinda gosterilecek fiyat veya kisa etiket. Ornek: 000.000 TL. Bos birakilirsa kartta fiyat satiri cikmaz.',
      },
      label: 'Fiyat Metni',
      name: 'fiyat_metni',
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
