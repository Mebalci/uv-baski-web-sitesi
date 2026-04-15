type BolumBasligiProps = {
  aciklama?: string
  etiket?: string
  hizalama?: 'left' | 'center'
  baslik?: string
}

export function BolumBasligi({
  aciklama,
  etiket,
  hizalama = 'left',
  baslik,
}: BolumBasligiProps) {
  const kapsayiciSinifi = hizalama === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'

  return (
    <div className={kapsayiciSinifi}>
      {etiket ? (
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-slate-400">{etiket}</p>
      ) : null}
      {baslik ? <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-6xl">{baslik}</h2> : null}
      {aciklama ? <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">{aciklama}</p> : null}
    </div>
  )
}
