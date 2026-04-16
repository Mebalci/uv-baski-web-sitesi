'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type HeroKaydi = {
  aciklama?: string | null
  baslik?: string | null
  birincilButonLink?: string | null
  birincilButonMetin?: string | null
  etiket?: string | null
  gorselUrl?: string | null
  ikincilButonLink?: string | null
  ikincilButonMetin?: string | null
}

type HeroAlanProps = {
  istatistikler?: Array<{
    aciklama?: string | null
    deger?: string | null
  }> | null
  kayitlar: HeroKaydi[]
}

export function HeroAlan({ istatistikler, kayitlar }: HeroAlanProps) {
  const [aktifIndex, setAktifIndex] = useState(0)
  const slaytlar = kayitlar.filter(
    (oge) =>
      oge.baslik ||
      oge.aciklama ||
      oge.gorselUrl ||
      oge.etiket ||
      (oge.birincilButonMetin && oge.birincilButonLink) ||
      (oge.ikincilButonMetin && oge.ikincilButonLink),
  )
  const birdenFazla = slaytlar.length > 1
  const aktifKayit = slaytlar[aktifIndex] || slaytlar[0]
  const gorselVarMi = Boolean(aktifKayit?.gorselUrl)
  const metrikler = istatistikler?.filter((oge) => oge?.deger || oge?.aciklama) || []
  const metinAlaniVarMi = Boolean(
    aktifKayit?.etiket ||
      aktifKayit?.baslik ||
      aktifKayit?.aciklama ||
      (aktifKayit?.birincilButonMetin && aktifKayit?.birincilButonLink) ||
      (aktifKayit?.ikincilButonMetin && aktifKayit?.ikincilButonLink) ||
      birdenFazla ||
      metrikler.length,
  )

  useEffect(() => {
    if (!birdenFazla) {
      return
    }

    const zamanlayici = window.setInterval(() => {
      setAktifIndex((onceki) => (onceki + 1) % slaytlar.length)
    }, 5000)

    return () => window.clearInterval(zamanlayici)
  }, [birdenFazla, slaytlar.length])

  if (!aktifKayit) {
    return null
  }

  return (
    <section className="relative overflow-hidden px-4 pt-24 sm:px-6 lg:px-8">
      <div
        className={`mx-auto grid min-h-[calc(100svh-2rem)] max-w-7xl gap-10 rounded-[2rem] bg-[linear-gradient(180deg,#ffffff,_#f8fafc)] px-6 pb-8 pt-10 shadow-[0_24px_80px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 md:min-h-[calc(100svh-3rem)] md:items-end md:gap-14 md:px-10 md:pb-10 md:pt-12 lg:rounded-[2.75rem] ${
          gorselVarMi ? 'md:grid-cols-[0.95fr,1.05fr]' : 'md:grid-cols-1'
        }`}
      >
        <div className={`flex max-w-3xl flex-col justify-end ${metinAlaniVarMi ? '' : 'hidden md:flex'}`}>
          {aktifKayit.etiket ? (
            <div className="inline-flex w-fit items-center rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-slate-500 backdrop-blur">
              {aktifKayit.etiket}
            </div>
          ) : null}

          {aktifKayit.baslik || aktifKayit.aciklama ? (
            <div className="relative mt-8 overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
                style={{ transform: `translateX(-${aktifIndex * 100}%)` }}
              >
                {slaytlar.map((kayit, index) => (
                  <div className="w-full shrink-0" key={`${kayit.baslik || 'hero'}-${index}`}>
                    {kayit.baslik ? (
                      <h1 className="max-w-4xl text-4xl font-semibold leading-[0.92] tracking-[-0.08em] text-slate-950 sm:text-5xl lg:text-7xl">
                        {kayit.baslik}
                      </h1>
                    ) : null}
                    {kayit.aciklama ? (
                      <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">{kayit.aciklama}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {aktifKayit.birincilButonMetin && aktifKayit.birincilButonLink ? (
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition-transform duration-200 ease-out hover:-translate-y-0.5"
                href={aktifKayit.birincilButonLink}
              >
                {aktifKayit.birincilButonMetin}
              </Link>
              {aktifKayit.ikincilButonMetin && aktifKayit.ikincilButonLink ? (
                <Link
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-950 transition-transform duration-200 ease-out hover:-translate-y-0.5"
                  href={aktifKayit.ikincilButonLink}
                >
                  {aktifKayit.ikincilButonMetin}
                </Link>
              ) : null}
            </div>
          ) : aktifKayit.ikincilButonMetin && aktifKayit.ikincilButonLink ? (
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-950 transition-transform duration-200 ease-out hover:-translate-y-0.5"
                href={aktifKayit.ikincilButonLink}
              >
                {aktifKayit.ikincilButonMetin}
              </Link>
            </div>
          ) : null}

          <div className="mt-10 flex flex-wrap items-center gap-3">
            {birdenFazla ? (
              <div className="flex items-center gap-2">
                {slaytlar.map((_, index) => (
                  <button
                    aria-label={`Hero kaydi ${index + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      aktifIndex === index ? 'w-8 bg-slate-950' : 'w-2.5 bg-slate-300'
                    }`}
                    key={index}
                    onClick={() => setAktifIndex(index)}
                    type="button"
                  />
                ))}
              </div>
            ) : null}

            {birdenFazla ? (
              <div className="flex items-center gap-2 sm:ml-4">
                <button
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors duration-200 hover:bg-slate-50"
                  onClick={() => setAktifIndex((onceki) => (onceki - 1 + slaytlar.length) % slaytlar.length)}
                  type="button"
                >
                  <span aria-hidden="true">←</span>
                </button>
                <button
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors duration-200 hover:bg-slate-50"
                  onClick={() => setAktifIndex((onceki) => (onceki + 1) % slaytlar.length)}
                  type="button"
                >
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            ) : null}
          </div>

          {metrikler.length ? (
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {metrikler.slice(0, 3).map((oge, index) => (
                <div
                  className="rounded-[1.4rem] border border-slate-200 bg-white/80 px-4 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
                  key={`${oge.deger}-${index}`}
                >
                  <p className="text-2xl font-semibold tracking-[-0.05em] text-slate-950">{oge.deger}</p>
                  <p className="mt-1.5 text-sm leading-6 text-slate-500">{oge.aciklama}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {gorselVarMi ? (
          <div className="relative min-h-[24rem] overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-100 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:min-h-[32rem] lg:min-h-[42rem]">
            <Image
              alt={aktifKayit.baslik || aktifKayit.etiket || 'Hero gorseli'}
              className="object-cover"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              src={aktifKayit.gorselUrl}
            />
          </div>
        ) : null}
      </div>
    </section>
  )
}
