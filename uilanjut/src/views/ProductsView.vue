<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { products, categories } from '@/data/products'
import ProductCard from '@/components/ProductCard.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import EmptyState from '@/components/EmptyState.vue'

const route = useRoute()
const router = useRouter()

const searchQuery = ref('')
const selectedCategory = ref('all')
const sortBy = ref('default')

// Initialize from route query if present
onMounted(() => {
  if (route.query.category) {
    selectedCategory.value = route.query.category
  }
  if (route.query.q) {
    searchQuery.value = route.query.q
  }
})

// Keep in sync with route query changes
watch(
  () => route.query,
  (newQuery) => {
    if (newQuery.category) {
      selectedCategory.value = newQuery.category
    } else {
      selectedCategory.value = 'all'
    }
    if (newQuery.q !== undefined) {
      searchQuery.value = newQuery.q
    }
  }
)

function setCategory(categoryId) {
  selectedCategory.value = categoryId
  router.push({
    path: '/products',
    query: {
      ...route.query,
      category: categoryId !== 'all' ? categoryId : undefined,
    },
  })
}

function clearFilters() {
  searchQuery.value = ''
  selectedCategory.value = 'all'
  sortBy.value = 'default'
  router.push({ path: '/products' })
}

// Filtered and sorted products
const filteredProducts = computed(() => {
  let result = [...products]

  // Filter by category
  if (selectedCategory.value && selectedCategory.value !== 'all') {
    result = result.filter(
      (p) => p.category.toLowerCase() === selectedCategory.value.toLowerCase()
    )
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    )
  }

  // Sorting
  if (sortBy.value === 'price-low') {
    result.sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'price-high') {
    result.sort((a, b) => b.price - a.price)
  } else if (sortBy.value === 'rating') {
    result.sort((a, b) => b.rating - a.rating)
  } else if (sortBy.value === 'popular') {
    result.sort((a, b) => b.reviewsCount - a.reviewsCount)
  }

  return result
})

const breadcrumbItems = computed(() => {
  const items = [
    { label: 'Beranda', to: '/' },
    { label: 'Produk', to: '/products' },
  ]
  if (selectedCategory.value !== 'all') {
    items.push({ label: selectedCategory.value })
  }
  return items
})
</script>

<template>
  <div class="products-view section">
    <div class="container">
      <!-- Breadcrumbs -->
      <Breadcrumbs :items="breadcrumbItems" />

      <!-- Page Header -->
      <div class="catalog-header">
        <div>
          <h1 class="catalog-title">Daftar Produk</h1>
          <p class="catalog-subtitle">
            Jelajahi seluruh koleksi produk berkualitas SHOPNEST dengan garansi resmi dan pengiriman aman.
          </p>
        </div>
        <div class="results-count-badge">
          <span>{{ filteredProducts.length }} Produk Ditemukan</span>
        </div>
      </div>

      <!-- Filter and Search Controls Bar -->
      <div class="controls-card card">
        <div class="controls-grid">
          <!-- Search Input -->
          <div class="search-input-wrap">
            <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Cari nama produk, spesifikasi, atau kategori..." 
              class="search-input"
            />
            <button 
              v-if="searchQuery" 
              type="button" 
              class="clear-search-btn" 
              @click="searchQuery = ''"
              aria-label="Hapus kata kunci pencarian"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="clear-icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Sort Select -->
          <div class="sort-wrap">
            <label for="sort-select" class="sort-label">Urutkan:</label>
            <select id="sort-select" v-model="sortBy" class="sort-select">
              <option value="default">Rekomendasi</option>
              <option value="price-low">Harga: Termurah</option>
              <option value="price-high">Harga: Termahal</option>
              <option value="rating">Rating Tertinggi</option>
              <option value="popular">Paling Populer</option>
            </select>
          </div>
        </div>

        <!-- Category Filter Pills -->
        <div class="category-pills-row">
          <span class="category-label">Kategori:</span>
          <div class="category-pills">
            <button 
              v-for="cat in categories" 
              :key="cat.id" 
              type="button"
              class="cat-pill" 
              :class="{ 'active': selectedCategory === cat.id || (cat.id === 'all' && selectedCategory === 'all') }"
              @click="setCategory(cat.id)"
            >
              {{ cat.name }}
            </button>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div v-if="filteredProducts.length > 0" class="products-grid">
        <ProductCard 
          v-for="product in filteredProducts" 
          :key="product.id" 
          :product="product" 
        />
      </div>

      <!-- Empty State If No Results Found -->
      <div v-else class="empty-results-container">
        <EmptyState 
          title="Produk Tidak Ditemukan" 
          message="Maaf, tidak ada produk yang cocok dengan pencarian atau filter yang Anda pilih. Coba gunakan kata kunci lain." 
          icon="search"
          action-text="Reset Semua Filter"
          @click="clearFilters"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.products-view {
  padding-top: 2rem;
  padding-bottom: 4rem;
}

.catalog-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .catalog-header {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}

.catalog-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-text);
  letter-spacing: -0.02em;
}

.catalog-subtitle {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  margin-top: 0.35rem;
  max-width: 600px;
}

.results-count-badge {
  background-color: var(--color-primary-light);
  color: var(--color-primary);
  font-weight: 700;
  font-size: 0.85rem;
  padding: 0.45rem 1rem;
  border-radius: var(--radius-full);
  align-self: flex-start;
}

@media (min-width: 768px) {
  .results-count-badge {
    align-self: flex-end;
  }
}

/* Controls Card */
.controls-card {
  padding: 1.5rem;
  margin-bottom: 2.5rem;
  background-color: #ffffff;
}

.controls-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

@media (min-width: 768px) {
  .controls-grid {
    grid-template-columns: 1fr auto;
    align-items: center;
  }
}

.search-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 14px;
  width: 20px;
  height: 20px;
  color: var(--color-text-muted);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.8rem 2.8rem 0.8rem 2.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
  font-size: 0.95rem;
  color: var(--color-text);
  outline: none;
  transition: all var(--transition-fast);
}

.search-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

.clear-search-btn {
  position: absolute;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
  padding: 4px;
}

.clear-search-btn:hover {
  color: var(--color-text);
}

.clear-icon {
  width: 16px;
  height: 16px;
}

.sort-wrap {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.sort-label {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  white-space: nowrap;
}

.sort-select {
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
  color: var(--color-text);
  font-size: 0.9rem;
  font-weight: 600;
  outline: none;
  cursor: pointer;
}

.sort-select:focus {
  border-color: var(--color-primary);
}

/* Category Pills */
.category-pills-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding-top: 1.25rem;
  border-top: 1px solid var(--color-border-light);
}

.category-label {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--color-text-secondary);
}

.category-pills {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.cat-pill {
  padding: 0.45rem 1rem;
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  background-color: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  transition: all var(--transition-fast);
  cursor: pointer;
}

.cat-pill:hover {
  background-color: var(--color-primary-light);
  color: var(--color-primary);
  border-color: rgba(37, 99, 235, 0.3);
}

.cat-pill.active {
  background-color: var(--color-primary);
  color: #ffffff;
  border-color: var(--color-primary);
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.empty-results-container {
  max-width: 600px;
  margin: 2rem auto;
}
</style>
