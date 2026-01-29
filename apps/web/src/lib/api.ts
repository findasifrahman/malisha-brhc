export type ApiOk<T> = { ok: true; data: T; meta?: Record<string, unknown> }
export type ApiErr = { ok: false; error: { code: string; message: string; details?: unknown } }
export type ApiResponse<T> = ApiOk<T> | ApiErr

export class ApiError extends Error {
  status: number
  code?: string
  details?: unknown

  constructor(message: string, status: number, code?: string, details?: unknown) {
    super(message)
    this.status = status
    this.code = code
    this.details = details
  }
}

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? 'http://localhost:3001'

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<ApiOk<T>> {
  const url = path.startsWith('http') ? path : `${API_BASE_URL}${path}`

  const res = await fetch(url, {
    ...init,
    headers: {
      ...(init?.headers ?? {}),
    },
  })

  let json: ApiResponse<T> | null = null
  try {
    json = (await res.json()) as ApiResponse<T>
  } catch {
    json = null
  }

  if (!res.ok) {
    if (json && json.ok === false) {
      throw new ApiError(json.error.message, res.status, json.error.code, json.error.details)
    }
    throw new ApiError(`HTTP ${res.status}`, res.status)
  }

  if (!json || json.ok !== true) {
    throw new ApiError('Invalid API response', res.status)
  }

  return json
}

export function toQuery(params: Record<string, string | number | boolean | undefined | null>) {
  const usp = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) continue
    usp.set(k, String(v))
  }
  const qs = usp.toString()
  return qs ? `?${qs}` : ''
}
