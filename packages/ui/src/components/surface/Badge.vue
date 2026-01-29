<template>
  <span
    :class="[
      'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-border-subtle transition-all duration-200',
      variantClass,
    ]"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'default' | 'primary' | 'outline'

const props = withDefaults(
  defineProps<{
    variant?: Variant
  }>(),
  { variant: 'default' },
)

const variantClass = computed(() => {
  if (props.variant === 'primary') return 'bg-[image:var(--brand-gradient-from)] text-black shadow-sm'
  if (props.variant === 'outline') return 'bg-transparent text-text-primary ring-border-subtle'
  return 'bg-brand-primary-weak text-text-primary'
})
</script>
