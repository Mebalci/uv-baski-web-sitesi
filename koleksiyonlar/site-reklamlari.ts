import { editorVeyaUstu, yayinTarihiAlanlari, yayinVeyaEditor } from '@/payload/erisim'
import type { CollectionConfig } from 'payload'

export const SiteReklamlari: CollectionConfig = {
  access: {
    create: editorVeyaUstu,
    delete: editorVeyaUstu,
    read: yayinVeyaEditor,
    update: editorVeyaUstu,
  },
  admin: {
    defaultColumns: ['baslik', 'konum', 'durum', 'sira_no'],
    group: 'Site Yonetimi',
    useAsTitle: 'baslik',
  },
  labels: {
    plural: 'Site Reklamlari',
    singular: 'Site Reklami',
  },
  fields: [
    {
      label: 'Baslik',
      name: 'baslik',
      required: true,
      type: 'text',
    },
    {
      admin: {
        description: 'Reklamin sitede hangi alanda gosterilecegini belirler.',
      },
      label: 'Konum',
      name: 'konum',
      options: [
        { label: 'Ana Sayfa Sol Ust', value: 'anasayfa_sol_ust' },
        { label: 'Ana Sayfa Hero', value: 'anasayfa_hero' },
        { label: 'Ana Sayfa Sol Alt', value: 'anasayfa_sol_alt' },
        { label: 'Ana Sayfa Alt', value: 'anasayfa_alt' },
        { label: 'Detay Sag', value: 'detay_sag' },
        { label: 'Hakkimizda Sag', value: 'hakkimizda_sag' },
        { label: 'Iletisim Sag', value: 'iletisim_sag' },
      ],
      required: true,
      type: 'select',
    },
    {
      admin: {
        description:
          'Reklam gorseli bulundugu alana gore responsive olarak genisler, uzar veya kisalir. Kenar kaybi olmaz; gorsel alanin seklini alir. Tasarimi yuklerken yazilari ve onemli ogeleri guvenli bosluk icinde tutun.',
      },
      label: 'Gorsel',
      name: 'gorsel',
      relationTo: 'medyalar',
      required: true,
      type: 'upload',
    },
    {
      admin: {
        description: 'Bos birakilirsa reklam sadece gorsel olarak gosterilir.',
      },
      label: 'Link',
      name: 'link',
      type: 'text',
    },
    {
      defaultValue: false,
      label: 'Yeni Sekmede Acilsin mi?',
      name: 'yeni_sekmede_acilsin_mi',
      type: 'checkbox',
    },
    {
      admin: {
        description: 'Gorsel erisilebilirligi icin alternatif metin.',
      },
      label: 'Alt Metin',
      name: 'alt_metin',
      type: 'text',
    },
    ...yayinTarihiAlanlari(),
  ],
  slug: 'site_reklamlari',
}
