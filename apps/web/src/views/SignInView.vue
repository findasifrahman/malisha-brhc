<template>
  <div class="min-h-[calc(100vh-5rem)] w-full bg-gradient-to-b from-gray-50 to-white">
    <div class="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 py-10 lg:grid-cols-2 lg:items-stretch lg:px-8 lg:py-16">
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-500 to-red-600 p-8 text-white shadow-2xl ring-1 ring-red-500/30 lg:p-12">
        <div class="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
        <div class="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-black/10 blur-3xl"></div>

        <div class="relative">
          <div class="inline-flex items-center gap-3 rounded-2xl bg-white/15 px-4 py-2 text-sm font-semibold ring-1 ring-white/25">
            <ShieldCheck class="h-4 w-4" />
            Secure access
          </div>
          <h1 class="mt-6 text-4xl font-bold tracking-tight lg:text-5xl">Sign in to BRHC</h1>
          <p class="mt-4 max-w-xl text-lg text-white/90">Admin and partner accounts can sign in here to manage services, content, and partner workflows.</p>

          <div class="mt-10 grid gap-4">
            <div class="flex items-start gap-4 rounded-2xl bg-white/10 p-4 ring-1 ring-white/20">
              <div class="mt-0.5 rounded-xl bg-white/15 p-2 ring-1 ring-white/20">
                <Stethoscope class="h-5 w-5" />
              </div>
              <div>
                <div class="text-base font-bold">Healthcare focused</div>
                <div class="mt-1 text-sm text-white/85">Designed for medical tourism, partner networks, and patient journeys.</div>
              </div>
            </div>
            <div class="flex items-start gap-4 rounded-2xl bg-white/10 p-4 ring-1 ring-white/20">
              <div class="mt-0.5 rounded-xl bg-white/15 p-2 ring-1 ring-white/20">
                <BadgeCheck class="h-5 w-5" />
              </div>
              <div>
                <div class="text-base font-bold">Role-based access</div>
                <div class="mt-1 text-sm text-white/85">Admins and partners are routed to the correct dashboard automatically.</div>
              </div>
            </div>
          </div>

          <div class="mt-8 text-sm text-white/80">Tip: use seeded admin <span class="font-semibold text-white">admin@brhc.local</span> (dev-only).</div>
        </div>
      </div>

      <div class="flex items-center">
        <Card className="w-full p-8 lg:p-10" :hoverable="false">
          <div class="text-3xl font-bold tracking-tight text-text-primary">Welcome back</div>
          <div class="mt-2 text-base text-text-secondary">Sign in with your email and password.</div>

          <div class="mt-8 space-y-6">
            <div>
              <div class="flex items-center gap-2 text-sm font-semibold text-text-secondary">
                <Mail class="h-4 w-4" />
                Email
              </div>
              <div class="mt-2"><BaseInput v-model="email" placeholder="admin@brhc.local" /></div>
            </div>
            <div>
              <div class="flex items-center gap-2 text-sm font-semibold text-text-secondary">
                <Lock class="h-4 w-4" />
                Password
              </div>
              <div class="mt-2"><BaseInput v-model="password" type="password" placeholder="••••••••" /></div>
            </div>

            <BaseButton class="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0" :loading="loading" @click="submit">
              Sign In
            </BaseButton>

            <div class="rounded-2xl bg-surface-2 p-4 text-sm text-text-secondary ring-1 ring-border-subtle">
              If you don’t have an account, contact BRHC support to create partner access.
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BadgeCheck, Lock, Mail, ShieldCheck, Stethoscope } from 'lucide-vue-next'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BaseButton, BaseInput, Card, useToast } from '@brhc/ui'
import { authLogin, authMe } from '../lib/adminApi'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const toast = useToast()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)

async function submit() {
  loading.value = true
  try {
    const res = await authLogin(email.value, password.value)
    const me = await authMe(res.data.token)
    auth.setSession({ token: res.data.token, user: me.data })

    if (me.data.role === 'admin') {
      await router.push('/admin')
    } else {
      await router.push('/partner')
    }
  } catch (e) {
    toast.push({ title: 'Sign in failed', message: e instanceof Error ? e.message : String(e), variant: 'error' })
  } finally {
    loading.value = false
  }
}
</script>
