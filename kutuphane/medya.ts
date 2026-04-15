type MedyaNesnesi = {
  alt?: string | null
  filename?: string | null
  sizes?: Record<string, { filename?: string | null; url?: string | null } | undefined> | null
  thumbnailURL?: string | null
  url?: string | null
}

function yerelUrlNormalizeEt(url?: string | null) {
  if (!url) {
    return null
  }

  if (url.startsWith('/')) {
    return url
  }

  try {
    const ayrilan = new URL(url)
    const yerelHostlar = ['localhost', '127.0.0.1', '::1']

    if (yerelHostlar.includes(ayrilan.hostname)) {
      return `${ayrilan.pathname}${ayrilan.search}`
    }
  } catch {
    return url
  }

  return url
}

function dosyaYoluOlustur(dosyaAdi?: string | null) {
  if (!dosyaAdi) {
    return null
  }

  return `/api/medyalar/file/${encodeURIComponent(dosyaAdi)}`
}

export function medyaUrlAl(
  medya: MedyaNesnesi | number | string | null | undefined,
  boyut?: string,
) {
  if (!medya || typeof medya === 'number') {
    return null
  }

  if (typeof medya === 'string') {
    return yerelUrlNormalizeEt(medya)
  }

  if (boyut && medya.sizes?.[boyut]?.url) {
    return yerelUrlNormalizeEt(medya.sizes[boyut]?.url || null)
  }

  if (boyut === 'kucuk' && medya.thumbnailURL) {
    return yerelUrlNormalizeEt(medya.thumbnailURL)
  }

  if (boyut && medya.sizes?.[boyut]?.filename) {
    return dosyaYoluOlustur(medya.sizes[boyut]?.filename)
  }

  if (medya.url) {
    return yerelUrlNormalizeEt(medya.url)
  }

  if (medya.filename) {
    return dosyaYoluOlustur(medya.filename)
  }

  return null
}
