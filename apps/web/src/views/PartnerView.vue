<template>
  <section class="space-y-5">
    <SectionHeader title="Partner Profile" subtitle="Update your profile." />

    <Card className="p-6" :hoverable="false">
      <div v-if="loading" class="space-y-3">
        <Skeleton height="1.2rem" />
        <SkeletonText :lines="3" />
      </div>

      <div v-else class="space-y-4">
        <div>
          <div class="text-xs font-semibold text-brhc-muted">Profile image</div>
          <div class="mt-2 flex items-center gap-3">
            <div class="h-14 w-14 overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
              <img v-if="profileImageUrl" :src="profileImageUrl" class="h-full w-full object-cover" />
            </div>
            <input type="file" accept="image/*" @change="onPickImage" />
            <BaseButton v-if="pendingFile" variant="outline" size="sm" :loading="uploading" @click="upload">
              Upload
            </BaseButton>
          </div>
        </div>

        <div>
          <div class="text-xs font-semibold text-brhc-muted">Email</div>
          <div class="mt-2"><BaseInput v-model="email" /></div>
        </div>
        <div>
          <div class="text-xs font-semibold text-brhc-muted">Phone</div>
          <div class="mt-2"><BaseInput v-model="phone" /></div>
        </div>
        <div>
          <div class="text-xs font-semibold text-brhc-muted">WeChat</div>
          <div class="mt-2"><BaseInput v-model="wechat" /></div>
        </div>
        <div>
          <div class="text-xs font-semibold text-brhc-muted">WhatsApp</div>
          <div class="mt-2"><BaseInput v-model="whatsapp" /></div>
        </div>
        <div>
          <div class="text-xs font-semibold text-brhc-muted">Country</div>
          <div class="mt-2"><BaseInput v-model="country" /></div>
        </div>
        <div>
          <div class="text-xs font-semibold text-brhc-muted">Contact person</div>
          <div class="mt-2"><BaseInput v-model="contactPerson" /></div>
        </div>
        <div>
          <div class="text-xs font-semibold text-brhc-muted">Company name</div>
          <div class="mt-2"><BaseInput v-model="companyName" /></div>
        </div>
        <div>
          <div class="text-xs font-semibold text-brhc-muted">Address</div>
          <div class="mt-2"><BaseInput v-model="address" /></div>
        </div>
        <div>
          <div class="text-xs font-semibold text-brhc-muted">Age</div>
          <div class="mt-2"><BaseInput v-model="age" type="number" /></div>
        </div>
        <div>
          <div class="text-xs font-semibold text-brhc-muted">New password</div>
          <div class="mt-2"><BaseInput v-model="password" type="password" placeholder="••••••••" /></div>
        </div>

        <BaseButton :loading="saving" @click="save">Save</BaseButton>
      </div>
    </Card>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { BaseButton, BaseInput, Card, SectionHeader, Skeleton, SkeletonText, useToast } from '@brhc/ui'
import { apiFetch } from '../lib/api'
import { useAuthStore } from '../stores/auth'
import { uploadMedia } from '../lib/adminApi'

const toast = useToast()
const auth = useAuthStore()

const loading = ref(false)
const saving = ref(false)
const uploading = ref(false)

const email = ref('')
const password = ref('')

const phone = ref('')
const wechat = ref('')
const whatsapp = ref('')
const country = ref('')
const contactPerson = ref('')
const companyName = ref('')
const address = ref('')
const age = ref<string>('')

const profileImageId = ref<string | null>(null)
const profileImageUrl = ref<string | null>(null)
const pendingFile = ref<File | null>(null)

async function load() {
  if (!auth.token) return
  loading.value = true
  try {
    const res = await apiFetch<any>('/partner/profile', { headers: { Authorization: `Bearer ${auth.token}` } })
    email.value = res.data.email
    phone.value = res.data.phone ?? ''
    wechat.value = res.data.wechat ?? ''
    whatsapp.value = res.data.whatsapp ?? ''
    country.value = res.data.country ?? ''
    contactPerson.value = res.data.contactPerson ?? ''
    companyName.value = res.data.companyName ?? ''
    address.value = res.data.address ?? ''
    age.value = res.data.age !== null && res.data.age !== undefined ? String(res.data.age) : ''
    profileImageId.value = res.data.profileImageId ?? null
    profileImageUrl.value = res.data.profileImage?.urlThumb ?? res.data.profileImage?.urlOriginal ?? res.data.profileImage?.url ?? null
  } finally {
    loading.value = false
  }
}

function onPickImage(e: Event) {
  const input = e.target as HTMLInputElement
  pendingFile.value = input.files?.[0] ?? null
}

async function upload() {
  if (!auth.token || !pendingFile.value) return
  uploading.value = true
  try {
    const res = await uploadMedia(auth.token, 'partners', pendingFile.value)
    profileImageId.value = res.data.id
    profileImageUrl.value = res.data.urlThumb ?? res.data.urlOriginal ?? res.data.url ?? null
    pendingFile.value = null
    toast.push({ title: 'Uploaded', message: 'Profile image updated.', variant: 'success' })
  } catch (e) {
    toast.push({ title: 'Error', message: e instanceof Error ? e.message : String(e), variant: 'error' })
  } finally {
    uploading.value = false
  }
}

async function save() {
  if (!auth.token) return
  saving.value = true
  try {
    await apiFetch<any>('/partner/profile', {
      method: 'PUT',
      headers: { Authorization: `Bearer ${auth.token}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value || undefined,
        phone: phone.value || undefined,
        wechat: wechat.value || undefined,
        whatsapp: whatsapp.value || undefined,
        country: country.value || undefined,
        contactPerson: contactPerson.value || undefined,
        companyName: companyName.value || undefined,
        address: address.value || undefined,
        age: age.value === '' ? undefined : Number(age.value),
        profileImageId: profileImageId.value ?? undefined,
      }),
    })
    toast.push({ title: 'Saved', message: 'Profile updated.', variant: 'success' })
    password.value = ''
  } catch (e) {
    toast.push({ title: 'Error', message: e instanceof Error ? e.message : String(e), variant: 'error' })
  } finally {
    saving.value = false
  }
}

onMounted(load)
</script>
