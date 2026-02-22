<template>
  <section class="mx-auto w-full max-w-6xl px-4 py-6 sm:py-10">
    <div class="flex items-center justify-between gap-3">
      <BaseButton variant="outline" @click="router.back()">Back</BaseButton>
      <div class="text-xs text-brhc-muted">Team member</div>
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
            <div class="mt-2 text-sm text-white/90">{{ data.designation }}</div>
            <div v-if="data.role" class="mt-1 text-sm text-white/90">{{ data.role }}</div>
          </div>

          <div class="bg-white">
            <img
              v-if="data.media?.url"
              class="h-80 w-full object-cover"
              :src="data.media.urlOriginal ?? data.media.url"
              :alt="data.media.alt ?? data.media.title ?? data.name"
            />
            <div v-else class="flex h-80 w-full items-center justify-center bg-gradient-to-br from-red-50 to-yellow-50">
              <div class="text-sm font-semibold text-red-600">Team</div>
            </div>
          </div>
        </Card>
      </div>

      <div class="lg:col-span-7 space-y-6">
        <Card className="p-6" :hoverable="false">
          <div class="text-lg font-semibold text-red-600">About</div>
          <div v-if="data.fullDesc" class="mt-4 whitespace-pre-line text-base leading-7 text-brhc-text">
            {{ data.fullDesc }}
          </div>
          <div v-else-if="data.shortDesc" class="mt-4 whitespace-pre-line text-base leading-7 text-brhc-text">
            {{ data.shortDesc }}
          </div>
          <div v-else class="mt-4 text-base text-brhc-muted">No description available.</div>
        </Card>
      </div>
    </div>

    <div v-else class="mt-6 text-sm text-brhc-muted">Not found.</div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { BaseButton, Card, Skeleton, SkeletonText } from '@brhc/ui'
import { getTeam } from '../lib/publicApi'

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const data = ref<any | null>(null)

async function load() {
  loading.value = true
  try {
    const slug = route.params.slug as string
    const res = await getTeam(slug)
    data.value = res.data
  } catch {
    data.value = null
  } finally {
    loading.value = false
  }
}

watch(() => route.params.slug, load)
onMounted(load)
</script>
