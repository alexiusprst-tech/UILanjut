<script setup>
import AppButton from '@/components/ui/AppButton.vue'

defineProps({
  event: {
    type: Object,
    required: true,
  },
})

defineEmits(['toggle-status', 'delete', 'view-detail'])
</script>

<template>
  <div class="organizer-card" :class="{ 'is-completed': event.status === 'completed' }">
    <div class="card-media">
      <img :src="event.image" :alt="event.title" loading="lazy" />
    </div>

    <div class="card-content">
      <div class="card-top-row">
        <span class="category-chip">{{ event.category }}</span>
        <span
          class="status-chip"
          :class="event.status === 'completed' ? 'chip-completed' : 'chip-active'"
        >
          {{ event.status === 'completed' ? 'Completed' : 'Active' }}
        </span>
      </div>

      <h3 class="card-title">{{ event.title }}</h3>

      <div class="card-meta-row">
        <span class="meta-item">📅 {{ event.date }}</span>
        <span class="meta-dot">•</span>
        <span class="meta-item">📍 {{ event.location }}</span>
        <span class="meta-dot">•</span>
        <span class="meta-item seats-count">
          🎟️ {{ event.availableSeats }} / {{ event.quota }} Kursi
        </span>
      </div>

      <p class="card-description">{{ event.description }}</p>

      <div class="card-actions-row">
        <AppButton
          v-if="event.status !== 'completed'"
          variant="success-outline"
          size="sm"
          class="action-btn"
          @click="$emit('toggle-status', event)"
        >
          ✓ Complete Event
        </AppButton>
        <AppButton
          v-else
          variant="secondary"
          size="sm"
          class="action-btn"
          @click="$emit('toggle-status', event)"
        >
          ↺ Reactivate Event
        </AppButton>

        <AppButton
          variant="danger-outline"
          size="sm"
          class="action-btn"
          @click="$emit('delete', event)"
        >
          🗑️ Delete
        </AppButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.organizer-card {
  background-color: #ffffff;
  border-radius: var(--radius-lg, 16px);
  border: 1px solid var(--color-border, #e2e8f0);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.organizer-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  border-color: rgba(102, 68, 255, 0.2);
}

.card-media {
  aspect-ratio: 16 / 9;
  background-color: #f1f5f9;
  overflow: hidden;
}

.card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.organizer-card:hover .card-media img {
  transform: scale(1.04);
}

.card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
}

.card-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.category-chip {
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-primary, #6644ff);
  background-color: rgba(102, 68, 255, 0.08);
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
}

.status-chip {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
}

.chip-active {
  background-color: #d1fae5;
  color: #065f46;
}

.chip-completed {
  background-color: #f1f5f9;
  color: #64748b;
  border: 1px solid #e2e8f0;
}

.card-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--color-text, #1c1948);
  line-height: 1.35;
}

.card-meta-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
  font-size: 0.82rem;
  color: var(--color-text-secondary, #64748b);
  font-weight: 600;
}

.meta-dot {
  color: #cbd5e1;
}

.seats-count {
  color: #059669;
}

.card-description {
  font-size: 0.88rem;
  color: var(--color-text-secondary, #64748b);
  line-height: 1.55;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-actions-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border-light, #f1f5f9);
}

.action-btn {
  width: 100%;
}

/* Completed Event Struck-through state */
.organizer-card.is-completed {
  background-color: #fafafa;
}

.organizer-card.is-completed .card-media img {
  filter: grayscale(100%);
  opacity: 0.6;
}

.organizer-card.is-completed .card-title {
  color: #94a3b8;
  text-decoration: line-through;
  text-decoration-thickness: 2px;
}
</style>
