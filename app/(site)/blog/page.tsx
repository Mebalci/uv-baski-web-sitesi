import Link from 'next/link'

import { BolumBasligi } from '@/bilesenler/BolumBasligi'
import { blogYazilariniGetir } from '@/kutuphane/icerikler'
import { metadataOlustur } from '@/kutuphane/seo'

export const metadata = metadataOlustur({
  aciklama: 'UV baski, yuzey secimi, promosyon uretimi ve marka uygulamalari uzerine rehber icerikler.',
  baslik: 'Blog',
  yol: '/blog',
})

export const dynamic = 'force-dynamic'

export default async function BlogSayfasi() {
  const yazilar = await blogYazilariniGetir()

  return (
    <section className="mx-auto max-w-5xl px-5 pb-24 pt-32 md:px-8">
      <BolumBasligi
        aciklama="SEO degeri ureten, ayni zamanda satin alma surecini sadeleştiren bilgi sayfalari."
        baslik="Blog"
        etiket="Rehber"
      />
      <div className="mt-12 space-y-4">
        {yazilar.map((yazi) => (
          <Link className="mini-panel block" href={`/blog/${yazi.slug}`} key={yazi.slug}>
            <p className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">{yazi.baslik}</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">{yazi.kisa_aciklama}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
