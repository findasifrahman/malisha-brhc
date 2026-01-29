<template>
  <textarea
    :value="modelValue"
    :rows="rows"
    :placeholder="placeholder"
    :disabled="disabled"
    :class="[
      'w-full rounded-2xl bg-black/5 px-4 py-2.5 text-base text-brhc-text ring-1 ring-black/10 backdrop-blur-md',
      'placeholder:text-black/40',
      'transition focus:outline-none focus-visible:shadow-glow focus-visible:ring-black/20',
      disabled ? 'opacity-60 cursor-not-allowed' : 'hover:ring-black/15',
    ]"
    @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
  />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string
    rows?: number
    placeholder?: string
    disabled?: boolean
  }>(),
  { rows: 4, disabled: false },
)

defineEmits<{ (e: 'update:modelValue', value: string): void }>()
</script>
