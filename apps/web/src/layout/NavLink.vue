<template>
  <RouterLink
    :to="to"
    :class="[
      'rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-100 hover:text-red-600' ,
      isActive 
        ? 'bg-red-50 text-red-100 font-semibold' 
        : 'text-gray-700 hover:bg-red-100 hover:text-red-100'
    ]"
  >
    {{ label }}
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'

const props = defineProps<{ label: string; to: string; isActive?: boolean }>()
const route = useRoute()

const isActive = props.isActive ?? (route.path === props.to || (props.to === '/' && route.path === '/'))
</script>
