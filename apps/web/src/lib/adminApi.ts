import { apiFetch, toQuery } from './api'

export type AdminListParams = {
  page?: number
  pageSize?: number
  q?: string
  sort?: string
  [key: string]: string | number | boolean | undefined
}

export function authHeaders(token: string | null) {
  const headers: Record<string, string> = {}
  if (token) headers.Authorization = `Bearer ${token}`
  return headers
}

export async function adminList<T>(token: string | null, path: string, params: AdminListParams = {}) {
  const res = await apiFetch<T[]>(`${path}${toQuery(params)}`, {
    headers: authHeaders(token),
  })
  return { items: res.data, meta: res.meta as any }
}

export async function adminGet<T>(token: string | null, path: string) {
  return apiFetch<T>(path, { headers: authHeaders(token) })
}

export async function adminPost<T>(token: string | null, path: string, body: unknown) {
  const headers = { ...authHeaders(token), 'content-type': 'application/json' }
  return apiFetch<T>(path, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })
}

export async function adminPut<T>(token: string | null, path: string, body: unknown) {
  const headers = { ...authHeaders(token), 'content-type': 'application/json' }
  return apiFetch<T>(path, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  })
}

export async function adminDelete<T>(token: string | null, path: string) {
  return apiFetch<T>(path, {
    method: 'DELETE',
    headers: authHeaders(token),
  })
}

export async function authLogin(email: string, password: string) {
  return apiFetch<{ user: { id: string; email: string; role: 'admin' | 'partner' }; token: string }>('/auth/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
}

export async function authMe(token: string) {
  return apiFetch<{ id: string; email: string; role: 'admin' | 'partner' }>(`/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function uploadMedia(token: string | null, category: string, file: File, title?: string) {
  const form = new FormData()
  form.set('category', category)
  if (title) form.set('title', title)
  form.set('file', file)

  return apiFetch<any>('/media/upload', {
    method: 'POST',
    headers: authHeaders(token),
    body: form,
  })
}

export async function deleteMedia(token: string | null, id: string) {
  return apiFetch<{ id: string }>(`/media/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  })
}
