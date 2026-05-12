'use client'

import Image from 'next/image'
import { X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { SEPET_ANAHTARI, SEPET_OLAYI } from '@/bilesenler/PortfoySepetButonu'

type PortfoySepetOgesi = {
  baslik: string
  fiyat?: string | null
  slug?: string | null
}

type WhatsAppSepetKisayoluProps = {
  telefon?: string | null
}

function telefonTemizle(telefon?: string | null) {
  const rakamlar = (telefon || '').replace(/\D/g, '')

  if (!rakamlar) {
    return process.env.NEXT_PUBLIC_WHATSAPP_NUMARASI || '905551112233'
  }

  if (rakamlar.startsWith('00')) {
    return rakamlar.slice(2)
  }

  if (rakamlar.startsWith('0')) {
    return `9${rakamlar}`
  }

  return rakamlar
}

function sepetiOku(): PortfoySepetOgesi[] {
  try {
    const hamSepet = window.localStorage.getItem(SEPET_ANAHTARI)
    return hamSepet ? (JSON.parse(hamSepet) as PortfoySepetOgesi[]) : []
  } catch {
    return []
  }
}

export function WhatsAppSepetKisayolu({ telefon }: WhatsAppSepetKisayoluProps) {
  const [sepet, setSepet] = useState<PortfoySepetOgesi[]>([])
  const temizTelefon = telefonTemizle(telefon)

  useEffect(() => {
    const sepetiGuncelle = () => setSepet(sepetiOku())

    sepetiGuncelle()
    window.addEventListener(SEPET_OLAYI, sepetiGuncelle)
    window.addEventListener('storage', sepetiGuncelle)

    return () => {
      window.removeEventListener(SEPET_OLAYI, sepetiGuncelle)
      window.removeEventListener('storage', sepetiGuncelle)
    }
  }, [])

  const whatsappLinki = useMemo(() => {
    const mesaj = sepet.length
      ? [
          'Merhaba, asagidaki ürünler için bilgi almak istiyorum:',
          ...sepet.map((oge, index) => {
            const fiyat = oge.fiyat ? ` - ${oge.fiyat}` : ''
            const link = oge.slug ? ` (/portfoy/${oge.slug})` : ''
            return `${index + 1}. ${oge.baslik}${fiyat}${link}`
          }),
        ].join('\n')
      : 'Merhaba, bilgi almak istiyorum.'

    return `https://wa.me/${temizTelefon}?text=${encodeURIComponent(mesaj)}`
  }, [sepet, temizTelefon])

  const sepetiTemizle = () => {
    window.localStorage.removeItem(SEPET_ANAHTARI)
    window.dispatchEvent(new CustomEvent(SEPET_OLAYI))
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
      {sepet.length ? (
        <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-950 shadow-[0_12px_35px_rgba(15,23,42,0.18)]">
          <span>{sepet.length} proje</span>
          <button
            aria-label="Sepeti temizle"
            className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
            onClick={sepetiTemizle}
            type="button"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : null}

      <a
        aria-label="WhatsApp ile iletisime gec"
        className="relative inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-full shadow-[0_18px_45px_rgba(37,211,102,0.38)] transition hover:scale-105"
        href={whatsappLinki}
        rel="noreferrer"
        target="_blank"
      >
        <Image
          alt="WhatsApp"
          className="object-fill"
          fill
          sizes="64px"
          src="/ikonlar/whatsapp.png"
        />
      </a>
    </div>
  )
}
