import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function birlestir(...siniflar: ClassValue[]) {
  return twMerge(clsx(siniflar))
}

export function paraBirimi(bedel?: number | null) {
  if (typeof bedel !== 'number') {
    return null
  }

  return new Intl.NumberFormat('tr-TR', {
    currency: 'TRY',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(bedel)
}

export function siteUrlAl() {
  const hamUrl =
    process.env.SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    'http://localhost:3000'

  const temizUrl = hamUrl.trim()

  if (!temizUrl) {
    return 'http://localhost:3000'
  }

  if (/^https?:\/\//i.test(temizUrl)) {
    return temizUrl
  }

  return `https://${temizUrl}`
}

export function mutlakUrl(yol = '/') {
  return new URL(yol, siteUrlAl()).toString()
}

export function whatsappBaglantisi(mesaj?: string | null) {
  const numara = process.env.WHATSAPP_NUMARASI || '905551112233'
  const icerik = encodeURIComponent(
    mesaj || 'Merhaba, UV baskı hizmetiniz hakkında teklif almak istiyorum.',
  )

  return `https://wa.me/${numara}?text=${icerik}`
}
