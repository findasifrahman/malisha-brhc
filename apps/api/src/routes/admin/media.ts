import type { FastifyPluginAsync } from 'fastify'
import { z } from 'zod'
import { ok } from '../../lib/http.js'
import { ListQuerySchema, parseSort, toSkipTake } from '../../lib/pagination.js'
import { parseBody, parseParams, parseQuery } from '../../lib/zod.js'

const IdParams = z.object({ id: z.string().uuid() })

const MediaCreate = z.object({
  key: z.string().optional(),
  url: z.string().url(),
  mimeType: z.string().optional(),
  title: z.string().optional(),
  alt: z.string().optional(),
  sizeBytes: z.number().int().optional(),
  width: z.number().int().optional(),
  height: z.number().int().optional(),
})

const MediaUpdate = MediaCreate.partial()

export const adminMediaRoutes: FastifyPluginAsync = async (app) => {
  app.get('/admin/media', async (req, reply) => {
    const query = parseQuery(req, ListQuerySchema)
    const { skip, take } = toSkipTake(query.page, query.pageSize)
    const sort = parseSort(query.sort, { field: 'updatedAt', direction: 'desc' })

    const where = query.q
      ? {
          OR: [
            { url: { contains: query.q, mode: 'insensitive' as const } },
            { title: { contains: query.q, mode: 'insensitive' as const } },
            { alt: { contains: query.q, mode: 'insensitive' as const } },
          ],
        }
      : {}

    const [items, total] = await Promise.all([
      app.prisma.media.findMany({ where, skip, take, orderBy: { [sort.field]: sort.direction } as any }),
      app.prisma.media.count({ where }),
    ])

    return ok(reply, items, { page: query.page, pageSize: query.pageSize, total })
  })

  app.get('/admin/media/:id', async (req, reply) => {
    const params = parseParams(req, IdParams)
    const item = await app.prisma.media.findUnique({ where: { id: params.id } })
    if (!item) return reply.status(404).send({ ok: false, error: { code: 'NOT_FOUND', message: 'Media not found' } })
    return ok(reply, item)
  })

  app.post('/admin/media', async (req, reply) => {
    const body = parseBody(req, MediaCreate)
    const created = await app.prisma.media.create({ data: body })
    return ok(reply, created)
  })

  app.put('/admin/media/:id', async (req, reply) => {
    const params = parseParams(req, IdParams)
    const body = parseBody(req, MediaUpdate)
    const updated = await app.prisma.media.update({ where: { id: params.id }, data: body })
    return ok(reply, updated)
  })
}
