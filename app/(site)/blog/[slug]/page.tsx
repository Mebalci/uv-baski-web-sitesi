import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ZenginIcerik } from '@/bilesenler/ZenginIcerik'
import { blogYazisiGetir } from '@/kutuphane/icerikler'
import { jsonLdBetigi, metadataOlustur, seoYapilandirilmisVeriAl } from '@/kutuphane/seo'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const yazi = await blogYazisiGetir(slug)

  if (!yazi) {
    return {}
  }

  return metadataOlustur({
    aciklama: yazi.kisa_aciklama || yazi.baslik,
    baslik: yazi.baslik,
    seo: yazi.seo,
    yol: `/blog/${yazi.slug}`,
  })
}

export default async function BlogDetaySayfasi({ params }: Props) {
  const { slug } = await params
  const yazi = await blogYazisiGetir(slug)

  if (!yazi) {
    notFound()
  }

  return (
    <section className="mx-auto max-w-5xl px-5 pb-24 pt-32 md:px-8">
      <div className="icerik-paneli">
        <p className="etiket">Blog Yazisi</p>
        <h1 className="mt-5 text-5xl font-semibold tracking-[-0.06em] text-slate-950">{yazi.baslik}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{yazi.kisa_aciklama}</p>
      </div>

      {yazi.icerik ? (
        <div className="icerik-paneli mt-8">
          <ZenginIcerik icerik={yazi.icerik} />
        </div>
      ) : null}

      {seoYapilandirilmisVeriAl(yazi.seo).map((oge, index) => (
        <script
          dangerouslySetInnerHTML={jsonLdBetigi(oge)}
          key={index}
          type="application/ld+json"
        />
      ))}
    </section>
  )
}
