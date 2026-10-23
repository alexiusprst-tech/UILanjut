import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useProducts } from '@/composables/useProducts'

export const useStoreAdmin = defineStore('storeAdmin', () => {
  const {
    products: productList,
    addProduct,
    updateStock,
    deleteProduct,
    toggleProductStatus,
    resetToDefault,
    clearAllProducts,
  } = useProducts()

  // 1. Profil & Pengaturan Toko
  const storeInfo = ref({
    name: 'SHOPNEST Official Store',
    tagline: 'Penyedia Produk Gadget & Fashion Terpercaya',
    owner: 'Admin Toko SHOPNEST',
    email: 'merchant@shopnest.id',
    phone: '+62 821-9988-7766',
    address: 'Gudang Utama SHOPNEST, Jl. Telekomunikasi No. 1, Bandung Tech Park, Jawa Barat',
    status: 'Buka',
    rating: 4.9,
    followers: 12480,
    shippingPartners: ['JNE Express', 'SiCepat Halu', 'GoSend Instant', 'J&T Cargo'],
  })

  // 2. Data Pesanan Masuk Toko
  const orderList = ref([
    {
      id: 'ORD-2026-9011',
      customerName: 'Budi Santoso',
      customerPhone: '0812-3456-7890',
      date: '11 Okt 2026, 14:20',
      items: [
        { name: 'Laptop ASUS ROG Zephyrus G14', qty: 1, price: 23499000 },
        { name: 'Wireless Mouse Logitech MX Master 3S', qty: 1, price: 1450000 },
      ],
      total: 24949000,
      paymentMethod: 'BCA Virtual Account',
      status: 'Perlu Dikirim', // 'Perlu Dikirim' | 'Sedang Dikirim' | 'Selesai' | 'Dibatalkan'
      address: 'Jl. Surya Kencana No. 45, Bogor Tengah, Jawa Barat',
    },
    {
      id: 'ORD-2026-9012',
      customerName: 'Siti Rahmawati',
      customerPhone: '0857-1122-3344',
      date: '11 Okt 2026, 11:05',
      items: [
        { name: 'Jam Tangan Pintar Smartwatch Galaxy Fit', qty: 2, price: 899000 },
      ],
      total: 1798000,
      paymentMethod: 'GoPay / QRIS',
      status: 'Sedang Dikirim',
      address: 'Jl. Dipati Ukur No. 88, Coblong, Kota Bandung',
    },
    {
      id: 'ORD-2026-9013',
      customerName: 'Alexander Pratama',
      customerPhone: '0878-9900-1122',
      date: '10 Okt 2026, 19:40',
      items: [
        { name: 'Jaket Hoodie Streetwear Oversized', qty: 1, price: 349000 },
      ],
      total: 349000,
      paymentMethod: 'ShopeePay',
      status: 'Selesai',
      address: 'Jl. Boulevard Raya Blok Q, Kelapa Gading, Jakarta Utara',
    },
    {
      id: 'ORD-2026-9014',
      customerName: 'Maya Kusuma',
      customerPhone: '0813-5566-7788',
      date: '10 Okt 2026, 16:15',
      items: [
        { name: 'Diffuser Aromaterapi Ultrasonik Minimalis', qty: 2, price: 285000 },
      ],
      total: 570000,
      paymentMethod: 'Mandiri Livin',
      status: 'Selesai',
      address: 'Jl. Kaliurang KM 5.5, Depok, Sleman, D.I. Yogyakarta',
    },
  ])

  // Toast feedback
  const toastMessage = ref('')
  const toastType = ref('success') // 'success' | 'info' | 'warning'
  const isToastVisible = ref(false)

  function showNotification(msg, type = 'success') {
    toastMessage.value = msg
    toastType.value = type
    isToastVisible.value = true
    setTimeout(() => {
      isToastVisible.value = false
    }, 3200)
  }

  // Computed Statistik Ringkasan
  const totalOmzet = computed(() => {
    return orderList.value
      .filter((o) => o.status !== 'Dibatalkan')
      .reduce((sum, o) => sum + o.total, 0)
  })

  const pendingOrdersCount = computed(() => {
    return orderList.value.filter((o) => o.status === 'Perlu Dikirim').length
  })

  const lowStockCount = computed(() => {
    return productList.value.filter((p) => p.stock <= 10).length
  })

  // Aksi Pesanan
  function updateOrderStatus(orderId, newStatus) {
    const order = orderList.value.find((o) => o.id === orderId)
    if (order) {
      order.status = newStatus
      showNotification(`Status pesanan ${order.id} diperbarui: ${newStatus}`, 'success')
    }
  }

  // Aksi Pengaturan Toko
  function saveStoreSettings(updatedInfo) {
    storeInfo.value = { ...storeInfo.value, ...updatedInfo }
    showNotification('Informasi dan pengaturan toko berhasil disimpan!', 'success')
  }

  return {
    storeInfo,
    productList,
    orderList,
    totalOmzet,
    pendingOrdersCount,
    lowStockCount,
    toastMessage,
    toastType,
    isToastVisible,
    showNotification,
    addProduct,
    updateStock,
    deleteProduct,
    toggleProductStatus,
    resetToDefault,
    clearAllProducts,
    updateOrderStatus,
    saveStoreSettings,
  }
})
