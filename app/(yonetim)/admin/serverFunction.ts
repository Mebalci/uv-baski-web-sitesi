'use server'

import configPromise from '@/payload.config'
import { handleServerFunctions } from '@payloadcms/next/layouts'

import { importMap } from './importMap'

export async function payloadServerFunction(args: { args: Record<string, unknown>; name: string }) {
  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  })
}
