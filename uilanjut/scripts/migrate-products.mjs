import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { products } from '../src/data/products.js'

const env = Object.fromEntries(
  (await readFile(new URL('../.env', import.meta.url), 'utf8'))
    .split(/\r?\n/)
    .filter((line) => /^[A-Z_]+=/.test(line))
    .map((line) => {
      const i = line.indexOf('=')
      return [line.slice(0, i), line.slice(i + 1).trim()]
    }),
)
const endpoint = `${env.VITE_API_URL.replace(/\/+$/, '')}/${env.VITE_API_RESOURCE || 'products'}`
async function request(path = '', method = 'GET', body) {
  const response = await fetch(endpoint + path, {
    method,
    signal: AbortSignal.timeout(20000),
    headers: { 'Content-Type': 'application/json' },
    ...(body ? { body: JSON.stringify(body) } : {}),
  })
  if (!response.ok) throw new Error(`${method} ${path || '/'} failed: HTTP ${response.status}`)
  return response.status === 204 ? null : response.json()
}
const current = await request()
if (!Array.isArray(current)) throw new Error('Expected an array from MockAPI.')
const legacyTitles = new Set([
  'Vue 3 Composition API Deep Dive',
  'Bandung Tech Meetup The Future of AI in Web Development',
  'National UI/UX Design Hackathon 2026',
  'Modern Frontend Architecture & Micro-Frontends',
  'Cloud Native & DevOps Summit 2026',
])
const legacy = current.filter((item) => !item.name && legacyTitles.has(item.title))
const unknown = current.filter((item) => !item.name && !legacyTitles.has(item.title))
if (unknown.length)
  throw new Error('Unknown non-product records found. Review them manually before migration.')
console.log(
  `Existing products: ${current.filter((p) => p.name).length}; module sample events: ${legacy.length}`,
)
if (!process.argv.includes('--apply')) {
  console.log(
    'Preview only. Pass --apply to migrate the module samples and upload missing SHOPNEST products.',
  )
  process.exit(0)
}
const backupDir = new URL('../docs/modul-6/', import.meta.url)
await mkdir(backupDir, { recursive: true })
try {
  await writeFile(
    new URL('mockapi-before-products.json', backupDir),
    JSON.stringify(current, null, 2) + '\n',
    { flag: 'wx' },
  )
} catch (error) {
  if (error.code !== 'EEXIST') throw error
}

const names = new Set(current.filter((p) => p.name).map((p) => p.name))
for (const product of products) {
  if (names.has(product.name)) continue
  const previous = legacy.shift()
  const { id: unusedId, ...fields } = product
  const payload = {
    ...fields,
    status: 'active',
    createdAt: new Date().toISOString(),
    // Compatibility with the original resource schema; product fields are canonical.
    title: product.name,
    cat: product.category,
    quota: product.stock,
    desc: product.description,
    done: false,
  }
  const saved = await request(previous ? `/${previous.id}` : '', previous ? 'PUT' : 'POST', payload)
  const verified = await request(`/${saved.id}`)
  if (
    verified.name !== product.name ||
    Number(verified.price) !== product.price ||
    !Array.isArray(verified.features)
  ) {
    if (previous) await request(`/${previous.id}`, 'PUT', previous)
    throw new Error(
      'MockAPI did not persist product fields. Configure the product schema in its dashboard first.',
    )
  }
  console.log(`Saved product ${saved.id}: ${saved.name}`)
  names.add(product.name)
}
const result = await request()
console.log(
  `Migration complete: ${result.length} server records, ${result.filter((p) => p.name).length} products.`,
)
