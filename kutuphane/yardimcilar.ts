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

export function mutlakUrl(yol = '/') {
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000'
  return new URL(yol, siteUrl).toString()
}

export function whatsappBaglantisi(mesaj?: string | null) {
  const numara = process.env.WHATSAPP_NUMARASI || '905551112233'
  const icerik = encodeURIComponent(
    mesaj || 'Merhaba, UV baskı hizmetiniz hakkında teklif almak istiyorum.',
  )

  return `https://wa.me/${numara}?text=${icerik}`
}
