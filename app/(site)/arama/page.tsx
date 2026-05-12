import Link from 'next/link'

import {
  blogYazilariniGetir,
  kampanyalariGetir,
  kategorileriGetir,
  sayfalariGetir,
  urunleriGetir,
} from '@/kutuphane/icerikler'
import { metadataOlustur } from '@/kutuphane/seo'

export const metadata = metadataOlustur({
  aciklama: 'Atolyen site ici arama sonuclari.',
  baslik: 'Arama',
  yol: '/arama',
})

export const dynamic = 'force-dynamic'

type Props = {
  searchParams: Promise<{ q?: string }>
}

type AramaSonucu = {
  aciklama?: string | null
  baslik: string
  tip: string
  url: string
}

type AranabilirKayit = {
  baslik: string
  kisa_aciklama?: string | null
  slug: string
}

function eslesirMi(kayit: AramaSonucu, aranan: string) {
  const metin = `${kayit.baslik} ${kayit.aciklama || ''}`.toLocaleLowerCase('tr')
  return metin.includes(aranan)
}

export default async function AramaSayfasi({ searchParams }: Props) {
  const { q } = await searchParams
  const aranan = (q || '').trim().toLocaleLowerCase('tr')
  const [urunler, kategoriler, blogYazilari, kampanyalar, sayfalar] = await Promise.all([
    urunleriGetir(),
    kategorileriGetir(),
    blogYazilariniGetir(),
    kampanyalariGetir(),
    sayfalariGetir(),
  ])

  const sonuclar: AramaSonucu[] = [
    ...kategoriler.map((kategori) => ({
      aciklama: kategori.kisa_aciklama,
      baslik: kategori.baslik,
      tip: 'Hizmet Alani',
      url: `/kategoriler/${kategori.slug}`,
    })),
    ...urunler.map((urun) => ({
      aciklama: urun.kisa_aciklama,
      baslik: urun.baslik,
      tip: 'Urun',
      url: `/urunler/${urun.slug}`,
    })),
    ...blogYazilari.map((yazi) => ({
      aciklama: yazi.kisa_aciklama,
      baslik: yazi.baslik,
      tip: 'Blog',
      url: `/blog/${yazi.slug}`,
    })),
    ...kampanyalar.map((kampanya) => ({
      aciklama: kampanya.kisa_aciklama,
      baslik: kampanya.baslik,
      tip: 'Kampanya',
      url: `/kampanyalar/${kampanya.slug}`,
    })),
    ...(sayfalar as AranabilirKayit[]).map((sayfa) => ({
      aciklama: sayfa.kisa_aciklama,
      baslik: sayfa.baslik,
      tip: 'Sayfa',
      url: `/${sayfa.slug}`,
    })),
  ].filter((sonuc) => (aranan ? eslesirMi(sonuc, aranan) : false))

  return (
    <section className="mx-auto max-w-[1160px] px-5 pb-20 pt-14 md:px-8">
      <h1 className="font-atolyen-script text-7xl leading-none text-[var(--atolyen-blue)] md:text-9xl">Arama</h1>
      <form action="/arama" className="mt-8 flex items-center border-y-2 border-[var(--atolyen-blue)] py-3">
        <input
          className="w-full bg-transparent text-xl outline-none"
          defaultValue={q || ''}
          name="q"
          placeholder="Aranacak kelime"
          type="search"
        />
        <button className="font-bold uppercase text-[var(--atolyen-blue)]" type="submit">
          Ara
        </button>
      </form>

      <div className="mt-10 grid gap-4">
        {!aranan ? <p className="text-slate-600">Aramak istediginiz kelimeyi yazin.</p> : null}
        {aranan && !sonuclar.length ? <p className="text-slate-600">Sonuc bulunamadi.</p> : null}
        {sonuclar.map((sonuc) => (
          <Link className="border-b border-[var(--atolyen-blue)] py-5" href={sonuc.url} key={`${sonuc.tip}-${sonuc.url}`}>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--atolyen-blue)]">{sonuc.tip}</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">{sonuc.baslik}</h2>
            {sonuc.aciklama ? <p className="mt-2 text-sm leading-7 text-slate-600">{sonuc.aciklama}</p> : null}
          </Link>
        ))}
      </div>
    </section>
  )
}
