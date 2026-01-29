<template>
  <div class="space-y-2">
    <Skeleton v-for="i in lines" :key="i" :height="i === lines ? lastLineHeight : lineHeight" />
  </div>
</template>

<script setup lang="ts">
import Skeleton from './Skeleton.vue'

withDefaults(
  defineProps<{
    lines?: number
    lineHeight?: string
    lastLineHeight?: string
  }>(),
  { lines: 3, lineHeight: '0.85rem', lastLineHeight: '0.85rem' },
)
</script>
