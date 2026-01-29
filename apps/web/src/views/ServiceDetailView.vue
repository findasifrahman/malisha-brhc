<template>
  <section class="mx-auto w-full max-w-6xl px-4 py-6 sm:py-10">
    <div class="flex items-center justify-between gap-3">
      <BaseButton variant="outline" @click="router.back()">Back</BaseButton>
      <div class="text-xs text-brhc-muted">Service</div>
    </div>

    <Card v-if="loading" className="mt-5 p-6" :hoverable="false">
      <Skeleton height="1.2rem" />
      <div class="mt-3"><SkeletonText :lines="6" /></div>
    </Card>

    <div v-else-if="data" class="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div class="lg:col-span-5">
        <Card className="overflow-hidden" :hoverable="false">
          <div class="bg-gradient-to-r from-red-600 to-red-700 px-6 py-6 text-white">
            <div class="text-2xl font-bold leading-tight sm:text-3xl">{{ data.name }}</div>
            <div v-if="data.serviceType" class="mt-2 text-sm text-white/90">{{ data.serviceType }}</div>
          </div>

          <div v-if="hero" class="bg-white">
            <video v-if="hero.mimeType?.startsWith('video/')" class="w-full" controls :src="hero.urlOriginal ?? hero.url"></video>
            <img v-else class="h-80 w-full object-cover" :src="hero.urlOriginal ?? hero.url" :alt="hero.title ?? data.name" />
          </div>

          <div v-if="mediaItems.length" class="bg-white px-4 py-4">
            <div class="grid grid-cols-4 gap-2">
              <button
                v-for="m in mediaItems.slice(0, 8)"
                :key="m.id"
                type="button"
                class="overflow-hidden rounded-xl ring-1 ring-black/10 transition hover:ring-black/30"
                @click="selectedMediaId = m.id"
              >
                <div v-if="m.mimeType?.startsWith('video/')" class="flex h-14 w-full items-center justify-center bg-gray-100 text-xs text-gray-600">
                  Video
                </div>
                <img v-else class="h-14 w-full object-cover" :src="m.urlThumb ?? m.urlOriginal ?? m.url" :alt="m.title ?? data.name" />
              </button>
            </div>
          </div>
        </Card>
      </div>

      <div class="lg:col-span-7 space-y-6">
        <Card className="p-6" :hoverable="false">
          <div class="text-lg font-semibold text-red-600">Overview</div>
          <div v-if="data.description" class="mt-4 whitespace-pre-line text-base leading-7 text-brhc-text">{{ data.description }}</div>
          <ul v-if="(data.shortDetails?.length ?? 0) > 0" class="mt-5 list-disc space-y-2 pl-5 text-base text-brhc-muted">
            <li v-for="(d, idx) in data.shortDetails" :key="idx">{{ d }}</li>
          </ul>
        </Card>

        <Card v-if="relatedServices.length" className="p-6" :hoverable="false">
          <div class="flex items-center justify-between gap-3">
            <div class="text-lg font-semibold text-red-600">More services</div>
            <RouterLink class="text-sm font-semibold text-red-600 underline underline-offset-4" to="/services">View all</RouterLink>
          </div>
          <div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <RouterLink
              v-for="s in relatedServices"
              :key="s.id"
              :to="`/services/${s.slug}`"
              class="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 transition hover:ring-white/20"
            >
              <div class="text-base font-semibold">{{ s.name }}</div>
              <div class="mt-1 text-sm text-brhc-muted">{{ s.serviceType }}</div>
            </RouterLink>
          </div>
        </Card>
      </div>
    </div>

    <div v-else class="mt-6 text-sm text-brhc-muted">Not found.</div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { BaseButton, Card, Skeleton, SkeletonText } from '@brhc/ui'
import { getService, listServices } from '../lib/publicApi'

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const data = ref<any | null>(null)
const selectedMediaId = ref<string | null>(null)
const relatedServices = ref<any[]>([])

const mediaItems = computed<any[]>(() => {
  const ms = (data.value?.media ?? []).map((x: any) => x.media).filter(Boolean)
  return ms
})

const hero = computed<any | null>(() => {
  const ms = mediaItems.value
  if (!ms.length) return null
  if (selectedMediaId.value) {
    const found = ms.find((m) => m.id === selectedMediaId.value)
    if (found) return found
  }
  return ms[0]
})

async function load() {
  loading.value = true
  try {
    const slug = route.params.slug as string
    const res = await getService(slug)
    data.value = res.data
    selectedMediaId.value = null

    try {
      const q = (data.value?.serviceType || '').toString().trim()
      const rel = await listServices({ page: 1, pageSize: 8, q: q || undefined })
      relatedServices.value = (rel.items ?? []).filter((s: any) => s.slug !== slug).slice(0, 4)
    } catch {
      relatedServices.value = []
    }
  } catch {
    data.value = null
    relatedServices.value = []
  } finally {
    loading.value = false
  }
}

watch(() => route.params.slug, load)
onMounted(load)
</script>
