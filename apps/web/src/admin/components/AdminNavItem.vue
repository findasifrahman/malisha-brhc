<template>
  <RouterLink
    :to="item.to"
    class="flex items-center gap-3 rounded-2xl px-3 py-2 text-sm text-brhc-muted ring-1 ring-transparent transition hover:bg-white/5 hover:text-brhc-text"
    :class="isActive ? 'bg-white/5 text-brhc-text ring-white/10' : ''"
  >
    <component :is="item.icon" class="h-4 w-4" />
    <span class="font-semibold">{{ item.label }}</span>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import type { LucideIcon } from 'lucide-vue-next'

const props = defineProps<{ item: { label: string; to: string; icon: LucideIcon } }>()

const route = useRoute()

const isActive = computed(() => {
  if (props.item.to === '/admin') return route.path === '/admin'
  return route.path.startsWith(props.item.to)
})
</script>
