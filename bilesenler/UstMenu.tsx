import Link from 'next/link'

import { siteAyarlariGetir, ustBilgiGetir } from '@/kutuphane/icerikler'

export async function UstMenu() {
  const [siteAyarlari, ustBilgi] = await Promise.all([siteAyarlariGetir(), ustBilgiGetir()])
  const menuOgeleri = ustBilgi.menu_ogeleri?.length ? ustBilgi.menu_ogeleri : []

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-slate-200/80 bg-white/88 px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur sm:px-6">
        <Link
          className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-slate-950"
          href="/"
        >
          {siteAyarlari.firma_adi || 'Nova UV Baski'}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {menuOgeleri.map((baglanti) => (
            <Link
              className="cursor-pointer text-sm text-slate-600 transition-colors duration-200 hover:text-slate-950"
              href={baglanti.baglanti || '/'}
              key={`${baglanti.etiket}-${baglanti.baglanti}`}
            >
              {baglanti.etiket}
            </Link>
          ))}
        </nav>

        <Link
          className="inline-flex items-center justify-center rounded-full bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition-transform duration-200 ease-out hover:-translate-y-0.5"
          href="/iletisim"
        >
          Teklif Al
        </Link>
      </div>
    </header>
  )
}
