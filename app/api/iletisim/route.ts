import { bildirimHazirMi } from '@/kutuphane/ortam'
import { Resend } from 'resend'
import { z } from 'zod'

const bosMetinleriTemizle = (deger: unknown) => {
  if (typeof deger !== 'string') {
    return deger
  }

  const temiz = deger.trim()
  return temiz === '' ? undefined : temiz
}

const istekSema = z.object({
  ad: z.preprocess(bosMetinleriTemizle, z.string().min(2, 'Ad soyad en az 2 karakter olmali.')),
  eposta: z.preprocess(bosMetinleriTemizle, z.string().email('Gecerli bir e-posta adresi girin.')),
  konu: z.preprocess(bosMetinleriTemizle, z.string().optional()),
  mesaj: z.preprocess(
    bosMetinleriTemizle,
    z.string().min(10, 'Mesaj alani en az 10 karakter olmali.'),
  ),
  sirket: z.preprocess(bosMetinleriTemizle, z.string().optional()),
  telefon: z.preprocess(bosMetinleriTemizle, z.string().optional()),
  website: z.preprocess(bosMetinleriTemizle, z.string().optional()),
})

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const veri = istekSema.parse(json)

    if (veri.website) {
      return Response.json({ mesaj: 'Talep alinamadi.' }, { status: 400 })
    }

    if (!bildirimHazirMi()) {
      console.info('Iletisim formu alindi ancak e-posta servisi hazir degil.', veri)

      return Response.json(
        {
          mesaj:
            'Form alindi ancak e-posta servisi henuz aktif degil. RESEND_API_ANAHTARI ve gonderici domain ayarlari tamamlanmali.',
        },
        { status: 503 },
      )
    }

    const resend = new Resend(process.env.RESEND_API_ANAHTARI)

    const sonuc = await resend.emails.send({
      from: `FORM <${process.env.MAIL_GONDEREN!}>`,
      replyTo: veri.eposta,
      subject: veri.konu || 'Yeni teklif talebi',
      text: [
        `Ad: ${veri.ad}`,
        `E-posta: ${veri.eposta}`,
        `Telefon: ${veri.telefon || '-'}`,
        `Sirket: ${veri.sirket || '-'}`,
        '',
        veri.mesaj,
      ].join('\n'),
      to: process.env.MAIL_ALICI!,
    })

    if (sonuc.error) {
      console.error('Iletisim formu e-posta hatasi', sonuc.error)

      return Response.json(
        {
          mesaj:
            'Mesaj kaydedildi ancak e-posta gonderimi basarisiz oldu. Resend alan adi dogrulamasi veya gonderici adresini kontrol edin.',
        },
        { status: 502 },
      )
    }

    return Response.json({
      mesaj: 'Talebiniz alindi. En kisa surede donus yapacagiz.',
    })
  } catch (error) {
    console.error('Iletisim formu istegi hatasi', error)

    if (error instanceof z.ZodError) {
      return Response.json(
        {
          mesaj: error.issues[0]?.message || 'Form verileri dogrulanamadi.',
        },
        { status: 400 },
      )
    }

    return Response.json(
      {
        mesaj: 'Form gonderilirken bir sorun olustu. Lutfen tekrar deneyin.',
      },
      { status: 400 },
    )
  }
}
