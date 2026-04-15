import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { medyaUrlAl } from '@/kutuphane/medya'

type ZenginMetinDugumu = {
  children?: ZenginMetinDugumu[]
  fields?: {
    alt?: string | null
    caption?: unknown
    relationTo?: string
    url?: unknown
    value?: unknown
  }
  format?: number | string
  indent?: number
  listType?: 'bullet' | 'check' | 'number'
  tag?: string
  text?: string
  type?: string
  url?: string
  value?: unknown
}

type ZenginIcerikProps = {
  icerik: unknown
}

function metinFormatla(metin: string, format?: number | string) {
  if (!metin) {
    return null
  }

  const bitmask = typeof format === 'number' ? format : 0
  let sonuc: ReactNode = metin

  if (bitmask & 16) {
    sonuc = (
      <code className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[0.92em] text-slate-900">{sonuc}</code>
    )
  }

  if (bitmask & 8) {
    sonuc = <u>{sonuc}</u>
  }

  if (bitmask & 4) {
    sonuc = <s>{sonuc}</s>
  }

  if (bitmask & 2) {
    sonuc = <em>{sonuc}</em>
  }

  if (bitmask & 1) {
    sonuc = <strong className="font-semibold text-slate-950">{sonuc}</strong>
  }

  return sonuc
}

function dugumleriMetneIndirge(dugumler?: ZenginMetinDugumu[]): string {
  if (!dugumler?.length) {
    return ''
  }

  return dugumler
    .map((dugum) => {
      if (dugum.text) {
        return dugum.text
      }

      return dugumleriMetneIndirge(dugum.children)
    })
    .join(' ')
    .trim()
}

function yuklemeGorseliBul(dugum: ZenginMetinDugumu) {
  if (dugum.type !== 'upload') {
    return null
  }

  const alanDegeri =
    dugum.value ||
    dugum.fields?.value ||
    (typeof dugum.fields?.url === 'object' ? dugum.fields?.url : null) ||
    null

  const url = medyaUrlAl(alanDegeri as never, 'buyuk') || (typeof dugum.fields?.url === 'string' ? dugum.fields.url : null)
  const alt =
    dugum.fields?.alt ||
    (typeof alanDegeri === 'object' && alanDegeri && 'alt' in (alanDegeri as Record<string, unknown>)
      ? String((alanDegeri as Record<string, unknown>).alt || '')
      : '') ||
    'Sayfa görseli'

  if (!url) {
    return null
  }

  return { alt, url }
}

function dugumleriRenderEt(dugumler?: ZenginMetinDugumu[]): ReactNode {
  if (!dugumler?.length) {
    return null
  }

  return dugumler.map((dugum, index) => {
    const key = `${dugum.type || 'dugum'}-${index}`

    if (dugum.type === 'text') {
      return <span key={key}>{metinFormatla(dugum.text || '', dugum.format)}</span>
    }

    if (dugum.type === 'linebreak') {
      return <br key={key} />
    }

    if (dugum.type === 'paragraph') {
      const icerik = dugumleriRenderEt(dugum.children)

      if (!icerik) {
        return null
      }

      return (
        <p className="text-lg leading-9 text-slate-700" key={key}>
          {icerik}
        </p>
      )
    }

    if (dugum.type === 'heading') {
      const baslik = dugumleriRenderEt(dugum.children)
      const tag = dugum.tag || 'h2'
      const siniflar: Record<string, string> = {
        h1: 'text-5xl font-semibold tracking-[-0.06em] text-slate-950',
        h2: 'text-4xl font-semibold tracking-[-0.05em] text-slate-950',
        h3: 'text-3xl font-semibold tracking-[-0.04em] text-slate-950',
        h4: 'text-2xl font-semibold tracking-[-0.03em] text-slate-950',
        h5: 'text-xl font-semibold text-slate-950',
        h6: 'text-lg font-semibold uppercase tracking-[0.08em] text-slate-700',
      }

      const sinif = siniflar[tag] || siniflar.h2

      switch (tag) {
        case 'h1':
          return (
            <h1 className={sinif} key={key}>
              {baslik}
            </h1>
          )
        case 'h3':
          return (
            <h3 className={sinif} key={key}>
              {baslik}
            </h3>
          )
        case 'h4':
          return (
            <h4 className={sinif} key={key}>
              {baslik}
            </h4>
          )
        case 'h5':
          return (
            <h5 className={sinif} key={key}>
              {baslik}
            </h5>
          )
        case 'h6':
          return (
            <h6 className={sinif} key={key}>
              {baslik}
            </h6>
          )
        default:
          return (
            <h2 className={sinif} key={key}>
              {baslik}
            </h2>
          )
      }
    }

    if (dugum.type === 'list') {
      const Ogeler = dugum.listType === 'number' ? 'ol' : 'ul'
      const sinif =
        dugum.listType === 'number'
          ? 'ml-6 list-decimal space-y-3 text-lg leading-8 text-slate-700'
          : 'ml-6 list-disc space-y-3 text-lg leading-8 text-slate-700'

      return (
        <Ogeler className={sinif} key={key}>
          {dugumleriRenderEt(dugum.children)}
        </Ogeler>
      )
    }

    if (dugum.type === 'listitem') {
      return <li key={key}>{dugumleriRenderEt(dugum.children)}</li>
    }

    if (dugum.type === 'quote') {
      return (
        <blockquote
          className="border-l-4 border-slate-200 pl-6 text-xl leading-9 text-slate-600"
          key={key}
        >
          {dugumleriRenderEt(dugum.children)}
        </blockquote>
      )
    }

    if (dugum.type === 'link') {
      return (
        <Link
          className="font-medium text-slate-950 underline decoration-slate-300 underline-offset-4"
          href={dugum.url || '#'}
          key={key}
          target={dugum.url?.startsWith('http') ? '_blank' : undefined}
        >
          {dugumleriRenderEt(dugum.children)}
        </Link>
      )
    }

    if (dugum.type === 'upload') {
      const gorsel = yuklemeGorseliBul(dugum)

      if (!gorsel) {
        return null
      }

      return (
        <figure className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50" key={key}>
          <div className="relative min-h-[18rem] w-full">
            <Image
              alt={gorsel.alt}
              className="object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 900px"
              src={gorsel.url}
            />
          </div>
        </figure>
      )
    }

    const icMetin = dugumleriMetneIndirge(dugum.children)
    if (icMetin) {
      return (
        <p className="text-lg leading-9 text-slate-700" key={key}>
          {icMetin}
        </p>
      )
    }

    return null
  })
}

export function ZenginIcerik({ icerik }: ZenginIcerikProps) {
  if (!icerik || typeof icerik !== 'object') {
    return null
  }

  const kok = icerik as { root?: { children?: ZenginMetinDugumu[] } }
  const dugumler = kok.root?.children

  if (!dugumler?.length) {
    return null
  }

  return <div className="grid gap-6">{dugumleriRenderEt(dugumler)}</div>
}
