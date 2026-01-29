import type { FastifyPluginAsync } from 'fastify'
import { z } from 'zod'
import { ok } from '../../lib/http.js'
import { ListQuerySchema, parseSort, toSkipTake } from '../../lib/pagination.js'
import { parseBody, parseParams, parseQuery } from '../../lib/zod.js'

const IdParams = z.object({ id: z.string().uuid() })

const ServiceCreate = z.object({
  name: z.string().min(1),
  slug: z.string().min(1).optional(),
  serviceType: z.string().min(1),
  isFeatured: z.boolean().optional(),
  description: z.string().optional(),
  shortDetails: z.array(z.string()).optional(),
})

const ServiceUpdate = ServiceCreate.partial()

const ServiceMediaSetBody = z.object({ mediaIds: z.array(z.string().uuid()) })
const ServiceMediaDeleteParams = z.object({ id: z.string().uuid(), mediaId: z.string().uuid() })

export const adminServicesRoutes: FastifyPluginAsync = async (app) => {
  app.get('/admin/services', async (req, reply) => {
    const query = parseQuery(req, ListQuerySchema)
    const { skip, take } = toSkipTake(query.page, query.pageSize)
    const sort = parseSort(query.sort, { field: 'updatedAt', direction: 'desc' })

    const where = query.q
      ? {
          OR: [
            { name: { contains: query.q, mode: 'insensitive' as const } },
            { serviceType: { contains: query.q, mode: 'insensitive' as const } },
          ],
        }
      : {}

    const [items, total] = await Promise.all([
      app.prisma.service.findMany({ where, skip, take, orderBy: { [sort.field]: sort.direction } as any }),
      app.prisma.service.count({ where }),
    ])

    return ok(reply, items, { page: query.page, pageSize: query.pageSize, total })
  })

  app.get('/admin/services/:id', async (req, reply) => {
    const params = parseParams(req, IdParams)
    const item = await app.prisma.service.findUnique({
      where: { id: params.id },
      include: { media: { include: { media: true } } },
    })
    if (!item) return reply.status(404).send({ ok: false, error: { code: 'NOT_FOUND', message: 'Service not found' } })
    return ok(reply, item)
  })

  app.post('/admin/services', async (req, reply) => {
    const body = parseBody(req, ServiceCreate)
    const created = await app.prisma.service.create({
      data: {
        name: body.name,
        slug: body.slug ?? body.name.toLowerCase().replace(/\s+/g, '-'),
        serviceType: body.serviceType,
        isFeatured: body.isFeatured ?? false,
        description: body.description,
        shortDetails: body.shortDetails ?? [],
      },
    })
    return ok(reply, created)
  })

  app.put('/admin/services/:id', async (req, reply) => {
    const params = parseParams(req, IdParams)
    const body = parseBody(req, ServiceUpdate)
    const updated = await app.prisma.service.update({ where: { id: params.id }, data: body as any })
    return ok(reply, updated)
  })

  app.post('/admin/services/:id/media', async (req, reply) => {
    const params = parseParams(req, IdParams)
    const body = parseBody(req, ServiceMediaSetBody)

    await app.prisma.serviceMedia.deleteMany({ where: { serviceId: params.id } })

    if (body.mediaIds.length) {
      await app.prisma.serviceMedia.createMany({
        data: body.mediaIds.map((mediaId, idx) => ({ serviceId: params.id, mediaId, sortOrder: idx })),
        skipDuplicates: true,
      })
    }

    const item = await app.prisma.service.findUnique({
      where: { id: params.id },
      include: { media: { include: { media: true } } },
    })
    return ok(reply, item)
  })

  app.delete('/admin/services/:id/media/:mediaId', async (req, reply) => {
    const params = parseParams(req, ServiceMediaDeleteParams)
    await app.prisma.serviceMedia.deleteMany({ where: { serviceId: params.id, mediaId: params.mediaId } })
    return ok(reply, { id: params.id, mediaId: params.mediaId })
  })

  app.delete('/admin/services/:id', async (req, reply) => {
    const params = parseParams(req, IdParams)
    await app.prisma.service.delete({ where: { id: params.id } })
    return ok(reply, { id: params.id })
  })
}
