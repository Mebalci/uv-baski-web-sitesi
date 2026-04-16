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
  yapilandirilmis_veri?: Record<string, unknown> | Record<string, unknown>[] | null
}

export function metadataOlustur({
  aciklama,
  baslik,
  seo,
  yol = '/',
}: {
  aciklama: string
  baslik: string
  seo?: SeoAlani | null
  yol?: string
}): Metadata {
  const nihaiBaslik = seo?.seo_baslik || baslik
  const nihaiAciklama = seo?.seo_aciklama || aciklama
  const sayfaUrl = seo?.kanonik_url || mutlakUrl(yol)
  const openGraphGorseli =
    seo?.open_graph_gorseli && typeof seo.open_graph_gorseli === 'object'
      ? seo.open_graph_gorseli
      : null
  const gorselUrl = openGraphGorseli?.url || mutlakUrl('/og-varsayilan.jpg')
  const indekslensinMi = seo?.indekslensin_mi !== false

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
      siteName: 'Nova UV Baski',
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
  seo?: SeoAlani | null,
): Array<Record<string, unknown>> {
  if (!seo?.yapilandirilmis_veri) {
    return []
  }

  if (Array.isArray(seo.yapilandirilmis_veri)) {
    return seo.yapilandirilmis_veri.filter(
      (oge): oge is Record<string, unknown> => Boolean(oge && typeof oge === 'object'),
    )
  }

  if (typeof seo.yapilandirilmis_veri === 'object') {
    return [seo.yapilandirilmis_veri]
  }

  return []
}
