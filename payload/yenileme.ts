import { revalidatePath } from 'next/cache'

function guvenliYenile(yol: string) {
  try {
    revalidatePath(yol)
  } catch (hata) {
    console.error('Revalidate hatasi:', yol, hata)
  }
}

export function anaSayfayiYenile() {
  guvenliYenile('/')
}

export function genelSayfalariYenile() {
  ;['/', '/iletisim', '/blog', '/kampanyalar', '/portfoy', '/urunler'].forEach(guvenliYenile)
}

export function slugSayfasiniYenile(onEk: string, slug?: string | null) {
  if (!slug) {
    return
  }

  guvenliYenile(`${onEk}/${slug}`)
}

export function kategoriSayfasiniYenile(slug?: string | null) {
  slugSayfasiniYenile('/kategoriler', slug)
}

export function urunSayfalariniYenile({
  kategoriSlug,
  slug,
}: {
  kategoriSlug?: string | null
  slug?: string | null
}) {
  guvenliYenile('/urunler')
  slugSayfasiniYenile('/urunler', slug)
  kategoriSayfasiniYenile(kategoriSlug)
  anaSayfayiYenile()
}

export function portfoySayfalariniYenile(slug?: string | null) {
  guvenliYenile('/portfoy')
  slugSayfasiniYenile('/portfoy', slug)
  anaSayfayiYenile()
}

export function kampanyaSayfalariniYenile(slug?: string | null) {
  guvenliYenile('/kampanyalar')
  slugSayfasiniYenile('/kampanyalar', slug)
  anaSayfayiYenile()
}

export function blogSayfalariniYenile(slug?: string | null) {
  guvenliYenile('/blog')
  slugSayfasiniYenile('/blog', slug)
  anaSayfayiYenile()
}

export function kurumsalSayfayiYenile(slug?: string | null) {
  if (!slug) {
    return
  }

  guvenliYenile(`/${slug}`)
}
