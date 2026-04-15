import configPromise from '@/payload.config'
import '@payloadcms/next/css'
import { RootLayout, handleServerFunctions, metadata } from '@payloadcms/next/layouts'

import { importMap } from './importMap'

export { metadata }

async function payloadServerFunction(args: { args: Record<string, unknown>; name: string }) {
  'use server'

  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  })
}

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
