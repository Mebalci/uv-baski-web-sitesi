import type { Metadata } from 'next'

import { AltBilgi } from '@/bilesenler/AltBilgi'
import { UstMenu } from '@/bilesenler/UstMenu'
import { siteAyarlariGetir } from '@/kutuphane/icerikler'
import { jsonLdBetigi, metadataOlustur } from '@/kutuphane/seo'
import { siteUrlAl } from '@/kutuphane/yardimcilar'
import '../globals.css'

export async function generateMetadata(): Promise<Metadata> {
  const ayarlar = await siteAyarlariGetir()
  const siteUrl = siteUrlAl()

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
  const siteUrl = siteUrlAl()

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
            url: siteUrl,
          })}
          type="application/ld+json"
        />
      </body>
    </html>
  )
}
