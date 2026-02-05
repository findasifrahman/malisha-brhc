<template>
  <header class="sticky top-0 z-50 h-20 w-full relative w-full bg-gradient-to-br from-gray-100 via-gray-250 to-gray-200 text-gray-300">
    <div class="flex h-full items-center justify-between px-4 lg:px-8">
      <!-- Logo Section -->
      <div class="flex items-center gap-3">
        <button
          class="rounded-lg p-3 text-red transition hover:bg-brand-primary-weak lg:hidden"
          type="button" 
          @click="$emit('open-mobile')"
        >
          <Menu class="h-5 w-5" />
        </button>
        <RouterLink to="/" class="flex items-center gap-3">
          <img src="/logo.png" alt="BRHC" class="h-12 w-auto" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
          <div class="hidden h-12 w-12 rounded-lg bg-gradient-to-r from-red-600 to-red-700 items-center justify-center text-red font-bold text-lg" style="display: none;">
            BRHC
          </div>
        </RouterLink>
      </div>

      <!-- Navigation Links -->
      <nav class="hidden items-center gap-1 lg:flex">
        <NavLink style="color: red;" label="Home" to="/" />
        <NavDropdown  label="Hospitals" :items="hospitalItems" to="/hospitals" />
        <NavDropdown style="color: red;" label="Services" :items="services" to="/services" />
        <NavDropdown style="color: rebeccapurple;" label="Doctors" :items="doctorSpecialtyItems" to="/doctors" />
        <NavDropdown style="color: white;" label="Advanced Healthcare" :items="advancedItems" to="/healthcare-in-china" />
        <NavDropdown style="color: white;" label="Blogs" :items="blogItems" to="/blogs" />
        <NavLink style="color: red;" label="Patient Stories" to="/patient-stories" />
        <NavLink style="color: red;" label="About" to="/#about" />
        <NavLink style="color: red;" label="Our Team" to="/#our-team" />
        <NavLink style="color: red;" label="Contact" to="/contact" />
      </nav>

      <!-- Login Button -->
      <div class="flex items-center gap-3">
        <a
          class="hidden lg:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-500/20 ring-1 ring-red-600/20 transition hover:from-red-700 hover:to-red-800"
          href="https://chinahealthcare.center/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get a Quote
        </a>
        <button
          class="hidden lg:inline-flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-500/20 ring-1 ring-red-600/20 transition hover:bg-red-600"
          type="button"
          @click="partnerOpen = true"
        >
          <Handshake class="h-4 w-4" />
          Become a partner
        </button>

        <BaseButton 
          v-if="!auth.isAuthed" 
          class="hidden lg:inline-flex bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-red-300 border-0" 
          size="sm" 
          @click="goSignIn"
        >
          Login
        </BaseButton>

        <div v-else class="relative hidden lg:block">
          <button
            class="inline-flex items-center gap-3 rounded-xl bg-brand-primary-weak px-4 py-2.5 text-sm font-medium ring-1 ring-border-subtle transition hover:bg-opacity-20 hover:ring-border-subtle"
            type="button"
            @click="open = !open"
          >
            <span class="font-semibold text-red-600">{{ displayName }}</span>
            <ChevronDown class="h-4 w-4" />
          </button>

          <div
            v-if="open"
            class="absolute right-0 mt-2 w-64 overflow-hidden rounded-xl solid-surface shadow-lg"
          >
            <RouterLink class="block px-4 py-3 text-sm font-medium transition text-red-500 hover:bg-surface-2" :to="profileTo" @click="open = false">
              Profile
            </RouterLink>
            <RouterLink
              v-if="auth.role === 'admin'"
              class="block px-4 py-3 text-sm font-medium transition text-red-500 hover:bg-surface-2"
              to="/admin"
              @click="open = false"
            >
              Admin Panel
            </RouterLink>
            <button class="block w-full px-4 py-3 text-left text-sm font-medium transition text-red-500 hover:bg-surface-2" type="button" @click="logout">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>

  <div v-if="partnerOpen" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-black/50" @click="closePartner"></div>
    <div class="relative w-full max-w-lg">
      <Card className="overflow-hidden bg-white shadow-2xl" :hoverable="false">
        <div class="bg-gradient-to-r from-red-500 to-red-600 px-6 py-5 text-white">
          <div class="flex items-start justify-between gap-4">
            <div>
              <div class="flex items-center gap-2 text-sm font-semibold text-white/90">
                <Handshake class="h-4 w-4" />
                Partner registration
              </div>
              <div class="mt-1 text-2xl font-bold tracking-tight">Become a partner</div>
              <div class="mt-1 text-sm text-white/90">Create your partner login credentials.</div>
            </div>
            <button class="rounded-lg p-2 text-white/90 transition hover:bg-white/10" type="button" @click="closePartner">
              <X class="h-5 w-5" />
            </button>
          </div>
        </div>

        <div class="bg-white px-6 py-6">
          <form class="space-y-5" @submit.prevent="submitPartner">
            <div>
              <div class="flex items-center gap-2 text-sm font-semibold text-text-secondary">
                <Building2 class="h-4 w-4" />
                Company name
              </div>
              <div class="mt-2">
                <BaseInput v-model="partnerCompany" placeholder="Company name" />
              </div>
            </div>

            <div>
              <div class="flex items-center gap-2 text-sm font-semibold text-text-secondary">
                <Mail class="h-4 w-4" />
                Username (Email)
              </div>
              <div class="mt-2">
                <BaseInput v-model="partnerEmail" placeholder="you@company.com" />
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <div class="flex items-center gap-2 text-sm font-semibold text-text-secondary">
                  <Phone class="h-4 w-4" />
                  Phone
                </div>
                <div class="mt-2">
                  <BaseInput v-model="partnerPhone" placeholder="Phone" />
                </div>
              </div>

              <div>
                <div class="flex items-center gap-2 text-sm font-semibold text-text-secondary">
                  <MessageCircle class="h-4 w-4" />
                  WhatsApp
                </div>
                <div class="mt-2">
                  <BaseInput v-model="partnerWhatsapp" placeholder="WhatsApp" />
                </div>
              </div>
            </div>

            <div>
              <div class="flex items-center gap-2 text-sm font-semibold text-text-secondary">
                <MapPin class="h-4 w-4" />
                Address
              </div>
              <div class="mt-2">
                <BaseInput v-model="partnerAddress" placeholder="Street, area" />
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <div class="flex items-center gap-2 text-sm font-semibold text-text-secondary">
                  <MapPinned class="h-4 w-4" />
                  City
                </div>
                <div class="mt-2">
                  <BaseInput v-model="partnerCity" placeholder="City" />
                </div>
              </div>

              <div>
                <div class="flex items-center gap-2 text-sm font-semibold text-text-secondary">
                  <Globe class="h-4 w-4" />
                  Country
                </div>
                <div class="mt-2">
                  <BaseInput v-model="partnerCountry" placeholder="Country" />
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <div class="flex items-center gap-2 text-sm font-semibold text-text-secondary">
                  <Lock class="h-4 w-4" />
                  Password
                </div>
                <div class="mt-2">
                  <BaseInput v-model="partnerPassword" type="password" placeholder="Minimum 8 characters" />
                </div>
              </div>

              <div>
                <div class="flex items-center gap-2 text-sm font-semibold text-text-secondary">
                  <ShieldCheck class="h-4 w-4" />
                  Retype password
                </div>
                <div class="mt-2">
                  <BaseInput v-model="partnerPassword2" type="password" placeholder="••••••••" />
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <BaseButton type="button" variant="outline" class="w-full" @click="closePartner">Cancel</BaseButton>
              <BaseButton
                type="submit"
                class="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0"
                :loading="partnerSubmitting"
              >
                Create partner account
              </BaseButton>
            </div>
          </form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter, RouterLink, useRoute } from 'vue-router'
import { Menu } from 'lucide-vue-next'

import { BaseButton, BaseInput, Card, useToast } from '@brhc/ui'
import NavDropdown from './NavDropdown.vue'
import NavLink from './NavLink.vue'
import { apiFetch } from '../lib/api'
import { listBlogs, listDoctors, listHealthcareInChina, listHospitals, listServiceTypes } from '../lib/publicApi'
import { useAuthStore } from '../stores/auth'

const route = useRoute()

defineEmits<{ (e: 'open-mobile'): void }>()

const toast = useToast()
const router = useRouter()
const auth = useAuthStore()
const open = ref(false)
const partnerOpen = ref(false)
const partnerCompany = ref('')
const partnerEmail = ref('')
const partnerPhone = ref('')
const partnerWhatsapp = ref('')
const partnerAddress = ref('')
const partnerCity = ref('')
const partnerCountry = ref('')
const partnerPassword = ref('')
const partnerPassword2 = ref('')
const partnerSubmitting = ref(false)

type NavItem = { label: string; description?: string; to: string }

const serviceTypes = ref<string[]>([])
const hospitalsNav = ref<Array<{ name: string; slug: string }>>([])
const advancedNav = ref<Array<{ name: string; slug: string }>>([])
const blogsNav = ref<Array<{ title: string; slug: string }>>([])

const hospitalItems = computed<NavItem[]>(() => {
  const hs = hospitalsNav.value
  const first = hs.slice(0, 5).map((h) => ({ label: h.name, to: `/hospitals/${h.slug}` }))
  if (hs.length > 5) first.push({ label: 'More', to: '/hospitals' })
  return first
})

const services = computed<NavItem[]>(() => {
  if (serviceTypes.value.length === 0) {
    return [{ label: 'All services', description: 'Browse all services', to: '/services' }]
  }
  return serviceTypes.value.slice(0, 8).map((t) => ({
    label: t,
    to: `/services?q=${encodeURIComponent(t)}`,
  }))
})

const advancedItems = computed<NavItem[]>(() => {
  const items = advancedNav.value
  const first = items.slice(0, 5).map((a) => ({ label: a.name, to: `/healthcare-in-china/${a.slug}` }))
  if (items.length > 5) first.push({ label: 'More', to: '/healthcare-in-china' })
  return first
})

function trim15(s: string) {
  const t = (s ?? '').trim()
  if (t.length <= 15) return t
  return `${t.slice(0, 15)}…`
}

const blogItems = computed<NavItem[]>(() => {
  return blogsNav.value.slice(0, 5).map((b) => ({ label: trim15(b.title), to: `/blogs/${b.slug}` }))
})

const doctorsBySpecialty = ref<Record<string, Array<{ name: string; slug: string; hospital?: string }>>>({})
const doctorSpecialties = ['Oncology', 'Orthopedics', 'Cardiology', 'Nephrology', 'Skin', 'Medicine'] as const

const doctorSpecialtyItems = computed<NavItem[]>(() => {
  return doctorSpecialties.map((spec) => ({
    label: spec,
    description: doctorsBySpecialty.value[spec]?.length ? `${doctorsBySpecialty.value[spec].length} doctors` : 'View doctors',
    to: `/doctors?specialty=${encodeURIComponent(spec)}`,
  }))
})

const displayName = computed(() => auth.user?.email ?? 'Account')

const profileTo = computed(() => {
  if (auth.role === 'partner') return '/partner'
  return '/admin'
})

function logout() {
  open.value = false
  auth.clear()
  router.push('/sign-in')
}

function closePartner() {
  partnerOpen.value = false
  partnerCompany.value = ''
  partnerEmail.value = ''
  partnerPhone.value = ''
  partnerWhatsapp.value = ''
  partnerAddress.value = ''
  partnerCity.value = ''
  partnerCountry.value = ''
  partnerPassword.value = ''
  partnerPassword2.value = ''
}

async function submitPartner() {
  if (!partnerCompany.value.trim()) {
    toast.push({ title: 'Missing information', message: 'Company name is required.', variant: 'error' })
    return
  }
  if (!partnerEmail.value.trim()) {
    toast.push({ title: 'Missing information', message: 'Email is required.', variant: 'error' })
    return
  }
  if (!partnerPassword.value || !partnerPassword2.value) {
    toast.push({ title: 'Missing information', message: 'Please set and confirm your password.', variant: 'error' })
    return
  }
  if (partnerPassword.value.length < 8) {
    toast.push({ title: 'Weak password', message: 'Password must be at least 8 characters.', variant: 'error' })
    return
  }
  if (partnerPassword.value !== partnerPassword2.value) {
    toast.push({ title: 'Password mismatch', message: 'Please make sure both passwords match.', variant: 'error' })
    return
  }

  partnerSubmitting.value = true
  try {
    const reg = await apiFetch<{ user: { id: string; email: string; role: string }; token: string }>('/auth/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: partnerEmail.value.trim(), password: partnerPassword.value }),
    })

    const savedAddress = [partnerAddress.value.trim(), partnerCity.value.trim()].filter(Boolean).join(', ')
    await apiFetch('/partner/profile', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${reg.data.token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        companyName: partnerCompany.value.trim() || undefined,
        phone: partnerPhone.value.trim() || undefined,
        whatsapp: partnerWhatsapp.value.trim() || undefined,
        address: savedAddress || undefined,
        country: partnerCountry.value.trim() || undefined,
      }),
    })

    toast.push({ title: 'Partner account created', message: 'You can now sign in.', variant: 'success' })
    closePartner()
    router.push('/sign-in')
  } catch (e) {
    toast.push({ title: 'Partner sign up failed', message: e instanceof Error ? e.message : String(e), variant: 'error' })
  } finally {
    partnerSubmitting.value = false
  }
}

function goSignIn() {
  router.push('/sign-in')
}

async function loadDoctorsBySpecialty() {
  try {
    const res = await listDoctors({ page: 1, pageSize: 100 })
    const data = res.items
    const grouped: Record<string, Array<{ name: string; slug: string; hospital?: string }>> = {}
    for (const d of data) {
      if (d.specialty && doctorSpecialties.includes(d.specialty as any)) {
        if (!grouped[d.specialty]) grouped[d.specialty] = []
        grouped[d.specialty].push({ name: d.name, slug: d.slug, hospital: d.hospital?.name })
      }
    }
    doctorsBySpecialty.value = grouped
  } catch {
    // ignore
  }
}

async function loadNavData() {
  try {
    const [typesRes, hs, adv, bl] = await Promise.all([
      listServiceTypes(),
      listHospitals({ page: 1, pageSize: 6, sort: 'name:asc' }),
      listHealthcareInChina({ page: 1, pageSize: 6, sort: 'name:asc' }),
      listBlogs({ page: 1, pageSize: 5, sort: 'publishedAt:desc' }),
    ])
    serviceTypes.value = typesRes.data
    hospitalsNav.value = hs.items.map((x) => ({ name: x.name, slug: x.slug }))
    advancedNav.value = adv.items.map((x) => ({ name: x.name, slug: x.slug }))
    blogsNav.value = bl.items.map((x) => ({ title: x.title, slug: x.slug }))
  } catch {
    // ignore
  }
}

onMounted(async () => {
  await loadNavData()
  await loadDoctorsBySpecialty()
})
</script>
