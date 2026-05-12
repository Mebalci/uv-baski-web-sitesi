import Link from 'next/link'

import {
  altBilgiGetir,
  iletisimBilgileriGetir,
  kategorileriGetir,
  siteAyarlariGetir,
} from '@/kutuphane/icerikler'

export async function AltBilgi() {
  const [siteAyarlari, altBilgi, iletisim, kategoriler] = await Promise.all([
    siteAyarlariGetir(),
    altBilgiGetir(),
    iletisimBilgileriGetir(),
    kategorileriGetir(),
  ])

  return (
    <footer className="mt-0 border-t-[8px] border-[var(--atolyen-blue)] bg-[#347fb4] text-white">
      <div className="hidden bg-[#124b87] px-5 py-3 text-sm font-bold uppercase tracking-wide md:block md:px-8">
        <div className="mx-auto grid max-w-[1540px] gap-4 md:grid-cols-4">
          <p>iletisim</p>
          <p>Sosyal Medya</p>
          <p>Hizmet Alanlari</p>
          <p>Ara</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1540px] gap-8 px-4 py-7 sm:grid-cols-2 md:grid-cols-4 md:gap-10 md:px-8 md:py-9">
        <div className="space-y-3 text-sm">
          <p className="pb-1 text-sm font-bold uppercase tracking-wide md:hidden">
            iletisim
          </p>

          <p className="border-b border-white/65 pb-3 leading-normal">
            {iletisim.eposta || siteAyarlari.eposta}
          </p>

          <p className="border-b border-white/65 pb-3 leading-normal">
            {iletisim.telefon || siteAyarlari.telefon}
          </p>

          <p className="border-b border-white/65 pb-3 leading-normal">
            {iletisim.adres || siteAyarlari.adres}
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="pb-1 text-sm font-bold uppercase tracking-wide md:hidden">
            Sosyal Medya
          </p>

          {(altBilgi.linkler || []).map((link) => (
            <Link
              className="block border-b border-white/65 pb-3 leading-normal"
              href={link.baglanti || '/'}
              key={`${link.etiket}-${link.baglanti}`}
            >
              {link.etiket}
            </Link>
          ))}
        </div>

        <div className="space-y-3 text-sm">
          <p className="pb-1 text-sm font-bold uppercase tracking-wide md:hidden">
            Hizmet Alanlari
          </p>

          {kategoriler.slice(0, 5).map((kategori) => (
            <Link
              className="block border-b border-white/65 pb-3 leading-normal"
              href={`/kategoriler/${kategori.slug}`}
              key={kategori.slug}
            >
              {kategori.baslik}
            </Link>
          ))}
        </div>

        <div className="flex flex-col justify-start gap-6">
          <p className="text-sm font-bold uppercase tracking-wide md:hidden">
            Ara
          </p>

          <form
            action="/arama"
            className="flex items-center justify-between border-y-2 border-white/80 py-2 text-sm font-bold uppercase"
          >
            <input
              aria-label="Site içinde ara"
              className="w-full bg-transparent text-right outline-none placeholder:text-white"
              name="q"
              placeholder="Ara"
              type="search"
            />

            <button
              aria-label="Ara"
              className="ml-3 h-8 w-8 rounded-full border-2 border-white"
              type="submit"
            />
          </form>

          <p className="text-sm leading-7 text-white/85">{altBilgi.metin}</p>
        </div>
      </div>
    </footer>
  )
}
