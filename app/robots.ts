import type { MetadataRoute } from 'next'
import { siteUrlAl } from '@/kutuphane/yardimcilar'

export default function robots(): MetadataRoute.Robots {
  const host = siteUrlAl()

  return {
    host,
    rules: {
      allow: '/',
      disallow: ['/yonetim', '/api'],
      userAgent: '*',
    },
    sitemap: `${host}/sitemap.xml`,
  }
}
