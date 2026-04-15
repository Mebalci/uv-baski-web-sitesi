import type { Access, CollectionConfig } from 'payload'

type Yonetici = {
  rol?: 'editor' | 'super_admin'
}

function kullanici(reqUser: unknown): Yonetici | null {
  if (!reqUser || typeof reqUser !== 'object') {
    return null
  }

  return reqUser as Yonetici
}

export const girisYapmis: Access = ({ req }) => Boolean(req.user)

export const superAdminMi: Access = ({ req }) => {
  const user = kullanici(req.user)
  return user?.rol === 'super_admin'
}

export const editorVeyaUstu: Access = ({ req }) => {
  const user = kullanici(req.user)
  return user?.rol === 'super_admin' || user?.rol === 'editor'
}

export const yayinVeyaEditor: Access = ({ req }) => {
  if (req.user) {
    return true
  }

  return {
    durum: {
      equals: 'yayinda',
    },
  }
}

export function yayinTarihiAlanlari(): CollectionConfig['fields'] {
  return [
    {
      admin: {
        description:
          'İçerik sitede görünsün istiyorsanız "Yayında" seçin. Taslak içerikler yalnızca yönetimde görünür.',
      },
      defaultValue: 'yayinda',
      label: 'Durum',
      name: 'durum',
      options: [
        {
          label: 'Taslak',
          value: 'taslak',
        },
        {
          label: 'Yayında',
          value: 'yayinda',
        },
      ],
      required: true,
      type: 'select',
    },
    {
      admin: {
        description:
          'İçeriğin görünmesini istediğiniz tarihi belirler. Boş bırakılırsa kaydedildiği an esas alınır.',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      label: 'Yayın Tarihi',
      name: 'yayin_tarihi',
      type: 'date',
    },
    {
      admin: {
        description:
          'Liste sıralamasını elle kontrol etmek için kullanılır. Küçük sayı daha yukarıda görünür.',
      },
      label: 'Sıra No',
      name: 'sira_no',
      type: 'number',
    },
  ]
}
