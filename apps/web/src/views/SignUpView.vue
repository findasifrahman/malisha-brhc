<template>
  <Card className="w-full p-6" :hoverable="false">
    <div class="text-lg font-semibold tracking-tight">Create account</div>
    <div class="mt-1 text-sm text-text-secondary">Partner accounts are created here. Admin accounts are managed by admins.</div>

    <div class="mt-6 space-y-4">
      <div>
        <div class="text-sm font-semibold text-text-secondary">Email</div>
        <div class="mt-2"><BaseInput v-model="email" placeholder="you@company.com" /></div>
      </div>
      <div>
        <div class="text-sm font-semibold text-text-secondary">Password</div>
        <div class="mt-2"><BaseInput v-model="password" type="password" placeholder="Minimum 8 characters" /></div>
      </div>

      <BaseButton class="w-full" :loading="loading" @click="submit">Create account</BaseButton>

      <div class="text-sm text-text-secondary">
        Already have an account?
        <RouterLink class="font-semibold text-text-primary underline" to="/sign-in">Sign in</RouterLink>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { BaseButton, BaseInput, Card, useToast } from '@brhc/ui'
import { apiFetch } from '../lib/api'

const router = useRouter()
const toast = useToast()

const email = ref('')
const password = ref('')
const loading = ref(false)

async function submit() {
  loading.value = true
  try {
    await apiFetch('/auth/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value }),
    })

    toast.push({ title: 'Account created', message: 'You can now sign in.', variant: 'success' })
    await router.push('/sign-in')
  } catch (e) {
    toast.push({ title: 'Sign up failed', message: e instanceof Error ? e.message : String(e), variant: 'error' })
  } finally {
    loading.value = false
  }
}
</script>
