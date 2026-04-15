import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const host = process.env.SITE_URL || 'http://localhost:3000'

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
