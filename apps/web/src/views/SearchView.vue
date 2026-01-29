<template>
  <section class="space-y-8">
    <div class="rounded-3xl border border-red-100 bg-gradient-to-br from-white via-red-50/40 to-yellow-50/30 p-6 shadow-sm">
      <SectionHeader title="Search" subtitle="Search hospitals, doctors, and healthcare topics." />

      <div class="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div class="flex-1 rounded-2xl border border-red-100 bg-white px-3 py-2 shadow-sm">
          <div class="flex items-center gap-2">
            <Search class="h-4 w-4 text-red-600" />
            <BaseInput
              v-model="q"
              placeholder="Search hospitals, doctors, advanced healthcare..."
              class="w-full border-0 bg-transparent px-0 focus:outline-none"
              @keyup.enter="run"
            />
          </div>
        </div>
        <BaseButton class="sm:w-40" @click="run">Search</BaseButton>
      </div>

      <div class="mt-5 flex flex-wrap gap-2">
        <button
          class="rounded-full px-4 py-2 text-sm font-semibold transition"
          :class="tab === 'hospitals' ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm' : 'bg-white text-gray-700 border border-red-100 hover:border-red-200'"
          @click="tab = 'hospitals'"
        >
          Hospitals
        </button>
        <button
          class="rounded-full px-4 py-2 text-sm font-semibold transition"
          :class="tab === 'doctors' ? 'bg-gradient-to-r from-yellow-500 to-red-600 text-white shadow-sm' : 'bg-white text-gray-700 border border-red-100 hover:border-red-200'"
          @click="tab = 'doctors'"
        >
          Doctors
        </button>
        <button
          class="rounded-full px-4 py-2 text-sm font-semibold transition"
          :class="tab === 'advanced' ? 'bg-gradient-to-r from-red-500 to-yellow-500 text-white shadow-sm' : 'bg-white text-gray-700 border border-red-100 hover:border-red-200'"
          @click="tab = 'advanced'"
        >
          Advanced
        </button>
      </div>
    </div>

    <div v-if="loading" class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="i in 9" :key="i" class="overflow-hidden rounded-3xl border border-red-100 bg-white shadow-sm">
        <div class="h-44 bg-gradient-to-br from-red-50 to-yellow-50"></div>
        <div class="p-6">
          <Skeleton height="1.2rem" />
          <div class="mt-3"><SkeletonText :lines="2" /></div>
        </div>
      </div>
    </div>

    <div v-else-if="!hasQuery" class="rounded-2xl border border-red-100 bg-white p-6 text-sm text-brhc-muted">
      Type a search query to see results.
    </div>

    <div v-else>
      <template v-if="tab === 'hospitals'">
        <div v-if="(results?.hospitals.length ?? 0) === 0" class="rounded-2xl border border-red-100 bg-white p-6 text-sm text-brhc-muted">No hospitals found.</div>
        <div v-else class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <RouterLink v-for="h in results?.hospitals ?? []" :key="h.id" :to="`/hospitals/${h.slug}`" class="group">
            <div class="relative overflow-hidden rounded-3xl border border-red-100 bg-gradient-to-br from-white to-red-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-2xl">
              <div class="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-red-500/10 to-yellow-500/10 blur-2xl"></div>
              <div class="relative h-44 overflow-hidden">
                <img v-if="h.heroUrl" :src="h.heroUrl" :alt="h.name" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div v-else class="flex h-full w-full items-center justify-center bg-gradient-to-br from-red-50 to-yellow-50">
                  <div class="text-sm font-semibold text-red-600">Hospital</div>
                </div>
                <div class="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-red-600 shadow-sm backdrop-blur">
                  <Hospital class="h-4 w-4" />
                  Partner
                </div>
              </div>
              <div class="relative p-6">
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <div class="truncate text-base font-bold text-gray-900 group-hover:text-red-600 transition-colors">{{ h.name }}</div>
                    <div class="mt-1 truncate text-sm text-gray-600">{{ h.city?.name ?? '' }} {{ h.province?.name ? `• ${h.province.name}` : '' }}</div>
                  </div>
                  <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-500 to-red-600 shadow-sm">
                    <Sparkles class="h-5 w-5 text-white transition-transform duration-500 group-hover:rotate-6" />
                  </div>
                </div>
              </div>
            </div>
          </RouterLink>
        </div>
      </template>

      <template v-else-if="tab === 'doctors'">
        <div v-if="(results?.doctors.length ?? 0) === 0" class="rounded-2xl border border-red-100 bg-white p-6 text-sm text-brhc-muted">No doctors found.</div>
        <div v-else class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <RouterLink v-for="d in results?.doctors ?? []" :key="d.id" :to="`/doctors/${d.slug}`" class="group">
            <div class="relative overflow-hidden rounded-3xl border border-red-100 bg-gradient-to-br from-white to-red-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-2xl">
              <div class="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-red-500/10 to-yellow-500/10 blur-2xl"></div>
              <div class="relative h-44 overflow-hidden">
                <img v-if="d.heroUrl" :src="d.heroUrl" :alt="d.name" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div v-else class="flex h-full w-full items-center justify-center bg-gradient-to-br from-red-50 to-yellow-50">
                  <div class="text-sm font-semibold text-red-600">Doctor</div>
                </div>
                <div class="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-red-600 shadow-sm backdrop-blur">
                  <Stethoscope class="h-4 w-4" />
                  Specialist
                </div>
              </div>
              <div class="relative p-6">
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <div class="truncate text-base font-bold text-gray-900 group-hover:text-red-600 transition-colors">{{ d.name }}</div>
                    <div class="mt-1 truncate text-sm text-gray-600">{{ d.specialty ?? d.title ?? '' }}</div>
                  </div>
                  <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-red-600 shadow-sm">
                    <Sparkles class="h-5 w-5 text-white transition-transform duration-500 group-hover:rotate-6" />
                  </div>
                </div>
              </div>
            </div>
          </RouterLink>
        </div>
      </template>

      <template v-else>
        <div v-if="(results?.advanced.length ?? 0) === 0" class="rounded-2xl border border-red-100 bg-white p-6 text-sm text-brhc-muted">No topics found.</div>
        <div v-else class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <RouterLink v-for="a in results?.advanced ?? []" :key="a.id" :to="`/healthcare-in-china/${a.slug}`" class="group">
            <div class="relative overflow-hidden rounded-3xl border border-red-100 bg-gradient-to-br from-white to-red-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-2xl">
              <div class="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-red-500/10 to-yellow-500/10 blur-2xl"></div>
              <div class="relative h-44 overflow-hidden">
                <img v-if="a.heroUrl" :src="a.heroUrl" :alt="a.name" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div v-else class="flex h-full w-full items-center justify-center bg-gradient-to-br from-red-50 to-yellow-50">
                  <div class="text-sm font-semibold text-red-600">Topic</div>
                </div>
                <div class="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-red-600 shadow-sm backdrop-blur">
                  <Lightbulb class="h-4 w-4" />
                  Guide
                </div>
              </div>
              <div class="relative p-6">
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <div class="truncate text-base font-bold text-gray-900 group-hover:text-red-600 transition-colors">{{ a.name }}</div>
                  </div>
                  <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-yellow-500 shadow-sm">
                    <Sparkles class="h-5 w-5 text-white transition-transform duration-500 group-hover:rotate-6" />
                  </div>
                </div>
              </div>
            </div>
          </RouterLink>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { BaseButton, BaseInput, SectionHeader, Skeleton, SkeletonText } from '@brhc/ui'
import { Hospital, Lightbulb, Search, Sparkles, Stethoscope } from 'lucide-vue-next'
import { getDoctor, getHealthcareInChina, getHospital, searchAll } from '../lib/publicApi'

const route = useRoute()
const router = useRouter()

const q = ref((route.query.q as string | undefined) ?? '')
const tab = ref<'hospitals' | 'doctors' | 'advanced'>('hospitals')

const results = ref<any | null>(null)
const loading = ref(false)

const hasQuery = computed(() => q.value.trim().length > 0)

async function load() {
  if (!hasQuery.value) {
    results.value = null
    return
  }

  loading.value = true
  try {
    const res = await searchAll(q.value.trim(), 20)
    const base = res.data as any

    const hospitalsDetailed = await Promise.all(
      (base?.hospitals ?? []).map(async (h: any) => {
        try {
          const full = await getHospital(h.slug)
          const media = (full.data as any)?.media?.[0]?.media
          const heroUrl = media?.urlThumb || media?.url || null
          return { ...h, heroUrl }
        } catch {
          return { ...h, heroUrl: null }
        }
      }),
    )

    const doctorsDetailed = await Promise.all(
      (base?.doctors ?? []).map(async (d: any) => {
        try {
          const full = await getDoctor(d.slug)
          const media = (full.data as any)?.media?.[0]?.media
          const heroUrl = media?.urlThumb || media?.url || null
          return { ...d, heroUrl }
        } catch {
          return { ...d, heroUrl: null }
        }
      }),
    )

    const advancedDetailed = await Promise.all(
      (base?.advanced ?? []).map(async (a: any) => {
        try {
          const full = await getHealthcareInChina(a.slug)
          const media = (full.data as any)?.media?.[0]?.media
          const heroUrl = media?.urlThumb || media?.url || null
          return { ...a, heroUrl }
        } catch {
          return { ...a, heroUrl: null }
        }
      }),
    )

    results.value = { hospitals: hospitalsDetailed, doctors: doctorsDetailed, advanced: advancedDetailed }
  } finally {
    loading.value = false
  }
}

function run() {
  router.replace({ query: { q: q.value || undefined } })
}

watch(
  () => route.query.q,
  () => {
    q.value = (route.query.q as string | undefined) ?? ''
    void load()
  },
)

onMounted(load)
</script>
