import { BolumBasligi } from '@/bilesenler/BolumBasligi'
import { KampanyaSeridi } from '@/bilesenler/KampanyaSeridi'
import { kampanyalariGetir } from '@/kutuphane/icerikler'
import { metadataOlustur } from '@/kutuphane/seo'

export const metadata = metadataOlustur({
  aciklama: 'Aktif kampanyalar, adetli sipariş avantajları ve dönemsel teklif fırsatları.',
  baslik: 'Kampanyalar',
  yol: '/kampanyalar',
})

export const dynamic = 'force-dynamic'

export default async function KampanyalarSayfasi() {
  const kampanyalar = await kampanyalariGetir()

  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 pt-32 md:px-8">
      <BolumBasligi
        aciklama="Promosyon ve kurumsal üretim akışlarında karar vermeyi hızlandıran dönemsel teklif alanı."
        baslik="Kampanyalar"
        etiket="Teklifler"
      />
      <div className="mt-12">
        <KampanyaSeridi kampanyalar={kampanyalar} />
      </div>
    </section>
  )
}
