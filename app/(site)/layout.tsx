import type { Metadata } from 'next'
import Script from 'next/script'

import { AltBilgi } from '@/bilesenler/AltBilgi'
import { UstMenu } from '@/bilesenler/UstMenu'
import { entegrasyonAyarlariGetir, siteAyarlariGetir } from '@/kutuphane/icerikler'
import { jsonLdBetigi, metadataOlustur } from '@/kutuphane/seo'
import { siteUrlAl } from '@/kutuphane/yardimcilar'
import '../globals.css'

export async function generateMetadata(): Promise<Metadata> {
  const [ayarlar, entegrasyonAyarlari] = await Promise.all([
    siteAyarlariGetir(),
    entegrasyonAyarlariGetir(),
  ])

  const temelMetadata = metadataOlustur({
    aciklama: ayarlar.aciklama,
    baslik: ayarlar.firma_adi,
    seo: ayarlar.seo,
  })

  return {
    ...temelMetadata,
    robots: {
      follow: entegrasyonAyarlari.site_indekslensin_mi !== false,
      index: entegrasyonAyarlari.site_indekslensin_mi !== false,
    },
    verification: {
      google: entegrasyonAyarlari.google_search_console_dogrulama || undefined,
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [ayarlar, entegrasyonAyarlari] = await Promise.all([
    siteAyarlariGetir(),
    entegrasyonAyarlariGetir(),
  ])
  const siteUrl = siteUrlAl()
  const analyticsId = entegrasyonAyarlari.google_analytics_olcum_kimligi?.trim()
  const tagManagerId = entegrasyonAyarlari.google_tag_manager_kimligi?.trim()

  return (
    <html lang="tr">
      <body>
        {tagManagerId ? (
          <noscript>
            <iframe
              height="0"
              src={`https://www.googletagmanager.com/ns.html?id=${tagManagerId}`}
              style={{ display: 'none', visibility: 'hidden' }}
              width="0"
            />
          </noscript>
        ) : null}
        {tagManagerId ? (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${tagManagerId}');
            `}
          </Script>
        ) : null}
        {analyticsId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${analyticsId}');
              `}
            </Script>
          </>
        ) : null}
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
