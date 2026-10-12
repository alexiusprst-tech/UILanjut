<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { products, categories } from '@/data/products'
import ProductCard from '@/components/ProductCard.vue'
import SearchBar from '@/components/product/SearchBar.vue'
import CategoryFilter from '@/components/product/CategoryFilter.vue'
import AppCard from '@/components/ui/AppCard.vue'
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
  },
)

function onCategoryChange(categoryId) {
  selectedCategory.value = categoryId
  router.push({
    path: '/products',
    query: {
      ...route.query,
      category: categoryId !== 'all' ? categoryId : undefined,
    },
  })
}

function handleViewDetail(productId) {
  router.push(`/products/${productId}`)
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
      (p) => p.category.toLowerCase() === selectedCategory.value.toLowerCase(),
    )
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
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
            Jelajahi seluruh koleksi produk berkualitas SHOPNEST dengan garansi resmi dan pengiriman
            aman.
          </p>
        </div>
        <div class="results-count-badge">
          <span>{{ filteredProducts.length }} Produk Ditemukan</span>
        </div>
      </div>

      <!-- ===================================================================
           MODUL 3: ORKESTRASI UTAMA DENGAN SEARCHBAR & CATEGORYFILTER
           =================================================================== -->
      <AppCard :hoverable="false" class="controls-card">
        <div class="controls-grid">
          <!-- Modular SearchBar Component with v-model -->
          <SearchBar
            v-model="searchQuery"
            placeholder="Cari nama produk, spesifikasi, atau kategori..."
          />

          <!-- Sort Selector -->
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

        <!-- Modular CategoryFilter Component with v-model & events -->
        <div class="category-filter-row">
          <span class="category-label">Kategori:</span>
          <CategoryFilter
            :categories="categories"
            :model-value="selectedCategory"
            @update:model-value="onCategoryChange"
          />
        </div>
      </AppCard>

      <!-- ===================================================================
           ADAPTIVE PRODUCTS GRID (v-for ProductCard)
           =================================================================== -->
      <div v-if="filteredProducts.length > 0" class="products-grid">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @view-detail="handleViewDetail"
        />
      </div>

      <!-- ===================================================================
           MODUL 3 UX: PENANGANAN KONDISI EKSEPSI (EMPTY STATE)
           =================================================================== -->
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
  color: var(--color-text, #1c1948);
  letter-spacing: -0.02em;
}

.catalog-subtitle {
  font-size: 0.95rem;
  color: var(--color-text-secondary, #64748b);
  margin-top: 0.35rem;
  max-width: 600px;
}

.results-count-badge {
  background-color: var(--color-primary-light, rgba(102, 68, 255, 0.1));
  color: var(--color-primary, #6644ff);
  font-weight: 700;
  font-size: 0.85rem;
  padding: 0.45rem 1rem;
  border-radius: var(--radius-full, 9999px);
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
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .controls-grid {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
}

.sort-wrap {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 0.1rem;
}

.sort-label {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-text-secondary, #64748b);
  white-space: nowrap;
}

.sort-select {
  padding: 0.7rem 1.2rem;
  border: 1px solid var(--border-color, #e4e4e7);
  border-radius: 8px;
  background-color: #ffffff;
  color: var(--color-text, #1c1948);
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.sort-select:focus {
  border-color: var(--primary, #6644ff);
}

.category-filter-row {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color, #e4e4e7);
}

.category-label {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--color-text-secondary, #64748b);
  margin-top: 0.45rem;
}

/* ==========================================================================
   ADAPTIVE GRID (auto-fill)
   ========================================================================== */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-6, 24px);
}

.empty-results-container {
  max-width: 600px;
  margin: 2rem auto;
}
</style>
