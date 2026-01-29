<template>
  <div class="overflow-hidden rounded-2xl ring-1 ring-black/10">
    <div class="flex flex-wrap items-center justify-between gap-3 bg-black/5 px-4 py-3">
      <div>
        <div class="text-base font-bold text-brhc-text">{{ title }}</div>
        <div v-if="subtitle" class="mt-0.5 text-sm text-brhc-muted">{{ subtitle }}</div>
      </div>
      <div class="flex items-center gap-2">
        <slot name="actions" />
      </div>
    </div>

    <div class="bg-transparent">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; subtitle?: string }>()
</script>
