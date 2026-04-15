import configPromise from '@/payload.config'
import { NotFoundPage } from '@payloadcms/next/views'

import { importMap } from '../importMap'

type Props = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

export default function YonetimBulunamadi({ params, searchParams }: Props) {
  return (
    <NotFoundPage
      config={configPromise}
      importMap={importMap}
      params={params}
      searchParams={searchParams}
    />
  )
}
