import { payloadAl } from '@/kutuphane/payload'
import {
  blogOrnekleri,
  kampanyaOrnekleri,
  kategoriOrnekleri,
  portfoyOrnekleri,
  siteAyarlariOrnek,
  urunOrnekleri,
} from '@/kutuphane/ornek-veriler'

const anaSayfaOrnek = {
  blog_aciklama: 'SEO degeri tasiyan ve satin alma kararini kolaylastiran rehber icerikler.',
  blog_baslik: 'Bilgi arayan ziyaretciyi guvenen musteriye ceviren net icerikler.',
  hero_birincil_buton_link: '/iletisim',
  hero_birincil_buton_metin: 'Teklif Al',
  hero_etiket: 'Premium UV Baski Deneyimi',
  hero_gorseli: null,
  hero_ikincil_buton_link: '/portfoy',
  hero_ikincil_buton_metin: 'Portfoyu Incele',
  hero_baslik: 'Yuzeye degil algiya baski yapan kurumsal uretim.',
  hero_kayitlari: [
    {
      baslik: 'Yuzeye degil algiya baski yapan kurumsal uretim.',
      birincil_buton_link: '/iletisim',
      birincil_buton_metin: 'Teklif Al',
      etiket: 'Premium UV Baski Deneyimi',
      gorsel: null,
      ikincil_buton_link: '/portfoy',
      ikincil_buton_metin: 'Portfoyu Incele',
      metin:
        'Kurumsal promosyonlardan sert yuzey baskilarina kadar, uretim hizini ve gorsel kaliteyi ayni anda buyuten UV baski cozumleri.',
    },
  ],
  hero_metin:
    'Kurumsal promosyonlardan sert yuzey baskilarina kadar, uretim hizini ve gorsel kaliteyi ayni anda buyuten UV baski cozumleri.',
  istatistikler: [
    { aciklama: 'hizli teklif donusu', deger: '24 saat' },
    { aciklama: 'farkli yuzey secenegi', deger: '12+' },
    { aciklama: 'kurumsal proje odagi', deger: 'B2B' },
  ],
  kampanya_aciklama: 'Kisa sureli avantajlari net bir deger onerisi olarak sunun.',
  kampanya_baslik: 'Kampanyalar, satis baskisi degil netlik uretsin.',
  kategori_aciklama: 'Urun ailelerini sade bir katalog yapisinda sunun.',
  kategori_baslik: 'Kategori bazli, sakin ve anlasilir bir vitrin.',
  portfoy_aciklama: 'Uygulamanin hacmini degil markaya kattigi etkiyi gosterin.',
  portfoy_baslik: 'Portfoy, anlatidan cok guven kuran ikinci yuzunuz olsun.',
  surec_adimlari: [
    { aciklama: 'Ihtiyac, adet ve yuzey tipini netlestiririz.', adim: 'Kesif' },
    { aciklama: 'Numune, revize ve uygulama planini birlikte netleriz.', adim: 'Onay' },
    { aciklama: 'Uretim ve teslim akisini kontrollu sekilde tamamlariz.', adim: 'Teslim' },
  ],
  teklif_aciklama: 'Iletisim, WhatsApp ve teklif formunu tek akista bulusturun.',
  teklif_baslik: 'Ilk temasi e-postaya degil net bir briefe donusturun.',
  urun_aciklama: 'Secili urunlerde fiyat gorunur, digerlerinde dogrudan teklif akisi vardir.',
  urun_baslik: 'Secimi kolaylastiran temiz ve hizli bir katalog deneyimi.',
}

const iletisimOrnek = {
  adres: 'Maslak, Istanbul',
  calisma_saatleri: 'Hafta ici 09:00 - 18:30',
  eposta: 'merhaba@novauvbaski.com',
  telefon: '+90 212 555 11 22',
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
    { baglanti: '/urunler', etiket: 'Urunler' },
    { baglanti: '/portfoy', etiket: 'Portfoy' },
    { baglanti: '/blog', etiket: 'Blog' },
  ],
  metin: 'Kurumsal markalar icin UV baski, promosyon ve magaza ici uygulamalari tek uretim hattinda planliyoruz.',
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
    const sonuc = (await globalBul('ana_sayfa_icerigi')) || anaSayfaOrnek

    if (!sonuc.hero_kayitlari?.length && (sonuc.hero_baslik || sonuc.hero_metin || sonuc.hero_gorseli)) {
      sonuc.hero_kayitlari = [
        {
          baslik: sonuc.hero_baslik,
          birincil_buton_link: sonuc.hero_birincil_buton_link,
          birincil_buton_metin: sonuc.hero_birincil_buton_metin,
          etiket: sonuc.hero_etiket,
          gorsel: sonuc.hero_gorseli,
          ikincil_buton_link: sonuc.hero_ikincil_buton_link,
          ikincil_buton_metin: sonuc.hero_ikincil_buton_metin,
          metin: sonuc.hero_metin,
        },
      ]
    }

    return sonuc
  } catch {
    return anaSayfaOrnek
  }
}

export async function iletisimBilgileriGetir() {
  try {
    return (await globalBul('iletisim_bilgileri')) || iletisimOrnek
  } catch {
    return iletisimOrnek
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
