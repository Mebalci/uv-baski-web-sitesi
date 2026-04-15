import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ZenginIcerik } from '@/bilesenler/ZenginIcerik'
import { metadataOlustur } from '@/kutuphane/seo'
import { sayfaGetir } from '@/kutuphane/icerikler'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const sayfa = await sayfaGetir(slug)

  if (!sayfa) {
    return {}
  }

  return metadataOlustur({
    aciklama: sayfa.kisa_aciklama || sayfa.baslik,
    baslik: sayfa.baslik,
    seo: sayfa.seo,
    yol: `/${sayfa.slug}`,
  })
}

export default async function DinamikSayfa({ params }: Props) {
  const { slug } = await params
  const sayfa = await sayfaGetir(slug)

  if (!sayfa) {
    notFound()
  }

  return (
    <section className="mx-auto max-w-5xl px-5 pb-24 pt-32 md:px-8">
      <div className="icerik-paneli">        
        <h1 className="mt-5 text-5xl font-semibold tracking-[-0.06em] text-slate-950">{sayfa.baslik}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{sayfa.kisa_aciklama}</p>
      </div>

      {sayfa.icerik ? (
        <div className="icerik-paneli mt-8">
          <ZenginIcerik icerik={sayfa.icerik} />
        </div>
      ) : null}
    </section>
  )
}
