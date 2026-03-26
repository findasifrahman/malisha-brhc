<template>
  <div class="group relative">
    <RouterLink
      v-if="to"
      :to="to"
      class="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-red-600 transition-all duration-200 hover:bg-gray-100/80 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/30"
    >
      {{ label }}
      <ChevronDown class="h-4 w-4 opacity-70 transition-transform duration-200 group-hover:rotate-180" />
    </RouterLink>
    <button
      v-else
      type="button"
      class="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-red-600 transition-all duration-200 hover:bg-gray-100/80 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/30"
    >
      {{ label }}
      <ChevronDown class="h-4 w-4 opacity-70 transition-transform duration-200 group-hover:rotate-180" />
    </button>

    <div
      class="invisible absolute left-0 top-full z-50 mt-2 translate-y-1 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
    >
      <div
        :class="[
          'w-[22rem] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl',
          panelClass,
        ]"
      >
        <div class="max-h-[calc(100vh-8rem)] overflow-y-auto p-2">
          <div :class="['grid gap-2', columns === 2 ? 'grid-cols-2' : columns === 3 ? 'grid-cols-3' : 'grid-cols-1']">
            <RouterLink
              v-for="it in items"
              :key="it.label"
              :to="it.to"
              class="flex min-w-0 items-start gap-3 rounded-xl px-3 py-2.5 text-gray-900 transition-colors duration-200 hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/30"
            >
              <span class="mt-1.5 h-2 w-2 flex-none rounded-full bg-red-500/70"></span>
              <div class="min-w-0 flex-1">
                <div class="break-words text-sm font-semibold leading-snug">
                  {{ it.label }}
                </div>
                <div
                  v-if="it.description"
                  class="mt-1 text-xs font-medium leading-snug text-red-700/70"
                >
                  {{ it.description }}
                </div>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ChevronDown } from 'lucide-vue-next'

type NavItem = { label: string; description?: string; to: string }

defineProps<{
  label: string
  items: NavItem[]
  to?: string
  columns?: 1 | 2 | 3
  panelClass?: string
}>()
</script>
