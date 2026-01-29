<template>
  <div class="flex items-center justify-between gap-4">
    <div>
      <h2 class="text-2xl lg:text-3xl font-bold text-text-primary">{{ title }}</h2>
      <p v-if="subtitle" class="text-lg text-muted mt-2">{{ subtitle }}</p>
    </div>
    <BaseButton
      v-if="seeAllLabel"
      variant="ghost"
      size="sm"
      :icon="seeAllIcon"
      @click="$emit('seeAll')"
    >
      {{ seeAllLabel }}
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { BaseButton } from '@brhc/ui'

defineProps<{
  title: string
  subtitle?: string
  seeAllLabel?: string
  seeAllIcon?: any
}>()

defineEmits<{
  seeAll: []
}>()
</script>
