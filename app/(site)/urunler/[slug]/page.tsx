import Image from 'next/image'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { TeklifFormu } from '@/bilesenler/TeklifFormu'
import { urunGetir } from '@/kutuphane/icerikler'
import { medyaUrlAl } from '@/kutuphane/medya'
import { jsonLdBetigi, metadataOlustur, seoYapilandirilmisVeriAl } from '@/kutuphane/seo'
import { paraBirimi, whatsappBaglantisi } from '@/kutuphane/yardimcilar'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const urun = await urunGetir(slug)

  if (!urun) {
    return {}
  }

  return metadataOlustur({
    aciklama: urun.kisa_aciklama || urun.baslik,
    baslik: urun.baslik,
    seo: urun.seo,
    yol: `/urunler/${urun.slug}`,
  })
}

export default async function UrunDetaySayfasi({ params }: Props) {
  const { slug } = await params
  const urun = await urunGetir(slug)

  if (!urun) {
    notFound()
  }

  const gorselUrl = medyaUrlAl(urun.kapak_gorseli as never, 'buyuk')

  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 pt-32 md:px-8">
      <div className="grid gap-10 md:grid-cols-[1.1fr,0.9fr]">
        <div className="grid gap-6">
          <div className="icerik-paneli overflow-hidden">
            <div className="relative min-h-[20rem] overflow-hidden rounded-[1.7rem] bg-slate-100">
              {gorselUrl ? (
                <Image
                  alt={urun.baslik}
                  className="h-full w-full object-cover"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 56vw"
                  src={gorselUrl}
                />
              ) : (
                <div className="h-full min-h-[20rem] w-full bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.08),_transparent_48%),linear-gradient(180deg,#f8fafc,#e2e8f0)]" />
              )}
            </div>

            <p className="etiket mt-8">
              {typeof urun.kategori === 'object' ? urun.kategori?.baslik : 'Urun'}
            </p>
            <h1 className="mt-5 text-5xl font-semibold tracking-[-0.06em] text-slate-950">{urun.baslik}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{urun.kisa_aciklama}</p>

            <div className="mt-10 flex flex-wrap items-center gap-4 text-sm text-slate-600">
              {urun.fiyat_gosterilsin_mi ? (
                <span className="rounded-full border border-slate-200 px-4 py-2">
                  Baslangic: {paraBirimi(urun.baslangic_fiyati) || 'Sorunuz'}
                </span>
              ) : (
                <span className="rounded-full border border-slate-200 px-4 py-2">Fiyat teklif ile verilir</span>
              )}

              <Link className="buton-beyaz" href={whatsappBaglantisi(urun.whatsapp_mesaji)}>
                WhatsApp ile Sor
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="mini-panel">
              <p className="etiket">Teslimat Yaklasimi</p>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Numune, revize ve ana uretim akisini hizli karar alinabilecek sekilde kurguluyoruz.
              </p>
            </div>
            <div className="mini-panel">
              <p className="etiket">Uretim Notu</p>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Yuzey tipi, adet ve renk beklentisine gore teknik planlama yapilabilir.
              </p>
            </div>
            <div className="mini-panel">
              <p className="etiket">Teklif Akisi</p>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Form veya WhatsApp uzerinden brief paylasildiginda hizli geri donus saglanir.
              </p>
            </div>
          </div>
        </div>

        <TeklifFormu konu={urun.teklif_konusu || urun.baslik} />
      </div>

      <script
        dangerouslySetInnerHTML={jsonLdBetigi({
          '@context': 'https://schema.org',
          '@type': 'Product',
          description: urun.kisa_aciklama,
          image: gorselUrl || undefined,
          name: urun.baslik,
        })}
        type="application/ld+json"
      />
      {seoYapilandirilmisVeriAl(urun.seo).map((oge, index) => (
        <script
          dangerouslySetInnerHTML={jsonLdBetigi(oge)}
          key={index}
          type="application/ld+json"
        />
      ))}
    </section>
  )
}
