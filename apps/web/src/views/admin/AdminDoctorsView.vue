<template>
  <section class="space-y-4">
    <DataTableShell title="Doctors" subtitle="Create and manage doctors">
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
            <div class="mt-2"><BaseInput v-model="q" placeholder="Search doctors..." /></div>
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
                <th class="py-3 pr-4">Specialty</th>
                <th class="py-3 pr-4">Featured</th>
                <th class="py-3 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading">
                <td class="py-6" colspan="4"><Skeleton height="1.2rem" /></td>
              </tr>
              <tr v-else-if="items.length === 0">
                <td class="py-6 text-brhc-muted" colspan="4">No doctors found.</td>
              </tr>
              <tr v-for="d in items" :key="d.id" class="border-b border-black/5">
                <td class="py-3 pr-4 font-semibold">{{ d.name }}</td>
                <td class="py-3 pr-4 text-brhc-muted">{{ d.specialty ?? d.title ?? '' }}</td>
                <td class="py-3 pr-4 text-brhc-muted">{{ d.isFeatured ? 'Yes' : 'No' }}</td>
                <td class="py-3 pr-4">
                  <div class="flex flex-wrap gap-2">
                    <BaseButton size="sm" variant="outline" @click="openEdit(d)">Edit</BaseButton>
                    <BaseButton size="sm" variant="outline" @click="remove(d)">Delete</BaseButton>
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

    <Modal v-model:open="modalOpen" :title="editing ? 'Edit Doctor' : 'Add Doctor'" subtitle="Fill all details and attach images from Media library">
      <div class="space-y-4">
        <div>
          <div class="text-sm font-semibold text-brhc-muted">Name</div>
          <div class="mt-2"><BaseInput v-model="form.name" /></div>
        </div>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <div class="text-sm font-semibold text-brhc-muted">Slug</div>
            <div class="mt-2"><BaseInput v-model="form.slug" placeholder="auto-generated if empty" /></div>
          </div>
          <div>
            <div class="text-sm font-semibold text-brhc-muted">Title</div>
            <div class="mt-2"><BaseInput v-model="form.title" placeholder="e.g. Professor" /></div>
          </div>
        </div>

        <div>
          <div class="text-sm font-semibold text-brhc-muted">Chinese Name</div>
          <div class="mt-2"><BaseInput v-model="form.nameCn" placeholder="Optional" /></div>
        </div>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <div class="text-sm font-semibold text-brhc-muted">Specialty</div>
            <div class="mt-2">
              <BaseSelect v-model="form.specialty">
                <option value="">(none)</option>
                <option value="Oncology">Oncology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Nephrology">Nephrology</option>
                <option value="Skin">Skin</option>
                <option value="Medicine">Medicine</option>
              </BaseSelect>
            </div>
          </div>
          <div>
            <div class="text-sm font-semibold text-brhc-muted">Hospital</div>
            <div class="mt-2">
              <BaseSelect v-model="form.hospitalId">
                <option value="">(none)</option>
                <option v-for="h in hospitals" :key="h.id" :value="h.id">{{ h.name }}</option>
              </BaseSelect>
            </div>
          </div>
        </div>

        <div>
          <div class="text-sm font-semibold text-brhc-muted">Address</div>
          <div class="mt-2"><BaseInput v-model="form.address" placeholder="Optional" /></div>
        </div>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <div class="text-sm font-semibold text-brhc-muted">Phone</div>
            <div class="mt-2"><BaseInput v-model="form.phone" placeholder="Optional" /></div>
          </div>
          <div>
            <div class="text-sm font-semibold text-brhc-muted">WeChat</div>
            <div class="mt-2"><BaseInput v-model="form.wechat" placeholder="Optional" /></div>
          </div>
        </div>

        <div>
          <div class="text-sm font-semibold text-brhc-muted">Social Appointments</div>
          <div class="mt-2"><BaseTextarea v-model="form.socialAppointments" placeholder="Optional" /></div>
        </div>

        <div>
          <div class="text-sm font-semibold text-brhc-muted">Professional Expertise</div>
          <div class="mt-2"><BaseTextarea v-model="form.professionalExpertise" placeholder="Optional" /></div>
        </div>

        <div>
          <div class="text-sm font-semibold text-brhc-muted">Clinical Experience</div>
          <div class="mt-2"><BaseTextarea v-model="form.clinicalExperience" placeholder="Optional" /></div>
        </div>

        <div>
          <div class="text-sm font-semibold text-brhc-muted">Academic Achievement</div>
          <div class="mt-2"><BaseTextarea v-model="form.academicAchievement" placeholder="Optional" /></div>
        </div>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <div class="text-sm font-semibold text-brhc-muted">Other 1 Label</div>
            <div class="mt-2"><BaseInput v-model="form.other1DescName" placeholder="Optional" /></div>
          </div>
          <div>
            <div class="text-sm font-semibold text-brhc-muted">Other Details</div>
            <div class="mt-2"><BaseInput v-model="form.otherDesc" placeholder="Optional" /></div>
          </div>
        </div>

        <div>
          <div class="text-sm font-semibold text-brhc-muted">Bio</div>
          <div class="mt-2"><BaseTextarea v-model="form.bio" placeholder="Optional" /></div>
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
          <label class="inline-flex items-center gap-2 text-base">
            <input v-model="form.isFeatured" type="checkbox" class="h-4 w-4" />
            <span>Featured</span>
          </label>
        </div>

        <div class="pt-2">
          <BaseButton :loading="saving" @click="save" style="background: linear-gradient(to right, #ff6b6b, #ff8e53);">Save</BaseButton>
        </div>
      </div>
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

const hospitals = ref<any[]>([])

const mediaPickerOpen = ref(false)
const mediaQ = ref('')
const mediaItems = ref<any[]>([])
const mediaLoading = ref(false)

const selectedMedia = ref<any[]>([])
const selectedMediaIds = ref<Set<string>>(new Set())

const form = reactive({
  name: '',
  slug: '',
  title: '',
  nameCn: '',
  specialty: '',
  hospitalId: '',
  address: '',
  phone: '',
  wechat: '',
  socialAppointments: '',
  professionalExpertise: '',
  clinicalExperience: '',
  academicAchievement: '',
  other1DescName: '',
  otherDesc: '',
  bio: '',
  shortDetailsText: '',
  isFeatured: false,
})

const totalPages = computed(() => {
  if (!meta.value) return undefined
  return Math.max(1, Math.ceil(meta.value.total / meta.value.pageSize))
})

async function load() {
  loading.value = true
  try {
    const res = await adminList<any>(auth.token, '/admin/doctors', { page: page.value, pageSize: 20, q: q.value || undefined })
    items.value = res.items
    meta.value = res.meta
  } catch (e) {
    toast.push({ title: 'Error', message: e instanceof Error ? e.message : String(e), variant: 'error' })
  } finally {
    loading.value = false
  }
}

async function loadHospitals() {
  try {
    const all: any[] = []
    let p = 1
    while (true) {
      const res = await adminList<any>(auth.token, '/admin/hospitals', { page: p, pageSize: 100 })
      all.push(...res.items)
      if (res.items.length < 100) break
      p += 1
      if (p > 50) break
    }
    hospitals.value = all
  } catch {
    hospitals.value = []
  }
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
  if (hospitals.value.length === 0) {
    await loadHospitals()
  }
  form.name = ''
  form.slug = ''
  form.title = ''
  form.nameCn = ''
  form.specialty = ''
  form.hospitalId = ''
  form.address = ''
  form.phone = ''
  form.wechat = ''
  form.socialAppointments = ''
  form.professionalExpertise = ''
  form.clinicalExperience = ''
  form.academicAchievement = ''
  form.other1DescName = ''
  form.otherDesc = ''
  form.bio = ''
  form.shortDetailsText = ''
  form.isFeatured = false

  selectedMedia.value = []
  selectedMediaIds.value = new Set()
  modalOpen.value = true
}

async function openEdit(d: any) {
  if (hospitals.value.length === 0) {
    await loadHospitals()
  }
  modalOpen.value = true
  editing.value = d
  try {
    const res = await adminGet<any>(auth.token, `/admin/doctors/${d.id}`)
    const full = res.data
    editing.value = full
    form.name = full.name ?? ''
    form.slug = full.slug ?? ''
    form.title = full.title ?? ''
    form.nameCn = full.nameCn ?? ''
    form.specialty = full.specialty ?? ''
    form.hospitalId = full.hospitalId ?? ''
    form.address = full.address ?? ''
    form.phone = full.phone ?? ''
    form.wechat = full.wechat ?? ''
    form.socialAppointments = full.socialAppointments ?? ''
    form.professionalExpertise = full.professionalExpertise ?? ''
    form.clinicalExperience = full.clinicalExperience ?? ''
    form.academicAchievement = full.academicAchievement ?? ''
    form.other1DescName = full.other1DescName ?? ''
    form.otherDesc = full.otherDesc ?? ''
    form.bio = full.bio ?? ''
    form.shortDetailsText = Array.isArray(full.shortDetails) ? full.shortDetails.join('\n') : ''
    form.isFeatured = Boolean(full.isFeatured)

    const ms = (full.media ?? []).map((x: any) => x.media).filter(Boolean)
    selectedMedia.value = ms
    selectedMediaIds.value = new Set(ms.map((m: any) => m.id))
  } catch {
    // keep whatever was in list
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
      await adminPut(auth.token, `/admin/doctors/${editing.value.id}`, {
        name: form.name,
        slug: form.slug || undefined,
        title: form.title || undefined,
        nameCn: form.nameCn || undefined,
        specialty: form.specialty || undefined,
        hospitalId: form.hospitalId || null,
        address: form.address || undefined,
        phone: form.phone || undefined,
        wechat: form.wechat || undefined,
        socialAppointments: form.socialAppointments || undefined,
        professionalExpertise: form.professionalExpertise || undefined,
        clinicalExperience: form.clinicalExperience || undefined,
        academicAchievement: form.academicAchievement || undefined,
        other1DescName: form.other1DescName || undefined,
        otherDesc: form.otherDesc || undefined,
        bio: form.bio || undefined,
        shortDetails,
        isFeatured: form.isFeatured,
      })
      id = editing.value.id
    } else {
      const created = await adminPost<any>(auth.token, '/admin/doctors', {
        name: form.name,
        slug: form.slug || undefined,
        title: form.title || undefined,
        nameCn: form.nameCn || undefined,
        specialty: form.specialty || undefined,
        hospitalId: form.hospitalId || null,
        address: form.address || undefined,
        phone: form.phone || undefined,
        wechat: form.wechat || undefined,
        socialAppointments: form.socialAppointments || undefined,
        professionalExpertise: form.professionalExpertise || undefined,
        clinicalExperience: form.clinicalExperience || undefined,
        academicAchievement: form.academicAchievement || undefined,
        other1DescName: form.other1DescName || undefined,
        otherDesc: form.otherDesc || undefined,
        bio: form.bio || undefined,
        shortDetails,
        isFeatured: form.isFeatured,
      })
      id = created.data.id
    }

    await adminPost(auth.token, `/admin/doctors/${id}/media`, { mediaIds: Array.from(selectedMediaIds.value) })

    modalOpen.value = false
    await load()
  } catch (e) {
    toast.push({ title: 'Error', message: e instanceof Error ? e.message : String(e), variant: 'error' })
  } finally {
    saving.value = false
  }
}

async function remove(d: any) {
  if (!confirm(`Delete doctor "${d.name}"?`)) return
  try {
    await adminDelete(auth.token, `/admin/doctors/${d.id}`)
    await load()
  } catch (e) {
    toast.push({ title: 'Error', message: e instanceof Error ? e.message : String(e), variant: 'error' })
  }
}

onMounted(() => {
  void load()
  void loadHospitals()
})
</script>
