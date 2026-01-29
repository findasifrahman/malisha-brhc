<template>
  <section class="space-y-4">
    <DataTableShell title="Locations" subtitle="Manage provinces and cities">
      <template #actions>
        <div class="flex flex-wrap gap-2">
          <BaseButton
            size="sm"
            class="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0"
            @click="openProvinceCreate"
          >
            Add Province
          </BaseButton>
          <BaseButton size="sm" variant="outline" @click="openCityCreate">Add City</BaseButton>
        </div>
      </template>

      <div class="p-4 space-y-6">
        <div class="grid grid-cols-1 gap-3 md:grid-cols-12 md:items-end">
          <div class="md:col-span-6">
            <div class="text-sm font-semibold text-brhc-muted">Province search</div>
            <div class="mt-2"><BaseInput v-model="provinceQ" placeholder="Search provinces..." /></div>
          </div>
          <div class="md:col-span-3">
            <BaseButton class="w-full" variant="outline" @click="refreshProvinces">Search</BaseButton>
          </div>
          <div class="md:col-span-3">
            <BaseButton class="w-full" variant="outline" @click="loadAll">Refresh All</BaseButton>
          </div>
        </div>

        <div>
          <div class="text-base font-bold text-brhc-text">Provinces</div>
          <div class="mt-3 overflow-x-auto">
            <table class="w-full text-left text-base">
              <thead class="text-sm text-brhc-muted">
                <tr class="border-b border-black/10">
                  <th class="py-3 pr-4">Name</th>
                  <th class="py-3 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="provincesLoading"><td class="py-6" colspan="2"><Skeleton height="1.2rem" /></td></tr>
                <tr v-else-if="provinces.length === 0"><td class="py-6 text-brhc-muted" colspan="2">No provinces found.</td></tr>
                <tr v-for="p in provinces" :key="p.id" class="border-b border-black/5">
                  <td class="py-3 pr-4 font-semibold">{{ p.name }}</td>
                  <td class="py-3 pr-4">
                    <div class="flex flex-wrap gap-2">
                      <BaseButton size="sm" variant="outline" @click="openProvinceEdit(p)">Edit</BaseButton>
                      <BaseButton size="sm" variant="outline" @click="removeProvince(p)">Delete</BaseButton>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-3 md:grid-cols-12 md:items-end">
          <div class="md:col-span-5">
            <div class="text-sm font-semibold text-brhc-muted">City search</div>
            <div class="mt-2"><BaseInput v-model="cityQ" placeholder="Search cities..." /></div>
          </div>
          <div class="md:col-span-4">
            <div class="text-sm font-semibold text-brhc-muted">Filter by province</div>
            <div class="mt-2">
              <BaseSelect v-model="cityProvinceId">
                <option value="">All provinces</option>
                <option v-for="p in provincesAll" :key="p.id" :value="p.id">{{ p.name }}</option>
              </BaseSelect>
            </div>
          </div>
          <div class="md:col-span-3">
            <BaseButton class="w-full" variant="outline" @click="refreshCities">Search</BaseButton>
          </div>
        </div>

        <div>
          <div class="text-base font-bold text-brhc-text">Cities</div>
          <div class="mt-3 overflow-x-auto">
            <table class="w-full text-left text-base">
              <thead class="text-sm text-brhc-muted">
                <tr class="border-b border-black/10">
                  <th class="py-3 pr-4">Name</th>
                  <th class="py-3 pr-4">Province</th>
                  <th class="py-3 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="citiesLoading"><td class="py-6" colspan="3"><Skeleton height="1.2rem" /></td></tr>
                <tr v-else-if="cities.length === 0"><td class="py-6 text-brhc-muted" colspan="3">No cities found.</td></tr>
                <tr v-for="c in cities" :key="c.id" class="border-b border-black/5">
                  <td class="py-3 pr-4 font-semibold">{{ c.name }}</td>
                  <td class="py-3 pr-4 text-brhc-muted">{{ c.province?.name ?? '' }}</td>
                  <td class="py-3 pr-4">
                    <div class="flex flex-wrap gap-2">
                      <BaseButton size="sm" variant="outline" @click="openCityEdit(c)">Edit</BaseButton>
                      <BaseButton size="sm" variant="outline" @click="removeCity(c)">Delete</BaseButton>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DataTableShell>

    <Modal v-model:open="provinceModalOpen" :title="provinceEditing ? 'Edit Province' : 'Add Province'">
      <div class="space-y-4">
        <div>
          <div class="text-sm font-semibold text-brhc-muted">Name</div>
          <div class="mt-2"><BaseInput v-model="provinceForm.name" /></div>
        </div>
      </div>

      <template #footer>
        <BaseButton :loading="saving" @click="saveProvince">Save</BaseButton>
      </template>
    </Modal>

    <Modal v-model:open="cityModalOpen" :title="cityEditing ? 'Edit City' : 'Add City'">
      <div class="space-y-4">
        <div>
          <div class="text-sm font-semibold text-brhc-muted">Province</div>
          <div class="mt-2">
            <BaseSelect v-model="cityForm.provinceId">
              <option value="" disabled>Select province</option>
              <option v-for="p in provincesAll" :key="p.id" :value="p.id">{{ p.name }}</option>
            </BaseSelect>
          </div>
        </div>
        <div>
          <div class="text-sm font-semibold text-brhc-muted">Name</div>
          <div class="mt-2"><BaseInput v-model="cityForm.name" /></div>
        </div>
      </div>

      <template #footer>
        <BaseButton :loading="saving" @click="saveCity">Save</BaseButton>
      </template>
    </Modal>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { BaseButton, BaseInput, BaseSelect, DataTableShell, Modal, Skeleton, useToast } from '@brhc/ui'
import { useAuthStore } from '../../stores/auth'
import { adminDelete, adminList, adminPost, adminPut } from '../../lib/adminApi'

const toast = useToast()
const auth = useAuthStore()

const saving = ref(false)

const provinceQ = ref('')
const provinces = ref<any[]>([])
const provincesLoading = ref(false)

const cityQ = ref('')
const cityProvinceId = ref('')
const cities = ref<any[]>([])
const citiesLoading = ref(false)

const provincesAll = ref<any[]>([])

const provinceModalOpen = ref(false)
const provinceEditing = ref<any | null>(null)
const provinceForm = reactive({ name: '' })

const cityModalOpen = ref(false)
const cityEditing = ref<any | null>(null)
const cityForm = reactive({ name: '', provinceId: '' })

const cityParams = computed(() => ({
  page: 1,
  pageSize: 100,
  q: cityQ.value || undefined,
  provinceId: cityProvinceId.value || undefined,
}))

async function loadProvinces() {
  provincesLoading.value = true
  try {
    const res = await adminList<any>(auth.token, '/admin/provinces', { page: 1, pageSize: 100, q: provinceQ.value || undefined })
    provinces.value = res.items
  } catch {
    provinces.value = []
  } finally {
    provincesLoading.value = false
  }
}

async function loadProvincesAll() {
  try {
    const all: any[] = []
    let page = 1
    while (true) {
      const res = await adminList<any>(auth.token, '/admin/provinces', { page, pageSize: 100 })
      all.push(...res.items)
      if (res.items.length < 100) break
      page += 1
      if (page > 50) break
    }
    provincesAll.value = all
  } catch {
    provincesAll.value = []
  }
}

async function loadCities() {
  citiesLoading.value = true
  try {
    const res = await adminList<any>(auth.token, '/admin/cities', cityParams.value)
    cities.value = res.items
  } catch {
    cities.value = []
  } finally {
    citiesLoading.value = false
  }
}

async function loadAll() {
  await Promise.all([loadProvincesAll(), loadProvinces(), loadCities()])
}

function refreshProvinces() {
  void loadProvinces()
}

function refreshCities() {
  void loadCities()
}

function openProvinceCreate() {
  provinceEditing.value = null
  provinceForm.name = ''
  provinceModalOpen.value = true
}

function openProvinceEdit(p: any) {
  provinceEditing.value = p
  provinceForm.name = p.name ?? ''
  provinceModalOpen.value = true
}

async function saveProvince() {
  if (!provinceForm.name.trim()) {
    toast.push({ title: 'Validation', message: 'Province name is required.', variant: 'info' })
    return
  }

  saving.value = true
  try {
    if (provinceEditing.value) {
      await adminPut(auth.token, `/admin/provinces/${provinceEditing.value.id}`, { name: provinceForm.name })
    } else {
      await adminPost(auth.token, '/admin/provinces', { name: provinceForm.name })
    }
    provinceModalOpen.value = false
    await loadAll()
  } catch (e) {
    toast.push({ title: 'Error', message: e instanceof Error ? e.message : String(e), variant: 'error' })
  } finally {
    saving.value = false
  }
}

async function removeProvince(p: any) {
  if (!confirm(`Delete province "${p.name}"?`)) return
  try {
    await adminDelete(auth.token, `/admin/provinces/${p.id}`)
    await loadAll()
  } catch (e) {
    toast.push({ title: 'Error', message: e instanceof Error ? e.message : String(e), variant: 'error' })
  }
}

function openCityCreate() {
  cityEditing.value = null
  cityForm.name = ''
  cityForm.provinceId = provincesAll.value[0]?.id ?? ''
  cityModalOpen.value = true
}

function openCityEdit(c: any) {
  cityEditing.value = c
  cityForm.name = c.name ?? ''
  cityForm.provinceId = c.provinceId ?? ''
  cityModalOpen.value = true
}

async function saveCity() {
  if (!cityForm.provinceId.trim() || !cityForm.name.trim()) {
    toast.push({ title: 'Validation', message: 'Province and city name are required.', variant: 'info' })
    return
  }

  saving.value = true
  try {
    if (cityEditing.value) {
      await adminPut(auth.token, `/admin/cities/${cityEditing.value.id}`, { name: cityForm.name, provinceId: cityForm.provinceId })
    } else {
      await adminPost(auth.token, '/admin/cities', { name: cityForm.name, provinceId: cityForm.provinceId })
    }
    cityModalOpen.value = false
    await loadAll()
  } catch (e) {
    toast.push({ title: 'Error', message: e instanceof Error ? e.message : String(e), variant: 'error' })
  } finally {
    saving.value = false
  }
}

async function removeCity(c: any) {
  if (!confirm(`Delete city "${c.name}"?`)) return
  try {
    await adminDelete(auth.token, `/admin/cities/${c.id}`)
    await loadAll()
  } catch (e) {
    toast.push({ title: 'Error', message: e instanceof Error ? e.message : String(e), variant: 'error' })
  }
}

onMounted(() => {
  void loadAll()
})
</script>
