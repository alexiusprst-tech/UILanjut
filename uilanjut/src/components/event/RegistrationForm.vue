<script setup>
import { ref, reactive, computed } from 'vue'
import AppButton from '@/components/ui/AppButton.vue'

const props = defineProps({
  submitting: {
    type: Boolean,
    default: false,
  },
  serverError: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['submit', 'cancel'])

// State Formulir — Nilai masukan dipertahankan saat validasi gagal
const formData = reactive({
  fullName: '',
  email: '',
  phone: '',
  dob: '',
  reason: '',
})

// Pesan kesalahan validasi per kolom
const errors = reactive({
  fullName: '',
  email: '',
  phone: '',
  dob: '',
  reason: '',
})

const isDirty = computed(() => {
  return (
    formData.fullName.trim() !== '' ||
    formData.email.trim() !== '' ||
    formData.phone.trim() !== '' ||
    formData.dob !== '' ||
    formData.reason.trim() !== ''
  )
})

function validateField(field) {
  switch (field) {
    case 'fullName':
      if (!formData.fullName.trim()) {
        errors.fullName = 'Nama lengkap wajib diisi.'
      } else if (formData.fullName.trim().length < 3) {
        errors.fullName = 'Nama lengkap minimal 3 karakter.'
      } else {
        errors.fullName = ''
      }
      break

    case 'email':
      if (!formData.email.trim()) {
        errors.email = 'Alamat email wajib diisi.'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        errors.email = 'Format alamat email tidak valid (contoh: nama@domain.com).'
      } else {
        errors.email = ''
      }
      break

    case 'phone':
      if (!formData.phone.trim()) {
        errors.phone = 'Nomor telepon / WhatsApp wajib diisi.'
      } else if (!/^[0-9+-\s]{10,16}$/.test(formData.phone.trim())) {
        errors.phone = 'Nomor telepon minimal 10-15 digit angka yang valid.'
      } else {
        errors.phone = ''
      }
      break

    case 'dob':
      if (!formData.dob) {
        errors.dob = 'Tanggal lahir wajib dipilih.'
      } else {
        errors.dob = ''
      }
      break

    case 'reason':
      if (!formData.reason.trim()) {
        errors.reason = 'Alasan mengikuti acara wajib diisi.'
      } else if (formData.reason.trim().length < 10) {
        errors.reason = 'Jelaskan alasan Anda minimal 10 karakter.'
      } else {
        errors.reason = ''
      }
      break
  }
}

function validateAll() {
  validateField('fullName')
  validateField('email')
  validateField('phone')
  validateField('dob')
  validateField('reason')

  return (
    !errors.fullName &&
    !errors.email &&
    !errors.phone &&
    !errors.dob &&
    !errors.reason
  )
}

function handleSubmit() {
  const isValid = validateAll()
  if (!isValid) return

  emit('submit', { ...formData })
}

function handleCancel() {
  emit('cancel', isDirty.value)
}

defineExpose({
  isDirty,
  reset() {
    formData.fullName = ''
    formData.email = ''
    formData.phone = ''
    formData.dob = ''
    formData.reason = ''
    errors.fullName = ''
    errors.email = ''
    errors.phone = ''
    errors.dob = ''
    errors.reason = ''
  },
})
</script>

<template>
  <div class="registration-form-card">
    <div class="form-header">
      <h2 class="form-title">Registration Form</h2>
      <p class="form-subtitle">
        Fill out the attendee information below to confirm your participation.
      </p>
    </div>

    <!-- Banner Server Error / Duplicate Warning jika ada -->
    <div v-if="serverError" class="server-error-banner" role="alert">
      <span class="error-icon">⚠️</span>
      <span>{{ serverError }}</span>
    </div>

    <form class="reg-form" novalidate @submit.prevent="handleSubmit">
      <!-- 1. Full Name -->
      <div class="form-group" :class="{ 'has-error': errors.fullName }">
        <label for="reg-fullname" class="form-label">Full Name *</label>
        <input
          id="reg-fullname"
          v-model="formData.fullName"
          type="text"
          class="form-input"
          placeholder="Nadia"
          :aria-invalid="!!errors.fullName"
          @blur="validateField('fullName')"
          @input="errors.fullName && validateField('fullName')"
        />
        <span v-if="errors.fullName" class="error-msg">{{ errors.fullName }}</span>
      </div>

      <!-- 2. Email Address -->
      <div class="form-group" :class="{ 'has-error': errors.email }">
        <label for="reg-email" class="form-label">Email Address *</label>
        <input
          id="reg-email"
          v-model="formData.email"
          type="email"
          class="form-input"
          placeholder="Nadiadia@gmail.com"
          :aria-invalid="!!errors.email"
          @blur="validateField('email')"
          @input="errors.email && validateField('email')"
        />
        <span v-if="errors.email" class="error-msg">{{ errors.email }}</span>
      </div>

      <!-- 3. Phone Number -->
      <div class="form-group" :class="{ 'has-error': errors.phone }">
        <label for="reg-phone" class="form-label">Phone Number *</label>
        <input
          id="reg-phone"
          v-model="formData.phone"
          type="tel"
          class="form-input"
          placeholder="09876545678"
          :aria-invalid="!!errors.phone"
          @blur="validateField('phone')"
          @input="errors.phone && validateField('phone')"
        />
        <span v-if="errors.phone" class="error-msg">{{ errors.phone }}</span>
      </div>

      <!-- 4. Date of Birth -->
      <div class="form-group" :class="{ 'has-error': errors.dob }">
        <label for="reg-dob" class="form-label">Date of Birth *</label>
        <input
          id="reg-dob"
          v-model="formData.dob"
          type="date"
          class="form-input"
          :aria-invalid="!!errors.dob"
          @blur="validateField('dob')"
          @input="errors.dob && validateField('dob')"
        />
        <span v-if="errors.dob" class="error-msg">{{ errors.dob }}</span>
      </div>

      <!-- 5. Reason for Attending -->
      <div class="form-group" :class="{ 'has-error': errors.reason }">
        <label for="reg-reason" class="form-label">Reason for Attending *</label>
        <textarea
          id="reg-reason"
          v-model="formData.reason"
          class="form-input form-textarea"
          rows="4"
          placeholder="Saya ingin menghadiri acara ini untuk menjembatani pengetahuan akademis saya dengan realitas industri kreatif saat ini..."
          :aria-invalid="!!errors.reason"
          @blur="validateField('reason')"
          @input="errors.reason && validateField('reason')"
        ></textarea>
        <span v-if="errors.reason" class="error-msg">{{ errors.reason }}</span>
      </div>

      <!-- Action Buttons -->
      <div class="form-actions-bar">
        <AppButton
          type="button"
          variant="secondary"
          size="md"
          class="btn-cancel"
          @click="handleCancel"
        >
          Cancel
        </AppButton>
        <AppButton
          type="submit"
          variant="primary"
          size="md"
          class="btn-submit"
          :disabled="submitting"
        >
          <span v-if="submitting">Processing...</span>
          <span v-else>Register / Confirm Participation</span>
        </AppButton>
      </div>
    </form>
  </div>
</template>

<style scoped>
.registration-form-card {
  background-color: #ffffff;
  border-radius: var(--radius-xl, 20px);
  border: 1px solid var(--color-border, #e2e8f0);
  padding: 2.25rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.form-header {
  margin-bottom: 1.75rem;
}

.form-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-text, #1c1948);
  letter-spacing: -0.02em;
  margin-bottom: 0.35rem;
}

.form-subtitle {
  font-size: 0.92rem;
  color: var(--color-text-secondary, #64748b);
}

.server-error-banner {
  background-color: #fee2e2;
  border: 1px solid #fca5a5;
  color: #b91c1c;
  padding: 0.85rem 1.15rem;
  border-radius: 10px;
  font-size: 0.88rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
}

.error-icon {
  font-size: 1.1rem;
}

.reg-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-label {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-text, #1c1948);
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: 10px;
  font-family: inherit;
  font-size: 0.92rem;
  color: var(--color-text, #1c1948);
  background-color: #ffffff;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-input:focus {
  border-color: var(--color-primary, #6644ff);
  box-shadow: 0 0 0 3px rgba(102, 68, 255, 0.12);
}

.form-textarea {
  resize: vertical;
  line-height: 1.5;
}

/* Error States */
.has-error .form-input {
  border-color: #ef4444;
  background-color: #fffbfb;
}

.has-error .form-input:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}

.error-msg {
  font-size: 0.78rem;
  font-weight: 600;
  color: #ef4444;
  margin-top: 2px;
}

/* Actions */
.form-actions-bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1.5rem;
  margin-top: 0.5rem;
  border-top: 1px solid var(--color-border-light, #f1f5f9);
}

.btn-cancel {
  min-width: 100px;
}

.btn-submit {
  min-width: 180px;
}
</style>
