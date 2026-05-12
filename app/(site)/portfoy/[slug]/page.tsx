import Image from 'next/image'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { TeklifFormu } from '@/bilesenler/TeklifFormu'

import { PortfoySepetButonu } from '@/bilesenler/PortfoySepetButonu'
import { ZenginIcerik } from '@/bilesenler/ZenginIcerik'
import { portfoyGetir } from '@/kutuphane/icerikler'
import { medyaUrlAl } from '@/kutuphane/medya'
import { jsonLdBetigi, metadataOlustur, seoYapilandirilmisVeriAl } from '@/kutuphane/seo'

type Props = {
  params: Promise<{ slug: string }>
}

type GaleriGorseli = {
  id?: number | string
  gorsel?: unknown
}

type PortfoyDetayKaydi = {
  baslik?: string | null
  fiyat_metni?: string | null
  galeri?: GaleriGorseli[] | unknown[] | null
  icerik?: unknown
  kapak_gorseli?: unknown
  kisa_aciklama?: string | null
  musteri_adi?: string | null
  referans_notu?: string | null
  seo?: unknown
  slug?: string | null
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

  const detayKaydi = kayit as PortfoyDetayKaydi
  const gorselUrl = medyaUrlAl(detayKaydi.kapak_gorseli as never, 'buyuk')
  const galeri = Array.isArray(detayKaydi.galeri)
    ? (detayKaydi.galeri as GaleriGorseli[])
    : []
  const fiyatMetni =
    typeof detayKaydi.fiyat_metni === 'string' ? detayKaydi.fiyat_metni : null

  return (
    <>
      <section className="mx-auto max-w-[1480px] px-5 pb-20 pt-12 md:px-8 lg:px-[64px]">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
            {gorselUrl ? (
              <Image
                alt={detayKaydi.baslik || 'Portfoy projesi'}
                className="object-fill"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
                src={gorselUrl}
              />
            ) : null}
          </div>

          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[var(--atolyen-blue)]">
              {detayKaydi.musteri_adi || 'Portfoy Projesi'}
            </p>

            <h1 className="font-parisienne mt-3 text-[clamp(4.5rem,10vw,10rem)] font-normal leading-[0.78] text-[var(--atolyen-blue)]">
              {detayKaydi.baslik}
            </h1>

            {detayKaydi.kisa_aciklama ? (
              <p className="mt-8 max-w-3xl text-base font-semibold leading-8 text-slate-900">
                {detayKaydi.kisa_aciklama}
              </p>
            ) : null}

            {fiyatMetni || detayKaydi.baslik ? (
              <div className="mt-8 flex flex-wrap items-center gap-5">
                {fiyatMetni ? (
                  <p className="inline-block border-b border-[var(--atolyen-blue)] pb-2 text-xl font-extrabold text-slate-950">
                    {fiyatMetni}
                  </p>
                ) : null}

                {detayKaydi.baslik ? (
                <PortfoySepetButonu
                  oge={{
                    baslik: detayKaydi.baslik,
                    fiyat: fiyatMetni,
                    slug: detayKaydi.slug,
                  }}
                />
                ) : null}
              </div>
            ) : null}

            {detayKaydi.referans_notu ? (
              <p className="mt-8 max-w-3xl text-sm leading-7 text-slate-700">
                {detayKaydi.referans_notu}
              </p>
            ) : null}
          </div>
        </div>

        {detayKaydi.icerik ? (
          <div className="mx-auto mt-14 max-w-5xl">
            <ZenginIcerik icerik={detayKaydi.icerik} />
          </div>
        ) : null}

        {galeri.length ? (
          <section className="mx-auto mt-16 max-w-[1180px]">
            <div className="atolyen-cizgili-baslik mb-8">
              <h2 className="font-parisienne text-center text-[clamp(3rem,6vw,5.5rem)] font-normal leading-none text-[var(--atolyen-blue)]">
                Proje Gorselleri
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
              {galeri.map((gorsel, index) => {
                const galeriUrl = medyaUrlAl((gorsel.gorsel || gorsel) as never, 'buyuk')

                return (
                  <div
                    className="relative aspect-[4/3] overflow-hidden bg-black"
                    key={gorsel.id || index}
                  >
                    {galeriUrl ? (
                      <Image
                        alt={`${detayKaydi.baslik || 'Portfoy'} proje gorseli`}
                        className="object-fill"
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        src={galeriUrl}
                      />
                    ) : null}
                  </div>
                )
              })}
            </div>
          </section>
        ) : null}
      </section>

      <section className="w-full px-5 py-14 md:px-8 lg:px-[64px]">
              <div className="mx-auto flex max-w-[920px] flex-col items-center">
                <div className="mb-10 inline-flex px-3 py-3 text-xl font-bold uppercase tracking-wide text-slate-900 md:text-2xl">
                  TEKLIF AL
                </div>
      
                <div className="w-full">
                  <TeklifFormu konu="Ana sayfa teklif talebi" />
                </div>
              </div>
      </section>

      {seoYapilandirilmisVeriAl(detayKaydi.seo).map((oge, index) => (
        <script
          dangerouslySetInnerHTML={jsonLdBetigi(oge)}
          key={index}
          type="application/ld+json"
        />
      ))}
    </>
  )
}
