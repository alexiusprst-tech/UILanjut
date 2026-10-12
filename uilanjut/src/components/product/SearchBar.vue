<script setup>
defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Cari nama produk, spesifikasi, atau kategori...',
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="search-bar">
    <div class="search-input-wrap">
      <svg
        class="search-icon"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
      <input
        type="text"
        :value="modelValue"
        :placeholder="placeholder"
        class="search-input"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <button
        v-if="modelValue"
        type="button"
        class="clear-search-btn"
        aria-label="Hapus kata kunci pencarian"
        @click="$emit('update:modelValue', '')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="clear-icon"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  width: 100%;
  max-width: 500px;
  margin-bottom: var(--space-4, 16px);
}

.search-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 1rem;
  width: 1.15rem;
  height: 1.15rem;
  color: var(--color-text-muted, #94a3b8);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: var(--space-3, 12px) var(--space-4, 16px);
  padding-left: 2.85rem;
  padding-right: 2.5rem;
  border: 1px solid var(--border-color, var(--color-border, #e4e4e7));
  border-radius: 10px;
  font-family: inherit;
  font-size: 0.95rem;
  background-color: #ffffff;
  color: var(--color-text, #1c1948);
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.search-input:focus {
  border-color: var(--primary, var(--color-primary, #6644ff));
  box-shadow: 0 0 0 3px rgba(102, 68, 255, 0.12);
}

.clear-search-btn {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  color: var(--color-text-muted, #94a3b8);
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: color 0.15s ease, background-color 0.15s ease;
}

.clear-search-btn:hover {
  color: var(--color-text, #1c1948);
  background-color: #f1f5f9;
}

.clear-icon {
  width: 1.1rem;
  height: 1.1rem;
}
</style>
