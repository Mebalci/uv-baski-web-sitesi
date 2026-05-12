import type { Metadata } from 'next'
import Script from 'next/script'

import { AltBilgi } from '@/bilesenler/AltBilgi'
import { UstMenu } from '@/bilesenler/UstMenu'
import { WhatsAppSepetKisayolu } from '@/bilesenler/WhatsAppSepetKisayolu'
import {
  entegrasyonAyarlariGetir,
  iletisimBilgileriGetir,
  siteAyarlariGetir,
} from '@/kutuphane/icerikler'
import { medyaUrlAl } from '@/kutuphane/medya'
import { jsonLdBetigi, metadataOlustur } from '@/kutuphane/seo'
import { siteUrlAl } from '@/kutuphane/yardimcilar'
import '../globals.css'

function guvenliFontAdi(fontAdi?: string | null) {
  const temiz = fontAdi?.trim()

  if (!temiz || !/^[\p{L}\p{N}\s_-]+$/u.test(temiz)) {
    return 'Parisienne'
  }

  return temiz
}

function googleFontBilgisiAl(fontLinki?: string | null) {
  const temiz = fontLinki?.trim()

  if (!temiz) {
    return {
      cssUrl: 'https://fonts.googleapis.com/css2?family=Parisienne&display=swap',
      fontFamily: "'Parisienne', 'Segoe Script', 'Brush Script MT', cursive",
    }
  }

  try {
    const ayrilan = new URL(temiz)

    if (ayrilan.hostname === 'fonts.google.com' && ayrilan.pathname.startsWith('/specimen/')) {
      const fontAdi = guvenliFontAdi(
        decodeURIComponent(ayrilan.pathname.replace('/specimen/', '').replaceAll('+', ' ')),
      )

      return {
        cssUrl: `https://fonts.googleapis.com/css2?family=${fontAdi.replaceAll(' ', '+')}&display=swap`,
        fontFamily: `'${fontAdi.replaceAll("'", '')}', 'Segoe Script', 'Brush Script MT', cursive`,
      }
    }

    if (ayrilan.hostname === 'fonts.googleapis.com' && ayrilan.pathname.startsWith('/css')) {
      const family = ayrilan.searchParams.get('family')?.split(':')[0]?.replaceAll('+', ' ')
      const fontAdi = guvenliFontAdi(family)

      return {
        cssUrl: ayrilan.toString(),
        fontFamily: `'${fontAdi.replaceAll("'", '')}', 'Segoe Script', 'Brush Script MT', cursive`,
      }
    }
  } catch {
    const fontAdi = guvenliFontAdi(temiz)

    return {
      cssUrl: `https://fonts.googleapis.com/css2?family=${fontAdi.replaceAll(' ', '+')}&display=swap`,
      fontFamily: `'${fontAdi.replaceAll("'", '')}', 'Segoe Script', 'Brush Script MT', cursive`,
    }
  }

  return {
    cssUrl: 'https://fonts.googleapis.com/css2?family=Parisienne&display=swap',
    fontFamily: "'Parisienne', 'Segoe Script', 'Brush Script MT', cursive",
  }
}

function siteLogoUrlAl(ayarlar: unknown) {
  const logo = (ayarlar as { logo?: unknown })?.logo

  return medyaUrlAl(logo as never, 'kucuk') || medyaUrlAl(logo as never) || '/favicon.png'
}

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
  const siteLogoUrl = siteLogoUrlAl(ayarlar)

  return {
    ...temelMetadata,
    icons: {
      apple: siteLogoUrl,
      icon: [
        {
          url: siteLogoUrl,
        },
      ],
      shortcut: siteLogoUrl,
    },
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
  const [ayarlar, entegrasyonAyarlari, iletisim] = await Promise.all([
    siteAyarlariGetir(),
    entegrasyonAyarlariGetir(),
    iletisimBilgileriGetir(),
  ])
  const siteUrl = siteUrlAl()
  const analyticsId = entegrasyonAyarlari.google_analytics_olcum_kimligi?.trim()
  const tagManagerId = entegrasyonAyarlari.google_tag_manager_kimligi?.trim()
  const baslikFontAyarlari = ayarlar as { baslik_font_linki?: string | null }
  const baslikFontu = googleFontBilgisiAl(baslikFontAyarlari.baslik_font_linki)
  const siteLogoUrl = siteLogoUrlAl(ayarlar)

  return (
    <html lang="tr" data-scroll-behavior="smooth">
      <head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect" />
        <link href={siteLogoUrl} rel="icon" />
        <link href={siteLogoUrl} rel="apple-touch-icon" />
        <link href={baslikFontu.cssUrl} rel="stylesheet" />
      </head>
      <body style={{ '--atolyen-heading-font': baslikFontu.fontFamily } as React.CSSProperties}>
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
        <WhatsAppSepetKisayolu telefon={iletisim.telefon || ayarlar.telefon} />
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
