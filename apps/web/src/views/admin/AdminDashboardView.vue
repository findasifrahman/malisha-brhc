<template>
  <section class="space-y-5">
    <SectionHeader title="Dashboard" subtitle="Admin overview" />

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <RouterLink v-for="c in cards" :key="c.label" :to="c.to" class="block">
        <Card className="p-5" :hoverable="true">
          <div class="text-sm font-semibold text-brhc-muted">{{ c.label }}</div>
          <div class="mt-2 text-2xl font-semibold">{{ c.value }}</div>
          <div class="mt-2 text-sm text-brhc-muted">{{ c.hint }}</div>
        </Card>
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Card, SectionHeader } from '@brhc/ui'

const cards = [
  { label: 'Doctors', value: '—', hint: 'Manage doctors and featured profiles', to: '/admin/doctors' },
  { label: 'Hospitals', value: '—', hint: 'Partner hospital directory', to: '/admin/hospitals' },
  { label: 'Services', value: '—', hint: 'Service categories & offerings', to: '/admin/services' },
  { label: 'Locations', value: '—', hint: 'Add provinces and cities', to: '/admin/locations' },
  { label: 'Media', value: '—', hint: 'Upload and manage images', to: '/admin/media' },
]
</script>
