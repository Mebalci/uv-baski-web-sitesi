'use client'

import { useState, useTransition } from 'react'

type TeklifFormuProps = {
  konu?: string
}

export function TeklifFormu({ konu }: TeklifFormuProps) {
  const [durum, setDurum] = useState<string | null>(null)
  const [hata, setHata] = useState<string | null>(null)
  const [bekleniyor, gecisBaslat] = useTransition()

  const inputClassName =
    'w-full border-b-2 border-[var(--atolyen-blue)] bg-transparent px-0 py-4 text-sm font-bold uppercase tracking-wide text-slate-900 outline-none transition placeholder:text-slate-900/70 focus:border-slate-950'

  return (
    <form
      className="w-full bg-transparent"
      onSubmit={(event) => {
        event.preventDefault()

        const form = event.currentTarget
        const formData = new FormData(form)

        gecisBaslat(async () => {
          setDurum(null)
          setHata(null)

          const yanit = await fetch('/api/iletisim', {
            body: JSON.stringify(Object.fromEntries(formData.entries())),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const veri = (await yanit.json()) as { mesaj?: string }

          if (yanit.ok) {
            setDurum(veri.mesaj || 'Talebiniz alindi.')
            form.reset()
          } else {
            setHata(veri.mesaj || 'Form gonderilirken bir sorun olustu.')
          }
        })
      }}
    >
      <input defaultValue={konu} name="konu" type="hidden" />
      <input
        autoComplete="off"
        className="hidden"
        name="website"
        tabIndex={-1}
        type="text"
      />

      <div className="grid gap-6 md:grid-cols-2">
        <input
          className={inputClassName}
          name="ad"
          placeholder="AD SOYAD"
          required
          minLength={2}
        />

        <input
          className={inputClassName}
          name="eposta"
          placeholder="E-POSTA"
          required
          type="email"
        />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <input
          className={inputClassName}
          name="telefon"
          placeholder="TELEFON"
        />

        <input
          className={inputClassName}
          name="sirket"
          placeholder="SIRKET"
        />
      </div>

      <textarea
        className="mt-6 min-h-36 w-full resize-none border-b-2 border-[var(--atolyen-blue)] bg-transparent px-0 py-4 text-sm font-bold uppercase tracking-wide text-slate-900 outline-none transition placeholder:text-slate-900/70 focus:border-slate-950"
        name="mesaj"
        placeholder="TALEBINIZI, ADET BILGISINI VE TERMIN BEKLENTINIZI YAZIN."
        required
        minLength={10}
      />

      <button
        className="mt-8 inline-flex w-full items-center justify-center bg-[var(--atolyen-blue)] px-5 py-4 text-sm font-bold uppercase tracking-wide text-white transition-all duration-300 hover:bg-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={bekleniyor}
        type="submit"
      >
        {bekleniyor ? 'GONDERILIYOR...' : 'TALEBI GONDER'}
      </button>

      {durum ? (
        <p className="mt-4 border-l-4 border-emerald-600 pl-4 text-sm font-semibold text-emerald-700">
          {durum}
        </p>
      ) : null}

      {hata ? (
        <p className="mt-4 border-l-4 border-rose-600 pl-4 text-sm font-semibold text-rose-600">
          {hata}
        </p>
      ) : null}
    </form>
  )
}