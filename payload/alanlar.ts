import type { Field } from 'payload'

export function seoAlanlari(): Field {
  return {
    admin: {
      description:
        'Bu bolum arama motorlarinda gorunen basligi, aciklamayi, canonical adresi ve indeksleme tercihini yonetir.',
    },
    fields: [
      {
        admin: {
          description:
            'Google sonucunda mavi baglanti olarak gorunur. Sayfa bazli ozgun yazin ve 70 karakteri asmamaya calisin.',
        },
        label: 'SEO Baslik',
        maxLength: 70,
        name: 'seo_baslik',
        type: 'text',
      },
      {
        admin: {
          description:
            'Google sonucunda basligin altinda gorunen ozet metindir. 160 karakteri asmayan, tiklamayi tesvik eden bir metin yazin.',
        },
        label: 'SEO Aciklama',
        maxLength: 160,
        name: 'seo_aciklama',
        type: 'textarea',
      },
      {
        admin: {
          description:
            'Ayni icerik baska bir URLde de aciliyorsa arama motoruna hangi adresin esas alinacagini belirtir. Bos birakilirsa mevcut sayfa adresi kullanilir.',
        },
        label: 'Kanonik URL',
        name: 'kanonik_url',
        type: 'text',
      },
      {
        admin: {
          allowCreate: true,
          description:
            'Sayfa WhatsApp, LinkedIn veya sosyal medyada paylasildiginda gosterilecek kapak gorseli. Medyalar icinden mevcut gorsel secilebilir veya yeni gorsel yuklenebilir.',
        },
        displayPreview: true,
        label: 'Open Graph Gorseli',
        name: 'open_graph_gorseli',
        relationTo: 'medyalar',
        type: 'upload',
      },
      {
        admin: {
          description:
            'Kapaliysa sayfa noindex olur, sitemapten cikarilir ve Google bu sayfayi arama sonucunda gostermemelidir.',
        },
        defaultValue: true,
        label: 'Indekslensin mi?',
        name: 'indekslensin_mi',
        type: 'checkbox',
      },
      {
        admin: {
          description:
            'Ileri seviye yapilandirilmis veri alanidir. Search Console zengin sonuc testleri icin ozel JSON-LD eklemek istediginizde kullanilir.',
        },
        label: 'Yapilandirilmis Veri',
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
        description:
          'Icerigin ana basligidir. Kartlarda, breadcrumblarda, detay sayfasinda ve cogu zaman SEO basliginin temelinde kullanilir.',
      },
      label: 'Baslik',
      name: 'baslik',
      required: true,
      type: 'text',
    },
    {
      admin: {
        description:
          'URL icinde kullanilacak kisa isimdir. Yayin sonrasi degistirirseniz mevcut indekslenen adres etkilenebilir; gerekirse 301 yonlendirme planlanmalidir.',
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
        description:
          'Kartlarda, liste gorunumunde ve sayfa ustunde ozet olarak kullanilir. SEO aciklamasi bos kalirsa bazen bu alan yedek metin gibi degerlendirilir.',
      },
      label: 'Kisa Aciklama',
      name: 'kisa_aciklama',
      type: 'textarea',
    },
    {
      admin: {
        allowCreate: true,
        description:
          'Bu icerik icin one cikan ana gorseldir. Medyalar icinden mevcut gorsel secilebilir veya yeni gorsel yuklenebilir. Gorsel kullanildigi alana gore responsive olarak genisler, uzar veya kisalir; alanin seklini alir.',
      },
      displayPreview: true,
      label: 'Kapak Gorseli',
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
        'Bu alan editore hizli bir hatirlatma saglar. Ozellikle slug, SEO basligi, aciklama ve indeksleme secimini kontrol edin.',
      position: 'sidebar',
    },
    defaultValue:
      'Kontrol et: slug sabit mi, SEO basligi ozgun mu, aciklama 160 karakter altinda mi, indeksleme tercihi dogru mu?',
    label: 'SEO Kontrol Notu',
    name: 'seo_kontrol_notu',
    type: 'textarea',
  }
}
