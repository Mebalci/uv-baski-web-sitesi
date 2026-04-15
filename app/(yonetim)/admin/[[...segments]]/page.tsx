import configPromise from '@/payload.config'
import { generatePageMetadata, RootPage } from '@payloadcms/next/views'

import { importMap } from '../importMap'

type Props = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

export const generateMetadata = ({ params, searchParams }: Props) =>
  generatePageMetadata({
    config: configPromise,
    params,
    searchParams,
  })

export default function Sayfa({ params, searchParams }: Props) {
  return (
    <RootPage config={configPromise} importMap={importMap} params={params} searchParams={searchParams} />
  )
}
