import type { CollectionConfig } from 'payload'

export const Medyalar: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    group: 'Sistem',
    useAsTitle: 'alt',
  },
  labels: {
    plural: 'Medyalar',
    singular: 'Medya',
  },
  fields: [
    {
      label: 'Alt Metin',
      name: 'alt',
      required: true,
      type: 'text',
    },
    {
      label: 'Kredi / Kaynak',
      name: 'kaynak',
      type: 'text',
    },
  ],
  slug: 'medyalar',
  upload: {
    adminThumbnail: 'kucuk',
    focalPoint: true,
    imageSizes: [
      {
        height: 720,
        name: 'kucuk',
        width: 1280,
      },
      {
        height: 1080,
        name: 'buyuk',
        width: 1920,
      },
    ],
    mimeTypes: ['image/*'],
  },
}
