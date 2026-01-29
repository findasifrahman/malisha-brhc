import type { FastifyReply } from 'fastify'

export type ApiOk<T> = { ok: true; data: T; meta?: Record<string, unknown> }
export type ApiErr = { ok: false; error: { code: string; message: string; details?: unknown } }

export function ok<T>(reply: FastifyReply, data: T, meta?: Record<string, unknown>) {
  const payload: ApiOk<T> = meta ? { ok: true, data, meta } : { ok: true, data }
  return reply.send(payload)
}

export function fail(
  reply: FastifyReply,
  code: string,
  message: string,
  statusCode = 400,
  details?: unknown,
) {
  const payload: ApiErr = { ok: false, error: { code, message, details } }
  return reply.status(statusCode).send(payload)
}
