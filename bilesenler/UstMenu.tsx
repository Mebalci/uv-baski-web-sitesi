import { siteAyarlariGetir, ustBilgiGetir } from '@/kutuphane/icerikler'
import { UstMenuClient } from '@/bilesenler/UstMenuClient'

export async function UstMenu() {
  const [siteAyarlari, ustBilgi] = await Promise.all([siteAyarlariGetir(), ustBilgiGetir()])
  const menuOgeleri = ustBilgi.menu_ogeleri?.length ? ustBilgi.menu_ogeleri : []

  return <UstMenuClient firmaAdi={siteAyarlari.firma_adi} logo={siteAyarlari.logo} menuOgeleri={menuOgeleri} />
}
