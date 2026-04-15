import { BolumBasligi } from '@/bilesenler/BolumBasligi'
import { UrunKart } from '@/bilesenler/UrunKart'
import { urunleriGetir } from '@/kutuphane/icerikler'
import { metadataOlustur } from '@/kutuphane/seo'

export const metadata = metadataOlustur({
  aciklama: 'UV baskı çözümlerimizi kategori bazlı ve teklif odaklı bir katalog yapısıyla inceleyin.',
  baslik: 'Ürünler',
  yol: '/urunler',
})

export const dynamic = 'force-dynamic'

export default async function UrunlerSayfasi() {
  const urunler = await urunleriGetir()

  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 pt-32 md:px-8">
      <BolumBasligi
        aciklama="Fiyatı görünür olan ürünlerde başlangıç seviyesini, diğerlerinde doğrudan teklif akışını sunuyoruz."
        baslik="Tüm ürünler"
        etiket="Katalog"
      />
      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {urunler.map((urun) => (
          <UrunKart
            baslangic_fiyati={urun.baslangic_fiyati}
            baslik={urun.baslik}
            fiyat_gosterilsin_mi={urun.fiyat_gosterilsin_mi}
            kapak_gorseli={urun.kapak_gorseli}
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
