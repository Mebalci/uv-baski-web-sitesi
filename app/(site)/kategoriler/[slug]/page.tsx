import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { BolumBasligi } from '@/bilesenler/BolumBasligi'
import { UrunKart } from '@/bilesenler/UrunKart'
import { kategoriGetir, urunleriGetir } from '@/kutuphane/icerikler'
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
  const [kategori, urunler] = await Promise.all([kategoriGetir(slug), urunleriGetir()])

  if (!kategori) {
    notFound()
  }

  const ilgiliUrunler = urunler.filter((urun) => {
    if (typeof urun.kategori === 'object') {
      return urun.kategori?.slug === slug
    }

    return urun.kategori === slug
  })

  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 pt-32 md:px-8">
      <BolumBasligi baslik={kategori.baslik} aciklama={kategori.kisa_aciklama} etiket="Kategori" />
      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {ilgiliUrunler.map((urun) => (
          <UrunKart
            baslangic_fiyati={urun.baslangic_fiyati}
            baslik={urun.baslik}
            fiyat_gosterilsin_mi={urun.fiyat_gosterilsin_mi}
            kategori={typeof urun.kategori === 'object' ? urun.kategori : null}
            kisa_aciklama={urun.kisa_aciklama}
            key={urun.slug}
            slug={urun.slug}
          />
        ))}
      </div>
    </section>
  )
}
