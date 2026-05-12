import { ReklamAlani } from '@/bilesenler/ReklamAlani'
import { HizmetKart } from '@/bilesenler/HizmetKart'
import { TeklifFormu } from '@/bilesenler/TeklifFormu'
import {
  anaSayfaIcerigiGetir,
  kategorileriGetir,
  siteAyarlariGetir,
  siteReklamlariniGetir,
} from '@/kutuphane/icerikler'
import { jsonLdBetigi } from '@/kutuphane/seo'
import { siteUrlAl } from '@/kutuphane/yardimcilar'

export const dynamic = 'force-dynamic'

export default async function AnaSayfa() {
  const [
    siteAyarlari,
    anaSayfaIcerigi,
    kategoriler,
    solUstReklamlar,
    heroReklamlar,
    solAltReklamlar,
    altReklamlar,
  ] = await Promise.all([
    siteAyarlariGetir(),
    anaSayfaIcerigiGetir(),
    kategorileriGetir(),
    siteReklamlariniGetir('anasayfa_sol_ust'),
    siteReklamlariniGetir('anasayfa_hero'),
    siteReklamlariniGetir('anasayfa_sol_alt'),
    siteReklamlariniGetir('anasayfa_alt'),
  ])

  const siteUrl = siteUrlAl()

  const kartGorselliKategoriler = kategoriler.filter(
    (kategori) => kategori.kapak_gorseli
  )

  const hizmetler = (
    kartGorselliKategoriler.length ? kartGorselliKategoriler : kategoriler
  ).slice(0, 5)

  const anaSayfaVerisi = anaSayfaIcerigi as {
    kategori_aciklama?: string | null
    metin_paragraflari?: Array<{
      metin?: string | null
    }> | null
  }

  const girisMetinleri =
    anaSayfaVerisi.metin_paragraflari
      ?.map((paragraf) => paragraf.metin)
      .filter((metin): metin is string => Boolean(metin?.trim())) || []

  const eskiMetinler = anaSayfaVerisi.kategori_aciklama
    ?.split(/\n\s*\n/)
    .map((metin) => metin.trim())
    .filter(Boolean)

  const anaSayfaMetinleri = girisMetinleri.length
    ? girisMetinleri
    : eskiMetinler || []

  const kategoriLinkiAl = (kategori: unknown) =>
    typeof kategori === 'object' &&
    kategori !== null &&
    'yonlendirme_linki' in kategori &&
    typeof kategori.yonlendirme_linki === 'string'
      ? kategori.yonlendirme_linki
      : null

  return (
    <>
      <section className="w-full px-5 py-5 md:px-8 md:py-6 lg:px-[64px]">
        <div className="mx-auto max-w-[1870px]">
          <div className="hidden gap-6 lg:grid lg:h-[1100px] lg:grid-cols-[1fr_3.26fr] xl:h-[1180px]">
            <aside className="grid h-full gap-6 lg:grid-rows-[260px_472px_320px] xl:grid-rows-[280px_532px_320px]">
              <ReklamAlani kayitlar={solUstReklamlar} />

              <div className="flex h-full flex-col justify-center overflow-hidden bg-white p-3 text-right text-[clamp(9px,0.72vw,15.5px)] font-medium leading-[1.32] tracking-[0.003em] text-black xl:p-5 xl:text-[clamp(12px,0.78vw,15.5px)] xl:leading-[1.42]">
                <div className="space-y-2 xl:space-y-4">
                  {anaSayfaMetinleri.length ? (
                    anaSayfaMetinleri
                      .slice(0, 5)
                      .map((metin, index) => <p key={index}>{metin}</p>)
                  ) : (
                    <>
                      <p>
                        Fikrin tasarimla bulustugu, hayalin uretime donustugu
                        yaratici bir atolye. Her projeye ozgun bir bakis
                        acisiyla yaklasir, markalarin kimligini en dogru
                        sekilde yansitacak cozumler uretiriz.
                      </p>
                      <p>
                        Dijital baskidan matbaa cozumlerine, serigrafiden
                        promosyon urunlerine kadar genis uretim gucumuzle
                        fikirlerinizi somutlastiriyoruz.
                      </p>
                    </>
                  )}
                </div>
              </div>

              <ReklamAlani kayitlar={solAltReklamlar} />
            </aside>

            <main className="grid h-full gap-6 lg:grid-rows-[260px_1fr_190px] xl:grid-rows-[280px_1fr_190px]">
              <ReklamAlani
                kayitlar={heroReklamlar}
                metinClassName="text-2xl"
              />

              <div className="grid flex-1 grid-cols-5 gap-3">
                {hizmetler.map((kategori) => (
                  <HizmetKart
                    baslik={kategori.baslik}
                    gorsel={kategori.kapak_gorseli}
                    href={kategoriLinkiAl(kategori)}
                    key={kategori.slug}
                    slug={kategori.slug}
                  />
                ))}
              </div>

              <ReklamAlani
                kayitlar={altReklamlar}
                metinClassName="text-2xl"
              />
            </main>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:hidden">
            <div className="grid grid-cols-[1fr_3.26fr] gap-3 md:gap-4">
              <ReklamAlani
                className="min-h-[130px] sm:min-h-[190px] md:min-h-[230px]"
                kayitlar={solUstReklamlar}
                metinClassName="text-xs"
              />

              <ReklamAlani
                className="min-h-[130px] sm:min-h-[190px] md:min-h-[230px]"
                kayitlar={heroReklamlar}
                metinClassName="text-xs"
              />
            </div>

            <div className="space-y-3 overflow-hidden bg-white p-4 text-center text-[clamp(11px,3vw,15px)] font-semibold leading-[1.35] text-black sm:space-y-4 sm:p-5 sm:text-[clamp(12px,3.35vw,15px)] sm:leading-snug">
              {anaSayfaMetinleri.length ? (
                anaSayfaMetinleri
                  .slice(0, 5)
                  .map((metin, index) => <p key={index}>{metin}</p>)
              ) : (
                <>
                  <p>
                    Fikrin tasarimla bulustugu, hayalin uretime donustugu
                    yaratici bir atolye. Her projeye ozgun bir bakis acisiyla
                    yaklasir, markalarin kimligini en dogru sekilde yansitacak
                    cozumler uretiriz.
                  </p>
                  <p>
                    Dijital baskidan matbaa cozumlerine, serigrafiden promosyon
                    urunlerine kadar genis uretim gucumuzle fikirlerinizi
                    somutlastiriyoruz.
                  </p>
                </>
              )}
            </div>

            <div className="grid grid-cols-5 gap-1.5 sm:gap-2 md:gap-3">
              {hizmetler.map((kategori) => (
                <HizmetKart
                  baslik={kategori.baslik}
                  gorsel={kategori.kapak_gorseli}
                  href={kategoriLinkiAl(kategori)}
                  key={kategori.slug}
                  slug={kategori.slug}
                />
              ))}
            </div>

            <ReklamAlani
              className="aspect-[1135/900] max-h-[220px] sm:max-h-[260px]"
              kayitlar={solAltReklamlar}
            />

            <ReklamAlani
              className="aspect-[3700/739] max-h-[160px] sm:max-h-[190px]"
              kayitlar={altReklamlar}
            />
          </div>
        </div>
      </section>

      <section className="w-full px-5 py-14 md:px-8 lg:px-[64px]">
        <div className="mx-auto flex max-w-[920px] flex-col items-center">
          <div className="mb-10 inline-flex px-3 py-3 text-xl font-bold uppercase tracking-wide text-slate-900 md:text-2xl">
            TEKLIF AL
          </div>

          <div className="w-full">
            <TeklifFormu konu="Ana sayfa teklif talebi" />
          </div>
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
