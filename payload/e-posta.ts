import { type EmailAdapter } from 'payload'
import { Resend } from 'resend'

function temizle(deger?: string | null) {
  return (deger || '').trim()
}

function gonderenAdi() {
  return 'Yonetim Paneli'
}

function gonderenAdresi() {
  return temizle(process.env.MAIL_GONDEREN) || 'onboarding@resend.dev'
}

function gonderenMetni() {
  return `"${gonderenAdi()}" <${gonderenAdresi()}>`
}

function resendHazirMi() {
  return Boolean(temizle(process.env.RESEND_API_ANAHTARI))
}

export const epostaAdapterunuOlustur: EmailAdapter = ({ payload }) => {
  if (!resendHazirMi()) {
    return {
      defaultFromAddress: gonderenAdresi(),
      defaultFromName: gonderenAdi(),
      name: 'console',
      sendEmail: async ({ html, subject, text, to }) => {
        payload.logger.info({
          msg: [
            'E-posta adaptoru Resend ile yapilandirilmadi.',
            `Gonderen: ${gonderenMetni()}`,
            `Alici: ${Array.isArray(to) ? to.join(', ') : to}`,
            `Konu: ${subject}`,
            text ? `Metin: ${text}` : '',
            html ? `HTML: ${html}` : '',
          ]
            .filter(Boolean)
            .join(' | '),
        })
      },
    }
  }

  const resend = new Resend(temizle(process.env.RESEND_API_ANAHTARI))

  return {
    defaultFromAddress: gonderenAdresi(),
    defaultFromName: gonderenAdi(),
    name: 'resend',
    sendEmail: async ({ from, html, subject, text, to }) => {
      const sonuc = await resend.emails.send({
        from: temizle(from) || gonderenMetni(),
        html,
        subject,
        text,
        to,
      })

      if (sonuc.error) {
        payload.logger.error({
          msg: 'Resend uzerinden admin e-postasi gonderilemedi.',
          gonderen: temizle(from) || gonderenMetni(),
          resendHatasi: sonuc.error,
        })

        throw new Error('Admin e-postasi gonderilemedi.')
      }
    },
  }
}
