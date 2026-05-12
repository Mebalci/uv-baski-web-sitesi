import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ReklamAlani } from '@/bilesenler/ReklamAlani'
import { PortfoySepetButonu } from '@/bilesenler/PortfoySepetButonu'
import { ZenginIcerik } from '@/bilesenler/ZenginIcerik'
import {
  portfoyProjeleriniSayfaIcinGetir,
  sayfaGetir,
  siteReklamlariniGetir,
} from '@/kutuphane/icerikler'
import { medyaUrlAl } from '@/kutuphane/medya'
import {
  jsonLdBetigi,
  metadataOlustur,
  seoYapilandirilmisVeriAl,
} from '@/kutuphane/seo'

type Props = {
  params: Promise<{ slug: string }>
}

type PortfolyoProjesi = {
  id?: number | string
  baslik?: string | null
  fiyat_metni?: string | null
  kapak_gorseli?: unknown
  sayfa_bolum_basligi?: string | null
  slug?: string | null
}

type DinamikSayfaVerisi = {
  baslik: string
  id?: number | string
  slug: string
  kisa_aciklama?: string | null
  icerik?: unknown
  seo?: unknown
  kapak_gorseli?: unknown
  sag_reklam_alt_metin?: string | null
  sag_reklam_gorseli?: unknown
  sag_reklam_link?: string | null
  sag_reklam_yeni_sekmede_acilsin_mi?: boolean | null
}

function portfolyoBolumlerineAyir(projeler: PortfolyoProjesi[]) {
  return projeler.reduce<Array<{ baslik: string; projeler: PortfolyoProjesi[] }>>(
    (bolumler, proje) => {
      const bolumBasligi = proje.sayfa_bolum_basligi?.trim() || 'Ornekler'
      const mevcutBolum = bolumler.find((bolum) => bolum.baslik === bolumBasligi)

      if (mevcutBolum) {
        mevcutBolum.projeler.push(proje)
      } else {
        bolumler.push({
          baslik: bolumBasligi,
          projeler: [proje],
        })
      }

      return bolumler
    },
    [],
  )
}

function SayfaGorseli({
  baslik,
  className = '',
  url,
}: {
  baslik: string
  className?: string
  url?: string | null
}) {
  return (
    <div
      className={`relative h-[38rem] w-full overflow-hidden xl:h-[44rem] ${className}`}
    >
      {url ? (
        <Image
          alt={`${baslik} gorseli`}
          className="object-fill"
          fill
          priority
          sizes="(max-width: 1024px) 50vw, 16vw"
          src={url}
        />
      ) : null}
    </div>
  )
}

function SagReklamKutusu({
  className = '',
  kayitlar,
}: {
  className?: string
  kayitlar: Parameters<typeof ReklamAlani>[0]['kayitlar']
}) {
  return (
    <div
      className={`relative h-[38rem] w-full overflow-hidden xl:h-[44rem] ${className}`}
    >
      <ReklamAlani className="absolute inset-0 h-full w-full" kayitlar={kayitlar} />
    </div>
  )
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

  const [sayfaHam, sagReklamlar] = await Promise.all([
    sayfaGetir(slug),
    siteReklamlariniGetir(slug === 'hakkimizda' ? 'hakkimizda_sag' : 'detay_sag'),
  ])

  if (!sayfaHam) {
    notFound()
  }

  const sayfa = sayfaHam as DinamikSayfaVerisi
  const baslik = sayfa.baslik
  const solGorselUrl = medyaUrlAl(sayfa.kapak_gorseli as never, 'buyuk')

  const sayfaSagReklamlar = sayfa.sag_reklam_gorseli
    ? [
        {
          alt_metin: sayfa.sag_reklam_alt_metin || `${baslik} reklam gorseli`,
          baslik: `${baslik} reklam`,
          gorsel: sayfa.sag_reklam_gorseli,
          link: sayfa.sag_reklam_link,
          yeni_sekmede_acilsin_mi: sayfa.sag_reklam_yeni_sekmede_acilsin_mi,
        },
      ]
    : null

  const kullanilacakSagReklamlar = sayfaSagReklamlar || sagReklamlar

  const portfolyoProjeleri = (await portfoyProjeleriniSayfaIcinGetir(
    sayfa,
  )) as PortfolyoProjesi[]

  const portfolyoBolumleri = portfolyoBolumlerineAyir(portfolyoProjeleri)

  const metinler = (sayfa.kisa_aciklama || '')
    .split(/\n\s*\n|\n/)
    .map((metin) => metin.trim())
    .filter(Boolean)

  return (
    <>
      <section className="mx-auto max-w-[1760px] px-5 pb-16 pt-12 md:px-8 lg:px-[64px]">
        <div className="grid items-start gap-7 lg:grid-cols-[1fr_4fr_1fr] lg:gap-12">
          <SayfaGorseli
            baslik={baslik}
            className="hidden lg:block"
            url={solGorselUrl}
          />

          <div className="self-start text-left lg:px-3">
            <h1 className="font-parisienne relative -top-2 rotate-[-3deg] text-[clamp(4.5rem,11vw,11rem)] font-normal leading-[0.78] text-[var(--atolyen-blue)] lg:-top-5">
              {baslik}
            </h1>

            {metinler.length ? (
              <div className="mx-auto mt-6 max-w-[58rem] space-y-4 text-right text-sm font-semibold leading-6 text-black md:text-base md:leading-7">
                {metinler.map((metin, index) => (
                  <p key={index}>{metin}</p>
                ))}
              </div>
            ) : null}

            {sayfa.icerik ? (
              <div className="mx-auto mt-8 max-w-[58rem] text-left">
                <ZenginIcerik icerik={sayfa.icerik} />
              </div>
            ) : null}
          </div>

          <SagReklamKutusu
            className="hidden lg:block"
            kayitlar={kullanilacakSagReklamlar}
          />

          <div className="grid grid-cols-2 gap-4 lg:hidden">
            <SayfaGorseli baslik={baslik} url={solGorselUrl} />
            <SagReklamKutusu kayitlar={kullanilacakSagReklamlar} />
          </div>
        </div>

        {portfolyoBolumleri.map((bolum) => (
          <section className="mx-auto mt-16 max-w-[1180px]" key={bolum.baslik}>
            <div className="atolyen-cizgili-baslik mb-8">
              <h2 className="font-parisienne text-center text-[clamp(3rem,6vw,5.5rem)] font-normal leading-none text-[var(--atolyen-blue)]">
                {bolum.baslik}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
              {bolum.projeler.slice(0, 12).map((proje, index) => {
                const projeGorselUrl = medyaUrlAl(
                  proje.kapak_gorseli as never,
                  'buyuk',
                )

                const kartIcerigi = (
                  <>
                    <div className="relative aspect-[4/3] overflow-hidden bg-black">
                      {projeGorselUrl ? (
                        <Image
                          alt={proje.baslik || `${baslik} projesi`}
                          className="object-fill"
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          src={projeGorselUrl}
                        />
                      ) : null}
                    </div>

                    {proje.fiyat_metni ? (
                      <p className="border-b border-[var(--atolyen-blue)] py-3 text-center text-sm font-extrabold uppercase tracking-wide text-slate-900">
                        {proje.fiyat_metni}
                      </p>
                    ) : null}

                    {proje.baslik ? (
                      <p className="border-b border-[var(--atolyen-blue)] py-3 text-center text-sm font-bold uppercase tracking-wide text-slate-900">
                        {proje.baslik}
                      </p>
                    ) : null}
                  </>
                )

                return (
                  <article key={proje.id || `${proje.baslik}-${index}`}>
                    {proje.slug ? (
                      <Link className="block" href={`/portfoy/${proje.slug}`}>
                        {kartIcerigi}
                      </Link>
                    ) : (
                      kartIcerigi
                    )}

                    {proje.baslik && proje.fiyat_metni ? (
                      <PortfoySepetButonu
                        className="mt-2 w-full"
                        oge={{
                          baslik: proje.baslik,
                          fiyat: proje.fiyat_metni,
                          slug: proje.slug,
                        }}
                      />
                    ) : null}
                  </article>
                )
              })}
            </div>
          </section>
        ))}
      </section>

      {seoYapilandirilmisVeriAl(sayfa.seo).map((oge, index) => (
        <script
          dangerouslySetInnerHTML={jsonLdBetigi(oge)}
          key={index}
          type="application/ld+json"
        />
      ))}
    </>
  )
}
