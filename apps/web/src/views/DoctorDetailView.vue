<template>
  <section class="mx-auto w-full max-w-6xl px-4 py-6 sm:py-10">
    <div class="flex items-center justify-between gap-3">
      <BaseButton variant="outline" @click="router.back()">Back</BaseButton>
      <div class="text-xs text-brhc-muted">Doctor</div>
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
            <div v-if="data.nameCn" class="mt-1 text-white/90">{{ data.nameCn }}</div>
            <div v-if="data.specialty || data.title" class="mt-2 text-sm text-white/90">
              {{ data.specialty ?? data.title }}
            </div>

          </div>

          <div v-if="hero" class="bg-white">
            <video v-if="hero.mimeType?.startsWith('video/')" class="w-full" controls :src="hero.urlOriginal ?? hero.url"></video>
            <img v-else class="h-100 w-full object-cover" :src="hero.urlOriginal ?? hero.url" :alt="hero.title ?? data.name" />
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

        <Card v-if="hasAnyContact" className="mt-6 p-6" :hoverable="false">
          <div class="text-lg font-semibold text-red-600">Contact</div>
          <div class="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
            <div v-if="data.phone" class="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <div class="text-xs font-semibold text-brhc-muted">Phone</div>
              <div class="mt-1 font-medium">{{ data.phone }}</div>
            </div>
            <div v-if="data.wechat" class="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <div class="text-xs font-semibold text-brhc-muted">WeChat</div>
              <div class="mt-1 font-medium">{{ data.wechat }}</div>
            </div>
            <div v-if="data.address" class="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 sm:col-span-2">
              <div class="text-xs font-semibold text-brhc-muted">Address</div>
              <div class="mt-1 font-medium">{{ data.address }}</div>
            </div>
          </div>
        </Card>
      </div>

      <div class="lg:col-span-7 space-y-6">
        <Card className="p-6" :hoverable="false">
          <div class="text-lg font-semibold text-red-600">Profile</div>
          <div v-if="data.bio" class="mt-4 whitespace-pre-line text-base leading-7 text-brhc-text">
            {{ data.bio }}
          </div>
          <ul v-if="(data.shortDetails?.length ?? 0) > 0" class="mt-5 list-disc space-y-2 pl-5 text-base text-brhc-muted">
            <li v-for="(d, idx) in data.shortDetails" :key="idx">{{ d }}</li>
          </ul>
        </Card>

        <Card v-if="data.socialAppointments" className="p-6" :hoverable="false">
          <div class="text-lg font-semibold text-red-600">Social appointments</div>
          <div class="mt-4 whitespace-pre-line text-base leading-7 text-brhc-text">{{ data.socialAppointments }}</div>
        </Card>

        <Card v-if="data.professionalExpertise" className="p-6" :hoverable="false">
          <div class="text-lg font-semibold text-red-600">Professional expertise</div>
          <div class="mt-4 whitespace-pre-line text-base leading-7 text-brhc-text">{{ data.professionalExpertise }}</div>
        </Card>

        <Card v-if="data.clinicalExperience" className="p-6" :hoverable="false">
          <div class="text-lg font-semibold text-red-600">Clinical experience</div>
          <div class="mt-4 whitespace-pre-line text-base leading-7 text-brhc-text">{{ data.clinicalExperience }}</div>
        </Card>

        <Card v-if="data.academicAchievement" className="p-6" :hoverable="false">
          <div class="text-lg font-semibold text-red-600">Academic achievement</div>
          <div class="mt-4 whitespace-pre-line text-base leading-7 text-brhc-text">{{ data.academicAchievement }}</div>
        </Card>

        <Card v-if="data.other1DescName || data.otherDesc" className="p-6" :hoverable="false">
          <div class="text-lg font-semibold text-red-600">More</div>
          <div v-if="data.other1DescName" class="mt-4 text-sm font-semibold text-brhc-muted">{{ data.other1DescName }}</div>
          <div v-if="data.otherDesc" class="mt-2 whitespace-pre-line text-base leading-7 text-brhc-text">{{ data.otherDesc }}</div>
        </Card>

        <Card v-if="relatedDoctors.length" className="p-6" :hoverable="false">
          <div class="flex items-center justify-between gap-3">
            <div class="text-lg font-semibold text-red-600">Related doctors</div>
            <RouterLink class="text-sm font-semibold text-red-600 underline underline-offset-4" to="/doctors">View all</RouterLink>
          </div>
          <div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <RouterLink
              v-for="d in relatedDoctors"
              :key="d.id"
              :to="`/doctors/${d.slug}`"
              class="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 transition hover:ring-white/20"
            >
              <div class="text-base font-semibold">{{ d.name }}</div>
              <div class="mt-1 text-sm text-brhc-muted">{{ d.specialty ?? d.title ?? '' }}</div>
              <div v-if="d.hospital?.name" class="mt-2 text-xs text-brhc-muted">{{ d.hospital.name }}</div>
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
import { getDoctor, listDoctors } from '../lib/publicApi'

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const data = ref<any | null>(null)
const selectedMediaId = ref<string | null>(null)
const relatedDoctors = ref<any[]>([])

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

const hasAnyContact = computed(() => Boolean(data.value?.phone || data.value?.wechat || data.value?.address))

async function load() {
  loading.value = true
  try {
    const slug = route.params.slug as string
    const res = await getDoctor(slug)
    data.value = res.data
    selectedMediaId.value = null

    try {
      const q = (data.value?.specialty || data.value?.title || '').toString().trim()
      const rel = await listDoctors({ page: 1, pageSize: 8, q: q || undefined })
      relatedDoctors.value = (rel.items ?? []).filter((d: any) => d.slug !== slug).slice(0, 4)
    } catch {
      relatedDoctors.value = []
    }
  } catch {
    data.value = null
    relatedDoctors.value = []
  } finally {
    loading.value = false
  }
}

watch(() => route.params.slug, load)
onMounted(load)
</script>
