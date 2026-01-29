<template>
  <div class="relative">
    <select
      :value="modelValue"
      :disabled="disabled"
      :class="[
        'w-full appearance-none rounded-2xl bg-black/5 px-4 py-2.5 pr-10 text-base text-brhc-text ring-1 ring-black/10 backdrop-blur-md',
        'transition focus:outline-none focus-visible:shadow-glow focus-visible:ring-black/20',
        disabled ? 'opacity-60 cursor-not-allowed' : 'hover:ring-black/15',
      ]"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <slot />
    </select>

    <div class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-brhc-muted">
      <span class="text-xs">▾</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  disabled?: boolean
}>()

defineEmits<{ (e: 'update:modelValue', value: string): void }>()
</script>
