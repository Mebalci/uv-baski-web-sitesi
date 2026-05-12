import type { GlobalConfig } from 'payload'

export const HakkimizdaIcerigi: GlobalConfig = {
  admin: {
    description:
      'Hakkimizda sayfasindaki sol gorsel ve orta aciklama metni bu ekrandan yonetilir.',
    group: 'Genel Ayarlar',
  },
  label: 'Hakkimizda Icerigi',
  fields: [
    {
      admin: {
        allowCreate: true,
        description:
          'Hakkimizda sayfasinin sol tarafinda gorunecek gorsel. Medyalar icinden mevcut gorsel secilebilir veya yeni gorsel yuklenebilir. Tasarimdaki mevcut alana gore gosterilir.',
      },
      displayPreview: true,
      label: 'Sol Gorsel',
      name: 'sol_gorsel',
      relationTo: 'medyalar',
      type: 'upload',
    },
    {
      admin: {
        description:
          'Hakkimizda sayfasinin orta alaninda gorunecek metin. Paragraflari bos satirla ayirabilirsiniz.',
      },
      label: 'Aciklama Metni',
      name: 'aciklama_metni',
      type: 'textarea',
    },
  ],
  slug: 'hakkimizda_icerigi',
}
