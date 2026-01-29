<template>
  <section class="py-8">
    <div class="mx-auto w-full max-w-7xl space-y-10 px-4 lg:px-6">
      <div class="rounded-3xl border border-red-100 bg-gradient-to-br from-white via-red-50/40 to-yellow-50/30 p-6 shadow-sm">
        <SectionHeader title="Blogs" subtitle="Updates, guides, and announcements." />

        <div class="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div class="flex-1 rounded-2xl border border-red-100 bg-white px-3 py-2 shadow-sm">
            <div class="flex items-center gap-2">
              <Search class="h-4 w-4 text-red-600" />
              <BaseInput v-model="q" placeholder="Search blogs..." class="w-full border-0 bg-transparent px-0 focus:outline-none" />
            </div>
          </div>
          <BaseButton class="sm:w-40" variant="outline" @click="refresh">Search</BaseButton>
        </div>
      </div>

      <div v-if="loading" class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="i in 9" :key="i" class="overflow-hidden rounded-3xl border border-red-100 bg-white shadow-sm">
          <div class="h-44 bg-gradient-to-br from-red-50 to-yellow-50"></div>
          <div class="p-6">
            <Skeleton height="1.2rem" />
            <div class="mt-3"><SkeletonText :lines="3" /></div>
          </div>
        </div>
      </div>

    <div v-else-if="items.length === 0" class="rounded-2xl border border-red-100 bg-white p-6 text-sm text-brhc-muted">
      No blogs found.
    </div>

      <div v-else class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <RouterLink v-for="b in items" :key="b.id" :to="`/blogs/${b.slug}`" class="group">
          <div class="relative overflow-hidden rounded-3xl border border-red-100 bg-gradient-to-br from-white to-red-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-2xl">
            <div class="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-red-500/10 to-yellow-500/10 blur-2xl"></div>

          <div class="relative h-44 overflow-hidden">
            <img
              v-if="b.heroUrl"
              :src="b.heroUrl"
              :alt="b.title"
              class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div v-else class="flex h-full w-full items-center justify-center bg-gradient-to-br from-red-50 to-yellow-50">
              <div class="text-sm font-semibold text-red-600">Blog</div>
            </div>

            <div class="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-red-600 shadow-sm backdrop-blur">
              <Newspaper class="h-4 w-4" />
              Update
            </div>
          </div>

          <div class="relative p-6">
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0">
                <div class="truncate text-base font-bold text-gray-900 group-hover:text-red-600 transition-colors">{{ b.title }}</div>
                <div v-if="b.excerpt" class="mt-1 text-sm text-gray-600 line-clamp-2">{{ b.excerpt }}</div>
              </div>
              <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-500 to-red-600 shadow-sm">
                <Sparkles class="h-5 w-5 text-white transition-transform duration-500 group-hover:rotate-6" />
              </div>
            </div>

            <div v-if="b.author?.email" class="mt-4 flex items-center gap-2 text-sm text-gray-700">
              <User class="h-4 w-4 text-red-600" />
              <span class="line-clamp-1">{{ b.author.email }}</span>
            </div>

            <div v-if="b.publishedAt" class="mt-2 text-xs text-gray-500">{{ new Date(b.publishedAt).toLocaleDateString() }}</div>
          </div>
          </div>
        </RouterLink>
      </div>

      <div v-if="meta" class="pt-2">
        <Pagination :page="meta.page" :totalPages="totalPages" @update:page="setPage" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { BaseButton, BaseInput, Pagination, SectionHeader, Skeleton, SkeletonText } from '@brhc/ui'
import { Newspaper, Search, Sparkles, User } from 'lucide-vue-next'
import { getBlog, listBlogs } from '../lib/publicApi'

const route = useRoute()
const router = useRouter()

const q = ref((route.query.q as string | undefined) ?? '')
const page = ref(Number(route.query.page ?? 1))

const items = ref<any[]>([])
const meta = ref<{ page: number; pageSize: number; total: number } | null>(null)
const loading = ref(false)

const totalPages = computed(() => {
  if (!meta.value) return undefined
  return Math.max(1, Math.ceil(meta.value.total / meta.value.pageSize))
})

async function load() {
  loading.value = true
  try {
    const res = await listBlogs({ page: page.value, pageSize: 10, q: q.value || undefined })
    const detailed = await Promise.all(
      (res.items ?? []).map(async (b: any) => {
        try {
          const full = await getBlog(b.slug)
          const media = (full.data as any)?.media?.[0]?.media
          const heroUrl = media?.urlThumb || media?.url || null
          return { ...b, heroUrl }
        } catch {
          return { ...b, heroUrl: null }
        }
      }),
    )
    items.value = detailed
    meta.value = res.meta
  } finally {
    loading.value = false
  }
}

function refresh() {
  router.replace({ query: { ...route.query, q: q.value || undefined, page: 1 } })
}

function setPage(p: number) {
  router.replace({ query: { ...route.query, page: p } })
}

watch(
  () => route.query,
  () => {
    q.value = (route.query.q as string | undefined) ?? ''
    page.value = Number(route.query.page ?? 1)
    void load()
  },
)

onMounted(load)
</script>
