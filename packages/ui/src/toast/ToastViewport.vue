<template>
  <div class="pointer-events-none fixed right-4 top-4 z-50 flex w-[min(420px,calc(100vw-2rem))] flex-col gap-3">
    <div
      v-for="t in toasts"
      :key="t.id"
      class="pointer-events-auto overflow-hidden rounded-2xl bg-brhc-glass/80 ring-1 ring-brhc-glassBorder backdrop-blur-md shadow-soft"
    >
      <div class="flex items-start gap-3 p-4">
        <div
          class="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10"
        >
          <component :is="iconFor(t.variant)" class="h-5 w-5" :class="iconClass(t.variant)" />
        </div>
        <div class="min-w-0 flex-1">
          <div class="text-sm font-semibold text-brhc-text">{{ t.title }}</div>
          <div v-if="t.message" class="mt-0.5 text-xs leading-5 text-brhc-muted">
            {{ t.message }}
          </div>
        </div>
        <button
          class="rounded-xl p-2 text-brhc-muted ring-1 ring-transparent transition hover:bg-white/5 hover:text-brhc-text"
          type="button"
          @click="remove(t.id)"
        >
          <X class="h-4 w-4" />
        </button>
      </div>
      <div class="h-1 w-full bg-white/5">
        <div class="h-full w-full bg-[image:var(--brhc-gradient-primary)] opacity-70"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCircle2, Info, TriangleAlert, X } from 'lucide-vue-next'
import type { ToastVariant } from './types'
import { useToast } from './toast'

const { toasts, remove } = useToast()

function iconFor(v: ToastVariant) {
  if (v === 'success') return CheckCircle2
  if (v === 'error') return TriangleAlert
  return Info
}

function iconClass(v: ToastVariant) {
  if (v === 'success') return 'text-emerald-300'
  if (v === 'error') return 'text-red-300'
  return 'text-brhc-rose'
}
</script>
