<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useEvents } from '@/composables/useEvents'
import AppCard from '@/components/ui/AppCard.vue'

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['view-detail'])
const router = useRouter()
const { isUserRegistered } = useEvents()

const isRegistered = computed(() => isUserRegistered(props.event.id))

function handleViewDetail() {
  emit('view-detail', props.event.id)
  router.push(`/events/${props.event.id}`)
}
</script>

<template>
  <AppCard class="event-card-wrapper" @click="handleViewDetail">
    <div class="event-body">
      <!-- Date & Category Row -->
      <div class="event-meta">
        <span class="event-date">{{ event.date }}</span>
        <span class="event-category">{{ event.cat || event.category }}</span>
      </div>

      <!-- Lencana "REGISTERED" (Screenshot 3) -->
      <div v-if="isRegistered" class="registered-badge-wrap">
        <span class="badge-registered">REGISTERED</span>
      </div>

      <!-- Event Title -->
      <h3 class="event-title">{{ event.title || event.name }}</h3>

      <!-- Location -->
      <p v-if="event.loc || event.location" class="event-loc">
        📍 {{ event.loc || event.location }}
      </p>

      <!-- Description -->
      <p class="event-desc">{{ event.desc || event.description }}</p>

      <!-- Footer Info & Button -->
      <div class="card-footer">
        <span class="seats-info" :class="{ 'seats-low': event.availableSeats < 10 }">
          {{ event.availableSeats !== undefined ? `${event.availableSeats} kursi tersisa` : '' }}
        </span>

        <button type="button" class="btn-link" @click.stop="handleViewDetail">
          <span>{{ isRegistered ? 'View Ticket &rarr;' : 'View Event Details &rarr;' }}</span>
        </button>
      </div>
    </div>
  </AppCard>
</template>

<style scoped>
.event-card-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.event-card-wrapper:hover {
  transform: translateY(-4px);
  border-color: rgba(102, 68, 255, 0.3);
  box-shadow: 0 12px 25px rgba(102, 68, 255, 0.08);
}

.event-body {
  padding: var(--space-6, 24px);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.event-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-3, 12px);
  gap: 0.5rem;
}

.event-date {
  background: rgba(102, 68, 255, 0.08);
  color: var(--color-primary, #6644ff);
  padding: var(--space-1, 4px) var(--space-2, 8px);
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 0.01em;
}

.event-category {
  color: var(--color-text-secondary, #64748b);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

/* Lencana REGISTERED matching Screenshot 3 */
.registered-badge-wrap {
  margin-bottom: var(--space-2, 8px);
}

.badge-registered {
  display: inline-flex;
  align-items: center;
  background-color: #eff6ff;
  color: #2563eb;
  border: 1px solid #93c5fd;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  padding: 0.2rem 0.65rem;
  border-radius: 6px;
}

.event-title {
  margin-bottom: var(--space-2, 8px);
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-text, #1c1948);
  line-height: 1.35;
  letter-spacing: -0.01em;
}

.event-loc {
  color: var(--color-text-secondary, #64748b);
  font-size: 0.88rem;
  margin-bottom: var(--space-3, 12px);
  font-weight: 500;
}

.event-desc {
  color: var(--color-text-secondary, #64748b);
  line-height: 1.6;
  font-size: 0.9rem;
  margin-bottom: var(--space-5, 20px);
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  border-top: 1px solid var(--color-border-light, #f1f5f9);
  padding-top: var(--space-4, 16px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.seats-info {
  font-size: 0.78rem;
  font-weight: 700;
  color: #10b981;
}

.seats-low {
  color: #ef4444;
}

.btn-link {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-primary, #6644ff);
  font-weight: 700;
  text-decoration: none;
  font-size: 0.92rem;
  padding: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  transition: opacity 0.2s ease;
}

.btn-link:hover {
  text-decoration: underline;
}
</style>
