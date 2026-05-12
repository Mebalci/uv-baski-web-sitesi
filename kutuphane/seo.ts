import type { Metadata } from 'next'

import { mutlakUrl } from '@/kutuphane/yardimcilar'

type SeoAlani = {
  indekslensin_mi?: boolean | null
  kanonik_url?: string | null
  open_graph_gorseli?:
    | {
        alt?: string | null
        url?: string | null
      }
    | number
    | null
  seo_aciklama?: string | null
  seo_baslik?: string | null
  yapilandirilmis_veri?: unknown
}

function kayitMi(deger: unknown): deger is Record<string, unknown> {
  return Boolean(deger && typeof deger === 'object' && !Array.isArray(deger))
}

export function metadataOlustur({
  aciklama,
  baslik,
  seo,
  yol = '/',
}: {
  aciklama: string
  baslik: string
  seo?: unknown
  yol?: string
}): Metadata {
  const seoAlani = kayitMi(seo) ? (seo as SeoAlani) : null
  const nihaiBaslik = seoAlani?.seo_baslik || baslik
  const nihaiAciklama = seoAlani?.seo_aciklama || aciklama
  const sayfaUrl = seoAlani?.kanonik_url || mutlakUrl(yol)
  const openGraphGorseli = kayitMi(seoAlani?.open_graph_gorseli)
    ? seoAlani.open_graph_gorseli
    : null
  const gorselUrl = openGraphGorseli?.url || mutlakUrl('/og-varsayilan.jpg')
  const indekslensinMi = seoAlani?.indekslensin_mi !== false

  return {
    alternates: {
      canonical: sayfaUrl,
    },
    description: nihaiAciklama,
    openGraph: {
      description: nihaiAciklama,
      images: [
        {
          alt: openGraphGorseli?.alt || nihaiBaslik,
          url: gorselUrl,
        },
      ],
      locale: 'tr_TR',
      siteName: 'UVAtolyen',
      title: nihaiBaslik,
      type: 'website',
      url: sayfaUrl,
    },
    robots: {
      follow: indekslensinMi,
      index: indekslensinMi,
    },
    title: nihaiBaslik,
    twitter: {
      card: 'summary_large_image',
      description: nihaiAciklama,
      images: [gorselUrl],
      title: nihaiBaslik,
    },
  }
}

export function jsonLdBetigi(nesne: Record<string, unknown>) {
  return {
    __html: JSON.stringify(nesne),
  }
}

export function seoYapilandirilmisVeriAl(
  seo?: unknown,
): Array<Record<string, unknown>> {
  const seoAlani = kayitMi(seo) ? (seo as SeoAlani) : null

  if (!seoAlani?.yapilandirilmis_veri) {
    return []
  }

  if (Array.isArray(seoAlani.yapilandirilmis_veri)) {
    return seoAlani.yapilandirilmis_veri.filter(
      (oge): oge is Record<string, unknown> => kayitMi(oge),
    )
  }

  if (kayitMi(seoAlani.yapilandirilmis_veri)) {
    return [seoAlani.yapilandirilmis_veri]
  }

  return []
}
