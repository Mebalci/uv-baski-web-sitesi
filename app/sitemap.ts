import type { MetadataRoute } from 'next'

import {
  blogYazilariniGetir,
  entegrasyonAyarlariGetir,
  kampanyalariGetir,
  kategorileriGetir,
  portfoyleriGetir,
  sayfalariGetir,
  urunleriGetir,
} from '@/kutuphane/icerikler'
import { mutlakUrl } from '@/kutuphane/yardimcilar'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [urunler, kategoriler, portfoyler, kampanyalar, blogYazilari, sayfalar, entegrasyonAyarlari] = await Promise.all([
    urunleriGetir(),
    kategorileriGetir(),
    portfoyleriGetir(),
    kampanyalariGetir(),
    blogYazilariniGetir(),
    sayfalariGetir(),
    entegrasyonAyarlariGetir(),
  ])

  if (entegrasyonAyarlari.site_indekslensin_mi === false) {
    return []
  }

  const indekslenebilir = <T extends { seo?: { indekslensin_mi?: boolean | null } | null }>(kayit: T) =>
    kayit.seo?.indekslensin_mi !== false
  const degisimTarihi = (kayit: { updatedAt?: string | null; yayin_tarihi?: string | null }) =>
    kayit.updatedAt || kayit.yayin_tarihi || undefined

  const sabitler = ['/', '/urunler', '/portfoy', '/kampanyalar', '/blog', '/iletisim'].map(
    (url) => ({
      changeFrequency: 'weekly' as const,
      priority: url === '/' ? 1 : 0.8,
      url: mutlakUrl(url),
    }),
  )

  return [
    ...sabitler,
    ...urunler.filter(indekslenebilir).map((urun) => ({
      lastModified: degisimTarihi(urun),
      url: mutlakUrl(`/urunler/${urun.slug}`),
    })),
    ...kategoriler
      .filter(indekslenebilir)
      .map((kategori) => ({
        lastModified: degisimTarihi(kategori),
        url: mutlakUrl(`/kategoriler/${kategori.slug}`),
      })),
    ...portfoyler
      .filter(indekslenebilir)
      .map((kayit) => ({
        lastModified: degisimTarihi(kayit),
        url: mutlakUrl(`/portfoy/${kayit.slug}`),
      })),
    ...kampanyalar
      .filter(indekslenebilir)
      .map((kayit) => ({
        lastModified: degisimTarihi(kayit),
        url: mutlakUrl(`/kampanyalar/${kayit.slug}`),
      })),
    ...blogYazilari
      .filter(indekslenebilir)
      .map((yazi) => ({
        lastModified: degisimTarihi(yazi),
        url: mutlakUrl(`/blog/${yazi.slug}`),
      })),
    ...sayfalar.filter(indekslenebilir).map((sayfa) => ({
      lastModified: degisimTarihi(sayfa),
      url: mutlakUrl(`/${sayfa.slug}`),
    })),
  ]
}
