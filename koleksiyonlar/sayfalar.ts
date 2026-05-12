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
          'Bu alan sayfanin govde icerigidir. Baskı, Dijital Baskı, Tasarim, Sanat ve benzeri kurumsal hizmet sayfalari burada tek sablonla olusturulur.',
      },
      editor: lexicalEditor(),
      label: 'Sayfa Icerigi',
      name: 'icerik',
      type: 'richText',
    },
    {
      admin: {
        description:
          'Bu sayfanin sag reklam alaninda gosterilecek gorsel. Bos birakilirsa genel detay sag reklam alani kullanilir.',
      },
      label: 'Sag Reklam Gorseli',
      name: 'sag_reklam_gorseli',
      relationTo: 'medyalar',
      type: 'upload',
    },
    {
      admin: {
        description:
          'Sag reklam tiklaninca gidilecek adres. Bos birakilirsa reklam sadece gorsel olarak kalir.',
      },
      label: 'Sag Reklam Baglantisi',
      name: 'sag_reklam_link',
      type: 'text',
    },
    {
      admin: {
        description: 'Aktifse sag reklam baglantisi yeni sekmede acilir.',
      },
      defaultValue: false,
      label: 'Sag Reklam Yeni Sekmede Acilsin mi?',
      name: 'sag_reklam_yeni_sekmede_acilsin_mi',
      type: 'checkbox',
    },
    {
      admin: {
        description: 'Sag reklam gorseli icin alternatif metin.',
      },
      label: 'Sag Reklam Alt Metni',
      name: 'sag_reklam_alt_metin',
      type: 'text',
    },
    ...yayinTarihiAlanlari(),
    seoAlanlari(),
    seoKontrolPaneli(),
  ],
  slug: 'sayfalar',
}
