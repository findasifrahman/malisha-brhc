<template>
  <teleport to="body">
    <div v-if="open" class="fixed inset-0 z-40 lg:hidden">
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="$emit('update:open', false)"></div>

      <div class="absolute inset-y-0 left-0 w-[min(320px,85vw)] p-4">
        <div class="flex h-full flex-col overflow-hidden rounded-2xl solid-surface shadow-xl">
          <div class="flex items-center justify-between gap-3 p-4 border-b border-border-subtle">
            <div class="text-base font-semibold text-text-primary">Menu</div>
            <button
              class="rounded-xl p-2 text-text-secondary transition hover:bg-brand-primary-weak hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary-weak"
              type="button"
              @click="$emit('update:open', false)"
            >
              <X class="h-4 w-4" />
            </button>
          </div>

          <div class="flex-1 overflow-y-auto px-3 py-4">
            <div class="space-y-1">
              <RouterLink
                v-for="it in items"
                :key="it.label"
                :to="it.to"
                class="block rounded-xl px-3 py-3 text-sm font-medium ring-1 ring-transparent transition hover:bg-brand-primary-weak hover:ring-border-subtle focus:outline-none focus:ring-2 focus:ring-brand-primary-weak"
                @click="$emit('update:open', false)"
              >
                <div class="font-semibold text-text-primary">{{ it.label }}</div>
                <div v-if="it.description" class="mt-1 text-xs text-muted">{{ it.description }}</div>
              </RouterLink>
            </div>

            <div class="mt-4 pt-4 border-t border-border-subtle space-y-2">
              <BaseButton v-if="!auth.isAuthed" class="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white" :icon="LogIn" @click="signIn">Login</BaseButton>
              <BaseButton v-else variant="outline" class="w-full" @click="logout">Logout</BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { LogIn, X } from 'lucide-vue-next'
import { BaseButton, useToast } from '@brhc/ui'
import { useAuthStore } from '../stores/auth'

defineProps<{ open: boolean }>()

defineEmits<{ (e: 'update:open', value: boolean): void }>()

const toast = useToast()
const router = useRouter()
const auth = useAuthStore()

const items = computed(() => [
  { label: 'Home', to: '/' },
  { label: 'Hospitals', to: '/hospitals', description: 'Browse hospitals' },
  { label: 'Services', to: '/services', description: 'Our services' },
  { label: 'Doctors', to: '/doctors', description: 'Medical specialists' },
  { label: 'Advanced Healthcare', to: '/healthcare-in-china', description: 'Guides and insights' },
  { label: 'Blogs', to: '/blogs', description: 'Latest news and updates' },
  { label: 'Patient Stories', to: '/patient-stories', description: 'Success stories' },
  { label: 'About', to: '/#about', description: 'About BRHC' },
  { label: 'Our Team', to: '/#our-team', description: 'Meet our team' },
  { label: 'Contact', to: '/contact', description: 'Get in touch' },
])

function signIn() {
  router.push('/sign-in')
  toast.push({ title: 'Sign in', message: 'Continue to sign in.', variant: 'info' })
}

function logout() {
  auth.clear()
  router.push('/sign-in')
}
</script>
