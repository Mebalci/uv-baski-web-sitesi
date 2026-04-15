import type { MetadataRoute } from 'next'

import {
  blogYazilariniGetir,
  kampanyalariGetir,
  kategorileriGetir,
  portfoyleriGetir,
  urunleriGetir,
} from '@/kutuphane/icerikler'
import { mutlakUrl } from '@/kutuphane/yardimcilar'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [urunler, kategoriler, portfoyler, kampanyalar, blogYazilari] = await Promise.all([
    urunleriGetir(),
    kategorileriGetir(),
    portfoyleriGetir(),
    kampanyalariGetir(),
    blogYazilariniGetir(),
  ])

  const sabitler = ['/', '/urunler', '/portfoy', '/kampanyalar', '/blog', '/iletisim'].map(
    (url) => ({
      changeFrequency: 'weekly' as const,
      priority: url === '/' ? 1 : 0.8,
      url: mutlakUrl(url),
    }),
  )

  return [
    ...sabitler,
    ...urunler.map((urun) => ({ url: mutlakUrl(`/urunler/${urun.slug}`) })),
    ...kategoriler.map((kategori) => ({ url: mutlakUrl(`/kategoriler/${kategori.slug}`) })),
    ...portfoyler.map((kayit) => ({ url: mutlakUrl(`/portfoy/${kayit.slug}`) })),
    ...kampanyalar.map((kayit) => ({ url: mutlakUrl(`/kampanyalar/${kayit.slug}`) })),
    ...blogYazilari.map((yazi) => ({ url: mutlakUrl(`/blog/${yazi.slug}`) })),
  ]
}
