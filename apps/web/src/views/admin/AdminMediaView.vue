<template>
  <section class="space-y-4">
    <DataTableShell title="Media" subtitle="Upload, preview, and delete media">
      <template #actions>
        <BaseButton
          size="sm"
          class="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0"
          @click="openUpload"
        >
          Upload
        </BaseButton>
      </template>

      <div class="p-4">
        <div class="grid grid-cols-1 gap-3 md:grid-cols-12 md:items-end">
          <div class="md:col-span-8">
            <div class="text-xs font-semibold text-brhc-muted">Search</div>
            <div class="mt-2"><BaseInput v-model="q" placeholder="Search media..." /></div>
          </div>
          <div class="md:col-span-4">
            <BaseButton class="w-full" variant="outline" @click="refresh">Search</BaseButton>
          </div>
        </div>

        <div v-if="loading" class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <Card v-for="i in 10" :key="i" className="overflow-hidden" :hoverable="false">
            <Skeleton height="8rem" />
          </Card>
        </div>

        <div v-else-if="items.length === 0" class="mt-4 text-sm text-brhc-muted">No media found.</div>

        <div v-else class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <button
            v-for="m in items"
            :key="m.id"
            type="button"
            class="overflow-hidden rounded-2xl ring-1 ring-white/10 transition hover:ring-white/20"
            @click="preview(m)"
          >
            <img
              v-if="!m.mimeType?.startsWith('video/')"
              :src="m.urlThumb ?? m.urlOriginal ?? m.url"
              :alt="m.title ?? 'media'"
              loading="lazy"
              class="h-28 w-full object-cover"
            />
            <div v-else class="h-28 w-full bg-gray-100 flex items-center justify-center text-xs text-gray-600">
              <div class="text-center">
                <div class="text-2xl mb-1">🎬</div>
                <div>Video</div>
              </div>
            </div>
          </button>
        </div>

        <div v-if="meta" class="mt-4">
          <Pagination :page="meta.page" :totalPages="totalPages" @update:page="setPage" />
        </div>
      </div>
    </DataTableShell>

    <Modal v-model:open="uploadOpen" title="Upload media" subtitle="Upload to R2 and store in Media library">
      <div class="space-y-4">
        <div>
          <div class="text-sm font-semibold text-brhc-muted">Title</div>
          <div class="mt-2"><BaseInput v-model="title" placeholder="Optional title" /></div>
        </div>
        <div>
          <div class="text-sm font-semibold text-brhc-muted">Category</div>
          <div class="mt-2">
            <BaseSelect v-model="category">
              <option value="gallery">gallery</option>
              <option value="service">service</option>
              <option value="blogs">blogs</option>
              <option value="users">users</option>
              <option value="partners">partners</option>
              <option value="hospitals">hospitals</option>
              <option value="doctors">doctors</option>
              <option value="advancedhealthcareinchina">advancedhealthcareinchina</option>
              <option value="patientstory">patientstory</option>
            </BaseSelect>
          </div>
        </div>
        <div>
          <div class="text-sm font-semibold text-brhc-muted">File</div>
          <div class="mt-2">
            <input type="file" accept="image/*,video/mp4" @change="onFile" />
            <div class="mt-1 text-xs text-brhc-muted">Images: max 1MB | Videos (mp4): max 25MB</div>
          </div>
        </div>
        <div class="pt-2">
          <BaseButton
            class="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0"
            :loading="uploading"
            @click="upload"
          >
            Upload
          </BaseButton>
        </div>
      </div>
    </Modal>

    <Modal v-model:open="previewOpen" title="Media">
      <div v-if="selected" class="space-y-3">
        <video
          v-if="selected.mimeType?.startsWith('video/')"
          controls
          class="max-h-[60vh] w-full rounded-2xl"
        >
          <source :src="selected.urlOriginal ?? selected.url" type="video/mp4" />
        </video>
        <img
          v-else
          :src="selected.urlOriginal ?? selected.url"
          class="max-h-[60vh] w-full rounded-2xl object-contain"
        />
        <div class="flex items-center justify-between gap-2">
          <div class="text-xs text-brhc-muted">{{ selected.id }}</div>
          <BaseButton size="sm" variant="outline" :loading="deleting" @click="removeSelected">Delete</BaseButton>
        </div>
      </div>
    </Modal>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { BaseButton, BaseInput, BaseSelect, Card, DataTableShell, Modal, Pagination, Skeleton, useToast } from '@brhc/ui'
import { useAuthStore } from '../../stores/auth'
import { adminList, deleteMedia, uploadMedia } from '../../lib/adminApi'

const toast = useToast()
const auth = useAuthStore()

const q = ref('')
const page = ref(1)

const items = ref<any[]>([])
const meta = ref<{ page: number; pageSize: number; total: number } | null>(null)
const loading = ref(false)

const uploadOpen = ref(false)
const uploading = ref(false)
const category = ref('gallery')
const file = ref<File | null>(null)
const title = ref('')

const previewOpen = ref(false)
const selected = ref<any | null>(null)
const deleting = ref(false)

const totalPages = computed(() => {
  if (!meta.value) return undefined
  return Math.max(1, Math.ceil(meta.value.total / meta.value.pageSize))
})

async function load() {
  loading.value = true
  try {
    const res = await adminList<any>(auth.token, '/admin/media', { page: page.value, pageSize: 25, q: q.value || undefined })
    items.value = res.items
    meta.value = res.meta
  } catch (e) {
    toast.push({ title: 'Error', message: e instanceof Error ? e.message : String(e), variant: 'error' })
  } finally {
    loading.value = false
  }
}

function refresh() {
  page.value = 1
  void load()
}

function setPage(p: number) {
  page.value = p
  void load()
}

function openUpload() {
  uploadOpen.value = true
  file.value = null
  title.value = ''
}

function onFile(e: Event) {
  const input = e.target as HTMLInputElement
  const f = input.files?.[0] ?? null
  if (!f) {
    file.value = null
    return
  }
  const isImage = f.type.startsWith('image/')
  const isVideo = f.type === 'video/mp4'
  if (!isImage && !isVideo) {
    toast.push({ title: 'Invalid file type', message: 'Only images and mp4 videos are allowed.', variant: 'error' })
    file.value = null
    return
  }
  const maxSize = isImage ? 1 * 1024 * 1024 : 25 * 1024 * 1024 // 1MB for images, 25MB for videos
  if (f.size > maxSize) {
    const limit = isImage ? '1MB' : '25MB'
    toast.push({ title: 'File too large', message: `File size exceeds ${limit} limit.`, variant: 'error' })
    file.value = null
    return
  }
  file.value = f
}

async function upload() {
  if (!file.value) {
    toast.push({ title: 'Validation', message: 'Select a file.', variant: 'info' })
    return
  }

  uploading.value = true
  try {
    await uploadMedia(auth.token, category.value, file.value, title.value.trim() || undefined)
    uploadOpen.value = false
    await load()
  } catch (e) {
    toast.push({ title: 'Upload failed', message: e instanceof Error ? e.message : String(e), variant: 'error' })
  } finally {
    uploading.value = false
  }
}

function preview(m: any) {
  selected.value = m
  previewOpen.value = true
}

async function removeSelected() {
  if (!selected.value) return
  if (!confirm('Delete this media?')) return

  deleting.value = true
  try {
    await deleteMedia(auth.token, selected.value.id)
    previewOpen.value = false
    selected.value = null
    await load()
  } catch (e) {
    toast.push({ title: 'Delete failed', message: e instanceof Error ? e.message : String(e), variant: 'error' })
  } finally {
    deleting.value = false
  }
}

onMounted(load)
</script>
