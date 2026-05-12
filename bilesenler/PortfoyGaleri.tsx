import Image from 'next/image'
import Link from 'next/link'

import { PortfoySepetButonu } from '@/bilesenler/PortfoySepetButonu'
import { medyaUrlAl } from '@/kutuphane/medya'

type PortfoyGaleriProps = {
  kayitlar: Array<{
    [key: string]: unknown
    baslik?: string | null
    fiyat_metni?: string | null
    kapak_gorseli?: unknown
    kisa_aciklama?: string | null
    musteri_adi?: string | null
    slug?: string | null
  }>
}

export function PortfoyGaleri({ kayitlar }: PortfoyGaleriProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {kayitlar.map((oge, index) => {
        const gorselUrl = medyaUrlAl(oge.kapak_gorseli as never, 'buyuk')

        return (
          <article key={oge.slug || oge.baslik || String(index)}>
            <Link className="group block cursor-pointer" href={`/portfoy/${oge.slug || ''}`}>
              <div className="relative min-h-[22rem] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-[0_16px_40px_rgba(15,23,42,0.05)] sm:min-h-[27rem]">
                {gorselUrl ? (
                  <Image
                    alt={oge.baslik || 'Portfoy'}
                    className="object-fill transition duration-500 ease-out group-hover:scale-[1.02]"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    src={gorselUrl}
                  />
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.08),_transparent_40%),linear-gradient(180deg,#f8fafc,#e2e8f0)]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-white/10" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                    {oge.musteri_adi || 'Referans Proje'}
                  </p>
                  <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-slate-950">
                    {oge.baslik || 'Proje'}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
                    {oge.kisa_aciklama}
                  </p>
                </div>
              </div>
            </Link>
            {oge.baslik ? (
              <PortfoySepetButonu
                className="mt-3 w-full"
                oge={{
                  baslik: oge.baslik,
                  fiyat: oge.fiyat_metni,
                  slug: oge.slug,
                }}
              />
            ) : null}
          </article>
        )
      })}
    </div>
  )
}
