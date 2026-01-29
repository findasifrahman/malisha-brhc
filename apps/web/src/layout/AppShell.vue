<template>
  <div class="min-h-screen bg-surface-0 font-sans text-text-primary">
    <TopNav @open-mobile="mobileOpen = true" />
    <MobileDrawer :open="mobileOpen" @update:open="mobileOpen = $event" />

    <!-- Full-width layout -->
    <main class="w-full">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TopNav from './TopNav.vue'
import MobileDrawer from './MobileDrawer.vue'
import Footer from './Footer.vue'

const mobileOpen = ref(false)
</script>
