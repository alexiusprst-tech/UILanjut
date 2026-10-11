import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // Load initial cart from localStorage if available
  const savedCart = localStorage.getItem('shopnest_cart')
  const initialItems = savedCart ? JSON.parse(savedCart) : []

  const items = ref(initialItems)
  const voucherCode = ref('')
  const discountAmount = ref(0)
  const voucherError = ref('')
  const toast = ref({
    show: false,
    message: '',
    type: 'success',
  })

  let toastTimer = null

  // Watch items to persist to localStorage
  watch(
    items,
    (newItems) => {
      localStorage.setItem('shopnest_cart', JSON.stringify(newItems))
    },
    { deep: true },
  )

  // Computed values
  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const subtotal = computed(() => {
    return items.value.reduce((total, item) => total + item.product.price * item.quantity, 0)
  })

  const shippingFee = computed(() => {
    if (items.value.length === 0) return 0
    // Gratis Ongkir jika belanja di atas Rp 500.000
    return subtotal.value >= 500000 ? 0 : 25000
  })

  const totalPrice = computed(() => {
    if (items.value.length === 0) return 0
    const calculated = subtotal.value - discountAmount.value + shippingFee.value
    return Math.max(0, calculated)
  })

  // Show Toast Notification helper
  function showToast(message, type = 'success') {
    if (toastTimer) clearTimeout(toastTimer)
    toast.value = {
      show: true,
      message,
      type,
    }
    toastTimer = setTimeout(() => {
      toast.value.show = false
    }, 3000)
  }

  // Add product to cart
  function addToCart(product, quantity = 1) {
    const parsedQty = Math.max(1, parseInt(quantity, 10) || 1)
    const existingIndex = items.value.findIndex((item) => item.product.id === product.id)

    if (existingIndex > -1) {
      const currentQty = items.value[existingIndex].quantity
      const newQty = Math.min(product.stock || 99, currentQty + parsedQty)
      items.value[existingIndex].quantity = newQty
      showToast(`Jumlah "${product.name}" di keranjang diperbarui (${newQty})`)
    } else {
      const initialQty = Math.min(product.stock || 99, parsedQty)
      items.value.push({
        product: { ...product },
        quantity: initialQty,
      })
      showToast(`"${product.name}" berhasil ditambahkan ke keranjang!`)
    }
  }

  // Update quantity of an item
  function updateQuantity(productId, quantity) {
    const item = items.value.find((i) => i.product.id === productId)
    if (!item) return

    const newQty = parseInt(quantity, 10)
    if (newQty <= 0) {
      removeFromCart(productId)
    } else {
      const maxStock = item.product.stock || 99
      item.quantity = Math.min(maxStock, newQty)
    }
  }

  // Increment quantity
  function incrementQuantity(productId) {
    const item = items.value.find((i) => i.product.id === productId)
    if (!item) return
    const maxStock = item.product.stock || 99
    if (item.quantity < maxStock) {
      item.quantity++
    } else {
      showToast(`Stok maksimal produk tercapai (${maxStock} unit)`, 'warning')
    }
  }

  // Decrement quantity
  function decrementQuantity(productId) {
    const item = items.value.find((i) => i.product.id === productId)
    if (!item) return
    if (item.quantity > 1) {
      item.quantity--
    } else {
      removeFromCart(productId)
    }
  }

  // Remove single item from cart
  function removeFromCart(productId) {
    const index = items.value.findIndex((i) => i.product.id === productId)
    if (index > -1) {
      const removedName = items.value[index].product.name
      items.value.splice(index, 1)
      showToast(`"${removedName}" dihapus dari keranjang`, 'warning')
    }
  }

  // Clear all items
  function clearCart() {
    items.value = []
    voucherCode.value = ''
    discountAmount.value = 0
    voucherError.value = ''
    localStorage.removeItem('shopnest_cart')
  }

  // Apply promo voucher
  function applyVoucher(code) {
    voucherError.value = ''
    const cleanCode = (code || '').trim().toUpperCase()

    if (!cleanCode) {
      voucherError.value = 'Masukkan kode voucher terlebih dahulu.'
      return false
    }

    if (cleanCode === 'SHOPHEMAT' || cleanCode === 'DISKON10') {
      voucherCode.value = cleanCode
      discountAmount.value = Math.round(subtotal.value * 0.1) // 10% diskon
      showToast(`Voucher ${cleanCode} berhasil digunakan! Diskon 10%`)
      return true
    } else if (cleanCode === 'GRATISONGKIR') {
      voucherCode.value = cleanCode
      discountAmount.value = 25000
      showToast('Voucher GRATISONGKIR berhasil digunakan!')
      return true
    } else {
      voucherError.value = 'Kode voucher tidak valid atau sudah kedaluwarsa.'
      return false
    }
  }

  function removeVoucher() {
    voucherCode.value = ''
    discountAmount.value = 0
    voucherError.value = ''
    showToast('Voucher dihapus')
  }

  return {
    items,
    totalItems,
    subtotal,
    shippingFee,
    totalPrice,
    voucherCode,
    discountAmount,
    voucherError,
    toast,
    showToast,
    addToCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
    applyVoucher,
    removeVoucher,
  }
})
