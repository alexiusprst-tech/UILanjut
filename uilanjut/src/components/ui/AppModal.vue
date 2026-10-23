<script setup>
import { watch, onMounted, onBeforeUnmount } from 'vue'
import AppButton from '@/components/ui/AppButton.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    default: '',
  },
  confirmText: {
    type: String,
    default: 'Konfirmasi',
  },
  cancelText: {
    type: String,
    default: 'Batal',
  },
  confirmVariant: {
    type: String,
    default: 'danger', // 'danger' | 'primary' | 'success'
  },
  icon: {
    type: String,
    default: 'warning', // 'warning' | 'info' | 'danger'
  },
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

function handleClose() {
  emit('update:modelValue', false)
  emit('cancel')
}

function handleConfirm() {
  emit('confirm')
  emit('update:modelValue', false)
}

function onKeydown(e) {
  if (e.key === 'Escape' && props.modelValue) {
    handleClose()
  }
}

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  },
)

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="modelValue" class="app-modal-backdrop" @click.self="handleClose">
        <div
          class="app-modal-dialog"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="title"
        >
          <!-- Icon Header matching Screenshot 2 & 5 -->
          <div v-if="icon !== 'none'" class="modal-icon-badge" :class="`icon-${icon}`">
            <span v-if="icon === 'warning'" class="icon-emoji">⚠️</span>
            <span v-else-if="icon === 'danger'" class="icon-emoji">🗑️</span>
            <span v-else-if="icon === 'success'" class="icon-emoji">🎉</span>
            <span v-else class="icon-emoji">ℹ️</span>
          </div>

          <!-- Title & Content -->
          <div class="modal-body">
            <h3 class="modal-title">{{ title }}</h3>
            <p v-if="message" class="modal-message">{{ message }}</p>
            <slot />
          </div>

          <!-- Action Buttons / Named Slot Footer -->
          <slot name="footer">
            <div class="modal-actions">
              <AppButton
                variant="secondary"
                size="sm"
                class="btn-cancel"
                @click="handleClose"
              >
                {{ cancelText }}
              </AppButton>
              <AppButton
                :variant="confirmVariant"
                size="sm"
                class="btn-confirm"
                @click="handleConfirm"
              >
                {{ confirmText }}
              </AppButton>
            </div>
          </slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.app-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background-color: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.app-modal-dialog {
  background-color: #ffffff;
  border-radius: 20px;
  width: 100%;
  max-width: 480px;
  padding: 2rem;
  box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.25);
  border: 1px solid rgba(226, 232, 240, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  animation: modalScaleIn 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modalScaleIn {
  from {
    opacity: 0;
    transform: scale(0.92) translateY(8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-icon-badge {
  width: 54px;
  height: 54px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  background-color: #fef3c7;
  border: 1px solid #fde68a;
}

.icon-warning {
  background-color: #fef3c7;
  border-color: #fde68a;
}

.icon-danger {
  background-color: #fee2e2;
  border-color: #fecaca;
}

.icon-info {
  background-color: #eff6ff;
  border-color: #bfdbfe;
}

.icon-emoji {
  font-size: 1.5rem;
  line-height: 1;
}

.modal-body {
  margin-bottom: 1.75rem;
  width: 100%;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 0.65rem;
  letter-spacing: -0.02em;
}

.modal-message {
  font-size: 0.92rem;
  color: #64748b;
  line-height: 1.55;
  margin: 0 auto;
  max-width: 400px;
}

.modal-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
}

.btn-cancel {
  min-width: 100px;
}

.btn-confirm {
  min-width: 130px;
}

/* Modal Fade Transition */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
