<template>
  <div class="group relative">
    <button
      type="button"
      class="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-100 transition-all duration-200 hover:bg-gray-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
    >
      {{ label }}
      <ChevronDown class="h-4 w-4 opacity-70 transition-transform duration-200 group-hover:rotate-180" />
    </button>

    <div
      class="invisible absolute left-0 top-full mt-2 w-[300px] translate-y-1 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 z-50"
    >
      <div class="rounded-xl bg-white p-2 border border-gray-200 shadow-2xl">
        <RouterLink
          v-for="it in items"
          :key="it.label"
          :to="it.to"
          class="block rounded-lg px-4 py-3 transition-all duration-200 hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <div class="text-sm font-semibold text-gray-900">{{ it.label }}</div>
          <div v-if="it.description" class="text-xs text-gray-500 mt-1">{{ it.description }}</div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ChevronDown } from 'lucide-vue-next'

type NavItem = { label: string; description?: string; to: string }

defineProps<{ label: string; items: NavItem[] }>()
</script>
