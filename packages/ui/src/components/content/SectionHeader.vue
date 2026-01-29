<template>
  <div class="flex flex-wrap items-end justify-between gap-3">
    <div>
      <div class="text-lg font-semibold tracking-tight text-brhc-text">{{ title }}</div>
      <div v-if="subtitle" class="mt-1 text-sm text-brhc-muted">{{ subtitle }}</div>
    </div>

    <BaseButton
      v-if="seeAllLabel"
      variant="outline"
      size="sm"
      :icon="seeAllIcon"
      @click="$emit('see-all')"
    >
      {{ seeAllLabel }}
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import type { LucideIcon } from 'lucide-vue-next'
import BaseButton from '../primitives/BaseButton.vue'

defineProps<{ title: string; subtitle?: string; seeAllLabel?: string; seeAllIcon?: LucideIcon }>()

defineEmits<{ (e: 'see-all'): void }>()
</script>
