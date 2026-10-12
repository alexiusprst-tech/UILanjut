<script setup>
const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    default: 'all',
  },
})

defineEmits(['update:modelValue'])

function getCatId(cat) {
  if (typeof cat === 'object' && cat !== null) {
    return cat.id
  }
  return cat
}

function getCatName(cat) {
  if (typeof cat === 'object' && cat !== null) {
    return cat.name
  }
  return cat
}

function isSelected(cat) {
  const id = getCatId(cat)
  if (props.modelValue.toLowerCase() === 'all' && (id === 'all' || id === 'All')) {
    return true
  }
  return props.modelValue.toLowerCase() === String(id).toLowerCase()
}
</script>

<template>
  <div class="category-filter">
    <button
      v-for="cat in categories"
      :key="getCatId(cat)"
      type="button"
      :class="['filter-btn', { active: isSelected(cat) }]"
      @click="$emit('update:modelValue', getCatId(cat))"
    >
      {{ getCatName(cat) }}
    </button>
  </div>
</template>

<style scoped>
.category-filter {
  display: flex;
  gap: var(--space-2, 8px);
  flex-wrap: wrap;
  margin-bottom: var(--space-6, 24px);
  align-items: center;
}

.filter-btn {
  background: var(--bg-light, #fdfdfd);
  border: 1px solid var(--border-color, var(--color-border, #e4e4e7));
  padding: var(--space-2, 8px) var(--space-4, 16px);
  border-radius: 50px;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-muted, var(--color-text-secondary, #64748b));
  transition: all 0.2s ease;
  user-select: none;
}

.filter-btn:hover {
  border-color: var(--primary, var(--color-primary, #6644ff));
  color: var(--primary, var(--color-primary, #6644ff));
  transform: translateY(-1px);
}

.filter-btn.active {
  background: var(--primary, var(--color-primary, #6644ff));
  color: #ffffff;
  border-color: var(--primary, var(--color-primary, #6644ff));
  box-shadow: 0 4px 12px rgba(102, 68, 255, 0.25);
  font-weight: 600;
}
</style>
