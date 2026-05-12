import Image from 'next/image'
import Link from 'next/link'

import { medyaUrlAl } from '@/kutuphane/medya'
import { paraBirimi } from '@/kutuphane/yardimcilar'

type UrunKartProps = {
  baslangic_fiyati?: number | null
  baslik: string
  kapak_gorseli?: unknown
  fiyat_gosterilsin_mi?: boolean | null
  kategori?: { baslik?: string | null; slug?: string | null } | null
  kisa_aciklama?: string | null
  slug: string
}

export function UrunKart({
  baslangic_fiyati,
  baslik,
  kapak_gorseli,
  fiyat_gosterilsin_mi,
  kategori,
  kisa_aciklama,
  slug,
}: UrunKartProps) {
  const gorselUrl = medyaUrlAl(kapak_gorseli as never, 'kucuk')

  return (
    <Link
      className="group block cursor-pointer rounded-[1.8rem] border border-slate-200 bg-white p-4 shadow-[0_16px_40px_rgba(15,23,42,0.04)] transition duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_22px_52px_rgba(15,23,42,0.08)]"
      href={`/urunler/${slug}`}
    >
      <div className="relative mb-6 aspect-[16/11] overflow-hidden rounded-[1.5rem] bg-slate-100">
        {gorselUrl ? (
          <Image
            alt={baslik}
            className="object-fill transition duration-500 ease-out group-hover:scale-[1.02]"
            fill
            sizes="(max-width: 1024px) 100vw, 30vw"
            src={gorselUrl}
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.08),_transparent_44%),linear-gradient(180deg,#f8fafc,#e2e8f0)]" />
        )}
      </div>
      <p className="text-xs uppercase tracking-[0.26em] text-slate-400">{kategori?.baslik || 'Ozel Uretim'}</p>
      <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-slate-950">{baslik}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-600">{kisa_aciklama}</p>
      <div className="mt-8 flex items-center justify-between text-sm text-slate-500">
        <span>{fiyat_gosterilsin_mi ? paraBirimi(baslangic_fiyati) || 'Teklif Sorunuz' : 'Teklif Al'}</span>
        <span className="text-slate-400 transition-colors duration-200 group-hover:text-slate-950">Detayi Ac</span>
      </div>
    </Link>
  )
}
