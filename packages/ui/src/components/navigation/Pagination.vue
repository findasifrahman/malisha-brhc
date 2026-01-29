<template>
  <div class="flex items-center justify-between gap-3">
    <BaseButton variant="outline" size="sm" :disabled="page <= 1" @click="$emit('update:page', page - 1)">
      Prev
    </BaseButton>

    <div class="text-xs text-brhc-muted">
      Page <span class="text-brhc-text">{{ page }}</span>
      <span v-if="totalPages">/ {{ totalPages }}</span>
    </div>

    <BaseButton
      variant="outline"
      size="sm"
      :disabled="totalPages ? page >= totalPages : false"
      @click="$emit('update:page', page + 1)"
    >
      Next
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '../primitives/BaseButton.vue'

defineProps<{ page: number; totalPages?: number }>()

defineEmits<{ (e: 'update:page', value: number): void }>()
</script>
