<template>
  <div
    :class="[
      'rounded-2xl bg-surface-1 ring-1 ring-border-subtle backdrop-blur-md shadow-soft transition-all duration-200',
      hoverable ? 'hover:-translate-y-1 hover:ring-brand-primary-weak hover:shadow-lg' : '',
      className,
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    hoverable?: boolean
    className?: string
  }>(),
  { hoverable: false, className: '' },
)
</script>
