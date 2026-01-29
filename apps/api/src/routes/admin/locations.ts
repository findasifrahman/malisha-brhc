import type { FastifyPluginAsync } from 'fastify'
import { z } from 'zod'
import { ok } from '../../lib/http.js'
import { ListQuerySchema, parseSort, toSkipTake } from '../../lib/pagination.js'
import { parseBody, parseParams, parseQuery } from '../../lib/zod.js'

const IdParams = z.object({ id: z.string().uuid() })

const ProvinceCreate = z.object({
  name: z.string().min(1),
})
const ProvinceUpdate = ProvinceCreate.partial()

const CityCreate = z.object({
  name: z.string().min(1),
  provinceId: z.string().uuid(),
})
const CityUpdate = CityCreate.partial()

const CityListQuery = ListQuerySchema.extend({
  provinceId: z.string().uuid().optional(),
})

export const adminLocationsRoutes: FastifyPluginAsync = async (app) => {
  app.get('/admin/provinces', async (req, reply) => {
    const query = parseQuery(req, ListQuerySchema)
    const { skip, take } = toSkipTake(query.page, query.pageSize)
    const sort = parseSort(query.sort, { field: 'updatedAt', direction: 'desc' })

    const where = query.q
      ? {
          name: { contains: query.q, mode: 'insensitive' as const },
        }
      : {}

    const [items, total] = await Promise.all([
      app.prisma.province.findMany({ where, skip, take, orderBy: { [sort.field]: sort.direction } as any }),
      app.prisma.province.count({ where }),
    ])

    return ok(reply, items, { page: query.page, pageSize: query.pageSize, total })
  })

  app.get('/admin/provinces/:id', async (req, reply) => {
    const params = parseParams(req, IdParams)
    const item = await app.prisma.province.findUnique({
      where: { id: params.id },
      include: { cities: true },
    })
    if (!item) return reply.status(404).send({ ok: false, error: { code: 'NOT_FOUND', message: 'Province not found' } })
    return ok(reply, item)
  })

  app.post('/admin/provinces', async (req, reply) => {
    const body = parseBody(req, ProvinceCreate)
    const created = await app.prisma.province.create({ data: { name: body.name } })
    return ok(reply, created)
  })

  app.put('/admin/provinces/:id', async (req, reply) => {
    const params = parseParams(req, IdParams)
    const body = parseBody(req, ProvinceUpdate)
    const updated = await app.prisma.province.update({ where: { id: params.id }, data: body as any })
    return ok(reply, updated)
  })

  app.delete('/admin/provinces/:id', async (req, reply) => {
    const params = parseParams(req, IdParams)
    await app.prisma.province.delete({ where: { id: params.id } })
    return ok(reply, { id: params.id })
  })

  app.get('/admin/cities', async (req, reply) => {
    const query = parseQuery(req, CityListQuery)
    const { skip, take } = toSkipTake(query.page, query.pageSize)
    const sort = parseSort(query.sort, { field: 'updatedAt', direction: 'desc' })

    const where: any = {}
    if (query.q) {
      where.name = { contains: query.q, mode: 'insensitive' as const }
    }
    if (query.provinceId) {
      where.provinceId = query.provinceId
    }

    const [items, total] = await Promise.all([
      app.prisma.city.findMany({
        where,
        include: { province: true },
        skip,
        take,
        orderBy: { [sort.field]: sort.direction } as any,
      }),
      app.prisma.city.count({ where }),
    ])

    return ok(reply, items, { page: query.page, pageSize: query.pageSize, total })
  })

  app.get('/admin/cities/:id', async (req, reply) => {
    const params = parseParams(req, IdParams)
    const item = await app.prisma.city.findUnique({
      where: { id: params.id },
      include: { province: true },
    })
    if (!item) return reply.status(404).send({ ok: false, error: { code: 'NOT_FOUND', message: 'City not found' } })
    return ok(reply, item)
  })

  app.post('/admin/cities', async (req, reply) => {
    const body = parseBody(req, CityCreate)
    const created = await app.prisma.city.create({ data: { name: body.name, provinceId: body.provinceId } })
    return ok(reply, created)
  })

  app.put('/admin/cities/:id', async (req, reply) => {
    const params = parseParams(req, IdParams)
    const body = parseBody(req, CityUpdate)
    const updated = await app.prisma.city.update({ where: { id: params.id }, data: body as any })
    return ok(reply, updated)
  })

  app.delete('/admin/cities/:id', async (req, reply) => {
    const params = parseParams(req, IdParams)
    await app.prisma.city.delete({ where: { id: params.id } })
    return ok(reply, { id: params.id })
  })
}
