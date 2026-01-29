import { computed, inject, reactive, type App, type InjectionKey } from 'vue'
import type { ToastItem, ToastVariant } from './types'

type ToastApi = {
  toasts: Readonly<ToastItem[]>
  push: (input: { title: string; message?: string; variant?: ToastVariant; ttlMs?: number }) => void
  remove: (id: string) => void
  clear: () => void
}

const ToastKey: InjectionKey<ToastApi> = Symbol('brhc-toast')

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16)
}

export const BrhcToastProvider = {
  install(app: App) {
    const state = reactive<{ items: ToastItem[] }>({ items: [] })
    const toasts = computed(() => state.items)

    function remove(id: string) {
      const idx = state.items.findIndex((t: ToastItem) => t.id === id)
      if (idx >= 0) state.items.splice(idx, 1)
    }

    function clear() {
      state.items.splice(0, state.items.length)
    }

    function push(input: { title: string; message?: string; variant?: ToastVariant; ttlMs?: number }) {
      const item: ToastItem = {
        id: uid(),
        title: input.title,
        message: input.message,
        variant: input.variant ?? 'info',
        createdAt: Date.now(),
      }

      state.items.unshift(item)
      if (state.items.length > 5) state.items.splice(5)

      const ttl = input.ttlMs ?? 3500
      window.setTimeout(() => remove(item.id), ttl)
    }

    const api: ToastApi = {
      get toasts() {
        return toasts.value
      },
      push,
      remove,
      clear,
    }

    app.provide(ToastKey, api)
  },
}

export function useToast() {
  const api = inject(ToastKey)
  if (!api) {
    throw new Error('Toast provider not installed')
  }
  return api
}
