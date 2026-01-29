<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition will-change-transform',
      'focus:outline-none focus-visible:shadow-glow',
      'disabled:opacity-60 disabled:cursor-not-allowed',
      sizeClass,
      variantClass,
      loading ? 'pointer-events-none' : '',
    ]"
  >
    <span v-if="loading" class="relative -ml-0.5 inline-flex h-4 w-4">
      <span class="absolute inset-0 animate-spin rounded-full border-2 border-white/40 border-t-white"></span>
    </span>

    <component v-else-if="icon" :is="icon" class="h-4 w-4" />
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { LucideIcon } from 'lucide-vue-next'

type Variant = 'primary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

type Props = {
  variant?: Variant
  size?: Size
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  icon?: LucideIcon
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
})

const variantClass = computed(() => {
  if (props.variant === 'primary') {
    return [
      'text-white',
      'bg-[image:var(--brand-gradient-from)]',
      'shadow-[0_16px_50px_rgba(255,59,59,0.20)]',
      'hover:brightness-110 hover:-translate-y-[1px]',
      'active:translate-y-[0px] active:brightness-105',
    ].join(' ')
  }

  if (props.variant === 'outline') {
    return [
      'bg-brand-primary-weak text-text-primary',
      'ring-1 ring-border-subtle',
      'hover:bg-opacity-20 hover:ring-border-subtle hover:-translate-y-[1px]',
      'active:translate-y-[0px]',
    ].join(' ')
  }

  return [
    'bg-transparent text-text-primary',
    'hover:bg-brand-primary-weak hover:-translate-y-[1px]',
    'active:translate-y-[0px]',
  ].join(' ')
})

const sizeClass = computed(() => {
  if (props.size === 'sm') return 'px-3 py-2 text-xs'
  if (props.size === 'lg') return 'px-5 py-3 text-sm'
  return 'px-4 py-2.5 text-sm'
})
</script>
