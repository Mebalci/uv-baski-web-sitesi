import { editorVeyaUstu, yayinTarihiAlanlari, yayinVeyaEditor } from '@/payload/erisim'
import { ortakMetinAlanlari, seoAlanlari, seoKontrolPaneli } from '@/payload/alanlar'
import type { CollectionConfig } from 'payload'

export const UrunKategorileri: CollectionConfig = {
  access: {
    create: editorVeyaUstu,
    delete: editorVeyaUstu,
    read: yayinVeyaEditor,
    update: editorVeyaUstu,
  },
  admin: {
    defaultColumns: ['baslik', 'slug', 'durum', 'sira_no'],
    group: 'Katalog',
    useAsTitle: 'baslik',
  },
  labels: {
    plural: 'Ürün Kategorileri',
    singular: 'Ürün Kategorisi',
  },
  fields: [
    ...ortakMetinAlanlari(),
    {
      defaultValue: false,
      label: 'Öne Çıkan',
      name: 'one_cikan',
      type: 'checkbox',
    },
    {
      admin: {
        description:
          'Kategori kartina tiklaninca gidilecek ozel adres. Bos birakilirsa kategori detay sayfasina gider. Ornek: /baski veya https://ornek.com',
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
