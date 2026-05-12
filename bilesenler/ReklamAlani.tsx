'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

import { medyaUrlAl } from '@/kutuphane/medya'

type ReklamKaydi = {
  alt_metin?: string | null
  baslik?: string | null
  gorsel?: unknown
  gorsel_odak_noktasi?: 'bottom' | 'center' | 'left' | 'right' | 'top' | null
  link?: string | null
  mobil_gorsel?: unknown
  yeni_sekmede_acilsin_mi?: boolean | null
}

type ReklamAlaniProps = {
  className?: string
  boskenGizle?: boolean
  kayitlar?: ReklamKaydi[] | null
  metinClassName?: string
}

export function ReklamAlani({
  boskenGizle = false,
  className = '',
  kayitlar,
}: ReklamAlaniProps) {
  const reklamlar = (kayitlar || []).filter((kayit) => kayit)

  const [aktifIndex, setAktifIndex] = useState(0)

  const aktifKayit = reklamlar[aktifIndex] || reklamlar[0]

  const gorselUrl = medyaUrlAl(aktifKayit?.gorsel as never, 'buyuk')
  const mobilGorselUrl =
    medyaUrlAl(aktifKayit?.mobil_gorsel as never, 'buyuk') || gorselUrl

  const reklamVar = Boolean(gorselUrl)
  const birdenFazla = reklamlar.length > 1

  const odakSinifi = {
    bottom: 'object-bottom',
    center: 'object-center',
    left: 'object-left',
    right: 'object-right',
    top: 'object-top',
  }[aktifKayit?.gorsel_odak_noktasi || 'center']

  const oncekiReklamaGec = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    if (!reklamlar.length) {
      return
    }

    setAktifIndex((onceki) => (onceki - 1 + reklamlar.length) % reklamlar.length)
  }

  const sonrakiReklamaGec = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    if (!reklamlar.length) {
      return
    }

    setAktifIndex((onceki) => (onceki + 1) % reklamlar.length)
  }

  useEffect(() => {
    if (!birdenFazla) {
      return
    }

    const zamanlayici = window.setInterval(() => {
      setAktifIndex((onceki) => (onceki + 1) % reklamlar.length)
    }, 10000)

    return () => window.clearInterval(zamanlayici)
  }, [birdenFazla, reklamlar.length])

  if (boskenGizle && !reklamVar) {
    return null
  }

  const icerik = (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-transparent text-white ${className}`}
    >
      {reklamVar ? (
        <>
          <Image
            alt={aktifKayit?.alt_metin || aktifKayit?.baslik || 'Site ici reklam alani'}
            className={`hidden object-fill opacity-0 transition-opacity duration-700 ease-out md:block ${odakSinifi}`}
            fill
            key={`desktop-${aktifIndex}`}
            onLoad={(event) => event.currentTarget.classList.remove('opacity-0')}
            sizes="(max-width: 768px) 100vw, 50vw"
            src={gorselUrl as string}
          />

          <Image
            alt={aktifKayit?.alt_metin || aktifKayit?.baslik || 'Site ici reklam alani'}
            className={`object-fill opacity-0 transition-opacity duration-700 ease-out md:hidden ${odakSinifi}`}
            fill
            key={`mobile-${aktifIndex}`}
            onLoad={(event) => event.currentTarget.classList.remove('opacity-0')}
            sizes="(max-width: 640px) 75vw, (max-width: 768px) 85vw, 50vw"
            src={(mobilGorselUrl || gorselUrl) as string}
          />
        </>
      ) : null}

      {birdenFazla && reklamVar ? (
        <>
          <button
            aria-label="Onceki reklam"
            className="absolute left-3 top-1/2 z-10 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white transition hover:bg-black/55"
            onClick={oncekiReklamaGec}
            type="button"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            aria-label="Sonraki reklam"
            className="absolute right-3 top-1/2 z-10 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white transition hover:bg-black/55"
            onClick={sonrakiReklamaGec}
            type="button"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5">
            {reklamlar.map((_, index) => (
              <button
                aria-label={`Reklam ${index + 1}`}
                className={`h-2 w-2 rounded-full ${
                  aktifIndex === index ? 'bg-white' : 'bg-white/45'
                }`}
                key={index}
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  setAktifIndex(index)
                }}
                type="button"
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  )

  if (!aktifKayit?.link || !reklamVar) {
    return icerik
  }

  return (
    <a
      className="block h-full w-full"
      href={aktifKayit.link}
      rel={aktifKayit.yeni_sekmede_acilsin_mi ? 'noreferrer' : undefined}
      target={aktifKayit.yeni_sekmede_acilsin_mi ? '_blank' : undefined}
    >
      {icerik}
    </a>
  )
}
