import type { Field } from 'payload'

export function seoAlanlari(): Field {
  return {
    admin: {
      description:
        'Arama motorlarında görünecek başlık, açıklama ve paylaşım görselini bu bölümden yönetin.',
    },
    fields: [
      {
        admin: {
          description: 'Google sonuçlarında görünen başlık. 70 karakterin altında tutun.',
        },
        label: 'SEO Başlık',
        maxLength: 70,
        name: 'seo_baslik',
        type: 'text',
      },
      {
        admin: {
          description:
            'Google sonuçlarında başlığın altında görünen kısa açıklama. 160 karakteri geçmeyin.',
        },
        label: 'SEO Açıklama',
        maxLength: 160,
        name: 'seo_aciklama',
        type: 'textarea',
      },
      {
        admin: {
          description:
            'Aynı içeriğin birden fazla URL’si varsa arama motorlarına tercih edilen adresi belirtir.',
        },
        label: 'Kanonik URL',
        name: 'kanonik_url',
        type: 'text',
      },
      {
        admin: {
          description: 'Sayfa sosyal medyada paylaşıldığında görünecek kapak görseli.',
        },
        label: 'Open Graph Görseli',
        name: 'open_graph_gorseli',
        relationTo: 'medyalar',
        type: 'upload',
      },
      {
        defaultValue: true,
        label: 'İndekslensin mi?',
        name: 'indekslensin_mi',
        type: 'checkbox',
      },
      {
        admin: {
          description:
            'İleri seviye yapılandırılmış veri alanı. Genellikle geliştirici desteğiyle kullanılır.',
        },
        label: 'Yapılandırılmış Veri',
        name: 'yapilandirilmis_veri',
        type: 'json',
      },
    ],
    label: 'SEO',
    name: 'seo',
    type: 'group',
  }
}

export function ortakMetinAlanlari(): Field[] {
  return [
    {
      admin: {
        description: 'İçeriğin ana başlığıdır. Kartlarda ve detay sayfasında görünür.',
      },
      label: 'Başlık',
      name: 'baslik',
      required: true,
      type: 'text',
    },
    {
      admin: {
        description:
          'URL içinde kullanılacak kısa isimdir. Türkçe karakter ve boşluk yerine kısa, anlaşılır bir yapı tercih edin.',
      },
      index: true,
      label: 'Slug',
      name: 'slug',
      required: true,
      type: 'text',
      unique: true,
    },
    {
      admin: {
        description: 'Kartlarda, liste görünümünde veya üst açıklama alanlarında özet olarak kullanılır.',
      },
      label: 'Kısa Açıklama',
      name: 'kisa_aciklama',
      type: 'textarea',
    },
    {
      admin: {
        description:
          'Bu içerik için öne çıkan ana görseldir. Liste kartlarında ve detay sayfasında kullanılır.',
      },
      label: 'Kapak Görseli',
      name: 'kapak_gorseli',
      relationTo: 'medyalar',
      type: 'upload',
    },
  ]
}

export function seoKontrolPaneli(): Field {
  return {
    admin: {
      description:
        'Bu alan editöre hızlı bir hatırlatma sağlar. İçerik doğrulaması için teknik alanların da dolu olması gerekir.',
      position: 'sidebar',
    },
    defaultValue:
      'Kontrol et: slug dolu mu, SEO başlığı 70 karakter altında mı, açıklama 160 karakteri geçmiyor mu?',
    label: 'SEO Kontrol Notu',
    name: 'seo_kontrol_notu',
    type: 'textarea',
  }
}
