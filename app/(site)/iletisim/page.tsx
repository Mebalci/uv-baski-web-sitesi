import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

import { ReklamAlani } from '@/bilesenler/ReklamAlani'
import {
  iletisimBilgileriGetir,
  altBilgiGetir,
  sayfaGetir,
  siteAyarlariGetir,
  siteReklamlariniGetir,
} from '@/kutuphane/icerikler'
import { medyaUrlAl } from '@/kutuphane/medya'
import { metadataOlustur } from '@/kutuphane/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const sayfa = await sayfaGetir('iletisim')

  return metadataOlustur({
    aciklama:
      sayfa?.kisa_aciklama || 'UV baski, promosyon urunleri ve kurumsal uygulamalar icin iletisim bilgileri.',
    baslik: sayfa?.baslik || 'Iletisim',
    seo: sayfa?.seo,
    yol: '/iletisim',
  })
}

export default async function IletisimSayfasi() {
  const [siteAyarlari, iletisim, altBilgi, sayfa, sagReklamlar] = await Promise.all([
    siteAyarlariGetir(),
    iletisimBilgileriGetir(),
    altBilgiGetir(),
    sayfaGetir('iletisim'),
    siteReklamlariniGetir('iletisim_sag'),
  ])

  const baslik = sayfa?.baslik || 'Iletisim'
  const solGorselUrl = medyaUrlAl(iletisim.sol_gorsel as never, 'buyuk')
  const satirlar = [
    iletisim.eposta || siteAyarlari.eposta,
    iletisim.telefon || siteAyarlari.telefon,
    iletisim.adres || siteAyarlari.adres,
  ].filter((satir): satir is string => Boolean(satir))

  return (
    <section className="mx-auto grid max-w-[1760px] items-center gap-8 px-5 pb-10 pt-12 md:px-8 lg:grid-cols-[3fr_4fr_2fr] lg:gap-12 lg:px-[64px]">
      <div className="relative z-0 aspect-square w-full overflow-hidden">
        {solGorselUrl ? (
          <Image
            alt={`${baslik} sol gorseli`}
            className="object-fill"
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            src={solGorselUrl}
          />
        ) : null}
      </div>

      <div className="relative z-10 text-left">
        <h1 className="font-parisienne relative -top-3 rotate-[-3deg] text-[clamp(3.6rem,7vw,7.5rem)] leading-[0.78] tracking-[0.01em] text-[var(--atolyen-blue)] lg:-top-5">
          {baslik}
        </h1>

        {satirlar.length ? (
          <div className="mt-8 max-w-[46rem] space-y-0 text-lg font-medium leading-snug text-slate-700 md:text-xl">
            {satirlar.map((satir, index) => (
              <p className="border-b border-[var(--atolyen-blue)]/45 py-3" key={`${satir}-${index}`}>
                {satir}
              </p>
            ))}
          </div>
        ) : null}

        {altBilgi.linkler?.length ? (
          <div className="mt-2 max-w-[46rem] space-y-0 text-lg font-medium leading-snug text-slate-700 md:text-xl">
            {altBilgi.linkler.map((link, index) => (
              <Link
                className="block border-b border-[var(--atolyen-blue)]/45 py-3 transition-colors hover:text-[var(--atolyen-blue)]"
                href={link.baglanti || '/'}
                key={`${link.etiket}-${link.baglanti}-${index}`}
              >
                {link.etiket}
              </Link>
            ))}
          </div>
        ) : null}
      </div>

      <ReklamAlani
        boskenGizle
        className="h-[38rem] w-full xl:h-[44rem]"
        kayitlar={sagReklamlar}
      />
    </section>
  )
}
