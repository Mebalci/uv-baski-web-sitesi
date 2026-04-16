import type { MetadataRoute } from 'next'
import { entegrasyonAyarlariGetir } from '@/kutuphane/icerikler'
import { siteUrlAl } from '@/kutuphane/yardimcilar'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = siteUrlAl()
  const entegrasyonAyarlari = await entegrasyonAyarlariGetir()
  const ekEngeller =
    entegrasyonAyarlari.robots_engellenen_yollar
      ?.split('\n')
      .map((satir: string) => satir.trim())
      .filter(Boolean) || []
  const disallow = ['/admin', '/api', ...ekEngeller]
  const siteIndekslensinMi = entegrasyonAyarlari.site_indekslensin_mi !== false

  return {
    host,
    rules: {
      allow: siteIndekslensinMi ? '/' : undefined,
      disallow: siteIndekslensinMi ? disallow : ['/'],
      userAgent: '*',
    },
    sitemap: `${host}/sitemap.xml`,
  }
}
