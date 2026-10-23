import { ref, computed, watch } from 'vue'
import { products as initialProducts, categories as productCategories } from '@/data/products'

const STORAGE_KEY = 'shopnest_products_store'

// Load initial products with guaranteed 'status' field ('active' | 'inactive')
function loadInitialProducts() {
  if (typeof window === 'undefined') {
    return initialProducts.map((p) => ({ ...p, status: p.status || 'active' }))
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed) && parsed.length >= 0) {
        return parsed.map((p) => ({ ...p, status: p.status || 'active' }))
      }
    }
  } catch (error) {
    console.error('[useProducts] Gagal membaca data dari localStorage:', error)
  }

  return initialProducts.map((p) => ({ ...p, status: p.status || 'active' }))
}

// Module-level reactive state: Single Source of Truth across all components
const products = ref(loadInitialProducts())

// Watcher with deep: true for persistent state side effects
if (typeof window !== 'undefined') {
  watch(
    products,
    (newVal) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
      } catch (err) {
        console.error('[useProducts] Gagal menyimpan data ke localStorage:', err)
      }
    },
    { deep: true },
  )
}

// Feedback Notification State
const notificationMessage = ref('')
const notificationType = ref('success') // 'success' | 'warning' | 'info' | 'danger'
const isNotificationVisible = ref(false)
let notificationTimer = null

function showNotification(message, type = 'success', duration = 3500) {
  notificationMessage.value = message
  notificationType.value = type
  isNotificationVisible.value = true

  if (notificationTimer) clearTimeout(notificationTimer)
  notificationTimer = setTimeout(() => {
    isNotificationVisible.value = false
  }, duration)
}

export function useProducts() {
  // =========================================================================
  // DERIVED STATE: Computed metrics calculated dynamically from raw state
  // =========================================================================
  const totalProducts = computed(() => products.value.length)

  const activeProducts = computed(() =>
    products.value.filter((p) => p.status !== 'inactive'),
  )

  const inactiveProducts = computed(() =>
    products.value.filter((p) => p.status === 'inactive'),
  )

  const totalActiveProducts = computed(() => activeProducts.value.length)
  const totalInactiveProducts = computed(() => inactiveProducts.value.length)

  // =========================================================================
  // STATE MUTATIONS: User Action -> State Change -> UI Update
  // =========================================================================

  /**
   * 1. Create: Tambah produk baru ke state terpusat
   */
  function addProduct(productData) {
    const nextId =
      products.value.length > 0
        ? Math.max(...products.value.map((p) => Number(p.id) || 0)) + 1
        : 1

    const newProduct = {
      id: nextId,
      name: productData.name.trim(),
      category: productData.category || 'Electronics',
      price: Number(productData.price) || 0,
      originalPrice: productData.originalPrice ? Number(productData.originalPrice) : null,
      stock: Number(productData.stock) || 0,
      rating: 5.0,
      reviewsCount: 0,
      badge: productData.badge ? productData.badge.trim() : 'Baru',
      image:
        productData.image ||
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      description:
        productData.description ||
        'Deskripsi produk baru yang dipublikasikan melalui Admin SHOPNEST.',
      features: productData.features || [
        'Produk original bergaransi resmi',
        'Kondisi barang baru tersegel rapi',
      ],
      status: 'active', // default binary status active
      createdAt: new Date().toISOString(),
    }

    products.value.unshift(newProduct)
    showNotification(
      `Produk "${newProduct.name}" berhasil dipublikasikan dan aktif di katalog!`,
      'success',
    )
    return newProduct
  }

  /**
   * 2. Update / Toggle: Ubah status biner produk (active <-> inactive)
   */
  function toggleProductStatus(productId) {
    const numericId = Number(productId)
    const product = products.value.find((p) => p.id === numericId)
    if (!product) return null

    const previousStatus = product.status
    product.status = previousStatus === 'active' ? 'inactive' : 'active'

    const statusLabel = product.status === 'active' ? 'Aktif' : 'Nonaktif'
    showNotification(
      `Status "${product.name}" diubah menjadi ${statusLabel}.`,
      product.status === 'active' ? 'success' : 'warning',
    )
    return product
  }

  /**
   * Update field stok
   */
  function updateStock(productId, newStock) {
    const numericId = Number(productId)
    const product = products.value.find((p) => p.id === numericId)
    if (product) {
      product.stock = Math.max(0, Number(newStock))
      showNotification(`Stok "${product.name}" diperbarui: ${product.stock} unit.`, 'info')
    }
  }

  /**
   * 3. Delete: Pemusnahan data produk secara permanen
   */
  function deleteProduct(productId) {
    const numericId = Number(productId)
    const index = products.value.findIndex((p) => p.id === numericId)
    if (index !== -1) {
      const removed = products.value.splice(index, 1)[0]
      showNotification(
        `Produk "${removed.name}" telah dihapus permanen dari sistem.`,
        'danger',
      )
      return removed
    }
    return null
  }

  /**
   * Helper: Cari produk berdasarkan ID
   */
  function getProductById(productId) {
    const numericId = Number(productId)
    return products.value.find((p) => p.id === numericId)
  }

  /**
   * Reset ke data default awal
   */
  function resetToDefault() {
    products.value = initialProducts.map((p) => ({ ...p, status: 'active' }))
    showNotification('Katalog produk direset kembali ke data default.', 'info')
  }

  /**
   * Kosongkan semua data (untuk demonstrasi Friendly Empty State)
   */
  function clearAllProducts() {
    products.value = []
    showNotification('Seluruh data produk dikosongkan untuk pengujian Empty State.', 'warning')
  }

  return {
    // Shared State
    products,
    categories: productCategories,

    // Derived States (Computed)
    totalProducts,
    activeProducts,
    inactiveProducts,
    totalActiveProducts,
    totalInactiveProducts,

    // State Mutations
    addProduct,
    toggleProductStatus,
    updateStock,
    deleteProduct,
    getProductById,
    resetToDefault,
    clearAllProducts,

    // Feedback Notifications
    notificationMessage,
    notificationType,
    isNotificationVisible,
    showNotification,
  }
}
