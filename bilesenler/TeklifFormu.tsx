'use client'

import { useState, useTransition } from 'react'

type TeklifFormuProps = {
  konu?: string
}

export function TeklifFormu({ konu }: TeklifFormuProps) {
  const [durum, setDurum] = useState<string | null>(null)
  const [hata, setHata] = useState<string | null>(null)
  const [bekleniyor, gecisBaslat] = useTransition()

  return (
    <form
      className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)] sm:p-8"
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
      <input autoComplete="off" className="hidden" name="website" tabIndex={-1} type="text" />

      <div className="grid gap-4 md:grid-cols-2">
        <input
          className="w-full rounded-[1rem] border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-slate-300 focus:bg-white"
          name="ad"
          placeholder="Ad Soyad"
          required
          minLength={2}
        />
        <input
          className="w-full rounded-[1rem] border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-slate-300 focus:bg-white"
          name="eposta"
          placeholder="E-posta"
          required
          type="email"
        />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <input
          className="w-full rounded-[1rem] border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-slate-300 focus:bg-white"
          name="telefon"
          placeholder="Telefon"
        />
        <input
          className="w-full rounded-[1rem] border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-slate-300 focus:bg-white"
          name="sirket"
          placeholder="Sirket"
        />
      </div>
      <textarea
        className="mt-4 min-h-36 w-full rounded-[1rem] border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-slate-300 focus:bg-white"
        name="mesaj"
        placeholder="Talebinizi, adet bilgisini ve termin beklentinizi yazin."
        required
        minLength={10}
      />

      <button
        className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition-transform duration-200 ease-out hover:-translate-y-0.5"
        disabled={bekleniyor}
        type="submit"
      >
        {bekleniyor ? 'Gonderiliyor...' : 'Talebi Gonder'}
      </button>

      {durum ? <p className="mt-4 text-sm text-emerald-700">{durum}</p> : null}
      {hata ? <p className="mt-4 text-sm text-rose-600">{hata}</p> : null}
    </form>
  )
}
