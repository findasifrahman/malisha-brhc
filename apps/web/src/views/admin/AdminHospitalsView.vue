<template>
  <section class="space-y-4">
    <DataTableShell title="Hospitals" subtitle="Create and manage hospitals">
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
            <div class="mt-2"><BaseInput v-model="q" placeholder="Search hospitals..." /></div>
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
                <th class="py-3 pr-4">City</th>
                <th class="py-3 pr-4">Featured</th>
                <th class="py-3 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading"><td class="py-6" colspan="4"><Skeleton height="1.2rem" /></td></tr>
              <tr v-else-if="items.length === 0"><td class="py-6 text-brhc-muted" colspan="4">No hospitals found.</td></tr>
              <tr v-for="h in items" :key="h.id" class="border-b border-white/5">
                <td class="py-3 pr-4 font-semibold">{{ h.name }}</td>
                <td class="py-3 pr-4 text-brhc-muted">{{ h.city?.name ?? '' }}</td>
                <td class="py-3 pr-4 text-brhc-muted">{{ h.isFeatured ? 'Yes' : 'No' }}</td>
                <td class="py-3 pr-4">
                  <div class="flex flex-wrap gap-2">
                    <BaseButton size="sm" variant="outline" @click="openDetails(h)">Details</BaseButton>
                    <BaseButton size="sm" variant="outline" @click="openEdit(h)">Edit</BaseButton>
                    <BaseButton size="sm" variant="outline" @click="remove(h)">Delete</BaseButton>
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

    <Modal v-model:open="detailOpen" title="Hospital details">
      <div v-if="detail" class="space-y-4">
        <div class="text-sm font-semibold">{{ detail.name }}</div>
        <div class="text-sm text-brhc-muted">{{ detail.address ?? '' }}</div>
        <div>
          <div class="text-sm font-semibold">Associated doctors</div>
          <div v-if="(detail.doctors?.length ?? 0) === 0" class="mt-2 text-sm text-brhc-muted">No doctors linked.</div>
          <div v-else class="mt-2 space-y-2">
            <div v-for="d in detail.doctors" :key="d.id" class="rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
              <div class="text-sm font-semibold">{{ d.name }}</div>
              <div class="text-xs text-brhc-muted">{{ d.specialty ?? d.title ?? '' }}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-sm text-brhc-muted">Loading…</div>
    </Modal>

    <Modal v-model:open="modalOpen" :title="editing ? 'Edit Hospital' : 'Add Hospital'">
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
            <div class="text-sm font-semibold text-brhc-muted">Province</div>
            <div class="mt-2">
              <BaseSelect v-model="form.provinceId" @change="onProvinceChange">
                <option value="" disabled>Select province</option>
                <option v-for="p in provinces" :key="p.id" :value="p.id">{{ p.name }}</option>
              </BaseSelect>
            </div>
          </div>
          <div>
            <div class="text-sm font-semibold text-brhc-muted">City</div>
            <div class="mt-2">
              <BaseSelect v-model="form.cityId">
                <option value="" disabled>Select city</option>
                <option v-for="c in cities" :key="c.id" :value="c.id">{{ c.name }}</option>
              </BaseSelect>
            </div>
          </div>
        </div>

        <div>
          <div class="text-sm font-semibold text-brhc-muted">Address</div>
          <div class="mt-2"><BaseInput v-model="form.address" placeholder="Optional" /></div>
        </div>

        <div>
          <div class="text-sm font-semibold text-brhc-muted">Logo URL</div>
          <div class="mt-2"><BaseInput v-model="form.logoUrl" placeholder="Optional" /></div>
        </div>

        <div>
          <div class="text-sm font-semibold text-brhc-muted">Video URL</div>
          <div class="mt-2"><BaseInput v-model="form.videoUrl" placeholder="Optional" /></div>
        </div>

        <div>
          <div class="text-sm font-semibold text-brhc-muted">Website</div>
          <div class="mt-2"><BaseInput v-model="form.website" placeholder="Optional" /></div>
        </div>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <div class="text-sm font-semibold text-brhc-muted">WeChat</div>
            <div class="mt-2"><BaseInput v-model="form.wechat" placeholder="Optional" /></div>
          </div>
          <div>
            <div class="text-sm font-semibold text-brhc-muted">WhatsApp</div>
            <div class="mt-2"><BaseInput v-model="form.whatsapp" placeholder="Optional" /></div>
          </div>
        </div>
        <div>
          <div class="text-sm font-semibold text-brhc-muted">Description</div>
          <div class="mt-2"><BaseTextarea v-model="form.description" placeholder="Optional" /></div>
        </div>
        <div>
          <div class="text-sm font-semibold text-brhc-muted">Short details</div>
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
        <BaseButton :loading="saving" @click="save" style="color: black;">Save</BaseButton>
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
import { BaseButton, BaseInput, BaseSelect, BaseTextarea, DataTableShell, Modal, Pagination, Skeleton, useToast } from '@brhc/ui'
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

const detailOpen = ref(false)
const detail = ref<any | null>(null)

const form = reactive({
  name: '',
  slug: '',
  provinceId: '',
  cityId: '',
  address: '',
  videoUrl: '',
  logoUrl: '',
  website: '',
  wechat: '',
  whatsapp: '',
  description: '',
  shortDetailsText: '',
  isFeatured: false,
})

const provinces = ref<any[]>([])
const cities = ref<any[]>([])

const mediaPickerOpen = ref(false)
const mediaQ = ref('')
const mediaItems = ref<any[]>([])
const mediaLoading = ref(false)
const selectedMedia = ref<any[]>([])
const selectedMediaIds = ref<Set<string>>(new Set())

const totalPages = computed(() => {
  if (!meta.value) return undefined
  return Math.max(1, Math.ceil(meta.value.total / meta.value.pageSize))
})

async function load() {
  loading.value = true
  try {
    const res = await adminList<any>(auth.token, '/admin/hospitals', { page: page.value, pageSize: 20, q: q.value || undefined })
    items.value = res.items
    meta.value = res.meta
  } catch (e) {
    toast.push({ title: 'Error', message: e instanceof Error ? e.message : String(e), variant: 'error' })
  } finally {
    loading.value = false
  }
}

async function loadProvinces() {
  try {
    const all: any[] = []
    let p = 1
    while (true) {
      const res = await adminList<any>(auth.token, '/admin/provinces', { page: p, pageSize: 100 })
      all.push(...res.items)
      if (res.items.length < 100) break
      p += 1
      if (p > 50) break
    }
    provinces.value = all
  } catch {
    provinces.value = []
  }
}

async function loadCities(provinceId?: string) {
  try {
    const all: any[] = []
    let p = 1
    while (true) {
      const res = await adminList<any>(auth.token, '/admin/cities', {
        page: p,
        pageSize: 100,
        provinceId: provinceId || undefined,
      })
      all.push(...res.items)
      if (res.items.length < 100) break
      p += 1
      if (p > 50) break
    }
    cities.value = all
  } catch {
    cities.value = []
  }
}

async function onProvinceChange() {
  const provinceId = form.provinceId
  form.cityId = ''
  await loadCities(provinceId)
  form.cityId = cities.value[0]?.id ?? ''
}

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

function refresh() {
  page.value = 1
  void load()
}

function setPage(p: number) {
  page.value = p
  void load()
}

async function openCreate() {
  editing.value = null
  if (provinces.value.length === 0) {
    await loadProvinces()
  }
  form.name = ''
  form.slug = ''
  form.provinceId = provinces.value[0]?.id ?? ''
  form.cityId = ''
  form.address = ''
  form.videoUrl = ''
  form.logoUrl = ''
  form.website = ''
  form.wechat = ''
  form.whatsapp = ''
  form.description = ''
  form.shortDetailsText = ''
  form.isFeatured = false

  selectedMedia.value = []
  selectedMediaIds.value = new Set()
  if (form.provinceId) {
    await loadCities(form.provinceId)
    form.cityId = cities.value[0]?.id ?? ''
  }
  modalOpen.value = true
}

async function openEdit(h: any) {
  modalOpen.value = true
  editing.value = h
  try {
    if (provinces.value.length === 0) {
      await loadProvinces()
    }
    const res = await adminGet<any>(auth.token, `/admin/hospitals/${h.id}`)
    const full = res.data
    editing.value = full
    form.name = full.name ?? ''
    form.slug = full.slug ?? ''
    form.provinceId = full.provinceId ?? ''
    await loadCities(form.provinceId)
    form.cityId = full.cityId ?? ''
    form.address = full.address ?? ''
    form.videoUrl = full.videoUrl ?? ''
    form.logoUrl = full.logoUrl ?? ''
    form.website = full.website ?? ''
    form.wechat = full.wechat ?? ''
    form.whatsapp = full.whatsapp ?? ''
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

async function openDetails(h: any) {
  detailOpen.value = true
  detail.value = null
  try {
    const res = await adminGet<any>(auth.token, `/admin/hospitals/${h.id}`)
    detail.value = res.data
  } catch {
    detail.value = null
  }
}

async function save() {
  if (!form.name.trim() || !form.provinceId.trim() || !form.cityId.trim()) {
    toast.push({ title: 'Validation', message: 'Name, provinceId and cityId are required.', variant: 'info' })
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
      await adminPut(auth.token, `/admin/hospitals/${editing.value.id}`, {
        name: form.name,
        slug: form.slug || undefined,
        provinceId: form.provinceId,
        cityId: form.cityId,
        isFeatured: form.isFeatured,
        address: form.address || undefined,
        videoUrl: form.videoUrl || undefined,
        logoUrl: form.logoUrl || undefined,
        website: form.website || undefined,
        wechat: form.wechat || undefined,
        whatsapp: form.whatsapp || undefined,
        description: form.description || undefined,
        shortDetails,
      })
      id = editing.value.id
    } else {
      const created = await adminPost<any>(auth.token, '/admin/hospitals', {
        name: form.name,
        slug: form.slug || undefined,
        provinceId: form.provinceId,
        cityId: form.cityId,
        isFeatured: form.isFeatured,
        address: form.address || undefined,
        videoUrl: form.videoUrl || undefined,
        logoUrl: form.logoUrl || undefined,
        website: form.website || undefined,
        wechat: form.wechat || undefined,
        whatsapp: form.whatsapp || undefined,
        description: form.description || undefined,
        shortDetails,
      })
      id = created.data.id
    }

    await adminPost(auth.token, `/admin/hospitals/${id}/media`, { mediaIds: Array.from(selectedMediaIds.value) })

    modalOpen.value = false
    await load()
  } catch (e) {
    toast.push({ title: 'Error', message: e instanceof Error ? e.message : String(e), variant: 'error' })
  } finally {
    saving.value = false
  }
}

async function remove(h: any) {
  if (!confirm(`Delete hospital "${h.name}"?`)) return
  try {
    await adminDelete(auth.token, `/admin/hospitals/${h.id}`)
    await load()
  } catch (e) {
    toast.push({ title: 'Error', message: e instanceof Error ? e.message : String(e), variant: 'error' })
  }
}

onMounted(() => {
  void load()
  void loadProvinces()
})
</script>
