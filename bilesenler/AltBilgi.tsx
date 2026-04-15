import Link from 'next/link'

import { altBilgiGetir, iletisimBilgileriGetir, siteAyarlariGetir } from '@/kutuphane/icerikler'

export async function AltBilgi() {
  const [siteAyarlari, altBilgi, iletisim] = await Promise.all([
    siteAyarlariGetir(),
    altBilgiGetir(),
    iletisimBilgileriGetir(),
  ])

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1.4fr,0.8fr,0.8fr] md:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">
            {siteAyarlari.firma_adi || 'Nova UV Baski'}
          </p>
          <p className="mt-5 max-w-md text-sm leading-7 text-slate-600">
            {altBilgi.metin || siteAyarlari.aciklama}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-950">Hizli Erisim</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600">
            {(altBilgi.linkler || []).map((link) => (
              <Link href={link.baglanti || '/'} key={`${link.etiket}-${link.baglanti}`}>
                {link.etiket}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-950">Iletisim</p>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p>{iletisim.adres || siteAyarlari.adres}</p>
            <p>{iletisim.telefon || siteAyarlari.telefon}</p>
            <p>{iletisim.eposta || siteAyarlari.eposta}</p>
            {iletisim.calisma_saatleri ? <p>{iletisim.calisma_saatleri}</p> : null}
          </div>
        </div>
      </div>
    </footer>
  )
}
