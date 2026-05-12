import Image from 'next/image'
import Link from 'next/link'

import { medyaUrlAl } from '@/kutuphane/medya'

type HizmetKartProps = {
  baslik: string
  gorsel?: unknown
  href?: string | null
}

export function HizmetKart({ baslik, gorsel, href }: HizmetKartProps) {
  const gorselUrl = medyaUrlAl(gorsel as never, 'buyuk')
  const hedef = href?.trim()
  const className =
    'group relative block aspect-[740/2400] min-w-0 overflow-hidden bg-[#231f20] lg:aspect-auto lg:h-full lg:min-h-0'
  const icerik = (
    <>
      {gorselUrl ? (
        <Image
          alt={baslik}
          className="object-fill transition duration-500 ease-out group-hover:scale-105"
          fill
          sizes="(max-width: 640px) 19vw, (max-width: 1024px) 18vw, 17vw"
          src={gorselUrl}
        />
      ) : (
        <div className="absolute inset-0 bg-[#231f20]" />
      )}
    </>
  )

  if (!hedef) {
    return <div className={className}>{icerik}</div>
  }

  return (
    <Link className={className} href={hedef}>
      {icerik}
    </Link>
  )
}
