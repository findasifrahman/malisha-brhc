import type { FastifyPluginAsync } from 'fastify'
import { z } from 'zod'
import { ok } from '../../lib/http.js'
import { ListQuerySchema, parseSort, toSkipTake } from '../../lib/pagination.js'
import { parseBody, parseParams, parseQuery } from '../../lib/zod.js'

const IdParams = z.object({ id: z.string().uuid() })

const TeamCreate = z.object({
  name: z.string().min(1),
  slug: z.string().min(1).optional(),
  designation: z.string().min(1),
  role: z.string().min(1),
  shortDesc: z.string().optional(),
  fullDesc: z.string().optional(),
  mediaId: z.string().uuid().nullable().optional(),
})

const TeamUpdate = TeamCreate.partial()

export const adminTeamsRoutes: FastifyPluginAsync = async (app) => {
  app.get('/admin/teams', async (req, reply) => {
    const query = parseQuery(req, ListQuerySchema)
    const { skip, take } = toSkipTake(query.page, query.pageSize)
    const sort = parseSort(query.sort, { field: 'updatedAt', direction: 'desc' })

    const where = query.q
      ? {
          OR: [
            { name: { contains: query.q, mode: 'insensitive' as const } },
            { designation: { contains: query.q, mode: 'insensitive' as const } },
            { role: { contains: query.q, mode: 'insensitive' as const } },
          ],
        }
      : {}

    const [items, total] = await Promise.all([
      app.prisma.team.findMany({ where, skip, take, orderBy: { [sort.field]: sort.direction } as any, include: { media: true } }),
      app.prisma.team.count({ where }),
    ])

    return ok(reply, items, { page: query.page, pageSize: query.pageSize, total })
  })

  app.get('/admin/teams/:id', async (req, reply) => {
    const params = parseParams(req, IdParams)
    const item = await app.prisma.team.findUnique({ where: { id: params.id }, include: { media: true } })
    if (!item) return reply.status(404).send({ ok: false, error: { code: 'NOT_FOUND', message: 'Team member not found' } })
    return ok(reply, item)
  })

  app.post('/admin/teams', async (req, reply) => {
    const body = parseBody(req, TeamCreate)
    const created = await app.prisma.team.create({
      data: {
        name: body.name,
        slug: body.slug ?? body.name.toLowerCase().replace(/\s+/g, '-'),
        designation: body.designation,
        role: body.role,
        shortDesc: body.shortDesc,
        fullDesc: body.fullDesc,
        mediaId: body.mediaId ?? null,
      },
      include: { media: true },
    })
    return ok(reply, created)
  })

  app.put('/admin/teams/:id', async (req, reply) => {
    const params = parseParams(req, IdParams)
    const body = parseBody(req, TeamUpdate)
    const updated = await app.prisma.team.update({ where: { id: params.id }, data: body as any, include: { media: true } })
    return ok(reply, updated)
  })

  app.delete('/admin/teams/:id', async (req, reply) => {
    const params = parseParams(req, IdParams)
    await app.prisma.team.delete({ where: { id: params.id } })
    return ok(reply, { id: params.id })
  })
}
