import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createProductApi } from '../src/services/productApi.js'

const lines = (await readFile(new URL('../.env', import.meta.url), 'utf8')).split(/\r?\n/)
const env = Object.fromEntries(
  lines
    .filter((line) => /^[A-Z_]+=/.test(line))
    .map((line) => {
      const index = line.indexOf('=')
      return [line.slice(0, index), line.slice(index + 1).trim()]
    }),
)
const api = createProductApi({
  baseUrl: env.VITE_API_URL,
  resource: env.VITE_API_RESOURCE || 'products',
})
const before = await api.list()
console.log(`GET catalog: ${before.length} products`)
assert.ok(before.length > 0, 'Expected the migrated catalog')
assert.ok((await api.get(before[0].id)).name)
console.log('GET product detail: OK')
if (!process.argv.includes('--write')) {
  console.log(
    'Read-only check finished. Pass --write for a temporary create/update/delete round trip.',
  )
  process.exit(0)
}

let created
try {
  created = await api.create({
    name: `Verifikasi Integrasi ${Date.now()}`,
    category: 'Electronics',
    description: 'Data sementara untuk pengujian integrasi Modul 6.',
    price: 150000,
    stock: 2,
    status: 'active',
  })
  assert.equal((await api.get(created.id)).price, 150000)
  console.log('POST + GET persistence: OK')
  await api.update(created.id, { ...created, stock: 0, status: 'inactive' })
  const updated = await api.get(created.id)
  assert.equal(updated.stock, 0)
  assert.equal(updated.status, 'inactive')
  console.log('PUT + GET stock/status persistence: OK')
} finally {
  if (created) {
    await api.remove(created.id)
    await assert.rejects(api.get(created.id), (error) => error.status === 404)
    console.log('DELETE + GET 404: OK; temporary record removed')
  }
}
assert.equal((await api.list()).length, before.length)
console.log('Live CRUD check complete; original catalog count unchanged.')
