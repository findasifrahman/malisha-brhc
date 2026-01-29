import type { FastifyRequest } from 'fastify'
import { type ZodTypeAny, z } from 'zod'

export function parseBody<S extends ZodTypeAny>(req: FastifyRequest, schema: S): z.infer<S> {
  return schema.parse(req.body)
}

export function parseParams<S extends ZodTypeAny>(req: FastifyRequest, schema: S): z.infer<S> {
  return schema.parse(req.params)
}

export function parseQuery<S extends ZodTypeAny>(req: FastifyRequest, schema: S): z.infer<S> {
  return schema.parse(req.query)
}
