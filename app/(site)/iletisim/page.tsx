import { BolumBasligi } from '@/bilesenler/BolumBasligi'
import { TeklifFormu } from '@/bilesenler/TeklifFormu'
import { iletisimBilgileriGetir, siteAyarlariGetir } from '@/kutuphane/icerikler'
import { metadataOlustur } from '@/kutuphane/seo'

export const metadata = metadataOlustur({
  aciklama: 'UV baski, promosyon urunleri ve kurumsal uygulamalar icin hizli teklif formu.',
  baslik: 'Iletisim',
  yol: '/iletisim',
})

export default async function IletisimSayfasi() {
  const [siteAyarlari, iletisim] = await Promise.all([siteAyarlariGetir(), iletisimBilgileriGetir()])

  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-24 pt-32 md:grid-cols-[0.9fr,1.1fr] md:px-8">
      <div>
        <BolumBasligi
          aciklama="Adet, yuzey tipi, teslim suresi veya kurumsal proje detaylarini paylasin; dogru uretim planiyla donelim."
          baslik="Teklif ve kesif gorusmeleri icin iletisim."
          etiket="Iletisim"
        />
        <div className="mt-10 space-y-4 text-sm leading-7 text-slate-600">
          <p>Telefon: {iletisim.telefon || siteAyarlari.telefon}</p>
          <p>E-posta: {iletisim.eposta || siteAyarlari.eposta}</p>
          <p>Adres: {iletisim.adres || siteAyarlari.adres}</p>
          {iletisim.calisma_saatleri ? <p>Calisma Saatleri: {iletisim.calisma_saatleri}</p> : null}
        </div>
      </div>
      <TeklifFormu konu="Iletisim Formu" />
    </section>
  )
}
