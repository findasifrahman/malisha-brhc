<template>
  <section class="space-y-4">
    <DataTableShell title="Teams" subtitle="Create and manage team members">
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
            <div class="text-sm font-semibold text-brhc-muted">Search</div>
            <div class="mt-2"><BaseInput v-model="q" placeholder="Search team members..." /></div>
          </div>
          <div class="md:col-span-4">
            <BaseButton class="w-full" variant="outline" @click="refresh">Search</BaseButton>
          </div>
        </div>

        <div class="mt-4 overflow-x-auto">
          <table class="w-full text-left text-base">
            <thead class="text-sm text-brhc-muted">
              <tr class="border-b border-black/10">
                <th class="py-3 pr-4">Name</th>
                <th class="py-3 pr-4">Designation</th>
                <th class="py-3 pr-4">Role</th>
                <th class="py-3 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading"><td class="py-6" colspan="4"><Skeleton height="1.2rem" /></td></tr>
              <tr v-else-if="items.length === 0"><td class="py-6 text-brhc-muted" colspan="4">No team members found.</td></tr>
              <tr v-for="t in items" :key="t.id" class="border-b border-black/5">
                <td class="py-3 pr-4 font-semibold">{{ t.name }}</td>
                <td class="py-3 pr-4 text-brhc-muted">{{ t.designation }}</td>
                <td class="py-3 pr-4 text-brhc-muted">{{ t.role }}</td>
                <td class="py-3 pr-4">
                  <div class="flex flex-wrap gap-2">
                    <BaseButton size="sm" variant="outline" @click="openEdit(t)">Edit</BaseButton>
                    <BaseButton size="sm" variant="outline" @click="remove(t)">Delete</BaseButton>
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

    <Modal v-model:open="modalOpen" :title="editing ? 'Edit Team member' : 'Add Team member'" subtitle="Attach an image from Media">
      <div class="space-y-4">
        <div>
          <div class="text-sm font-semibold text-brhc-muted">Name</div>
          <div class="mt-2"><BaseInput v-model="form.name" /></div>
        </div>

        <div>
          <div class="text-sm font-semibold text-brhc-muted">Slug</div>
          <div class="mt-2"><BaseInput v-model="form.slug" placeholder="auto-generated if empty" /></div>
        </div>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <div class="text-sm font-semibold text-brhc-muted">Designation</div>
            <div class="mt-2"><BaseInput v-model="form.designation" placeholder="e.g. Chairman" /></div>
          </div>
          <div>
            <div class="text-sm font-semibold text-brhc-muted">Role</div>
            <div class="mt-2"><BaseInput v-model="form.role" placeholder="e.g. Management" /></div>
          </div>
        </div>

        <div>
          <div class="text-sm font-semibold text-brhc-muted">Short description</div>
          <div class="mt-2"><BaseTextarea v-model="form.shortDesc" placeholder="Optional" /></div>
        </div>

        <div>
          <div class="text-sm font-semibold text-brhc-muted">Full description</div>
          <div class="mt-2"><BaseTextarea v-model="form.fullDesc" placeholder="Optional" /></div>
        </div>

        <div class="rounded-2xl ring-1 ring-black/10 p-4">
          <div class="flex items-center justify-between gap-3">
            <div>
              <div class="text-sm font-semibold">Image</div>
              <div class="text-sm text-brhc-muted">Attach one image from Media</div>
            </div>
            <BaseButton size="sm" variant="outline" @click="openMediaPicker">Attach</BaseButton>
          </div>

          <div v-if="selectedMedia" class="mt-3 rounded-2xl bg-white ring-1 ring-black/10 overflow-hidden">
            <img :src="selectedMedia.urlThumb ?? selectedMedia.urlOriginal ?? selectedMedia.url" class="h-32 w-full object-cover" />
            <div class="p-2">
              <div class="text-xs font-semibold truncate">{{ selectedMedia.title ?? selectedMedia.id }}</div>
              <div class="mt-2">
                <BaseButton size="sm" variant="outline" class="w-full" @click="detachMedia">Detach</BaseButton>
              </div>
            </div>
          </div>
          <div v-else class="mt-3 text-sm text-brhc-muted">No image attached.</div>
        </div>
      </div>

      <template #footer>
        <BaseButton :loading="saving" @click="save" style="background: linear-gradient(to right, #ff6b6b, #ff8e53);">Save</BaseButton>
      </template>
    </Modal>

    <Modal v-model:open="mediaPickerOpen" title="Select media" subtitle="Choose one image">
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
            :class="selectedMediaId === m.id ? 'ring-red-500' : 'ring-black/10 hover:ring-black/30'"
            @click="selectMedia(m)"
          >
            <img :src="m.urlThumb ?? m.urlOriginal ?? m.url" class="h-24 w-full object-cover" />
            <div class="p-2 text-left">
              <div class="text-xs font-semibold truncate">{{ m.title ?? m.id }}</div>
              <div class="mt-1 text-xs text-brhc-muted truncate">{{ m.id }}</div>
            </div>
          </button>
        </div>

        <div class="pt-2 flex items-center justify-between gap-3">
          <div class="text-sm text-brhc-muted">Selected: {{ selectedMediaId ? 1 : 0 }}</div>
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
import { computed, onMounted, reactive, ref, watch } from 'vue'
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
const selectedMedia = ref<any | null>(null)
const selectedMediaId = ref<string | null>(null)

const form = reactive({
  name: '',
  slug: '',
  designation: '',
  role: '',
  shortDesc: '',
  fullDesc: '',
})

const totalPages = computed(() => {
  if (!meta.value) return undefined
  return Math.max(1, Math.ceil(meta.value.total / meta.value.pageSize))
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

async function load() {
  loading.value = true
  try {
    const res = await adminList<any>(auth.token, '/admin/teams', { page: page.value, pageSize: 20, q: q.value || undefined })
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
  form.designation = ''
  form.role = ''
  form.shortDesc = ''
  form.fullDesc = ''
  selectedMedia.value = null
  selectedMediaId.value = null
  modalOpen.value = true
}

async function openEdit(t: any) {
  modalOpen.value = true
  editing.value = t
  try {
    const res = await adminGet<any>(auth.token, `/admin/teams/${t.id}`)
    const full = res.data
    editing.value = full
    form.name = full.name ?? ''
    form.slug = full.slug ?? ''
    form.designation = full.designation ?? ''
    form.role = full.role ?? ''
    form.shortDesc = full.shortDesc ?? ''
    form.fullDesc = full.fullDesc ?? ''

    selectedMedia.value = full.media ?? null
    selectedMediaId.value = full.media?.id ?? null
  } catch {
    // ignore
  }
}

function openMediaPicker() {
  mediaPickerOpen.value = true
  void loadMedia()
}

function selectMedia(m: any) {
  selectedMediaId.value = m.id
}

function applyMediaSelection() {
  const id = selectedMediaId.value
  selectedMedia.value = id ? mediaItems.value.find((m) => m.id === id) ?? null : null
  mediaPickerOpen.value = false
}

function detachMedia() {
  selectedMedia.value = null
  selectedMediaId.value = null
}

async function save() {
  if (!form.name.trim()) {
    toast.push({ title: 'Validation', message: 'Name is required.', variant: 'info' })
    return
  }
  if (!form.designation.trim()) {
    toast.push({ title: 'Validation', message: 'Designation is required.', variant: 'info' })
    return
  }
  if (!form.role.trim()) {
    toast.push({ title: 'Validation', message: 'Role is required.', variant: 'info' })
    return
  }

  saving.value = true
  try {
    if (editing.value?.id) {
      await adminPut(auth.token, `/admin/teams/${editing.value.id}`, {
        name: form.name,
        slug: form.slug || undefined,
        designation: form.designation,
        role: form.role,
        shortDesc: form.shortDesc || undefined,
        fullDesc: form.fullDesc || undefined,
        mediaId: selectedMediaId.value ?? null,
      })
    } else {
      await adminPost<any>(auth.token, '/admin/teams', {
        name: form.name,
        slug: form.slug || undefined,
        designation: form.designation,
        role: form.role,
        shortDesc: form.shortDesc || undefined,
        fullDesc: form.fullDesc || undefined,
        mediaId: selectedMediaId.value ?? null,
      })
    }

    modalOpen.value = false
    await load()
  } catch (e) {
    toast.push({ title: 'Error', message: e instanceof Error ? e.message : String(e), variant: 'error' })
  } finally {
    saving.value = false
  }
}

async function remove(t: any) {
  if (!confirm(`Delete team member "${t.name}"?`)) return
  try {
    await adminDelete(auth.token, `/admin/teams/${t.id}`)
    await load()
  } catch (e) {
    toast.push({ title: 'Error', message: e instanceof Error ? e.message : String(e), variant: 'error' })
  }
}

watch(mediaQ, () => {
  if (mediaPickerOpen.value) void loadMedia()
})

onMounted(load)
</script>
