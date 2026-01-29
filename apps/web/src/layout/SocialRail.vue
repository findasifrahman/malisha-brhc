<template>
  <!-- Chat Widget -->
  <div class="fixed bottom-6 right-6 z-40 lg:block">
    <button
      class="group flex items-center gap-3 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold px-6 py-4 shadow-2xl transition-all duration-200 hover:scale-105"
      @click="openChat"
    >
      <MessageCircle class="h-5 w-5" />
      <span class="hidden lg:inline">Chat</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { MessageCircle } from 'lucide-vue-next'

function openChat() {
  // Chat widget functionality
  alert('Chat widget will open here')
}
</script>
