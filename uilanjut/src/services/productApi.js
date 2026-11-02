export const DEFAULT_PRODUCT_IMAGE =
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'

export class ApiError extends Error {
  constructor(message, status = 0) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export function normalizeProduct(data) {
  if (
    !data ||
    typeof data !== 'object' ||
    data.id == null ||
    typeof data.name !== 'string' ||
    !data.name.trim()
  ) {
    throw new ApiError('Data produk dari server belum sesuai. Silakan hubungi pengelola toko.')
  }
  return {
    ...data,
    id: String(data.id),
    name: data.name.trim(),
    category: String(data.category || 'Electronics'),
    description: String(data.description || ''),
    price: Math.max(0, Number(data.price) || 0),
    originalPrice: Number(data.originalPrice) || null,
    stock: Math.max(0, Math.floor(Number(data.stock) || 0)),
    rating: Number(data.rating) || 0,
    reviewsCount: Number(data.reviewsCount) || 0,
    image: data.image || DEFAULT_PRODUCT_IMAGE,
    images:
      Array.isArray(data.images) && data.images.length
        ? data.images
        : [data.image || DEFAULT_PRODUCT_IMAGE],
    features: Array.isArray(data.features) ? data.features : [],
    status: data.status === 'inactive' ? 'inactive' : 'active',
    isFeatured: data.isFeatured === true,
  }
}

export function createProductApi({
  baseUrl,
  resource = 'products',
  fetchImpl = globalThis.fetch,
  timeoutMs = 15000,
}) {
  async function request(path = '', { method = 'GET', body } = {}) {
    if (!baseUrl?.trim())
      throw new ApiError('Layanan produk belum dikonfigurasi. Hubungi pengelola toko.')
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), timeoutMs)
    try {
      const url = `${baseUrl.trim().replace(/\/+$/, '')}/${resource.replace(/^\/+|\/+$/g, '')}${path}`
      const response = await fetchImpl(url, {
        method,
        signal: controller.signal,
        headers: {
          Accept: 'application/json',
          ...(body ? { 'Content-Type': 'application/json' } : {}),
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
      })
      if (!response.ok) {
        const message =
          response.status === 404
            ? path
              ? 'Produk tidak ditemukan atau sudah dihapus.'
              : 'Katalog belum dapat diakses. Hubungi pengelola toko.'
            : response.status >= 500
              ? 'Server sedang bermasalah. Silakan coba lagi sebentar.'
              : 'Permintaan belum berhasil diproses. Silakan coba lagi.'
        throw new ApiError(message, response.status)
      }
      if (response.status === 204) return null
      return await response.json()
    } catch (error) {
      if (error instanceof ApiError) throw error
      if (error.name === 'AbortError')
        throw new ApiError('Waktu tunggu habis. Periksa koneksi lalu coba lagi.')
      if (error instanceof SyntaxError)
        throw new ApiError('Respons server belum dapat dibaca. Silakan coba lagi.')
      throw new ApiError(
        'Tidak dapat terhubung ke server. Periksa koneksi internet Anda lalu coba lagi.',
      )
    } finally {
      clearTimeout(timeout)
    }
  }
  return {
    async list() {
      const data = await request()
      if (!Array.isArray(data)) throw new ApiError('Daftar produk dari server belum dapat dibaca.')
      return data.map(normalizeProduct)
    },
    async get(id) {
      return normalizeProduct(await request(`/${encodeURIComponent(id)}`))
    },
    async create(data) {
      return normalizeProduct(await request('', { method: 'POST', body: data }))
    },
    async update(id, data) {
      return normalizeProduct(
        await request(`/${encodeURIComponent(id)}`, { method: 'PUT', body: data }),
      )
    },
    async remove(id) {
      await request(`/${encodeURIComponent(id)}`, { method: 'DELETE' })
    },
  }
}

export const productApi = createProductApi({
  baseUrl: import.meta.env?.VITE_API_URL,
  resource: import.meta.env?.VITE_API_RESOURCE || 'products',
})
