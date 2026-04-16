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

type SitemapKaydi = {
  seo?: {
    indekslensin_mi?: boolean | null
  } | null
  slug: string
  updatedAt?: string | null
  yayin_tarihi?: string | null
}

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

  const indekslenebilir = (kayit: SitemapKaydi) =>
    kayit.seo?.indekslensin_mi !== false
  const degisimTarihi = (kayit: unknown) => {
    if (!kayit || typeof kayit !== 'object') {
      return undefined
    }

    const veri = kayit as {
      updatedAt?: string | null
      yayin_tarihi?: string | null
    }

    return veri.updatedAt || veri.yayin_tarihi || undefined
  }
  const sitemapKayitlarinaDonustur = (kayitlar: unknown[]): SitemapKaydi[] =>
    kayitlar.filter(
      (kayit): kayit is SitemapKaydi =>
        Boolean(kayit && typeof kayit === 'object' && 'slug' in kayit && typeof kayit.slug === 'string'),
    )

  const sabitler = ['/', '/urunler', '/portfoy', '/kampanyalar', '/blog', '/iletisim'].map(
    (url) => ({
      changeFrequency: 'weekly' as const,
      priority: url === '/' ? 1 : 0.8,
      url: mutlakUrl(url),
    }),
  )

  return [
    ...sabitler,
    ...sitemapKayitlarinaDonustur(urunler).filter(indekslenebilir).map((urun) => ({
      lastModified: degisimTarihi(urun),
      url: mutlakUrl(`/urunler/${urun.slug}`),
    })),
    ...sitemapKayitlarinaDonustur(kategoriler)
      .filter(indekslenebilir)
      .map((kategori) => ({
        lastModified: degisimTarihi(kategori),
        url: mutlakUrl(`/kategoriler/${kategori.slug}`),
      })),
    ...sitemapKayitlarinaDonustur(portfoyler)
      .filter(indekslenebilir)
      .map((kayit) => ({
        lastModified: degisimTarihi(kayit),
        url: mutlakUrl(`/portfoy/${kayit.slug}`),
      })),
    ...sitemapKayitlarinaDonustur(kampanyalar)
      .filter(indekslenebilir)
      .map((kayit) => ({
        lastModified: degisimTarihi(kayit),
        url: mutlakUrl(`/kampanyalar/${kayit.slug}`),
      })),
    ...sitemapKayitlarinaDonustur(blogYazilari)
      .filter(indekslenebilir)
      .map((yazi) => ({
        lastModified: degisimTarihi(yazi),
        url: mutlakUrl(`/blog/${yazi.slug}`),
      })),
    ...sitemapKayitlarinaDonustur(sayfalar).filter(indekslenebilir).map((sayfa) => ({
      lastModified: degisimTarihi(sayfa),
      url: mutlakUrl(`/${sayfa.slug}`),
    })),
  ]
}
