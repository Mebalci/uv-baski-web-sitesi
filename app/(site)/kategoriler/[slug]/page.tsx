import Image from 'next/image'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ReklamAlani } from '@/bilesenler/ReklamAlani'
import { UrunKart } from '@/bilesenler/UrunKart'
import { kategoriGetir, siteReklamlariniGetir, urunleriGetir } from '@/kutuphane/icerikler'
import { medyaUrlAl } from '@/kutuphane/medya'
import { metadataOlustur } from '@/kutuphane/seo'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const kategori = await kategoriGetir(slug)

  if (!kategori) {
    return {}
  }

  return metadataOlustur({
    aciklama: kategori.kisa_aciklama || kategori.baslik,
    baslik: kategori.baslik,
    seo: kategori.seo,
    yol: `/kategoriler/${kategori.slug}`,
  })
}

export default async function KategoriDetaySayfasi({ params }: Props) {
  const { slug } = await params
  const [kategori, urunler, sagReklamlar] = await Promise.all([
    kategoriGetir(slug),
    urunleriGetir(),
    siteReklamlariniGetir('detay_sag'),
  ])

  if (!kategori) {
    notFound()
  }

  const ilgiliUrunler = urunler.filter((urun) => {
    if (typeof urun.kategori === 'object') {
      return urun.kategori?.slug === slug
    }

    return urun.kategori === slug
  })
  const solGorselUrl = medyaUrlAl(kategori.kapak_gorseli as never, 'buyuk')

  return (
    <section className="mx-auto max-w-[1580px] px-5 pb-16 pt-14 md:px-8 lg:px-14">
      <div className="grid gap-10 lg:grid-cols-[0.18fr,0.62fr,0.2fr] lg:items-start">
        <div className="relative min-h-[28rem] overflow-hidden bg-[#231f20] lg:min-h-[33rem]">
          {solGorselUrl ? (
            <Image alt={kategori.baslik} className="object-fill" fill sizes="(max-width: 1024px) 100vw, 18vw" src={solGorselUrl} />
          ) : null}
        </div>

        <div className="self-center text-center">
          <h1 className="font-atolyen-script text-[clamp(5rem,13vw,13rem)] leading-[0.75] text-[var(--atolyen-blue)]">
            {kategori.baslik}
          </h1>
          <div className="mx-auto mt-6 max-w-4xl space-y-5 text-sm font-semibold leading-6 text-black">
            {(kategori.kisa_aciklama || '')
              .split('\n')
              .filter(Boolean)
              .map((metin, index) => (
                <p key={index}>{metin}</p>
              ))}
          </div>
        </div>

        <ReklamAlani className="min-h-[24rem] lg:min-h-[33rem]" kayitlar={sagReklamlar} />
      </div>

      <div className="mx-auto mt-16 max-w-[1160px]">
        <div className="atolyen-cizgili-baslik">
          <h2 className="font-atolyen-script text-center text-5xl text-[var(--atolyen-blue)] md:text-7xl">
            {`${kategori.baslik} Ornekleri`}
          </h2>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {ilgiliUrunler.map((urun) => (
            <UrunKart
              baslangic_fiyati={urun.baslangic_fiyati}
              baslik={urun.baslik}
              fiyat_gosterilsin_mi={false}
              kapak_gorseli={urun.kapak_gorseli}
              kategori={typeof urun.kategori === 'object' ? urun.kategori : null}
              kisa_aciklama={urun.kisa_aciklama}
              key={urun.slug}
              slug={urun.slug}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
