<script setup>
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
</script>

<template>
  <teleport to="body">
    <transition name="toast-fade">
      <div
        v-if="cartStore.toast.show"
        class="toast-notification"
        :class="`toast-${cartStore.toast.type}`"
        role="alert"
      >
        <div class="toast-icon">
          <!-- Success Icon -->
          <svg
            v-if="cartStore.toast.type === 'success'"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="toast-svg"
          >
            <path
              fill-rule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.74-5.25Z"
              clip-rule="evenodd"
            />
          </svg>
          <!-- Warning Icon -->
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="toast-svg"
          >
            <path
              fill-rule="evenodd"
              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="toast-content">
          <p class="toast-message">{{ cartStore.toast.message }}</p>
        </div>
        <button
          type="button"
          class="toast-close"
          @click="cartStore.toast.show = false"
          aria-label="Tutup notifikasi"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="close-svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.toast-notification {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1.25rem;
  background-color: #ffffff;
  border-radius: var(--radius-md);
  box-shadow:
    0 10px 25px -5px rgba(15, 23, 42, 0.18),
    0 8px 10px -6px rgba(15, 23, 42, 0.1);
  border: 1px solid var(--color-border);
  max-width: 90vw;
  width: auto;
}

@media (min-width: 640px) {
  .toast-notification {
    max-width: 420px;
  }
}

.toast-success {
  border-left: 4px solid var(--color-success);
}

.toast-success .toast-icon {
  color: var(--color-success);
}

.toast-warning {
  border-left: 4px solid var(--color-warning);
}

.toast-warning .toast-icon {
  color: var(--color-warning);
}

.toast-icon {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.toast-svg {
  width: 22px;
  height: 22px;
}

.toast-content {
  flex: 1;
}

.toast-message {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.4;
}

.toast-close {
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  padding: 2px;
  transition: color var(--transition-fast);
}

.toast-close:hover {
  color: var(--color-text);
}

.close-svg {
  width: 16px;
  height: 16px;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-fade-enter-from {
  opacity: 0;
  transform: translateY(16px) scale(0.95);
}

.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
}
</style>
