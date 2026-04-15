import { BolumBasligi } from '@/bilesenler/BolumBasligi'
import { PortfoyGaleri } from '@/bilesenler/PortfoyGaleri'
import { portfoyleriGetir } from '@/kutuphane/icerikler'
import { metadataOlustur } from '@/kutuphane/seo'

export const metadata = metadataOlustur({
  aciklama: 'Kurumsal UV baskı, yönlendirme ve promosyon projelerinden seçili uygulamalar.',
  baslik: 'Portföy',
  yol: '/portfoy',
})

export const dynamic = 'force-dynamic'

export default async function PortfoySayfasi() {
  const portfoyler = await portfoyleriGetir()

  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 pt-32 md:px-8">
      <BolumBasligi
        aciklama="Kısa açıklamalarla değil, uygulamanın bıraktığı etkiyle hatırlanan işlerden seçki."
        baslik="Portföy"
        etiket="Referanslar"
      />
      <div className="mt-12">
        <PortfoyGaleri kayitlar={portfoyler} />
      </div>
    </section>
  )
}
