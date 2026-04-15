import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const payloadConfig = readFileSync(new URL('../payload.config.ts', import.meta.url), 'utf8')
const anaSayfa = readFileSync(new URL('../app/(site)/page.tsx', import.meta.url), 'utf8')
const sitemap = readFileSync(new URL('../app/sitemap.ts', import.meta.url), 'utf8')

assert.match(payloadConfig, /postgresAdapter/)
assert.match(payloadConfig, /s3Storage/)
assert.match(payloadConfig, /yoneticiler/)
assert.match(anaSayfa, /HeroAlan/)
assert.match(anaSayfa, /TeklifFormu/)
assert.match(sitemap, /MetadataRoute\.Sitemap/)

console.log('Testler basariyla gecti.')
