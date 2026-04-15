import configPromise from '@/payload.config'
import '@payloadcms/next/css'
import { RootLayout, metadata } from '@payloadcms/next/layouts'

import { importMap } from './importMap'
import { payloadServerFunction } from './serverFunction'

export { metadata }

export default function YonetimYerlesimi({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RootLayout
      config={configPromise}
      importMap={importMap}
      serverFunction={payloadServerFunction}
    >
      {children}
    </RootLayout>
  )
}
