<template>
  <div class="min-h-screen bg-brhc-ink0 font-sans text-brhc-text">
    <div class="pointer-events-none fixed inset-0 -z-10 bg-[image:var(--brhc-gradient-hero)]"></div>

    <div class="flex">
      <aside class="hidden min-h-screen w-64 shrink-0 border-r border-white/10 bg-black/20 lg:block">
        <div class="p-5">
          <div class="text-sm font-semibold">Admin</div>
          <div class="mt-1 text-xs text-brhc-muted">Belt and Road Healthcare</div>
        </div>
        <nav class="space-y-1 px-3 pb-6">
          <AdminNavItem v-for="it in items" :key="it.to" :item="it" />
        </nav>
      </aside>

      <teleport to="body">
        <div v-if="mobileOpen" class="fixed inset-0 z-40 lg:hidden">
          <div class="absolute inset-0 bg-black/60" @click="mobileOpen = false"></div>
          <div class="absolute inset-y-0 left-0 w-[min(360px,90vw)] p-4">
            <div class="h-full overflow-hidden rounded-2xl bg-brhc-glass/85 ring-1 ring-brhc-glassBorder backdrop-blur-md shadow-soft">
              <div class="flex items-center justify-between gap-3 p-4">
                <div class="text-sm font-semibold">Admin</div>
                <button class="rounded-xl p-2 text-brhc-muted transition hover:bg-white/5 hover:text-brhc-text" type="button" @click="mobileOpen = false">
                  <X class="h-4 w-4" />
                </button>
              </div>
              <nav class="space-y-1 px-3 pb-4">
                <RouterLink
                  v-for="it in items"
                  :key="it.to"
                  :to="it.to"
                  class="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm ring-1 ring-transparent transition hover:bg-white/5"
                  @click="mobileOpen = false"
                >
                  <component :is="it.icon" class="h-4 w-4 text-brhc-muted" />
                  <span class="font-semibold text-brhc-text">{{ it.label }}</span>
                </RouterLink>
              </nav>
            </div>
          </div>
        </div>
      </teleport>

      <div class="min-w-0 flex-1">
        <header class="sticky top-0 z-20 border-b border-white/10 bg-black/20 backdrop-blur-md">
          <div class="mx-auto w-full max-w-7xl px-5 py-4">
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-2">
                <button
                  class="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10 transition hover:bg-white/10 hover:ring-white/20 lg:hidden"
                  type="button"
                  @click="mobileOpen = true"
                >
                  <Menu class="h-5 w-5" />
                </button>

                <div class="text-sm font-semibold">Dashboard</div>
              </div>

              <div class="flex items-center gap-2">
                <BaseInput v-model="topSearch" placeholder="Search…" />
                <BaseButton variant="outline" size="sm" :icon="LogOut" @click="logout">Logout</BaseButton>
              </div>
            </div>
          </div>
        </header>

        <main class="mx-auto w-full max-w-7xl px-5 pb-20 pt-6">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import {
  LayoutDashboard,
  Stethoscope,
  Building2,
  BriefcaseMedical,
  MapPinned,
  Globe,
  FileText,
  HeartHandshake,
  Image,
  Users,
  LogOut,
  Menu,
  X,
} from 'lucide-vue-next'
import { BaseButton, BaseInput } from '@brhc/ui'
import { useAuthStore } from '../stores/auth'
import AdminNavItem from './components/AdminNavItem.vue'

const router = useRouter()
const auth = useAuthStore()

const mobileOpen = ref(false)
const topSearch = ref('')

const items = computed(() => [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard },
  { label: 'Doctors', to: '/admin/doctors', icon: Stethoscope },
  { label: 'Hospitals', to: '/admin/hospitals', icon: Building2 },
  { label: 'Services', to: '/admin/services', icon: BriefcaseMedical },
  { label: 'Advanced Healthcare', to: '/admin/advanced', icon: Globe },
  { label: 'Blogs', to: '/admin/blogs', icon: FileText },
  { label: 'Patient Stories', to: '/admin/patient-stories', icon: HeartHandshake },
  { label: 'Locations', to: '/admin/locations', icon: MapPinned },
  { label: 'Media', to: '/admin/media', icon: Image },
  { label: 'Users', to: '/admin/users', icon: Users },
])

function logout() {
  auth.clear()
  router.push('/sign-in')
}
</script>
