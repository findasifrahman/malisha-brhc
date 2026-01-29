<template>
  <div
    :style="{ width, height }"
    :class="[
      'animate-pulse rounded-2xl bg-white/10 ring-1 ring-white/5',
      className,
    ]"
  ></div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    width?: string
    height?: string
    className?: string
  }>(),
  { width: '100%', height: '1rem', className: '' },
)
</script>
