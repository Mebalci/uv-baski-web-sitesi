import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="mx-auto max-w-5xl px-5 pb-24 pt-32 md:px-8">
      <div className="icerik-paneli">
        <p className="etiket">404</p>
        <h1 className="mt-5 text-5xl font-semibold tracking-[-0.06em] text-slate-950">
          Aradiginiz sayfa bulunamadi.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
          Icerik tasinmis, yayin durumu degismis veya baglanti hatali olabilir.
        </p>
        <Link className="buton-siyah mt-8" href="/">
          Ana Sayfaya Don
        </Link>
      </div>
    </section>
  )
}
