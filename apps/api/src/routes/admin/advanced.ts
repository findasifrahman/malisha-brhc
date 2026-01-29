import type { FastifyPluginAsync } from 'fastify'
import { z } from 'zod'
import { ok } from '../../lib/http.js'
import { ListQuerySchema, parseSort, toSkipTake } from '../../lib/pagination.js'
import { parseBody, parseParams, parseQuery } from '../../lib/zod.js'

const IdParams = z.object({ id: z.string().uuid() })

const AdvancedCreate = z.object({
  name: z.string().min(1),
  slug: z.string().min(1).optional(),
  isFeatured: z.boolean().optional(),
  description: z.string().optional(),
  shortDetails: z.array(z.string()).optional(),
})

const AdvancedUpdate = AdvancedCreate.partial()

const AdvancedMediaSetBody = z.object({ mediaIds: z.array(z.string().uuid()) })
const AdvancedMediaDeleteParams = z.object({ id: z.string().uuid(), mediaId: z.string().uuid() })

export const adminAdvancedRoutes: FastifyPluginAsync = async (app) => {
  app.get('/admin/advancedhealthcareinchina', async (req, reply) => {
    const query = parseQuery(req, ListQuerySchema)
    const { skip, take } = toSkipTake(query.page, query.pageSize)
    const sort = parseSort(query.sort, { field: 'updatedAt', direction: 'desc' })

    const where = query.q
      ? {
          OR: [{ name: { contains: query.q, mode: 'insensitive' as const } }],
        }
      : {}

    const [items, total] = await Promise.all([
      app.prisma.advancedHealthcareInChina.findMany({ where, skip, take, orderBy: { [sort.field]: sort.direction } as any }),
      app.prisma.advancedHealthcareInChina.count({ where }),
    ])

    return ok(reply, items, { page: query.page, pageSize: query.pageSize, total })
  })

  app.get('/admin/advancedhealthcareinchina/:id', async (req, reply) => {
    const params = parseParams(req, IdParams)
    const item = await app.prisma.advancedHealthcareInChina.findUnique({
      where: { id: params.id },
      include: { media: { include: { media: true } } },
    })
    if (!item) return reply.status(404).send({ ok: false, error: { code: 'NOT_FOUND', message: 'Topic not found' } })
    return ok(reply, item)
  })

  app.post('/admin/advancedhealthcareinchina', async (req, reply) => {
    const body = parseBody(req, AdvancedCreate)
    const created = await app.prisma.advancedHealthcareInChina.create({
      data: {
        name: body.name,
        slug: body.slug ?? body.name.toLowerCase().replace(/\s+/g, '-'),
        isFeatured: body.isFeatured ?? false,
        description: body.description,
        shortDetails: body.shortDetails ?? [],
      },
    })
    return ok(reply, created)
  })

  app.put('/admin/advancedhealthcareinchina/:id', async (req, reply) => {
    const params = parseParams(req, IdParams)
    const body = parseBody(req, AdvancedUpdate)
    const updated = await app.prisma.advancedHealthcareInChina.update({ where: { id: params.id }, data: body as any })
    return ok(reply, updated)
  })

  app.post('/admin/advancedhealthcareinchina/:id/media', async (req, reply) => {
    const params = parseParams(req, IdParams)
    const body = parseBody(req, AdvancedMediaSetBody)

    await app.prisma.advancedHealthcareInChinaMedia.deleteMany({ where: { advancedId: params.id } })

    if (body.mediaIds.length) {
      await app.prisma.advancedHealthcareInChinaMedia.createMany({
        data: body.mediaIds.map((mediaId, idx) => ({ advancedId: params.id, mediaId, sortOrder: idx })),
        skipDuplicates: true,
      })
    }

    const item = await app.prisma.advancedHealthcareInChina.findUnique({
      where: { id: params.id },
      include: { media: { include: { media: true } } },
    })
    return ok(reply, item)
  })

  app.delete('/admin/advancedhealthcareinchina/:id/media/:mediaId', async (req, reply) => {
    const params = parseParams(req, AdvancedMediaDeleteParams)
    await app.prisma.advancedHealthcareInChinaMedia.deleteMany({ where: { advancedId: params.id, mediaId: params.mediaId } })
    return ok(reply, { id: params.id, mediaId: params.mediaId })
  })

  app.delete('/admin/advancedhealthcareinchina/:id', async (req, reply) => {
    const params = parseParams(req, IdParams)
    await app.prisma.advancedHealthcareInChina.delete({ where: { id: params.id } })
    return ok(reply, { id: params.id })
  })
}
