import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createProductApi, ApiError } from '../src/services/productApi.js'
import { createProductsState } from '../src/composables/useProducts.js'
import { createPinia, setActivePinia } from 'pinia'
import { nextTick } from 'vue'
import { useCartStore } from '../src/stores/cart.js'

const product = {
  id: 'item-7',
  name: 'Keyboard SHOPNEST',
  category: 'Electronics',
  price: 150000,
  stock: 3,
  description: 'Keyboard mekanis',
  status: 'active',
}
const deferred = () => {
  let resolve, reject
  const promise = new Promise((yes, no) => {
    resolve = yes
    reject = no
  })
  return { promise, resolve, reject }
}
const apiWithFetch = (fetchImpl, extra = {}) =>
  createProductApi({
    baseUrl: 'https://example.test/api/v1/',
    resource: 'events',
    fetchImpl,
    ...extra,
  })

test('REST methods, JSON headers, resource configuration, encoded IDs and normalized fields', async () => {
  const calls = []
  const api = apiWithFetch(async (url, options) => {
    calls.push({ url, ...options })
    return new Response(
      JSON.stringify(options.method === 'GET' && url.endsWith('/events') ? [product] : product),
    )
  })
  assert.equal((await api.list())[0].stock, 3)
  await api.get('item/7')
  await api.create(product)
  await api.update('item-7', { stock: 2 })
  await api.remove('item-7')
  assert.deepEqual(
    calls.map((c) => c.method),
    ['GET', 'GET', 'POST', 'PUT', 'DELETE'],
  )
  assert.equal(calls[1].url, 'https://example.test/api/v1/events/item%2F7')
  assert.equal(calls[2].headers['Content-Type'], 'application/json')
  assert.deepEqual(JSON.parse(calls[3].body), { stock: 2 })
})

test('HTTP 404 is distinct from connection failure; 500 and invalid JSON are friendly errors', async () => {
  await assert.rejects(
    apiWithFetch(async () => new Response('missing', { status: 404 })).get('missing'),
    (error) => error instanceof ApiError && error.status === 404,
  )
  await assert.rejects(
    apiWithFetch(async () => new Response('down', { status: 500 })).list(),
    /Server sedang bermasalah/,
  )
  await assert.rejects(
    apiWithFetch(async () => {
      throw new TypeError('Failed to fetch')
    }).list(),
    /Periksa koneksi internet/,
  )
  await assert.rejects(
    apiWithFetch(async () => new Response('not json')).list(),
    /belum dapat dibaca/,
  )
  await assert.rejects(apiWithFetch(async () => new Response('{}')).list(), /Daftar produk/)
})

test('timeout aborts the fetch and reports a recoverable message', async () => {
  const api = apiWithFetch(
    (url, { signal }) =>
      new Promise((resolve, reject) => {
        signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')))
      }),
    { timeoutMs: 10 },
  )
  await assert.rejects(api.list(), /Waktu tunggu habis/)
})

test('catalog loading deduplicates requests, error resets, retry works, [] is genuine empty data', async () => {
  const gate = deferred()
  let list = () => gate.promise
  let calls = 0
  const store = createProductsState({
    list: () => {
      calls++
      return list()
    },
  })
  const first = store.fetchProducts()
  assert.equal(store.loading.value, true)
  assert.equal(store.fetchProducts(), first)
  gate.reject(new Error('offline'))
  await first
  assert.equal(calls, 1)
  assert.equal(store.loading.value, false)
  assert.equal(store.error.value, 'offline')
  list = async () => [product]
  await store.fetchProducts()
  assert.equal(store.error.value, '')
  assert.equal(store.totalProducts.value, 1)
  list = async () => []
  await store.fetchProducts()
  assert.deepEqual(store.products.value, [])
  assert.equal(store.hasLoaded.value, true)
})

test('POST waits for server ID, blocks double submit and preserves data on failure', async () => {
  const gate = deferred()
  let create = () => gate.promise
  let calls = 0
  const store = createProductsState({
    create: (data) => {
      calls++
      return create(data)
    },
  })
  const pending = store.addProduct(product)
  assert.equal(store.isSubmitting.value, true)
  assert.equal(store.products.value.length, 0)
  assert.equal(await store.addProduct(product), null)
  assert.equal(calls, 1)
  gate.resolve({ ...product, id: 'server-generated-id' })
  await pending
  assert.equal(store.products.value[0].id, 'server-generated-id')
  assert.equal(store.isSubmitting.value, false)
  create = async () => {
    throw new Error('POST failed')
  }
  await assert.rejects(store.addProduct(product), /POST failed/)
  assert.equal(store.products.value.length, 1)
  assert.equal(store.isSubmitting.value, false)
})

test('invalid form values never reach POST, including decimal/negative stock', async () => {
  const store = createProductsState({
    create: () => assert.fail('Invalid data must not be posted'),
  })
  for (const invalid of [
    { name: ' ' },
    { description: '' },
    { price: -1 },
    { stock: -1 },
    { stock: 0.5 },
    { stock: '' },
    { category: 'all' },
  ]) {
    await assert.rejects(store.addProduct({ ...product, ...invalid }))
  }
})

test('PUT updates stock/status only after success; failed PUT preserves old state', async () => {
  let update = async (id, data) => ({ ...data, id })
  const store = createProductsState({
    list: async () => [product],
    update: (...args) => update(...args),
  })
  await store.fetchProducts()
  await store.updateStock('item-7', 0)
  assert.equal(store.getProductById('item-7').stock, 0)
  await store.toggleProductStatus('item-7')
  assert.equal(store.totalInactiveProducts.value, 1)
  assert.equal(store.totalActiveProducts.value, 0)
  update = async () => {
    throw new Error('PUT failed')
  }
  await assert.rejects(store.updateStock('item-7', 9), /PUT failed/)
  assert.equal(store.getProductById('item-7').stock, 0)
  assert.equal(store.isProductPending('item-7'), false)
})

test('DELETE waits for server, prevents duplicates and preserves product on failure', async () => {
  const gate = deferred()
  let remove = () => gate.promise
  let calls = 0
  const store = createProductsState({
    list: async () => [product],
    remove: () => {
      calls++
      return remove()
    },
  })
  await store.fetchProducts()
  const pending = store.deleteProduct(product.id)
  assert.equal(store.totalProducts.value, 1)
  assert.equal(store.isProductPending(product.id), true)
  assert.equal(await store.deleteProduct(product.id), null)
  gate.reject(new Error('DELETE failed'))
  await assert.rejects(pending, /DELETE failed/)
  assert.equal(store.totalProducts.value, 1)
  assert.equal(calls, 1)
  remove = async () => null
  await store.deleteProduct(product.id)
  assert.equal(store.totalProducts.value, 0)
  assert.equal(store.isMutating.value, false)
})

test('detail loads directly from its endpoint and retains string IDs', async () => {
  const store = createProductsState({ get: async (id) => ({ ...product, id }) })
  const detail = await store.fetchProductById('abc-123')
  assert.equal(detail.id, 'abc-123')
  assert.equal(store.getProductById('abc-123').name, product.name)
  assert.equal(store.hasLoaded.value, false)
})

test('existing numeric cart IDs remain compatible with MockAPI string IDs', async () => {
  const previousStorage = globalThis.localStorage
  globalThis.localStorage = {
    getItem: () => JSON.stringify([{ product: { ...product, id: 7 }, quantity: 1 }]),
    setItem() {},
    removeItem() {},
  }
  try {
    setActivePinia(createPinia())
    const cart = useCartStore()
    cart.addToCart({ ...product, id: '7' })
    assert.equal(cart.items.length, 1)
    assert.equal(cart.items[0].quantity, 2)
    cart.updateQuantity('7', 1)
    assert.equal(cart.items[0].quantity, 1)
    cart.removeFromCart('7')
    assert.equal(cart.items.length, 0)
    await nextTick()
  } finally {
    globalThis.localStorage = previousStorage
  }
})
