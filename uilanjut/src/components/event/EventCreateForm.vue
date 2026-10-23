<script setup>
import { ref } from 'vue'
import { useEvents } from '@/composables/useEvents'
import AppButton from '@/components/ui/AppButton.vue'

const emit = defineEmits(['created', 'cancel'])
const { addEvent } = useEvents()

const form = ref({
  title: '',
  category: 'Workshop',
  date: '',
  location: '',
  venue: '',
  quota: 100,
  description: '',
  image:
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
})

const errorMessage = ref('')
const successMessage = ref('')

function handleSubmit() {
  errorMessage.value = ''
  successMessage.value = ''

  if (
    !form.value.title.trim() ||
    !form.value.date.trim() ||
    !form.value.location.trim() ||
    !form.value.quota ||
    !form.value.description.trim()
  ) {
    errorMessage.value = 'Harap isi semua bidang wajib sebelum mempublikasikan acara!'
    return
  }

  const created = addEvent({ ...form.value })
  successMessage.value = `Acara "${created.title}" berhasil dipublikasikan dan sekarang aktif di katalog!`

  emit('created', created)

  // Reset form
  form.value = {
    title: '',
    category: 'Workshop',
    date: '',
    location: '',
    venue: '',
    quota: 100,
    description: '',
    image:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
  }
}

function handleCancel() {
  errorMessage.value = ''
  successMessage.value = ''
  emit('cancel')
}
</script>

<template>
  <div class="event-create-card">
    <div class="card-header">
      <h2 class="title">Create New Event Form</h2>
      <p class="subtitle">
        Information entered here will be instantly published to the public catalog.
      </p>
    </div>

    <!-- Alert Error (Screenshot 2 left) -->
    <div v-if="errorMessage" class="alert-banner alert-error" role="alert">
      <span class="alert-icon">⚠️</span>
      <span>{{ errorMessage }}</span>
    </div>

    <!-- Alert Success (Screenshot 2 right) -->
    <div v-if="successMessage" class="alert-banner alert-success" role="status">
      <span class="alert-icon">🎉</span>
      <span>{{ successMessage }}</span>
    </div>

    <form class="create-form" novalidate @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="event-title-input" class="form-label">Event Title *</label>
        <input
          id="event-title-input"
          v-model="form.title"
          type="text"
          class="form-input"
          placeholder="e.g. Modern UI/UX Masterclass"
        />
      </div>

      <div class="form-grid-2">
        <div class="form-group">
          <label for="event-cat-input" class="form-label">Event Category *</label>
          <select id="event-cat-input" v-model="form.category" class="form-input">
            <option value="Workshop">Workshop</option>
            <option value="Seminar">Seminar</option>
            <option value="Conference">Conference</option>
            <option value="Meetup">Meetup</option>
            <option value="Competition">Competition</option>
          </select>
        </div>

        <div class="form-group">
          <label for="event-date-input" class="form-label">Date &amp; Time *</label>
          <input
            id="event-date-input"
            v-model="form.date"
            type="text"
            class="form-input"
            placeholder="e.g. Oct 24, 2026 • 10:00 AM"
          />
        </div>
      </div>

      <div class="form-grid-2">
        <div class="form-group">
          <label for="event-loc-input" class="form-label">Event Location *</label>
          <input
            id="event-loc-input"
            v-model="form.location"
            type="text"
            class="form-input"
            placeholder="e.g. Innovation Center, Jakarta"
          />
        </div>

        <div class="form-group">
          <label for="event-quota-input" class="form-label">Attendee Quota *</label>
          <input
            id="event-quota-input"
            v-model="form.quota"
            type="number"
            class="form-input"
            min="1"
            placeholder="100"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="event-desc-input" class="form-label">Event Description *</label>
        <textarea
          id="event-desc-input"
          v-model="form.description"
          rows="4"
          class="form-input form-textarea"
          placeholder="Describe the agenda, speakers, and key takeaways..."
        ></textarea>
      </div>

      <div class="form-actions">
        <AppButton type="button" variant="secondary" size="md" @click="handleCancel">
          Cancel
        </AppButton>
        <AppButton type="submit" variant="primary" size="md">
          🚀 Publish Event Now
        </AppButton>
      </div>
    </form>
  </div>
</template>

<style scoped>
.event-create-card {
  background-color: #ffffff;
  border-radius: var(--radius-xl, 20px);
  border: 1px solid var(--color-border, #e2e8f0);
  padding: 2.25rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.card-header {
  margin-bottom: 1.5rem;
}

.title {
  font-size: 1.45rem;
  font-weight: 800;
  color: var(--color-text, #1c1948);
  margin-bottom: 0.35rem;
  letter-spacing: -0.02em;
}

.subtitle {
  font-size: 0.92rem;
  color: var(--color-text-secondary, #64748b);
}

.alert-banner {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1.15rem;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.alert-error {
  background-color: #fee2e2;
  border: 1px solid #fca5a5;
  color: #b91c1c;
}

.alert-success {
  background-color: #dcfce7;
  border: 1px solid #86efac;
  color: #15803d;
}

.create-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-grid-2 {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 640px) {
  .form-grid-2 {
    grid-template-columns: 1fr 1fr;
  }
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
}

.form-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--color-border-light, #f1f5f9);
}
</style>
