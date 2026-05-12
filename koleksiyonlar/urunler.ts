import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { editorVeyaUstu, yayinTarihiAlanlari, yayinVeyaEditor } from '@/payload/erisim'
import { ortakMetinAlanlari, seoAlanlari, seoKontrolPaneli } from '@/payload/alanlar'
import type { CollectionConfig } from 'payload'

export const Urunler: CollectionConfig = {
  access: {
    create: editorVeyaUstu,
    delete: editorVeyaUstu,
    read: yayinVeyaEditor,
    update: editorVeyaUstu,
  },
  admin: {
    defaultColumns: ['baslik', 'slug', 'durum', 'baslangic_fiyati'],
    group: 'Katalog',
    useAsTitle: 'baslik',
  },
  labels: {
    plural: 'Ürünler',
    singular: 'Ürün',
  },
  fields: [
    ...ortakMetinAlanlari(),
    {
      admin: {
        description: 'Ürünün hangi kategori altında listeleneceğini belirler.',
      },
      label: 'Kategori',
      name: 'kategori',
      relationTo: 'urun_kategorileri',
      required: true,
      type: 'relationship',
    },
    {
      editor: lexicalEditor(),
      admin: {
        description: 'Ürün detay sayfasında görünen zengin içerik alanıdır.',
      },
      label: 'Detaylı Açıklama',
      name: 'icerik',
      type: 'richText',
    },
    {
      admin: {
        description: 'Ürün detay sayfasında kapak görselinin altında gösterilecek ek görseller.',
      },
      displayPreview: true,
      label: 'Galeri',
      name: 'galeri',
      relationTo: 'medyalar',
      type: 'upload',
      hasMany: true,
    },
    {
      admin: {
        description:
          'Tam fiyat göstermek istemiyorsanız başlangıç bedeli girebilirsiniz. Örnek: 1500',
      },
      label: 'Başlangıç Fiyatı',
      name: 'baslangic_fiyati',
      type: 'number',
    },
    {
      defaultValue: false,
      admin: {
        description: 'Açık olduğunda başlangıç fiyatı kartta ve detay sayfasında gösterilir.',
      },
      label: 'Fiyat Gösterilsin mi?',
      name: 'fiyat_gosterilsin_mi',
      type: 'checkbox',
    },
    {
      defaultValue: true,
      admin: {
        description: 'Kapalıysa ürün detayında teklif butonu veya formu gösterilmez.',
      },
      label: 'Teklif Formu Aktif mi?',
      name: 'teklif_formu_aktif_mi',
      type: 'checkbox',
    },
    {
      admin: {
        description: 'Teklif formu gönderilirken konu alanına otomatik yazılacak başlık.',
      },
      label: 'Teklif Konusu',
      name: 'teklif_konusu',
      type: 'text',
    },
    {
      admin: {
        description: 'WhatsApp butonuna basıldığında mesaj kutusuna düşecek hazır metin.',
      },
      label: 'WhatsApp Mesajı',
      name: 'whatsapp_mesaji',
      type: 'textarea',
    },
    ...yayinTarihiAlanlari(),
    seoAlanlari(),
    seoKontrolPaneli(),
  ],
  slug: 'urunler',
}
