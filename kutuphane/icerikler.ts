import { payloadAl } from '@/kutuphane/payload'
import {
  anaSayfaIcerigiOrnek,
  blogOrnekleri,
  kampanyaOrnekleri,
  kategoriOrnekleri,
  portfoyOrnekleri,
  reklamOrnekleri,
  siteAyarlariOrnek,
  urunOrnekleri,
} from '@/kutuphane/ornek-veriler'

const iletisimOrnek = {
  adres: 'Maslak, Istanbul',
  calisma_saatleri: 'Hafta ici 09:00 - 18:30',
  eposta: 'merhaba@novauvbaski.com',
  sol_gorsel: null,
  telefon: '+90 212 555 11 22',
}

const hakkimizdaIcerigiOrnek = {
  aciklama_metni: '',
  sol_gorsel: null,
}

const ustBilgiOrnek = {
  menu_ogeleri: [
    { baglanti: '/urunler', etiket: 'Urunler' },
    { baglanti: '/portfoy', etiket: 'Portfoy' },
    { baglanti: '/kampanyalar', etiket: 'Kampanyalar' },
    { baglanti: '/blog', etiket: 'Blog' },
    { baglanti: '/iletisim', etiket: 'Iletisim' },
  ],
}

const altBilgiOrnek = {
  linkler: [
    { baglanti: '/', etiket: 'Anasayfa' },
    { baglanti: '/hakkimizda', etiket: 'Hakkimizda' },
    { baglanti: '/iletisim', etiket: 'Iletisim' },
  ],
  metin: 'Kurumsal markalar icin UV baski, promosyon ve magaza ici uygulamalari tek uretim hattinda planliyoruz.',
}

const entegrasyonAyarlariOrnek = {
  google_analytics_olcum_kimligi: '',
  google_search_console_dogrulama: '',
  google_tag_manager_kimligi: '',
  robots_engellenen_yollar: '',
  site_indekslensin_mi: true,
}

async function koleksiyonBul(slug: string, siralama = '-createdAt') {
  const payload = await payloadAl()

  if (!payload) {
    return null
  }

  return payload.find({
    collection: slug as never,
    depth: 2,
    limit: 100,
    sort: siralama,
  })
}

async function globalBul(slug: string) {
  const payload = await payloadAl()

  if (!payload) {
    return null
  }

  return payload.findGlobal({
    slug: slug as never,
  })
}

export async function siteAyarlariGetir() {
  try {
    return (await globalBul('site_ayarlari')) || siteAyarlariOrnek
  } catch {
    return siteAyarlariOrnek
  }
}

export async function ustBilgiGetir() {
  try {
    return (await globalBul('ust_bilgi')) || ustBilgiOrnek
  } catch {
    return ustBilgiOrnek
  }
}

export async function altBilgiGetir() {
  try {
    return (await globalBul('alt_bilgi')) || altBilgiOrnek
  } catch {
    return altBilgiOrnek
  }
}

export async function anaSayfaIcerigiGetir() {
  try {
    return (await globalBul('ana_sayfa_icerigi')) || anaSayfaIcerigiOrnek
  } catch {
    return anaSayfaIcerigiOrnek
  }
}

export async function iletisimBilgileriGetir() {
  try {
    return (await globalBul('iletisim_bilgileri')) || iletisimOrnek
  } catch {
    return iletisimOrnek
  }
}

export async function hakkimizdaIcerigiGetir() {
  try {
    return (await globalBul('hakkimizda_icerigi')) || hakkimizdaIcerigiOrnek
  } catch {
    return hakkimizdaIcerigiOrnek
  }
}

export async function entegrasyonAyarlariGetir() {
  try {
    return (await globalBul('entegrasyon_ayarlari')) || entegrasyonAyarlariOrnek
  } catch {
    return entegrasyonAyarlariOrnek
  }
}

export async function urunleriGetir() {
  const sonuc = await koleksiyonBul('urunler')
  return sonuc?.docs?.length ? sonuc.docs : urunOrnekleri
}

export async function urunGetir(slug: string) {
  const payload = await payloadAl()

  if (!payload) {
    return urunOrnekleri.find((urun) => urun.slug === slug) ?? null
  }

  try {
    const sonuc = await payload.find({
      collection: 'urunler',
      depth: 2,
      limit: 1,
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    return sonuc.docs[0] ?? null
  } catch {
    return urunOrnekleri.find((urun) => urun.slug === slug) ?? null
  }
}

export async function kategorileriGetir() {
  const sonuc = await koleksiyonBul('urun_kategorileri', 'sira_no')
  return sonuc?.docs?.length ? sonuc.docs : kategoriOrnekleri
}

export async function siteReklamlariniGetir(konum?: string) {
  const payload = await payloadAl()

  if (!payload) {
    return konum ? reklamOrnekleri.filter((reklam) => reklam.konum === konum) : reklamOrnekleri
  }

  try {
    const sonuc = await payload.find({
      collection: 'site_reklamlari' as never,
      depth: 2,
      limit: 20,
      sort: 'sira_no',
      where: konum
        ? {
            konum: {
              equals: konum,
            },
          }
        : undefined,
    })

    return sonuc.docs?.length ? sonuc.docs : konum ? reklamOrnekleri.filter((reklam) => reklam.konum === konum) : reklamOrnekleri
  } catch {
    return konum ? reklamOrnekleri.filter((reklam) => reklam.konum === konum) : reklamOrnekleri
  }
}

export async function kategoriGetir(slug: string) {
  const kategoriler = await kategorileriGetir()
  return kategoriler.find((kategori) => kategori.slug === slug) ?? null
}

export async function portfoyleriGetir() {
  const sonuc = await koleksiyonBul('portfoy_projeleri')
  return sonuc?.docs?.length ? sonuc.docs : portfoyOrnekleri
}

export async function portfoyGetir(slug: string) {
  const portfoyler = await portfoyleriGetir()
  return portfoyler.find((oge) => oge.slug === slug) ?? null
}

export async function portfoyProjeleriniSayfaIcinGetir(sayfa: { id?: number | string; slug?: string | null }) {
  const portfoyler = await portfoyleriGetir()
  const sayfaId = sayfa.id != null ? String(sayfa.id) : null
  const sayfaSlug = sayfa.slug ? String(sayfa.slug) : null

  return portfoyler.filter((proje) => {
    const projeKaydi = proje as { sayfalar?: unknown[] | null }
    const bagliSayfalar = Array.isArray(projeKaydi.sayfalar) ? projeKaydi.sayfalar : []

    return bagliSayfalar.some((bagliSayfa: unknown) => {
      if (typeof bagliSayfa === 'number' || typeof bagliSayfa === 'string') {
        return sayfaId ? String(bagliSayfa) === sayfaId : false
      }

      if (bagliSayfa && typeof bagliSayfa === 'object') {
        const bagliSayfaId = 'id' in bagliSayfa ? String(bagliSayfa.id) : null
        const bagliSayfaSlug = 'slug' in bagliSayfa ? String(bagliSayfa.slug) : null

        return Boolean(
          (sayfaId && bagliSayfaId === sayfaId) ||
            (sayfaSlug && bagliSayfaSlug === sayfaSlug),
        )
      }

      return false
    })
  })
}

export async function kampanyalariGetir() {
  const sonuc = await koleksiyonBul('kampanyalar')
  return sonuc?.docs?.length ? sonuc.docs : kampanyaOrnekleri
}

export async function kampanyaGetir(slug: string) {
  const payload = await payloadAl()

  if (!payload) {
    return kampanyaOrnekleri.find((oge) => oge.slug === slug) ?? null
  }

  try {
    const sonuc = await payload.find({
      collection: 'kampanyalar',
      depth: 2,
      limit: 1,
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    return sonuc.docs[0] ?? null
  } catch {
    return kampanyaOrnekleri.find((oge) => oge.slug === slug) ?? null
  }
}

export async function blogYazilariniGetir() {
  const sonuc = await koleksiyonBul('blog_yazilari')
  return sonuc?.docs?.length ? sonuc.docs : blogOrnekleri
}

export async function blogYazisiGetir(slug: string) {
  const yazilar = await blogYazilariniGetir()
  return yazilar.find((oge) => oge.slug === slug) ?? null
}

export async function sayfalariGetir() {
  const sonuc = await koleksiyonBul('sayfalar')
  return sonuc?.docs?.length ? sonuc.docs : []
}

export async function sayfaGetir(slug: string) {
  const payload = await payloadAl()

  if (!payload) {
    return null
  }

  try {
    const sonuc = await payload.find({
      collection: 'sayfalar',
      depth: 2,
      limit: 1,
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    return sonuc.docs[0] ?? null
  } catch {
    return null
  }
}
