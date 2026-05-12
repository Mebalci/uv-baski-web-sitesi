import Image from 'next/image'
import type { Metadata } from 'next'

import { ReklamAlani } from '@/bilesenler/ReklamAlani'
import { ZenginIcerik } from '@/bilesenler/ZenginIcerik'
import {
  hakkimizdaIcerigiGetir,
  sayfaGetir,
  siteReklamlariniGetir,
} from '@/kutuphane/icerikler'
import { medyaUrlAl } from '@/kutuphane/medya'
import { metadataOlustur } from '@/kutuphane/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const [sayfa, hakkimizdaIcerigi] = await Promise.all([
    sayfaGetir('hakkimizda'),
    hakkimizdaIcerigiGetir(),
  ])

  return metadataOlustur({
    aciklama:
      hakkimizdaIcerigi?.aciklama_metni ||
      sayfa?.kisa_aciklama ||
      'Atolyen hakkinda marka, tasarim ve uretim yaklasimi.',
    baslik: sayfa?.baslik || 'Hakkimizda',
    seo: sayfa?.seo,
    yol: '/hakkimizda',
  })
}

export default async function HakkimizdaSayfasi() {
  const [sayfa, hakkimizdaIcerigi, sagReklamlar] = await Promise.all([
    sayfaGetir('hakkimizda'),
    hakkimizdaIcerigiGetir(),
    siteReklamlariniGetir('hakkimizda_sag'),
  ])

  const baslik = sayfa?.baslik || 'Hakkimizda'
  const solGorselUrl = medyaUrlAl(
    (hakkimizdaIcerigi?.sol_gorsel || sayfa?.kapak_gorseli) as never,
    'buyuk',
  )

  const metinler = (hakkimizdaIcerigi?.aciklama_metni || sayfa?.kisa_aciklama || '')
    .split(/\n\s*\n|\n/)
    .map((metin) => metin.trim())
    .filter(Boolean)

  return (
    <section className="mx-auto grid max-w-[1760px] items-start gap-8 px-5 pb-10 pt-12 md:px-8 lg:grid-cols-[1fr_4fr_1fr] lg:gap-12 lg:px-[64px]">
      <div className="relative h-[38rem] w-full overflow-hidden xl:h-[44rem]">
        {solGorselUrl ? (
          <Image
            alt={`${baslik} sol gorseli`}
            className="object-fill"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 16vw"
            src={solGorselUrl}
          />
        ) : null}
      </div>

      <div className="self-center text-center">
        <h1 className="font-parisienne relative -top-3 left-5 rotate-[-3deg] text-[clamp(3.6rem,7vw,7.5rem)] leading-[0.78] tracking-[0.01em] text-[var(--atolyen-blue)] lg:left-8 lg:-top-5">
          {baslik}
        </h1>

        {metinler.length ? (
          <div className="mx-auto mt-8 max-w-[58rem] space-y-5 text-sm font-semibold leading-6 text-black md:text-base md:leading-7">
            {metinler.map((metin, index) => (
              <p key={index}>{metin}</p>
            ))}
          </div>
        ) : sayfa?.icerik ? (
          <div className="mx-auto mt-8 max-w-[58rem] text-left">
            <ZenginIcerik icerik={sayfa.icerik} />
          </div>
        ) : (
          <div className="mx-auto mt-8 max-w-[58rem] space-y-5 text-sm font-semibold leading-6 text-black md:text-base md:leading-7">
            <p>
              Fikrin tasarimla bulustugu, hayalin uretime donustugu yaratici
              bir atolyedir. Her projeye ozgun bir bakis acisiyla yaklasir,
              markalarin kimligini en dogru sekilde yansitacak cozumler
              uretiriz.
            </p>
            <p>
              Dijital baskidan matbaa cozumlerine, serigrafiden promosyon
              urunlerine kadar genis uretim gucumuzle fikirlerinizi
              somutlastiriyoruz.
            </p>
          </div>
        )}
      </div>

      <ReklamAlani
        boskenGizle
        className="h-[38rem] w-full xl:h-[44rem]"
        kayitlar={sagReklamlar}
      />
    </section>
  )
}
