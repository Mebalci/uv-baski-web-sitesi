'use client'

import Link from 'next/link'
import { Menu, Search, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { AtolyenLogo } from '@/bilesenler/AtolyenLogo'

type MenuOgesi = {
  baglanti?: string | null
  etiket?: string | null
}

type UstMenuClientProps = {
  firmaAdi?: string | null
  logo?: unknown
  menuOgeleri: MenuOgesi[]
}

export function UstMenuClient({ firmaAdi, logo, menuOgeleri }: UstMenuClientProps) {
  const [acikMi, setAcikMi] = useState(false)
  const pathname = usePathname()

  return (
    <header className="relative z-50 bg-white px-5 md:px-8 lg:px-[64px]">
      <div className="mx-auto flex max-w-[1870px] items-end justify-between border-b border-slate-700/45 pb-2">
        <AtolyenLogo className="w-[8.75rem] sm:w-[12.5rem] lg:w-[18.75rem]" firmaAdi={firmaAdi} logo={logo} />

        <nav className="hidden items-center gap-[88px] text-sm font-bold uppercase tracking-wide text-slate-900 lg:flex">
          {menuOgeleri.map((baglanti, index) => (
            <Link
              className={`border-y-2 px-1 py-2 transition-colors hover:border-[var(--atolyen-blue)] ${
                pathname === baglanti.baglanti ? 'border-[var(--atolyen-blue)]' : 'border-transparent'
              }`}
              href={baglanti.baglanti || '/'}
              key={`${baglanti.etiket}-${baglanti.baglanti}-${index}`}
            >
              {baglanti.etiket}
            </Link>
          ))}
        </nav>

        <form
          action="/arama"
          className="hidden min-w-[22rem] items-center justify-end border-y-2 border-[var(--atolyen-blue)] py-1 text-sm font-bold uppercase lg:flex"
        >
          <input
            aria-label="Site içinde ara"
            className="w-full bg-transparent text-right text-sm font-bold uppercase outline-none placeholder:text-slate-900"
            name="q"
            placeholder="Ara"
            type="search"
          />
          <button aria-label="Ara" className="ml-2 inline-flex h-7 w-7 items-center justify-center" type="submit">
            <Search className="h-6 w-6 stroke-[1.7]" />
          </button>
        </form>

        <button
          aria-expanded={acikMi}
          aria-label="Menuyu ac veya kapat"
          className="inline-flex h-11 w-11 items-center justify-center text-[var(--atolyen-blue)] lg:hidden"
          onClick={() => setAcikMi((onceki) => !onceki)}
          type="button"
        >
          {acikMi ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {acikMi ? (
        <div className="mx-auto mt-4 max-w-[1870px] border-b border-[var(--atolyen-blue)] pb-5 lg:hidden">
          <nav className="grid gap-3 text-base font-bold uppercase text-slate-900">
            {menuOgeleri.map((baglanti, index) => (
              <Link
                className="border-b border-slate-200 py-3"
                href={baglanti.baglanti || '/'}
                key={`${baglanti.etiket}-${baglanti.baglanti}-${index}`}
                onClick={() => setAcikMi(false)}
              >
                {baglanti.etiket}
              </Link>
            ))}
          </nav>
          <form action="/arama" className="mt-5 flex items-center justify-between border-y-2 border-[var(--atolyen-blue)] py-2 text-sm font-bold uppercase">
            <input
              aria-label="Site içinde ara"
              className="w-full bg-transparent outline-none placeholder:text-slate-900"
              name="q"
              placeholder="Ara"
              type="search"
            />
            <button aria-label="Ara" className="ml-3 inline-flex h-7 w-7 items-center justify-center" type="submit">
              <Search className="h-6 w-6 stroke-[1.7]" />
            </button>
          </form>
        </div>
      ) : null}
    </header>
  )
}
