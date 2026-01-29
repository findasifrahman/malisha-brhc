<template>
  <component :is="layout">
    <router-view />
  </component>

  <ToastViewport />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppShell from './layout/AppShell.vue'
import AuthShell from './layout/AuthShell.vue'
import AdminShell from './admin/AdminShell.vue'
import { ToastViewport } from '@brhc/ui'

const route = useRoute()

const layout = computed(() => {
  if (route.meta.layout === 'admin') return AdminShell
  if (route.meta.layout === 'auth') return AuthShell
  return AppShell
})
</script>
