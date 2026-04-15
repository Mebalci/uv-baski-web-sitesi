import type { Metadata } from 'next'

import { AltBilgi } from '@/bilesenler/AltBilgi'
import { UstMenu } from '@/bilesenler/UstMenu'
import { siteAyarlariGetir } from '@/kutuphane/icerikler'
import { jsonLdBetigi, metadataOlustur } from '@/kutuphane/seo'
import '../globals.css'

export async function generateMetadata(): Promise<Metadata> {
  const ayarlar = await siteAyarlariGetir()

  return metadataOlustur({
    aciklama: ayarlar.aciklama,
    baslik: ayarlar.firma_adi,
    seo: ayarlar.seo,
  })
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const ayarlar = await siteAyarlariGetir()

  return (
    <html lang="tr">
      <body>
        <UstMenu />
        <main>{children}</main>
        <AltBilgi />
        <script
          dangerouslySetInnerHTML={jsonLdBetigi({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            email: ayarlar.eposta,
            name: ayarlar.firma_adi,
            telephone: ayarlar.telefon,
            url: process.env.SITE_URL || 'http://localhost:3000',
          })}
          type="application/ld+json"
        />
      </body>
    </html>
  )
}
