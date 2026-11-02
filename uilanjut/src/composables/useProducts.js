import { ref, computed } from 'vue'
import { categories } from '../data/products.js'
import { productApi, DEFAULT_PRODUCT_IMAGE } from '../services/productApi.js'

export function createProductsState(api = productApi) {
  const products = ref([])
  const loading = ref(false)
  const error = ref('')
  const hasLoaded = ref(false)
  const isSubmitting = ref(false)
  const actionError = ref('')
  const pendingIds = ref(new Set())
  const notificationMessage = ref('')
  const notificationType = ref('success')
  const isNotificationVisible = ref(false)
  let notificationTimer
  let listRequest

  function showNotification(message, type = 'success', duration = 3500) {
    notificationMessage.value = message
    notificationType.value = type
    isNotificationVisible.value = true
    clearTimeout(notificationTimer)
    notificationTimer = setTimeout(() => {
      isNotificationVisible.value = false
    }, duration)
    notificationTimer.unref?.()
  }

  function fetchProducts() {
    if (listRequest) return listRequest
    if (isSubmitting.value || pendingIds.value.size) return Promise.resolve(null)
    loading.value = true
    error.value = ''
    listRequest = (async () => {
      try {
        products.value = await api.list()
        hasLoaded.value = true
        return products.value
      } catch (err) {
        error.value = err.message
        return null
      } finally {
        loading.value = false
        listRequest = null
      }
    })()
    return listRequest
  }

  function getProductById(id) {
    return products.value.find((product) => String(product.id) === String(id))
  }

  async function fetchProductById(id) {
    const product = await api.get(id)
    const index = products.value.findIndex((item) => item.id === product.id)
    if (index < 0) products.value.push(product)
    else products.value[index] = product
    return product
  }

  async function addProduct(data) {
    if (isSubmitting.value || loading.value || pendingIds.value.size) return null
    const price = Number(data.price)
    const stock = Number(data.stock)
    if (
      !data.name?.trim() ||
      !data.description?.trim() ||
      !Number.isFinite(price) ||
      price < 1000 ||
      data.stock === '' ||
      !Number.isInteger(stock) ||
      stock < 0 ||
      !categories.some((c) => c.id !== 'all' && c.id === data.category)
    ) {
      throw new Error(
        'Lengkapi nama, kategori, harga minimal Rp1.000, stok bilangan bulat, dan deskripsi produk.',
      )
    }
    isSubmitting.value = true
    actionError.value = ''
    try {
      const created = await api.create({
        ...data,
        name: data.name.trim(),
        description: data.description.trim(),
        price,
        stock,
        image: data.image || DEFAULT_PRODUCT_IMAGE,
        status: 'active',
        rating: 0,
        reviewsCount: 0,
        isFeatured: false,
        features: data.features || [],
        createdAt: new Date().toISOString(),
      })
      products.value.unshift(created)
      showNotification(`Produk "${created.name}" berhasil dipublikasikan.`, 'success')
      return created
    } catch (err) {
      actionError.value = err.message
      throw err
    } finally {
      isSubmitting.value = false
    }
  }

  function isProductPending(id) {
    return pendingIds.value.has(String(id))
  }

  async function mutateProduct(id, operation, message) {
    if (isProductPending(id) || loading.value || isSubmitting.value) return null
    pendingIds.value.add(String(id))
    actionError.value = ''
    try {
      const result = await operation()
      const index = products.value.findIndex((p) => String(p.id) === String(id))
      if (result) {
        if (index >= 0) products.value[index] = result
        else products.value.push(result)
      } else if (index >= 0) products.value.splice(index, 1)
      showNotification(message)
      return result || true
    } catch (err) {
      actionError.value = err.message
      throw err
    } finally {
      pendingIds.value.delete(String(id))
    }
  }

  async function toggleProductStatus(id) {
    const product = getProductById(id)
    if (!product) return null
    const status = product.status === 'inactive' ? 'active' : 'inactive'
    return mutateProduct(
      id,
      () => api.update(id, { ...product, status }),
      `Status "${product.name}" berhasil diperbarui.`,
    )
  }

  async function updateStock(id, stock) {
    const product = getProductById(id)
    if (!product || !Number.isInteger(stock) || stock < 0) return null
    return mutateProduct(
      id,
      () => api.update(id, { ...product, stock }),
      `Stok "${product.name}" berhasil diperbarui.`,
    )
  }

  async function deleteProduct(id) {
    const product = getProductById(id)
    return mutateProduct(
      id,
      async () => {
        await api.remove(id)
        return null
      },
      `Produk "${product?.name || id}" berhasil dihapus.`,
    )
  }

  const activeProducts = computed(() => products.value.filter((p) => p.status !== 'inactive'))
  const inactiveProducts = computed(() => products.value.filter((p) => p.status === 'inactive'))
  return {
    products,
    categories,
    loading,
    error,
    hasLoaded,
    isSubmitting,
    actionError,
    isMutating: computed(() => isSubmitting.value || pendingIds.value.size > 0),
    totalProducts: computed(() => products.value.length),
    activeProducts,
    inactiveProducts,
    totalActiveProducts: computed(() => activeProducts.value.length),
    totalInactiveProducts: computed(() => inactiveProducts.value.length),
    fetchProducts,
    fetchProductById,
    getProductById,
    addProduct,
    updateStock,
    toggleProductStatus,
    deleteProduct,
    isProductPending,
    notificationMessage,
    notificationType,
    isNotificationVisible,
    showNotification,
  }
}

// Shared server-backed catalog; localStorage is reserved for cart/preferences.
const state = createProductsState()
export function useProducts() {
  return state
}
