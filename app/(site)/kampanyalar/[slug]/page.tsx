import Image from 'next/image'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ZenginIcerik } from '@/bilesenler/ZenginIcerik'
import { kampanyaGetir } from '@/kutuphane/icerikler'
import { medyaUrlAl } from '@/kutuphane/medya'
import { metadataOlustur } from '@/kutuphane/seo'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const kampanya = await kampanyaGetir(slug)

  if (!kampanya) {
    return {}
  }

  return metadataOlustur({
    aciklama: kampanya.kisa_aciklama || kampanya.baslik,
    baslik: kampanya.baslik,
    seo: kampanya.seo,
    yol: `/kampanyalar/${kampanya.slug}`,
  })
}

export default async function KampanyaDetaySayfasi({ params }: Props) {
  const { slug } = await params
  const kampanya = await kampanyaGetir(slug)

  if (!kampanya) {
    notFound()
  }

  const gorselUrl =
    'kapak_gorseli' in kampanya
      ? medyaUrlAl(kampanya.kapak_gorseli as never, 'buyuk')
      : null

  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 pt-32 md:px-8">
      <div className="grid gap-8">
        <div className="icerik-paneli overflow-hidden">
          <div className="relative min-h-[22rem] overflow-hidden rounded-[1.9rem] bg-slate-100">
            {gorselUrl ? (
              <Image
                alt={kampanya.baslik || 'Kampanya görseli'}
                className="h-full w-full object-cover"
                fill
                priority
                sizes="100vw"
                src={gorselUrl}
              />
            ) : (
              <div className="h-full min-h-[22rem] w-full bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.08),_transparent_48%),linear-gradient(180deg,#f8fafc,#e2e8f0)]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/75 to-white/10" />
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
              <p className="etiket">Kampanya Detayi</p>
              <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-slate-950">
                {kampanya.baslik}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{kampanya.kisa_aciklama}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="mini-panel">
            <p className="etiket">Baslangic</p>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              {kampanya.baslangic_tarihi?.slice(0, 10) || 'Belirtilmedi'}
            </p>
          </div>
          <div className="mini-panel">
            <p className="etiket">Bitis</p>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              {kampanya.bitis_tarihi?.slice(0, 10) || 'Belirtilmedi'}
            </p>
          </div>
          <div className="mini-panel">
            <p className="etiket">Yayin Durumu</p>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              {kampanya.sayac_goster ? 'Sayaç aktif' : 'Sayaç kapalı'}
            </p>
          </div>
        </div>

        {'icerik' in kampanya && kampanya.icerik ? (
          <div className="icerik-paneli">
            <ZenginIcerik icerik={kampanya.icerik} />
          </div>
        ) : null}
      </div>
    </section>
  )
}
