export function cmsHazirMi() {
  return Boolean(process.env.VERITABANI_URL && process.env.PAYLOAD_GIZLI_ANAHTAR)
}

export function r2HazirMi() {
  return Boolean(
    process.env.R2_ERISIM_ANAHTARI &&
      process.env.R2_GIZLI_ANAHTAR &&
      process.env.R2_KOVA_ADI &&
      process.env.R2_HESAP_ID,
  )
}

export function bildirimHazirMi() {
  return Boolean(
    process.env.RESEND_API_ANAHTARI &&
      process.env.MAIL_GONDEREN &&
      process.env.MAIL_ALICI,
  )
}
