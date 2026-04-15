import Image from 'next/image'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ZenginIcerik } from '@/bilesenler/ZenginIcerik'
import { portfoyGetir } from '@/kutuphane/icerikler'
import { medyaUrlAl } from '@/kutuphane/medya'
import { metadataOlustur } from '@/kutuphane/seo'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const kayit = await portfoyGetir(slug)

  if (!kayit) {
    return {}
  }

  return metadataOlustur({
    aciklama: kayit.kisa_aciklama || kayit.baslik,
    baslik: kayit.baslik,
    seo: kayit.seo,
    yol: `/portfoy/${kayit.slug}`,
  })
}

export default async function PortfoyDetaySayfasi({ params }: Props) {
  const { slug } = await params
  const kayit = await portfoyGetir(slug)

  if (!kayit) {
    notFound()
  }

  const gorselUrl = medyaUrlAl(kayit.kapak_gorseli as never, 'buyuk')

  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 pt-32 md:px-8">
      <div className="grid gap-8">
        <div className="icerik-paneli overflow-hidden">
          <div className="relative min-h-[24rem] overflow-hidden rounded-[1.9rem] bg-slate-100">
            {gorselUrl ? (
              <Image
                alt={kayit.baslik || 'Portfoy projesi'}
                className="h-full w-full object-cover"
                fill
                priority
                sizes="100vw"
                src={gorselUrl}
              />
            ) : (
              <div className="h-full min-h-[24rem] w-full bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.08),_transparent_48%),linear-gradient(180deg,#f8fafc,#e2e8f0)]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/75 to-white/10" />
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
              <p className="etiket">{kayit.musteri_adi || 'Portfoy Projesi'}</p>
              <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-slate-950">
                {kayit.baslik}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{kayit.kisa_aciklama}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="mini-panel">
            <p className="etiket">Musteri Tipi</p>
            <p className="mt-4 text-sm leading-7 text-slate-600">{kayit.musteri_adi || 'Kurumsal referans'}</p>
          </div>
          <div className="mini-panel">
            <p className="etiket">Uygulama Alani</p>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Magaza ici gorselleme, sert yuzey baskisi ve deneyim odakli uygulamalar.
            </p>
          </div>
          <div className="mini-panel">
            <p className="etiket">Surec Yaklasimi</p>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Kisa termin, on izleme ve kontrollu uygulama adimlariyla ilerlenir.
            </p>
          </div>
        </div>

        {'icerik' in kayit && kayit.icerik ? (
          <div className="icerik-paneli">
            <ZenginIcerik icerik={kayit.icerik} />
          </div>
        ) : null}
      </div>
    </section>
  )
}
