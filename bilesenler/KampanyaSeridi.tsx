import Link from 'next/link'

type KampanyaSeridiProps = {
  kampanyalar: Array<{
    [key: string]: unknown
    baslik?: string | null
    bitis_tarihi?: string | null
    kisa_aciklama?: string | null
    slug?: string | null
  }>
}

export function KampanyaSeridi({ kampanyalar }: KampanyaSeridiProps) {
  return (
    <div className="grid gap-4">
      {kampanyalar.map((kampanya) => (
        <Link
          className="rounded-[2rem] border border-slate-200 bg-white px-6 py-7 shadow-[0_16px_40px_rgba(15,23,42,0.04)] sm:px-8"
          href={kampanya.slug ? `/kampanyalar/${kampanya.slug}` : '/kampanyalar'}
          key={kampanya.slug || kampanya.baslik || kampanya.bitis_tarihi || 'kampanya'}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Aktif Kampanya</p>
              <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-slate-950">
                {kampanya.baslik || 'Kampanya'}
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">{kampanya.kisa_aciklama}</p>
            </div>
            <div className="text-sm text-slate-500">Son Gun: {kampanya.bitis_tarihi?.slice(0, 10) || 'TBA'}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}
