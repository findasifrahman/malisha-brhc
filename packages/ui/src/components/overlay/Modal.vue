<template>
  <teleport to="body">
    <div v-if="open" class="fixed inset-0 z-40">
      <div class="absolute inset-0 bg-black/60" @click="$emit('update:open', false)"></div>

      <div class="absolute inset-0 flex items-center justify-center p-5">
        <div
          class="w-full max-w-lg overflow-hidden rounded-2xl bg-white ring-1 ring-black/10 shadow-soft"
          role="dialog"
          aria-modal="true"
        >
          <div class="flex items-start justify-between gap-4 p-5">
            <div class="min-w-0">
              <div class="text-base font-bold text-brhc-text">{{ title }}</div>
              <div v-if="subtitle" class="mt-1 text-sm text-brhc-muted">{{ subtitle }}</div>
            </div>
            <button
              class="rounded-xl p-2 text-brhc-muted ring-1 ring-transparent transition hover:bg-white/5 hover:text-brhc-text"
              type="button"
              @click="$emit('update:open', false)"
            >
              <X class="h-4 w-4" />
            </button>
          </div>

          <div class="max-h-[70vh] overflow-y-auto px-5">
            <slot />
          </div>

          <div v-if="$slots.footer" class="sticky bottom-0 bg-white border-t border-black/10 p-5">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'

defineProps<{ open: boolean; title: string; subtitle?: string }>()

defineEmits<{ (e: 'update:open', value: boolean): void }>()
</script>
