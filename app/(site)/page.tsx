import Link from 'next/link'

import { BolumBasligi } from '@/bilesenler/BolumBasligi'
import { HeroAlan } from '@/bilesenler/HeroAlan'
import { KampanyaSeridi } from '@/bilesenler/KampanyaSeridi'
import { PortfoyGaleri } from '@/bilesenler/PortfoyGaleri'
import { TeklifFormu } from '@/bilesenler/TeklifFormu'
import { UrunKart } from '@/bilesenler/UrunKart'
import {
  anaSayfaIcerigiGetir,
  blogYazilariniGetir,
  iletisimBilgileriGetir,
  kampanyalariGetir,
  kategorileriGetir,
  portfoyleriGetir,
  siteAyarlariGetir,
  urunleriGetir,
} from '@/kutuphane/icerikler'
import { medyaUrlAl } from '@/kutuphane/medya'
import { jsonLdBetigi } from '@/kutuphane/seo'
import { siteUrlAl } from '@/kutuphane/yardimcilar'

export const dynamic = 'force-dynamic'

export default async function AnaSayfa() {
  const [siteAyarlari, anaSayfaIcerigi, iletisim, kategoriler, urunler, portfoyler, kampanyalar, blogYazilari] =
    await Promise.all([
      siteAyarlariGetir(),
      anaSayfaIcerigiGetir(),
      iletisimBilgileriGetir(),
      kategorileriGetir(),
      urunleriGetir(),
      portfoyleriGetir(),
      kampanyalariGetir(),
      blogYazilariniGetir(),
    ])

  const yaziVarmi = (deger?: string | null) => Boolean(deger?.trim())
  const siteUrl = siteUrlAl()

  const heroKayitlari =
    anaSayfaIcerigi.hero_kayitlari?.length
      ? anaSayfaIcerigi.hero_kayitlari.map((kayit) => ({
          aciklama: kayit.metin,
          baslik: kayit.baslik,
          birincilButonLink: kayit.birincil_buton_link,
          birincilButonMetin: kayit.birincil_buton_metin,
          etiket: kayit.etiket,
          gorselUrl: medyaUrlAl(kayit.gorsel as never, 'buyuk'),
          ikincilButonLink: kayit.ikincil_buton_link,
          ikincilButonMetin: kayit.ikincil_buton_metin,
        }))
      : [
          {
            aciklama: anaSayfaIcerigi.hero_metin,
            baslik: anaSayfaIcerigi.hero_baslik,
            birincilButonLink: anaSayfaIcerigi.hero_birincil_buton_link,
            birincilButonMetin: anaSayfaIcerigi.hero_birincil_buton_metin,
            etiket: anaSayfaIcerigi.hero_etiket,
            gorselUrl: medyaUrlAl(anaSayfaIcerigi.hero_gorseli as never, 'buyuk'),
            ikincilButonLink: anaSayfaIcerigi.hero_ikincil_buton_link,
            ikincilButonMetin: anaSayfaIcerigi.hero_ikincil_buton_metin,
          },
        ]

  return (
    <>
      <HeroAlan istatistikler={anaSayfaIcerigi.istatistikler} kayitlar={heroKayitlari} />

      <section className="pt-20">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-[0.86fr,1.14fr] md:px-8">
          <BolumBasligi
            aciklama={anaSayfaIcerigi.kategori_aciklama}
            baslik={anaSayfaIcerigi.kategori_baslik}
            etiket={yaziVarmi(anaSayfaIcerigi.kategori_baslik) || yaziVarmi(anaSayfaIcerigi.kategori_aciklama) ? 'Kategoriler' : undefined}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {kategoriler.slice(0, 4).map((kategori) => (
              <Link
                className="group block rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-[0_14px_32px_rgba(15,23,42,0.04)] transition duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_20px_46px_rgba(15,23,42,0.08)]"
                href={`/kategoriler/${kategori.slug}`}
                key={kategori.slug}
              >
                <p className="text-2xl font-semibold tracking-[-0.05em] text-slate-950">{kategori.baslik}</p>
                <p className="mt-4 text-sm leading-7 text-slate-600">{kategori.kisa_aciklama}</p>
                <span className="mt-8 inline-flex text-sm text-slate-400 transition-colors duration-200 group-hover:text-slate-950">
                  Kategoriyi Incele
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <BolumBasligi
            aciklama={anaSayfaIcerigi.urun_aciklama}
            baslik={anaSayfaIcerigi.urun_baslik}
            etiket={yaziVarmi(anaSayfaIcerigi.urun_baslik) || yaziVarmi(anaSayfaIcerigi.urun_aciklama) ? 'One Cikan Urunler' : undefined}
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {urunler.slice(0, 3).map((urun) => (
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
        </div>
      </section>

      <section className="pt-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <BolumBasligi
            aciklama={anaSayfaIcerigi.portfoy_aciklama}
            baslik={anaSayfaIcerigi.portfoy_baslik}
            etiket={yaziVarmi(anaSayfaIcerigi.portfoy_baslik) || yaziVarmi(anaSayfaIcerigi.portfoy_aciklama) ? 'Portfoy' : undefined}
          />

          <div className="mt-12">
            <PortfoyGaleri kayitlar={portfoyler.slice(0, 4)} />
          </div>
        </div>
      </section>

      <section className="pt-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <BolumBasligi
            aciklama={anaSayfaIcerigi.kampanya_aciklama}
            baslik={anaSayfaIcerigi.kampanya_baslik}
            etiket={yaziVarmi(anaSayfaIcerigi.kampanya_baslik) || yaziVarmi(anaSayfaIcerigi.kampanya_aciklama) ? 'Kampanyalar' : undefined}
          />

          <div className="mt-12">
            <KampanyaSeridi kampanyalar={kampanyalar.slice(0, 2)} />
          </div>
        </div>
      </section>

      <section className="pt-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[0.82fr,1.18fr] md:px-8">
          <BolumBasligi etiket={(anaSayfaIcerigi.surec_adimlari || []).length ? 'Surec' : undefined} />

          <div className="grid gap-4 md:grid-cols-3">
            {(anaSayfaIcerigi.surec_adimlari || []).slice(0, 3).map((adim, index) => (
              <div
                className="rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-[0_14px_32px_rgba(15,23,42,0.04)]"
                key={`${adim.adim}-${index}`}
              >
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">0{index + 1}</p>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-slate-950">{adim.adim}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{adim.aciklama}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[0.82fr,1.18fr] md:px-8">
          <BolumBasligi
            aciklama={anaSayfaIcerigi.blog_aciklama}
            baslik={anaSayfaIcerigi.blog_baslik}
            etiket={yaziVarmi(anaSayfaIcerigi.blog_baslik) || yaziVarmi(anaSayfaIcerigi.blog_aciklama) ? 'Blog' : undefined}
          />

          <div className="space-y-4">
            {blogYazilari.slice(0, 3).map((yazi) => (
              <Link
                className="group block rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-[0_14px_32px_rgba(15,23,42,0.04)] transition duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_20px_46px_rgba(15,23,42,0.08)]"
                href={`/blog/${yazi.slug}`}
                key={yazi.slug}
              >
                <p className="text-xl font-semibold tracking-[-0.04em] text-slate-950">{yazi.baslik}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{yazi.kisa_aciklama}</p>
                <span className="mt-6 inline-flex text-sm text-slate-400 transition-colors duration-200 group-hover:text-slate-950">
                  Yaziyi Oku
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-28 pt-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[0.82fr,1.18fr] md:px-8">
          <div>
            <BolumBasligi
              aciklama={anaSayfaIcerigi.teklif_aciklama}
              baslik={anaSayfaIcerigi.teklif_baslik}
              etiket={yaziVarmi(anaSayfaIcerigi.teklif_baslik) || yaziVarmi(anaSayfaIcerigi.teklif_aciklama) ? 'Teklif' : undefined}
            />
            <div className="mt-10 grid gap-3 text-sm leading-7 text-slate-600">
              {iletisim.telefon || siteAyarlari.telefon ? <p>Telefon: {iletisim.telefon || siteAyarlari.telefon}</p> : null}
              {iletisim.eposta || siteAyarlari.eposta ? <p>E-posta: {iletisim.eposta || siteAyarlari.eposta}</p> : null}
              {iletisim.adres || siteAyarlari.adres ? <p>Adres: {iletisim.adres || siteAyarlari.adres}</p> : null}
              {iletisim.calisma_saatleri ? <p>Calisma Saatleri: {iletisim.calisma_saatleri}</p> : null}
            </div>
          </div>

          <TeklifFormu konu="Genel Teklif Talebi" />
        </div>
      </section>

      <script
        dangerouslySetInnerHTML={jsonLdBetigi({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          description: siteAyarlari.aciklama,
          name: siteAyarlari.firma_adi,
          url: siteUrl,
        })}
        type="application/ld+json"
      />
    </>
  )
}
