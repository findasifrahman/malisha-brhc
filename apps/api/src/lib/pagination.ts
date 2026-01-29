import { z } from 'zod'

export const ListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  q: z.string().optional(),
  sort: z.string().optional(),
})

export function parseSort(sort: string | undefined, fallback: { field: string; direction: 'asc' | 'desc' }) {
  if (!sort) return fallback

  const [fieldRaw, dirRaw] = sort.split(':', 2)
  const field = (fieldRaw || '').trim()
  const dir = (dirRaw || '').trim().toLowerCase()

  if (!field) return fallback
  if (dir !== 'asc' && dir !== 'desc') return { field, direction: fallback.direction }
  return { field, direction: dir }
}

export function toSkipTake(page: number, pageSize: number) {
  const take = pageSize
  const skip = (page - 1) * pageSize
  return { skip, take }
}
