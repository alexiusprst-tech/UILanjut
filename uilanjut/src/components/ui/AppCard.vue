<script setup>
defineProps({
  hoverable: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <div :class="['app-card', { 'card-hoverable': hoverable }]">
    <slot />
  </div>
</template>

<style scoped>
.app-card {
  background: #ffffff;
  border-radius: var(--space-4, var(--radius-lg, 16px));
  border: 1px solid var(--border-color, var(--color-border, #e4e4e7));
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  overflow: hidden;
}

.card-hoverable:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.06);
  border-color: rgba(102, 68, 255, 0.2);
}
</style>
