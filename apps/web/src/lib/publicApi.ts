import { apiFetch, toQuery } from './api'

export type Media = {
  id: string
  url: string
  urlThumb?: string | null
  urlOriginal?: string | null
  title?: string | null
  alt?: string | null
  createdAt: string
}

export type Service = {
  id: string
  name: string
  slug: string
  serviceType: string
  isFeatured: boolean
  shortDetails: string[]
  description?: string | null
}

export type Doctor = {
  id: string
  name: string
  slug: string
  title?: string | null
  specialty?: string | null
  isFeatured: boolean
  shortDetails: string[]
  bio?: string | null
  hospital?: { id: string; name: string; slug: string } | null
}

export type Hospital = {
  id: string
  name: string
  slug: string
  isFeatured: boolean
  address?: string | null
  shortDetails: string[]
  city?: { id: string; name: string } | null
  province?: { id: string; name: string } | null
}

export type Advanced = {
  id: string
  name: string
  slug: string
  isFeatured: boolean
  shortDetails: string[]
  description?: string | null
}

export type PatientStory = {
  id: string
  title: string
  slug: string
  isFeatured: boolean
  excerpt?: string | null
  content?: string | null
  shortDetails: string[]
  publishedAt?: string | null
}

export type Blog = {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  content?: string | null
  tags: string[]
  publishedAt?: string | null
  author?: { id: string; email: string } | null
  comments?: BlogComment[]
}

export type BlogComment = {
  id: string
  name?: string | null
  email?: string | null
  content: string
  createdAt: string
}

export type Paged<T> = { items: T[]; meta: { page: number; pageSize: number; total: number } }

export async function getFeatured() {
  return apiFetch<{
    services: Service[]
    doctors: Doctor[]
    advanced: Advanced[]
    patientStories: PatientStory[]
    hospitals: Hospital[]
  }>('/public/featured')
}

export async function listServices(params: { page?: number; pageSize?: number; q?: string; sort?: string } = {}) {
  const res = await apiFetch<Service[]>(`/public/services${toQuery(params)}`)
  return { items: res.data, meta: res.meta as any }
}

export async function getService(slug: string) {
  return apiFetch<Service>(`/public/services/${encodeURIComponent(slug)}`)
}

export async function listServiceTypes() {
  return apiFetch<string[]>('/public/services/types')
}

export async function listHospitals(params: { page?: number; pageSize?: number; q?: string; sort?: string } = {}) {
  const res = await apiFetch<Hospital[]>(`/public/hospitals${toQuery(params)}`)
  return { items: res.data, meta: res.meta as any }
}

export async function getHospital(slug: string) {
  return apiFetch<Hospital>(`/public/hospitals/${encodeURIComponent(slug)}`)
}

export async function listDoctors(params: { page?: number; pageSize?: number; q?: string; sort?: string } = {}) {
  const res = await apiFetch<Doctor[]>(`/public/doctors${toQuery(params)}`)
  return { items: res.data, meta: res.meta as any }
}

export async function getDoctor(slug: string) {
  return apiFetch<Doctor>(`/public/doctors/${encodeURIComponent(slug)}`)
}

export async function listHealthcareInChina(params: { page?: number; pageSize?: number; q?: string; sort?: string } = {}) {
  const res = await apiFetch<Advanced[]>(`/public/healthcare-in-china${toQuery(params)}`)
  return { items: res.data, meta: res.meta as any }
}

export async function getHealthcareInChina(slug: string) {
  return apiFetch<Advanced>(`/public/healthcare-in-china/${encodeURIComponent(slug)}`)
}

export async function listHealthcareNames() {
  return apiFetch<Array<{ name: string; slug: string }>>('/public/healthcare-in-china/names')
}

export async function listPatientStories(params: { page?: number; pageSize?: number; q?: string; sort?: string } = {}) {
  const res = await apiFetch<PatientStory[]>(`/public/patient-stories${toQuery(params)}`)
  return { items: res.data, meta: res.meta as any }
}

export async function getPatientStory(slug: string) {
  return apiFetch<PatientStory>(`/public/patient-stories/${encodeURIComponent(slug)}`)
}

export async function listBlogs(params: { page?: number; pageSize?: number; q?: string; sort?: string } = {}) {
  const res = await apiFetch<Blog[]>(`/public/blogs${toQuery(params)}`)
  return { items: res.data, meta: res.meta as any }
}

export async function getBlog(slug: string) {
  return apiFetch<Blog>(`/public/blogs/${encodeURIComponent(slug)}`)
}

export async function addBlogComment(slug: string, input: { name: string; email?: string; content: string }) {
  return apiFetch<BlogComment>(`/public/blogs/${encodeURIComponent(slug)}/comments`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input),
  })
}

export async function listGallery(params: { page?: number; pageSize?: number; q?: string } = {}) {
  const res = await apiFetch<Media[]>(`/public/media/gallery${toQuery(params)}`)
  return { items: res.data, meta: res.meta as any }
}

export async function searchAll(q: string, limit = 10) {
  return apiFetch<{ hospitals: Hospital[]; doctors: Doctor[]; advanced: Advanced[] }>(
    `/public/search${toQuery({ q, limit })}`,
  )
}
