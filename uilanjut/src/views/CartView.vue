<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { formatRupiah } from '@/data/products'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import EmptyState from '@/components/EmptyState.vue'

const cartStore = useCartStore()
const router = useRouter()

const inputVoucher = ref('')
const isCheckoutSuccess = ref(false)
const checkoutInvoice = ref('')
const checkoutDate = ref('')

const breadcrumbItems = [
  { label: 'Beranda', to: '/' },
  { label: 'Keranjang Belanja' },
]

function handleApplyVoucher() {
  const success = cartStore.applyVoucher(inputVoucher.value)
  if (success) {
    inputVoucher.value = ''
  }
}

function handleCheckout() {
  // Generate mock invoice number and date
  const randomId = Math.floor(10000 + Math.random() * 90000)
  const now = new Date()
  checkoutInvoice.value = `INV/${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}/SN/${randomId}`
  checkoutDate.value = now.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
  isCheckoutSuccess.value = true
}

function finishCheckout() {
  cartStore.clearCart()
  isCheckoutSuccess.value = false
  router.push('/products')
}

function goToProfile() {
  cartStore.clearCart()
  isCheckoutSuccess.value = false
  router.push('/profile')
}
</script>

<template>
  <div class="cart-view section">
    <div class="container">
      <!-- Breadcrumbs -->
      <Breadcrumbs :items="breadcrumbItems" />

      <!-- Page Title -->
      <div class="cart-header">
        <h1 class="cart-title">Keranjang Belanja</h1>
        <span v-if="cartStore.items.length > 0" class="cart-count-pill">
          {{ cartStore.totalItems }} Item
        </span>
      </div>

      <!-- State 1: Cart has items -->
      <div v-if="cartStore.items.length > 0" class="cart-layout">
        <!-- Left: Items Table / List -->
        <div class="cart-items-column">
          <div class="cart-items-card card">
            <div class="items-table-header">
              <span class="col-prod">Produk</span>
              <span class="col-price">Harga Satuan</span>
              <span class="col-qty">Jumlah</span>
              <span class="col-sub">Subtotal</span>
              <span class="col-act">Aksi</span>
            </div>

            <div class="items-list">
              <div 
                v-for="item in cartStore.items" 
                :key="item.product.id" 
                class="cart-item-row"
              >
                <!-- Product Info -->
                <div class="item-product-info">
                  <RouterLink :to="`/products/${item.product.id}`" class="item-thumb-link">
                    <img :src="item.product.image" :alt="item.product.name" class="item-thumb" />
                  </RouterLink>
                  <div class="item-details">
                    <span class="item-category">{{ item.product.category }}</span>
                    <RouterLink :to="`/products/${item.product.id}`" class="item-name">
                      {{ item.product.name }}
                    </RouterLink>
                    <span class="item-mobile-price">
                      {{ formatRupiah(item.product.price) }} / unit
                    </span>
                  </div>
                </div>

                <!-- Unit Price (Desktop) -->
                <div class="item-unit-price">
                  {{ formatRupiah(item.product.price) }}
                </div>

                <!-- Quantity Controls -->
                <div class="item-quantity-control">
                  <div class="qty-stepper">
                    <button 
                      type="button" 
                      class="stepper-btn" 
                      @click="cartStore.decrementQuantity(item.product.id)"
                      aria-label="Kurangi jumlah"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="stepper-icon">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                      </svg>
                    </button>
                    <span class="stepper-value">{{ item.quantity }}</span>
                    <button 
                      type="button" 
                      class="stepper-btn" 
                      :disabled="item.quantity >= item.product.stock"
                      @click="cartStore.incrementQuantity(item.product.id)"
                      aria-label="Tambah jumlah"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="stepper-icon">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Subtotal -->
                <div class="item-subtotal">
                  {{ formatRupiah(item.product.price * item.quantity) }}
                </div>

                <!-- Delete Action -->
                <div class="item-delete-col">
                  <button 
                    type="button" 
                    class="btn-delete-item" 
                    @click="cartStore.removeFromCart(item.product.id)"
                    title="Hapus produk"
                    aria-label="Hapus produk"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="delete-icon">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Footer Actions -->
            <div class="cart-items-footer">
              <RouterLink to="/products" class="btn btn-secondary btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="btn-icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                <span>Lanjut Belanja Produk Lain</span>
              </RouterLink>

              <button type="button" class="btn-clear-all" @click="cartStore.clearCart">
                Kosongkan Keranjang
              </button>
            </div>
          </div>
        </div>

        <!-- Right: Order Summary Card -->
        <div class="cart-summary-column">
          <div class="summary-card card">
            <h2 class="summary-title">Ringkasan Belanja</h2>

            <!-- Promo Voucher Form -->
            <div class="voucher-box">
              <label for="voucher-input" class="voucher-label">Kode Promo / Voucher</label>
              <div v-if="!cartStore.voucherCode" class="voucher-input-group">
                <input 
                  id="voucher-input"
                  v-model="inputVoucher" 
                  type="text" 
                  placeholder="Contoh: SHOPHEMAT" 
                  class="voucher-input"
                  @keyup.enter="handleApplyVoucher"
                />
                <button type="button" class="btn btn-primary btn-sm" @click="handleApplyVoucher">
                  Gunakan
                </button>
              </div>
              <div v-else class="voucher-active-tag">
                <div class="voucher-active-info">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="voucher-check-icon">
                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.74-5.25Z" clip-rule="evenodd" />
                  </svg>
                  <span>Kupon: <strong>{{ cartStore.voucherCode }}</strong></span>
                </div>
                <button type="button" class="voucher-remove-btn" @click="cartStore.removeVoucher">
                  Hapus
                </button>
              </div>
              <p v-if="cartStore.voucherError" class="voucher-error-text">{{ cartStore.voucherError }}</p>
              <p class="voucher-hint">Gunakan kode <code>SHOPHEMAT</code> untuk diskon 10%</p>
            </div>

            <!-- Price Calculations -->
            <div class="calc-rows">
              <div class="calc-row">
                <span class="calc-label">Total Harga ({{ cartStore.totalItems }} Barang)</span>
                <span class="calc-value">{{ formatRupiah(cartStore.subtotal) }}</span>
              </div>

              <div v-if="cartStore.discountAmount > 0" class="calc-row discount-row">
                <span class="calc-label">Potongan Diskon</span>
                <span class="calc-value">-{{ formatRupiah(cartStore.discountAmount) }}</span>
              </div>

              <div class="calc-row">
                <span class="calc-label">Ongkos Kirim</span>
                <span v-if="cartStore.shippingFee === 0" class="calc-value free-shipping">
                  GRATIS
                </span>
                <span v-else class="calc-value">
                  {{ formatRupiah(cartStore.shippingFee) }}
                </span>
              </div>

              <div class="calc-divider"></div>

              <div class="calc-row total-row">
                <span class="total-label">Total Pembayaran</span>
                <span class="total-value">{{ formatRupiah(cartStore.totalPrice) }}</span>
              </div>
            </div>

            <!-- Checkout Button -->
            <button 
              type="button" 
              class="btn btn-primary btn-lg btn-full btn-checkout" 
              @click="handleCheckout"
            >
              <span>Proses Checkout</span>
              <svg class="btn-arrow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>

            <!-- Security Assurance -->
            <div class="checkout-safety">
              <svg class="safety-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
              <span>Jaminan Transaksi Aman &amp; Terpercaya</span>
            </div>
          </div>
        </div>
      </div>

      <!-- State 2: Cart is Empty -->
      <div v-else class="empty-cart-container">
        <EmptyState 
          title="Keranjang kamu masih kosong." 
          message="Belum ada produk yang ditambahkan ke keranjang belanja Anda. Jelajahi katalog kami dan temukan berbagai produk menarik sekarang." 
          icon="cart"
          action-text="Mulai Belanja Sekarang"
          action-to="/products"
        />
      </div>

      <!-- Checkout Success Modal -->
      <teleport to="body">
        <div v-if="isCheckoutSuccess" class="modal-overlay">
          <div class="modal-card card animate-fade-in">
            <div class="modal-header-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="success-check-svg">
                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.74-5.25Z" clip-rule="evenodd" />
              </svg>
            </div>

            <h3 class="modal-title">Pesanan Berhasil Dibuat!</h3>
            <p class="modal-desc">
              Terima kasih telah berbelanja di SHOPNEST. Pesanan Anda telah diterima dan segera diproses.
            </p>

            <!-- Order Receipt Box -->
            <div class="receipt-box">
              <div class="receipt-row">
                <span>Nomor Invoice:</span>
                <strong>{{ checkoutInvoice }}</strong>
              </div>
              <div class="receipt-row">
                <span>Waktu Transaksi:</span>
                <span>{{ checkoutDate }}</span>
              </div>
              <div class="receipt-row">
                <span>Total Pembayaran:</span>
                <strong class="receipt-price">{{ formatRupiah(cartStore.totalPrice) }}</strong>
              </div>
              <div class="receipt-row">
                <span>Status Pesanan:</span>
                <span class="status-badge-diproses">Diproses</span>
              </div>
            </div>

            <div class="modal-actions">
              <button type="button" class="btn btn-primary btn-full" @click="finishCheckout">
                Belanja Lagi
              </button>
              <button type="button" class="btn btn-secondary btn-full" @click="goToProfile">
                Lihat di Profil Pengguna
              </button>
            </div>
          </div>
        </div>
      </teleport>
    </div>
  </div>
</template>

<style scoped>
.cart-view {
  padding-top: 2rem;
  padding-bottom: 4rem;
}

.cart-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.cart-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-text);
  letter-spacing: -0.02em;
}

.cart-count-pill {
  background-color: var(--color-primary-light);
  color: var(--color-primary);
  font-weight: 700;
  font-size: 0.85rem;
  padding: 0.35rem 0.85rem;
  border-radius: var(--radius-full);
}

/* Layout */
.cart-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: flex-start;
}

@media (min-width: 1024px) {
  .cart-layout {
    grid-template-columns: 1.8fr 1.2fr;
  }
}

/* Items Column */
.cart-items-card {
  padding: 1.5rem;
  background-color: #ffffff;
}

.items-table-header {
  display: none;
  grid-template-columns: 3fr 1.5fr 1.5fr 1.5fr 0.5fr;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

@media (min-width: 768px) {
  .items-table-header {
    display: grid;
  }
}

.items-list {
  display: flex;
  flex-direction: column;
}

.cart-item-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1.25rem 0;
  border-bottom: 1px solid var(--color-border-light);
  align-items: center;
}

@media (min-width: 768px) {
  .cart-item-row {
    grid-template-columns: 3fr 1.5fr 1.5fr 1.5fr 0.5fr;
  }
}

/* Product info */
.item-product-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.item-thumb-link {
  width: 70px;
  height: 70px;
  border-radius: var(--radius-md);
  overflow: hidden;
  background-color: #f1f5f9;
  border: 1px solid var(--color-border);
  flex-shrink: 0;
}

.item-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  display: flex;
  flex-direction: column;
}

.item-category {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-primary);
  text-transform: uppercase;
}

.item-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.35;
  transition: color var(--transition-fast);
}

.item-name:hover {
  color: var(--color-primary);
}

.item-mobile-price {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  margin-top: 0.2rem;
}

@media (min-width: 768px) {
  .item-mobile-price {
    display: none;
  }
}

/* Unit Price */
.item-unit-price {
  display: none;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text);
}

@media (min-width: 768px) {
  .item-unit-price {
    display: block;
  }
}

/* Stepper */
.item-quantity-control {
  display: flex;
  align-items: center;
}

.qty-stepper {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  background-color: #ffffff;
}

.stepper-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-surface-alt);
  color: var(--color-text);
  transition: background-color var(--transition-fast);
}

.stepper-btn:hover:not(:disabled) {
  background-color: var(--color-border);
}

.stepper-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.stepper-icon {
  width: 14px;
  height: 14px;
}

.stepper-value {
  width: 36px;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-text);
}

/* Subtotal */
.item-subtotal {
  font-size: 1rem;
  font-weight: 800;
  color: var(--color-primary);
}

/* Delete */
.item-delete-col {
  display: flex;
  justify-content: flex-end;
}

.btn-delete-item {
  color: var(--color-text-muted);
  padding: 6px;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.btn-delete-item:hover {
  color: var(--color-danger);
  background-color: var(--color-danger-bg);
}

.delete-icon {
  width: 18px;
  height: 18px;
}

/* Card footer */
.cart-items-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding-top: 1.5rem;
}

.btn-icon {
  width: 16px;
  height: 16px;
}

.btn-clear-all {
  color: var(--color-text-secondary);
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
}

.btn-clear-all:hover {
  color: var(--color-danger);
}

/* Summary Column */
.summary-card {
  padding: 1.75rem;
  background-color: #ffffff;
  position: sticky;
  top: 96px;
}

.summary-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-border);
}

/* Voucher */
.voucher-box {
  margin-bottom: 1.5rem;
}

.voucher-label {
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.4rem;
}

.voucher-input-group {
  display: flex;
  gap: 0.5rem;
}

.voucher-input {
  flex: 1;
  padding: 0.6rem 0.85rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 0.88rem;
  text-transform: uppercase;
  outline: none;
}

.voucher-input:focus {
  border-color: var(--color-primary);
}

.voucher-active-tag {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 0.85rem;
  background-color: var(--color-success-bg);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: var(--radius-md);
  color: #065f46;
  font-size: 0.85rem;
}

.voucher-active-info {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.voucher-check-icon {
  width: 18px;
  height: 18px;
  color: var(--color-success);
}

.voucher-remove-btn {
  color: #991b1b;
  font-weight: 700;
  font-size: 0.8rem;
}

.voucher-error-text {
  font-size: 0.78rem;
  color: var(--color-danger);
  margin-top: 0.35rem;
}

.voucher-hint {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  margin-top: 0.35rem;
}

.voucher-hint code {
  background-color: var(--color-surface-alt);
  padding: 0.15rem 0.4rem;
  border-radius: var(--radius-xs);
  color: var(--color-primary);
  font-weight: 700;
}

/* Calculation rows */
.calc-rows {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin-bottom: 1.5rem;
}

.calc-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.92rem;
  color: var(--color-text-secondary);
}

.calc-value {
  font-weight: 600;
  color: var(--color-text);
}

.discount-row {
  color: var(--color-success);
}

.discount-row .calc-value {
  color: var(--color-success);
}

.free-shipping {
  color: var(--color-success);
  font-weight: 700;
}

.calc-divider {
  height: 1px;
  background-color: var(--color-border);
  margin: 0.5rem 0;
}

.total-row {
  font-size: 1.15rem;
  color: var(--color-text);
  font-weight: 800;
}

.total-value {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--color-primary);
}

.btn-checkout {
  margin-bottom: 1rem;
}

.btn-arrow {
  width: 18px;
  height: 18px;
}

.checkout-safety {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.safety-icon {
  width: 16px;
  height: 16px;
  color: var(--color-success);
}

/* Empty State Container */
.empty-cart-container {
  max-width: 600px;
  margin: 2rem auto;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 110;
  background-color: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.modal-card {
  max-width: 480px;
  width: 100%;
  background-color: #ffffff;
  padding: 2.5rem 2rem;
  text-align: center;
  box-shadow: var(--shadow-xl);
}

.modal-header-icon {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-full);
  background-color: var(--color-success-bg);
  color: var(--color-success);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.25rem auto;
}

.success-check-svg {
  width: 36px;
  height: 36px;
}

.modal-title {
  font-size: 1.45rem;
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.modal-desc {
  font-size: 0.92rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.receipt-box {
  background-color: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1.25rem;
  margin-bottom: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  text-align: left;
  font-size: 0.88rem;
}

.receipt-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-text-secondary);
}

.receipt-price {
  color: var(--color-primary);
  font-size: 1.05rem;
}

.status-badge-diproses {
  background-color: #fef3c7;
  color: #92400e;
  font-weight: 700;
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-full);
}

.modal-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
</style>
