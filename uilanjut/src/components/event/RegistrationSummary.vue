<script setup>
defineProps({
  event: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="registration-summary-card">
    <!-- Category Badge -->
    <div class="summary-badge-wrap">
      <span class="category-pill">{{ event.category || 'Workshop' }}</span>
      <span v-if="event.status === 'active'" class="status-live-pill">Pendaftaran Dibuka</span>
    </div>

    <!-- Event Title -->
    <h2 class="summary-title">{{ event.title }}</h2>

    <!-- Key Metadata Rows -->
    <div class="summary-meta-list">
      <div class="meta-item">
        <span class="meta-label">DATE &amp; TIME</span>
        <span class="meta-value">{{ event.date }}</span>
      </div>

      <div class="meta-item">
        <span class="meta-label">LOCATION</span>
        <span class="meta-value">{{ event.venue || event.location }}</span>
      </div>

      <div class="meta-item">
        <span class="meta-label">AVAILABLE SEATS</span>
        <span class="meta-seats" :class="{ 'seats-low': event.availableSeats < 10 }">
          {{ event.availableSeats }} seats remaining
        </span>
      </div>
    </div>

    <!-- Description & Key Takeaways -->
    <div class="summary-divider"></div>
    <div class="summary-description">
      <p class="desc-text">{{ event.description }}</p>
    </div>

    <!-- Highlights if available -->
    <div v-if="event.highlights && event.highlights.length" class="summary-highlights">
      <h4 class="highlights-title">Yang Akan Anda Dapatkan:</h4>
      <ul class="highlights-list">
        <li v-for="(item, idx) in event.highlights" :key="idx" class="highlight-item">
          <span class="check-bullet">✓</span>
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.registration-summary-card {
  background-color: #ffffff;
  border-radius: var(--radius-xl, 20px);
  border: 1px solid var(--color-border, #e2e8f0);
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  position: sticky;
  top: 96px;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.summary-badge-wrap {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.category-pill {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-primary, #6644ff);
  background-color: rgba(102, 68, 255, 0.08);
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
}

.status-live-pill {
  font-size: 0.72rem;
  font-weight: 700;
  color: #059669;
  background-color: #ecfdf5;
  padding: 0.2rem 0.55rem;
  border-radius: 9999px;
}

.summary-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--color-text, #1c1948);
  line-height: 1.35;
  letter-spacing: -0.02em;
}

.summary-meta-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.meta-label {
  font-size: 0.72rem;
  font-weight: 800;
  color: var(--color-text-secondary, #64748b);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.meta-value {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-text, #1c1948);
}

.meta-seats {
  font-size: 0.95rem;
  font-weight: 700;
  color: #10b981;
}

.seats-low {
  color: #ef4444;
}

.summary-divider {
  height: 1px;
  background-color: var(--color-border-light, #f1f5f9);
}

.summary-description {
  font-size: 0.88rem;
  color: var(--color-text-secondary, #64748b);
  line-height: 1.6;
}

.desc-text {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.summary-highlights {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 0.5rem;
}

.highlights-title {
  font-size: 0.82rem;
  font-weight: 800;
  color: var(--color-text, #1c1948);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.highlights-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.highlight-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.84rem;
  color: var(--color-text-secondary, #64748b);
  line-height: 1.4;
}

.check-bullet {
  color: var(--color-primary, #6644ff);
  font-weight: 800;
}
</style>
