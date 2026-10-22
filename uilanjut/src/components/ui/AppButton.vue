<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'md',
  },
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['click'])
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="['app-button', `btn-${variant}`, `btn-${size}`, { 'is-disabled': disabled }]"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<style scoped>
.app-button {
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  padding: var(--space-3, 12px) var(--space-8, 32px);
  border-radius: 12px;
  border: 1px solid transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-align: center;
  transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  line-height: 1.5;
}

.app-button:hover:not(:disabled) {
  transform: translateY(-2px);
}

.app-button:active:not(:disabled) {
  transform: translateY(0);
}

.btn-sm {
  padding: 0.4rem 0.85rem;
  font-size: 0.825rem;
  border-radius: 8px;
}

.btn-md {
  padding: 0.6rem 1.25rem;
  font-size: 0.925rem;
  border-radius: 10px;
}

.btn-lg {
  padding: 0.75rem 1.6rem;
  font-size: 1rem;
  border-radius: 12px;
}

.btn-primary {
  background-color: var(--primary, var(--color-primary, #6644ff));
  color: #ffffff;
  box-shadow: 0 8px 20px rgba(102, 68, 255, 0.3);
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--primary-hover, var(--color-primary-dark, #5533ee));
  box-shadow: 0 10px 24px rgba(102, 68, 255, 0.4);
}

.btn-secondary {
  background-color: #f0f0f5;
  color: var(--text-main, var(--color-text, #1c1948));
}

.btn-secondary:hover:not(:disabled) {
  background-color: #e2e2ec;
}

.btn-outline {
  background-color: transparent;
  color: var(--primary, var(--color-primary, #6644ff));
  border-color: var(--primary, var(--color-primary, #6644ff));
}

.btn-outline:hover:not(:disabled) {
  background-color: rgba(102, 68, 255, 0.08);
}

.btn-danger {
  background-color: #ef4444;
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(239, 68, 68, 0.3);
}

.btn-danger:hover:not(:disabled) {
  background-color: #dc2626;
  box-shadow: 0 6px 18px rgba(239, 68, 68, 0.4);
}

.btn-danger-outline {
  background-color: transparent;
  color: #ef4444;
  border-color: #fca5a5;
}

.btn-danger-outline:hover:not(:disabled) {
  background-color: #fef2f2;
  border-color: #ef4444;
}

.btn-success {
  background-color: #10b981;
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);
}

.btn-success:hover:not(:disabled) {
  background-color: #059669;
  box-shadow: 0 6px 18px rgba(16, 185, 129, 0.4);
}

.btn-success-outline {
  background-color: transparent;
  color: #059669;
  border-color: #a7f3d0;
}

.btn-success-outline:hover:not(:disabled) {
  background-color: #ecfdf5;
  border-color: #059669;
}

.is-disabled,
.app-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}
</style>
