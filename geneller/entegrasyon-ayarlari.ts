import type { GlobalConfig } from 'payload'

export const EntegrasyonAyarlari: GlobalConfig = {
  admin: {
    description:
      'Google Analytics, Search Console ve arama motoru davranislarini bu ekrandan yonetin.',
    group: 'Genel Ayarlar',
  },
  label: 'Entegrasyon Ayarlari',
  fields: [
    {
      tabs: [
        {
          fields: [
            {
              admin: {
                description:
                  'Kapaliysa tum sayfalar noindex olarak isaretlenir ve robots.txt tum taramayi kapatir. Bakim modu veya yayin oncesi icin kullanin.',
              },
              defaultValue: true,
              label: 'Site Indekslensin mi?',
              name: 'site_indekslensin_mi',
              type: 'checkbox',
            },
            {
              admin: {
                description:
                  'Google Search Console HTML dogrulama kodunu buraya yapistirin. Sadece meta etiketinin icerigindeki kodu yazin.',
              },
              label: 'Google Search Console Dogrulama Kodu',
              name: 'google_search_console_dogrulama',
              type: 'text',
            },
            {
              admin: {
                description:
                  'Robots.txt icinde varsayilan olarak kapatilacak ek yollar. Her satira bir yol yazin. Ornek: /odeme, /tesekkurler',
              },
              label: 'Ek Robots Engelleri',
              name: 'robots_engellenen_yollar',
              type: 'textarea',
            },
          ],
          label: 'Arama Motorlari',
        },
        {
          fields: [
            {
              admin: {
                description:
                  'Google Analytics 4 olcum kimligi. Ornek: G-XXXXXXXXXX. Girilirse tum on yuz sayfalarina izleme kodu eklenir.',
              },
              label: 'Google Analytics Olcum Kimligi',
              name: 'google_analytics_olcum_kimligi',
              type: 'text',
            },
            {
              admin: {
                description:
                  'Google Tag Manager konteyner kimligi. Ornek: GTM-XXXXXXX. Girilirse siteye GTM betigi eklenir.',
              },
              label: 'Google Tag Manager Kimligi',
              name: 'google_tag_manager_kimligi',
              type: 'text',
            },
          ],
          label: 'Olcumleme',
        },
        {
          fields: [
            {
              admin: {
                description:
                  'Bu notlar panelde hatirlatma amaclidir. Search Console kurulumu, Analytics dogrulamasi ve sitemap kontrolu icin ekip ici checklist olarak kullanabilirsiniz.',
              },
              defaultValue:
                'Yayin sonrasi kontrol: Search Console dogrulandi mi, GA4 veri geliyor mu, sitemap.xml gorunuyor mu, robots.txt dogru mu?',
              label: 'Yayin Kontrol Notu',
              name: 'yayin_kontrol_notu',
              type: 'textarea',
            },
          ],
          label: 'Kontrol Listesi',
        },
      ],
      type: 'tabs',
    },
  ],
  slug: 'entegrasyon_ayarlari',
}
