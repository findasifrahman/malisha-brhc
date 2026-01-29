<template>
  <section class="space-y-4">
    <DataTableShell title="Users" subtitle="Admin and partner accounts">
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
            <div class="mt-2"><BaseInput v-model="q" placeholder="Search users..." /></div>
          </div>
          <div class="md:col-span-4">
            <BaseButton class="w-full" variant="outline" @click="refresh">Search</BaseButton>
          </div>
        </div>

        <div class="mt-4 overflow-x-auto">
          <table class="w-full text-left text-base">
            <thead class="text-sm text-brhc-muted">
              <tr class="border-b border-black/10">
                <th class="py-3 pr-4">Email</th>
                <th class="py-3 pr-4">Role</th>
                <th class="py-3 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading"><td class="py-6" colspan="3"><Skeleton height="1.2rem" /></td></tr>
              <tr v-else-if="items.length === 0"><td class="py-6 text-brhc-muted" colspan="3">No users found.</td></tr>
              <tr v-for="u in items" :key="u.id" class="border-b border-black/5">
                <td class="py-3 pr-4 font-semibold">{{ u.email }}</td>
                <td class="py-3 pr-4 text-brhc-muted">{{ u.role }}</td>
                <td class="py-3 pr-4">
                  <div class="flex flex-wrap gap-2">
                    <BaseButton size="sm" variant="outline" @click="openEdit(u)">Edit</BaseButton>
                    <BaseButton size="sm" variant="outline" @click="remove(u)">Delete</BaseButton>
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

    <Modal v-model:open="modalOpen" :title="editing ? 'Edit User' : 'Add User'">
      <div class="space-y-4">
        <div>
          <div class="text-sm font-semibold text-brhc-muted">Email</div>
          <div class="mt-2"><BaseInput v-model="form.email" /></div>
        </div>
        <div>
          <div class="text-sm font-semibold text-brhc-muted">Role</div>
          <div class="mt-2">
            <BaseSelect v-model="form.role">
              <option value="admin">admin</option>
              <option value="partner">partner</option>
            </BaseSelect>
          </div>
        </div>
        <div>
          <div class="text-sm font-semibold text-brhc-muted">Password</div>
          <div class="mt-2"><BaseInput v-model="form.password" type="password" placeholder="••••••••" /></div>
          <div v-if="editing" class="mt-1 text-sm text-brhc-muted">Leave blank to keep current password.</div>
        </div>
        <div class="pt-2">
          <BaseButton :loading="saving" @click="save">Save</BaseButton>
        </div>
      </div>
    </Modal>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { BaseButton, BaseInput, BaseSelect, DataTableShell, Modal, Pagination, Skeleton, useToast } from '@brhc/ui'
import { useAuthStore } from '../../stores/auth'
import { adminDelete, adminList, adminPost, adminPut } from '../../lib/adminApi'

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

const form = reactive({
  email: '',
  role: 'partner',
  password: '',
})

const totalPages = computed(() => {
  if (!meta.value) return undefined
  return Math.max(1, Math.ceil(meta.value.total / meta.value.pageSize))
})

async function load() {
  loading.value = true
  try {
    const res = await adminList<any>(auth.token, '/admin/users', { page: page.value, pageSize: 20, q: q.value || undefined })
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
  form.email = ''
  form.role = 'partner'
  form.password = ''
  modalOpen.value = true
}

function openEdit(u: any) {
  editing.value = u
  form.email = u.email ?? ''
  form.role = u.role ?? 'partner'
  form.password = ''
  modalOpen.value = true
}

async function save() {
  if (!form.email.trim()) {
    toast.push({ title: 'Validation', message: 'Email is required.', variant: 'info' })
    return
  }

  saving.value = true
  try {
    if (editing.value) {
      await adminPut(auth.token, `/admin/users/${editing.value.id}`, {
        email: form.email,
        role: form.role,
        password: form.password || undefined,
      })
    } else {
      if (!form.password) {
        toast.push({ title: 'Validation', message: 'Password is required for new users.', variant: 'info' })
        return
      }
      await adminPost(auth.token, '/admin/users', {
        email: form.email,
        role: form.role,
        password: form.password,
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

async function remove(u: any) {
  if (!confirm(`Delete user "${u.email}"?`)) return
  try {
    await adminDelete(auth.token, `/admin/users/${u.id}`)
    await load()
  } catch (e) {
    toast.push({ title: 'Error', message: e instanceof Error ? e.message : String(e), variant: 'error' })
  }
}

onMounted(load)
</script>
