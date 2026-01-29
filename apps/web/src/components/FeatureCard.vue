<template>
  <div
    class="group relative overflow-hidden rounded-3xl bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur-md transition hover:ring-white/20"
  >
    <div :class="['absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r', accent]"></div>

    <div class="flex items-start gap-3">
      <div
        class="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10 transition group-hover:scale-[1.03]"
      >
        <component :is="icon" class="h-5 w-5 text-brhc-text" />
      </div>
      <div>
        <div class="text-sm font-semibold">{{ title }}</div>
        <div class="mt-0.5 text-xs leading-5 text-brhc-muted">{{ subtitle }}</div>
      </div>
    </div>

    <div
      class="pointer-events-none absolute -bottom-10 -right-12 h-36 w-36 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,59,59,0.22),transparent_65%)] blur-xl"
    ></div>
  </div>
</template>

<script setup lang="ts">
import type { LucideIcon } from 'lucide-vue-next'

defineProps<{ title: string; subtitle: string; icon: LucideIcon; accent: string }>()
</script>
