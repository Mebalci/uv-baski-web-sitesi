import configPromise from '@/payload.config'
import { cmsHazirMi } from '@/kutuphane/ortam'
import { getPayload } from 'payload'

let payloadOnbellek: Awaited<ReturnType<typeof getPayload>> | null = null

export async function payloadAl() {
  if (!cmsHazirMi()) {
    return null
  }

  if (!payloadOnbellek) {
    payloadOnbellek = await getPayload({
      config: configPromise,
    })
  }

  return payloadOnbellek
}
