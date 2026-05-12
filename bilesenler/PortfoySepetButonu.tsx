'use client'

import { ShoppingBag } from 'lucide-react'

type PortfoySepetOgesi = {
  baslik: string
  fiyat?: string | null
  slug?: string | null
}

type PortfoySepetButonuProps = {
  className?: string
  oge: PortfoySepetOgesi
}

const SEPET_ANAHTARI = 'atolyen-portfoy-sepeti'
const SEPET_OLAYI = 'atolyen-portfoy-sepeti-guncellendi'

function sepetiOku(): PortfoySepetOgesi[] {
  try {
    const hamSepet = window.localStorage.getItem(SEPET_ANAHTARI)
    return hamSepet ? (JSON.parse(hamSepet) as PortfoySepetOgesi[]) : []
  } catch {
    return []
  }
}

function sepetiYaz(ogeler: PortfoySepetOgesi[]) {
  window.localStorage.setItem(SEPET_ANAHTARI, JSON.stringify(ogeler))
  window.dispatchEvent(new CustomEvent(SEPET_OLAYI))
}

export function PortfoySepetButonu({ className = '', oge }: PortfoySepetButonuProps) {
  const sepeteEkle = () => {
    const sepet = sepetiOku()
    const ayniKayitVar = sepet.some((sepetOgesi) =>
      oge.slug
        ? sepetOgesi.slug === oge.slug
        : sepetOgesi.baslik.toLowerCase() === oge.baslik.toLowerCase(),
    )

    if (!ayniKayitVar) {
      sepetiYaz([...sepet, oge])
    } else {
      sepetiYaz(sepet)
    }
  }

  return (
    <button
      className={`inline-flex h-10 items-center justify-center gap-2 border-b border-[var(--atolyen-blue)] px-2 text-xs font-extrabold uppercase tracking-wide text-slate-950 transition hover:text-[var(--atolyen-blue)] ${className}`}
      onClick={sepeteEkle}
      type="button"
    >
      <ShoppingBag className="h-4 w-4" />
      Sepete Ekle
    </button>
  )
}

export { SEPET_ANAHTARI, SEPET_OLAYI }
