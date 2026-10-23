<script setup>
defineProps({
  ticket: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="registration-receipt-container">
    <!-- Success Badge -->
    <div class="receipt-badge-row">
      <span class="success-pill">SUCCESS</span>
    </div>

    <!-- Title & Thank You Message matching Screenshot 2 -->
    <h2 class="receipt-title">Registration Confirmed</h2>
    <p class="receipt-lead">
      Thank you, <strong>{{ ticket.fullName }}</strong>! Your registration for
      <strong>{{ ticket.eventTitle }}</strong> has been officially confirmed.
    </p>

    <!-- Details Box matching Screenshot 2 -->
    <div class="receipt-details-box">
      <div class="detail-row">
        <span class="detail-label">Booking Reference</span>
        <span class="detail-ref-badge">{{ ticket.bookingReference }}</span>
      </div>

      <div class="detail-row">
        <span class="detail-label">Attendee Email</span>
        <span class="detail-value">{{ ticket.email }}</span>
      </div>

      <div class="detail-row">
        <span class="detail-label">Event Schedule</span>
        <span class="detail-value">{{ ticket.eventDate }}</span>
      </div>

      <div class="detail-row">
        <span class="detail-label">Venue / Location</span>
        <span class="detail-value">{{ ticket.eventVenue || ticket.eventLocation }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.registration-receipt-container {
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.receipt-badge-row {
  display: flex;
  align-items: center;
}

.success-pill {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #059669;
  background-color: #d1fae5;
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
}

.receipt-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1e1b4b;
  letter-spacing: -0.02em;
  margin-top: 0.2rem;
}

.receipt-lead {
  font-size: 0.95rem;
  color: #475569;
  line-height: 1.55;
}

.receipt-lead strong {
  color: #0f172a;
}

.receipt-details-box {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin-top: 0.5rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}

.detail-label {
  color: #64748b;
  font-weight: 600;
}

.detail-value {
  color: #1e293b;
  font-weight: 700;
  text-align: right;
}

.detail-ref-badge {
  font-size: 0.85rem;
  font-weight: 800;
  color: #6644ff;
  background-color: #ede9fe;
  padding: 0.2rem 0.65rem;
  border-radius: 6px;
  letter-spacing: 0.05em;
}
</style>
