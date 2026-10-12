<script setup>
import AppCard from '@/components/ui/AppCard.vue'

defineProps({
  event: {
    type: Object,
    required: true,
  },
})

defineEmits(['view-detail'])
</script>

<template>
  <AppCard class="event-card-wrapper">
    <div class="event-body">
      <div class="event-meta">
        <span class="event-date">{{ event.date }}</span>
        <span class="event-category">{{ event.cat || event.category }}</span>
      </div>

      <h3 class="event-title">{{ event.title || event.name }}</h3>
      <p v-if="event.loc || event.location" class="event-loc">📍 {{ event.loc || event.location }}</p>
      <p class="event-desc">{{ event.desc || event.description }}</p>

      <div class="card-footer">
        <button class="btn-link" @click="$emit('view-detail', event.id)">
          View Event Details &rarr;
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
  margin-bottom: var(--space-4, 16px);
}

.event-date {
  background: rgba(102, 68, 255, 0.1);
  color: var(--primary, #6644ff);
  padding: var(--space-1, 4px) var(--space-2, 8px);
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
}

.event-category {
  color: var(--text-muted, #666666);
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: uppercase;
}

.event-title {
  margin-bottom: var(--space-2, 8px);
  font-size: 1.4rem;
  color: var(--text-main, #1c1948);
}

.event-loc {
  color: var(--text-muted, #666666);
  font-size: 0.95rem;
  margin-bottom: var(--space-2, 8px);
}

.event-desc {
  color: var(--text-muted, #666666);
  line-height: 1.6;
  font-size: 0.95rem;
  margin-bottom: var(--space-6, 24px);
  flex-grow: 1;
}

.card-footer {
  border-top: 1px solid var(--border-color, #e4e4e7);
  padding-top: var(--space-4, 16px);
}

.btn-link {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-main, #1c1948);
  font-weight: 600;
  text-decoration: none;
  font-size: 1rem;
  padding: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  transition: color 0.2s ease;
}

.btn-link:hover {
  color: var(--primary, #6644ff);
}
</style>
