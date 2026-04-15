import type { GlobalConfig } from 'payload'

export const AnaSayfaIcerigi: GlobalConfig = {
  admin: {
    description:
      'Ana sayfadaki hero, bölüm başlıkları, süreç alanı ve teklif çağrısı bu ekrandan yönetilir.',
    group: 'Genel Ayarlar',
  },
  label: 'Ana Sayfa İçeriği',
  fields: [
    {
      tabs: [
        {
          fields: [
            {
              admin: {
                description:
                  'Ana sayfanın ilk ekranında dönen hero slaytlarıdır. Tek kayıt varsa sabit görünür, birden fazla kayıt varsa kaydırmalı alan olur.',
              },
              label: 'Hero Kayıtları',
              name: 'hero_kayitlari',
              type: 'array',
              fields: [
                {
                  admin: {
                    description:
                      'Hero üstünde küçük vurgu etiketi olarak görünür. Örnek: Yeni sezon, UV Baskı, Hızlı Teslim.',
                  },
                  label: 'Etiket',
                  name: 'etiket',
                  type: 'text',
                },
                {
                  admin: {
                    description: 'Hero alanında büyük puntoda görünen ana başlık.',
                  },
                  label: 'Başlık',
                  name: 'baslik',
                  type: 'text',
                },
                {
                  admin: {
                    description: 'Başlığın altında görünen kısa açıklama metni.',
                  },
                  label: 'Metin',
                  name: 'metin',
                  type: 'textarea',
                },
                {
                  admin: {
                    description: 'Hero arka planında veya sağ bölümünde gösterilecek ana görsel.',
                  },
                  label: 'Görsel',
                  name: 'gorsel',
                  relationTo: 'medyalar',
                  type: 'upload',
                },
                {
                  admin: {
                    description: 'Ana aksiyon butonunda görünen metin. Örnek: Teklif Al',
                  },
                  label: 'Birincil Buton Metni',
                  name: 'birincil_buton_metin',
                  type: 'text',
                },
                {
                  admin: {
                    description: 'Ana buton bağlantısı. Örnek: /iletisim, /urunler veya harici bir URL.',
                  },
                  label: 'Birincil Buton Linki',
                  name: 'birincil_buton_link',
                  type: 'text',
                },
                {
                  admin: {
                    description: 'İkinci butonda görünen yardımcı metin. Örnek: WhatsApp Yaz',
                  },
                  label: 'İkincil Buton Metni',
                  name: 'ikincil_buton_metin',
                  type: 'text',
                },
                {
                  admin: {
                    description: 'İkinci butonun yönleneceği bağlantı.',
                  },
                  label: 'İkincil Buton Linki',
                  name: 'ikincil_buton_link',
                  type: 'text',
                },
              ],
            },
            {
              admin: {
                description:
                  'Hero altında küçük özet sayılar olarak gösterilir. Örnek: 1200+ Proje, 24 Saat Hızlı Dönüş.',
              },
              label: 'İstatistikler',
              name: 'istatistikler',
              type: 'array',
              fields: [
                {
                  admin: {
                    description: 'Örnek: 1200+, 18 Yıl, %98',
                  },
                  label: 'Değer',
                  name: 'deger',
                  type: 'text',
                },
                {
                  admin: {
                    description: 'Değerin kısa açıklaması.',
                  },
                  label: 'Açıklama',
                  name: 'aciklama',
                  type: 'text',
                },
              ],
            },
          ],
          label: 'Hero',
        },
        {
          fields: [
            {
              admin: {
                description: 'Ana sayfadaki kategori bölümünün başlığı.',
              },
              label: 'Kategori Alanı Başlık',
              name: 'kategori_baslik',
              type: 'text',
            },
            {
              admin: {
                description: 'Kategori bölümünde başlığın altında görünen açıklama.',
              },
              label: 'Kategori Alanı Açıklama',
              name: 'kategori_aciklama',
              type: 'textarea',
            },
            {
              admin: {
                description: 'Öne çıkan ürünler alanının başlığı.',
              },
              label: 'Ürün Alanı Başlık',
              name: 'urun_baslik',
              type: 'text',
            },
            {
              admin: {
                description: 'Ürünler bölümünde kullanılacak kısa tanıtım metni.',
              },
              label: 'Ürün Alanı Açıklama',
              name: 'urun_aciklama',
              type: 'textarea',
            },
            {
              admin: {
                description: 'Portföy vitrininin başlığı.',
              },
              label: 'Portföy Alanı Başlık',
              name: 'portfoy_baslik',
              type: 'text',
            },
            {
              admin: {
                description: 'Portföy bölümünde başlığın altında gösterilecek açıklama.',
              },
              label: 'Portföy Alanı Açıklama',
              name: 'portfoy_aciklama',
              type: 'textarea',
            },
            {
              admin: {
                description: 'Ana sayfadaki kampanya bölümünün başlığı.',
              },
              label: 'Kampanya Alanı Başlık',
              name: 'kampanya_baslik',
              type: 'text',
            },
            {
              admin: {
                description: 'Kampanya alanında kullanılacak kısa açıklama.',
              },
              label: 'Kampanya Alanı Açıklama',
              name: 'kampanya_aciklama',
              type: 'textarea',
            },
            {
              admin: {
                description: 'Blog veya rehber içerik alanı başlığı.',
              },
              label: 'Blog Alanı Başlık',
              name: 'blog_baslik',
              type: 'text',
            },
            {
              admin: {
                description: 'Blog kartlarının üstünde görünen kısa tanıtım metni.',
              },
              label: 'Blog Alanı Açıklama',
              name: 'blog_aciklama',
              type: 'textarea',
            },
          ],
          label: 'Bölümler',
        },
        {
          fields: [
            {
              admin: {
                description:
                  'Müşteriye nasıl çalıştığınızı anlatan adımlar. Ana sayfadaki süreç bölümünde görünür.',
              },
              label: 'Süreç Adımları',
              name: 'surec_adimlari',
              type: 'array',
              fields: [
                {
                  admin: {
                    description: 'Örnek: Talep, Tasarım, Baskı, Teslimat',
                  },
                  label: 'Adım',
                  name: 'adim',
                  type: 'text',
                },
                {
                  admin: {
                    description: 'Bu adımda neler yapıldığını anlatan kısa açıklama.',
                  },
                  label: 'Açıklama',
                  name: 'aciklama',
                  type: 'textarea',
                },
              ],
            },
            {
              admin: {
                description: 'Ana sayfanın teklif çağrısı bölümünün ana başlığı.',
              },
              label: 'Teklif Alanı Başlık',
              name: 'teklif_baslik',
              type: 'text',
            },
            {
              admin: {
                description: 'Teklif formunun üstünde kullanılacak yardımcı açıklama.',
              },
              label: 'Teklif Alanı Açıklama',
              name: 'teklif_aciklama',
              type: 'textarea',
            },
          ],
          label: 'Süreç ve Teklif',
        },
      ],
      type: 'tabs',
    },
  ],
  slug: 'ana_sayfa_icerigi',
}
