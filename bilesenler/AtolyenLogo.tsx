import Image from 'next/image'
import Link from 'next/link'

import { medyaUrlAl } from '@/kutuphane/medya'

type AtolyenLogoProps = {
  className?: string
  firmaAdi?: string | null
  href?: string
  logo?: unknown
}

export function AtolyenLogo({ className = '', firmaAdi, href = '/', logo }: AtolyenLogoProps) {
  const logoUrl = medyaUrlAl(logo as never)

  return (
    <Link
      className={`relative inline-flex min-h-12 items-center text-3xl font-black uppercase tracking-[-0.06em] text-[var(--atolyen-blue)] ${className}`}
      href={href}
    >
      {logoUrl ? (
        <Image
          alt={firmaAdi || 'Atolyen'}
          className="h-auto w-auto max-w-full object-contain"
          height={92}
          priority
          src={logoUrl}
          width={330}
        />
      ) : (
        <span>{firmaAdi || 'Atolyen'}</span>
      )}
    </Link>
  )
}
