import { editorVeyaUstu, yayinTarihiAlanlari, yayinVeyaEditor } from '@/payload/erisim'
import { seoAlanlari, seoKontrolPaneli } from '@/payload/alanlar'
import type { CollectionConfig } from 'payload'

export const UrunKategorileri: CollectionConfig = {
  access: {
    create: editorVeyaUstu,
    delete: editorVeyaUstu,
    read: yayinVeyaEditor,
    update: editorVeyaUstu,
  },
  admin: {
    defaultColumns: ['baslik', 'durum', 'sira_no'],
    group: 'Katalog',
    useAsTitle: 'baslik',
  },
  labels: {
    plural: 'Ürün Kategorileri',
    singular: 'Ürün Kategorisi',
  },
  fields: [
    {
      admin: {
        description:
          'Kategori kartinda ve admin listelerinde gorunecek basliktir.',
      },
      label: 'Baslik',
      name: 'baslik',
      required: true,
      type: 'text',
    },
    {
      admin: {
        description:
          'Kategori kartlari veya arama sonuclari icin kullanilabilecek kisa aciklama.',
      },
      label: 'Kisa Aciklama',
      name: 'kisa_aciklama',
      type: 'textarea',
    },
    {
      admin: {
        allowCreate: true,
        description:
          'Kategori kartinda gorunecek gorsel. Medyalar icinden mevcut gorsel secilebilir veya yeni gorsel yuklenebilir.',
      },
      displayPreview: true,
      label: 'Kapak Gorseli',
      name: 'kapak_gorseli',
      relationTo: 'medyalar',
      type: 'upload',
    },
    {
      defaultValue: false,
      label: 'Öne Çıkan',
      name: 'one_cikan',
      type: 'checkbox',
    },
    {
      admin: {
        description:
          'Kategori kartina tiklaninca gidilecek adres. Genelde Sayfalar alaninda olusturdugunuz sayfanin linkini yazin. Ornek: /baski veya https://ornek.com',
      },
      label: 'Yonlendirme Linki',
      name: 'yonlendirme_linki',
      type: 'text',
    },
    ...yayinTarihiAlanlari(),
    seoAlanlari(),
    seoKontrolPaneli(),
  ],
  slug: 'urun_kategorileri',
}
