<template>
  <section class="space-y-4">
    <DataTableShell title="Advanced Healthcare" subtitle="Create and manage topics">
      <template #actions>
        <BaseButton
          size="sm"
          class="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0"
          @click="openCreate"
        >
          Add
        </BaseButton>
      </template>

      <div class="p-4">
        <div class="grid grid-cols-1 gap-3 md:grid-cols-12 md:items-end">
          <div class="md:col-span-8">
            <div class="text-xs font-semibold text-brhc-muted">Search</div>
            <div class="mt-2"><BaseInput v-model="q" placeholder="Search topics..." /></div>
          </div>
          <div class="md:col-span-4">
            <BaseButton class="w-full" variant="outline" @click="refresh">Search</BaseButton>
          </div>
        </div>

        <div class="mt-4 overflow-x-auto">
          <table class="w-full text-left text-base">
            <thead class="text-sm text-brhc-muted">
              <tr class="border-b border-white/10">
                <th class="py-3 pr-4">Name</th>
                <th class="py-3 pr-4">Featured</th>
                <th class="py-3 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading"><td class="py-6" colspan="3"><Skeleton height="1.2rem" /></td></tr>
              <tr v-else-if="items.length === 0"><td class="py-6 text-brhc-muted" colspan="3">No topics found.</td></tr>
              <tr v-for="a in items" :key="a.id" class="border-b border-white/5">
                <td class="py-3 pr-4 font-semibold">{{ a.name }}</td>
                <td class="py-3 pr-4 text-brhc-muted">{{ a.isFeatured ? 'Yes' : 'No' }}</td>
                <td class="py-3 pr-4">
                  <div class="flex flex-wrap gap-2">
                    <BaseButton size="sm" variant="outline" @click="openEdit(a)">Edit</BaseButton>
                    <BaseButton size="sm" variant="outline" @click="remove(a)">Delete</BaseButton>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="meta" class="mt-4">
          <Pagination :page="meta.page" :totalPages="totalPages" @update:page="setPage" />
        </div>
      </div>
    </DataTableShell>

    <Modal v-model:open="modalOpen" :title="editing ? 'Edit Topic' : 'Add Topic'">
      <div class="space-y-4">
        <div>
          <div class="text-xs font-semibold text-brhc-muted">Name</div>
          <div class="mt-2"><BaseInput v-model="form.name" /></div>
        </div>
        <div>
          <div class="text-xs font-semibold text-brhc-muted">Slug</div>
          <div class="mt-2"><BaseInput v-model="form.slug" placeholder="auto-generated if empty" /></div>
        </div>

        <div>
          <div class="text-xs font-semibold text-brhc-muted">Description</div>
          <div class="mt-2"><BaseTextarea v-model="form.description" placeholder="Optional" /></div>
        </div>

        <div>
          <div class="text-xs font-semibold text-brhc-muted">Short details</div>
          <div class="mt-2"><BaseTextarea v-model="form.shortDetailsText" placeholder="One per line" /></div>
        </div>

        <div class="rounded-2xl ring-1 ring-black/10 p-4">
          <div class="flex items-center justify-between gap-3">
            <div>
              <div class="text-sm font-semibold">Images</div>
              <div class="text-sm text-brhc-muted">Attach one or multiple images from Media</div>
            </div>
            <BaseButton size="sm" variant="outline" @click="openMediaPicker">Attach</BaseButton>
          </div>

          <div v-if="selectedMedia.length === 0" class="mt-3 text-sm text-brhc-muted">No images attached.</div>
          <div v-else class="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
            <div v-for="m in selectedMedia" :key="m.id" class="rounded-2xl bg-white ring-1 ring-black/10 overflow-hidden">
              <img :src="m.urlThumb ?? m.urlOriginal ?? m.url" class="h-24 w-full object-cover" />
              <div class="p-2">
                <div class="text-xs font-semibold truncate">{{ m.title ?? m.id }}</div>
                <div class="mt-2">
                  <BaseButton size="sm" variant="outline" class="w-full" @click="detachMedia(m.id)">Detach</BaseButton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <label class="inline-flex items-center gap-2 text-sm">
            <input v-model="form.isFeatured" type="checkbox" class="h-4 w-4" />
            <span>Featured</span>
          </label>
        </div>
      </div>

      <template #footer>
        <BaseButton :loading="saving" @click="save" style="background-color: brown;">Save</BaseButton>
      </template>
    </Modal>

    <Modal v-model:open="mediaPickerOpen" title="Select media" subtitle="Choose one or more images">
      <div class="space-y-4">
        <div>
          <div class="text-sm font-semibold text-brhc-muted">Search</div>
          <div class="mt-2"><BaseInput v-model="mediaQ" placeholder="Search title / url" /></div>
        </div>

        <div v-if="mediaLoading" class="py-6"><Skeleton height="1.2rem" /></div>
        <div v-else class="grid grid-cols-2 gap-3 md:grid-cols-4">
          <button
            v-for="m in mediaItems"
            :key="m.id"
            type="button"
            class="rounded-2xl overflow-hidden ring-1 transition-all"
            :class="selectedMediaIds.has(m.id) ? 'ring-red-500' : 'ring-black/10 hover:ring-black/30'"
            @click="toggleMedia(m)"
          >
            <img :src="m.urlThumb ?? m.urlOriginal ?? m.url" class="h-24 w-full object-cover" />
            <div class="p-2 text-left">
              <div class="text-xs font-semibold truncate">{{ m.title ?? m.id }}</div>
              <div class="mt-1 text-xs text-brhc-muted truncate">{{ m.id }}</div>
            </div>
          </button>
        </div>

        <div class="pt-2 flex items-center justify-between gap-3">
          <div class="text-sm text-brhc-muted">Selected: {{ selectedMediaIds.size }}</div>
          <BaseButton
            class="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0"
            @click="applyMediaSelection"
          >
            Apply
          </BaseButton>
        </div>
      </div>
    </Modal>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { BaseButton, BaseInput, BaseTextarea, DataTableShell, Modal, Pagination, Skeleton, useToast } from '@brhc/ui'
import { useAuthStore } from '../../stores/auth'
import { adminDelete, adminGet, adminList, adminPost, adminPut } from '../../lib/adminApi'

const toast = useToast()
const auth = useAuthStore()

const q = ref('')
const page = ref(1)

const items = ref<any[]>([])
const meta = ref<{ page: number; pageSize: number; total: number } | null>(null)
const loading = ref(false)

const modalOpen = ref(false)
const saving = ref(false)
const editing = ref<any | null>(null)

const mediaPickerOpen = ref(false)
const mediaQ = ref('')
const mediaItems = ref<any[]>([])
const mediaLoading = ref(false)
const selectedMedia = ref<any[]>([])
const selectedMediaIds = ref<Set<string>>(new Set())

const form = reactive({
  name: '',
  slug: '',
  description: '',
  shortDetailsText: '',
  isFeatured: false,
})

async function loadMedia() {
  mediaLoading.value = true
  try {
    const res = await adminList<any>(auth.token, '/admin/media', { page: 1, pageSize: 80, q: mediaQ.value || undefined })
    mediaItems.value = res.items
  } catch {
    mediaItems.value = []
  } finally {
    mediaLoading.value = false
  }
}

const totalPages = computed(() => {
  if (!meta.value) return undefined
  return Math.max(1, Math.ceil(meta.value.total / meta.value.pageSize))
})

async function load() {
  loading.value = true
  try {
    const res = await adminList<any>(auth.token, '/admin/advancedhealthcareinchina', { page: page.value, pageSize: 20, q: q.value || undefined })
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

function openCreate() {
  editing.value = null
  form.name = ''
  form.slug = ''
  form.description = ''
  form.shortDetailsText = ''
  form.isFeatured = false

  selectedMedia.value = []
  selectedMediaIds.value = new Set()
  modalOpen.value = true
}

async function openEdit(a: any) {
  modalOpen.value = true
  editing.value = a
  try {
    const res = await adminGet<any>(auth.token, `/admin/advancedhealthcareinchina/${a.id}`)
    const full = res.data
    editing.value = full
    form.name = full.name ?? ''
    form.slug = full.slug ?? ''
    form.description = full.description ?? ''
    form.shortDetailsText = Array.isArray(full.shortDetails) ? full.shortDetails.join('\n') : ''
    form.isFeatured = Boolean(full.isFeatured)

    const ms = (full.media ?? []).map((x: any) => x.media).filter(Boolean)
    selectedMedia.value = ms
    selectedMediaIds.value = new Set(ms.map((m: any) => m.id))
  } catch {
    // ignore
  }
}

function openMediaPicker() {
  mediaPickerOpen.value = true
  void loadMedia()
}

function toggleMedia(m: any) {
  const next = new Set(selectedMediaIds.value)
  if (next.has(m.id)) next.delete(m.id)
  else next.add(m.id)
  selectedMediaIds.value = next
}

function applyMediaSelection() {
  const allowed = selectedMediaIds.value
  const map = new Map<string, any>()
  for (const m of selectedMedia.value) map.set(m.id, m)
  for (const m of mediaItems.value) map.set(m.id, m)
  selectedMedia.value = Array.from(allowed).map((id) => map.get(id)).filter(Boolean)
  mediaPickerOpen.value = false
}

function detachMedia(mediaId: string) {
  const next = new Set(selectedMediaIds.value)
  next.delete(mediaId)
  selectedMediaIds.value = next
  selectedMedia.value = selectedMedia.value.filter((m) => m.id !== mediaId)
}

async function save() {
  if (!form.name.trim()) {
    toast.push({ title: 'Validation', message: 'Name is required.', variant: 'info' })
    return
  }

  const shortDetails = form.shortDetailsText
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean)

  saving.value = true
  try {
    let id: string
    if (editing.value?.id) {
      await adminPut(auth.token, `/admin/advancedhealthcareinchina/${editing.value.id}`, {
        name: form.name,
        slug: form.slug || undefined,
        description: form.description || undefined,
        shortDetails,
        isFeatured: form.isFeatured,
      })
      id = editing.value.id
    } else {
      const created = await adminPost<any>(auth.token, '/admin/advancedhealthcareinchina', {
        name: form.name,
        slug: form.slug || undefined,
        description: form.description || undefined,
        shortDetails,
        isFeatured: form.isFeatured,
      })
      id = created.data.id
    }

    await adminPost(auth.token, `/admin/advancedhealthcareinchina/${id}/media`, { mediaIds: Array.from(selectedMediaIds.value) })

    modalOpen.value = false
    await load()
  } catch (e) {
    toast.push({ title: 'Error', message: e instanceof Error ? e.message : String(e), variant: 'error' })
  } finally {
    saving.value = false
  }
}

async function remove(a: any) {
  if (!confirm(`Delete topic "${a.name}"?`)) return
  try {
    await adminDelete(auth.token, `/admin/advancedhealthcareinchina/${a.id}`)
    await load()
  } catch (e) {
    toast.push({ title: 'Error', message: e instanceof Error ? e.message : String(e), variant: 'error' })
  }
}

onMounted(load)
</script>
