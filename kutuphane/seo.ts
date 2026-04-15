import type { Metadata } from 'next'

import { mutlakUrl } from '@/kutuphane/yardimcilar'

type SeoAlani = {
  seo_aciklama?: string | null
  seo_baslik?: string | null
  open_graph_gorseli?:
    | {
        alt?: string | null
        url?: string | null
      }
    | number
    | null
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
  const sayfaUrl = mutlakUrl(yol)
  const openGraphGorseli =
    seo?.open_graph_gorseli && typeof seo.open_graph_gorseli === 'object'
      ? seo.open_graph_gorseli
      : null
  const gorselUrl = openGraphGorseli?.url || mutlakUrl('/og-varsayilan.jpg')

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
      siteName: 'Nova UV Baskı',
      title: nihaiBaslik,
      type: 'website',
      url: sayfaUrl,
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
