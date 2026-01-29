import type { FastifyPluginAsync } from 'fastify'
import { z } from 'zod'
import { ok } from '../../lib/http.js'
import { ListQuerySchema, parseSort, toSkipTake } from '../../lib/pagination.js'
import { parseBody, parseParams, parseQuery } from '../../lib/zod.js'

const IdParams = z.object({ id: z.string().uuid() })

const HospitalCreate = z.object({
  name: z.string().min(1),
  slug: z.string().min(1).optional(),
  isFeatured: z.boolean().optional(),
  provinceId: z.string().uuid(),
  cityId: z.string().uuid(),
  address: z.string().optional(),
  videoUrl: z.string().optional(),
  logoUrl: z.string().optional(),
  website: z.string().optional(),
  wechat: z.string().optional(),
  whatsapp: z.string().optional(),
  description: z.string().optional(),
  shortDetails: z.array(z.string()).optional(),
})

const HospitalUpdate = HospitalCreate.partial()

const HospitalMediaSetBody = z.object({ mediaIds: z.array(z.string().uuid()) })
const HospitalMediaDeleteParams = z.object({ id: z.string().uuid(), mediaId: z.string().uuid() })

export const adminHospitalsRoutes: FastifyPluginAsync = async (app) => {
  app.get('/admin/hospitals', async (req, reply) => {
    const query = parseQuery(req, ListQuerySchema)
    const { skip, take } = toSkipTake(query.page, query.pageSize)
    const sort = parseSort(query.sort, { field: 'updatedAt', direction: 'desc' })

    const where = query.q
      ? {
          OR: [
            { name: { contains: query.q, mode: 'insensitive' as const } },
            { address: { contains: query.q, mode: 'insensitive' as const } },
          ],
        }
      : {}

    const [items, total] = await Promise.all([
      app.prisma.hospital.findMany({
        where,
        include: { city: true, province: true },
        skip,
        take,
        orderBy: { [sort.field]: sort.direction } as any,
      }),
      app.prisma.hospital.count({ where }),
    ])

    return ok(reply, items, { page: query.page, pageSize: query.pageSize, total })
  })

  app.get('/admin/hospitals/:id', async (req, reply) => {
    const params = parseParams(req, IdParams)
    const item = await app.prisma.hospital.findUnique({
      where: { id: params.id },
      include: { city: true, province: true, doctors: true, media: { include: { media: true } } },
    })
    if (!item) return reply.status(404).send({ ok: false, error: { code: 'NOT_FOUND', message: 'Hospital not found' } })
    return ok(reply, item)
  })

  app.post('/admin/hospitals', async (req, reply) => {
    const body = parseBody(req, HospitalCreate)
    const created = await app.prisma.hospital.create({
      data: {
        name: body.name,
        slug: body.slug ?? body.name.toLowerCase().replace(/\s+/g, '-'),
        isFeatured: body.isFeatured ?? false,
        provinceId: body.provinceId,
        cityId: body.cityId,
        address: body.address,
        videoUrl: body.videoUrl,
        logoUrl: body.logoUrl,
        website: body.website,
        wechat: body.wechat,
        whatsapp: body.whatsapp,
        description: body.description,
        shortDetails: body.shortDetails ?? [],
      },
    })
    return ok(reply, created)
  })

  app.put('/admin/hospitals/:id', async (req, reply) => {
    const params = parseParams(req, IdParams)
    const body = parseBody(req, HospitalUpdate)
    const updated = await app.prisma.hospital.update({ where: { id: params.id }, data: body as any })
    return ok(reply, updated)
  })

  app.post('/admin/hospitals/:id/media', async (req, reply) => {
    const params = parseParams(req, IdParams)
    const body = parseBody(req, HospitalMediaSetBody)

    await app.prisma.hospitalMedia.deleteMany({ where: { hospitalId: params.id } })

    if (body.mediaIds.length) {
      await app.prisma.hospitalMedia.createMany({
        data: body.mediaIds.map((mediaId, idx) => ({ hospitalId: params.id, mediaId, sortOrder: idx })),
        skipDuplicates: true,
      })
    }

    const item = await app.prisma.hospital.findUnique({
      where: { id: params.id },
      include: { city: true, province: true, doctors: true, media: { include: { media: true } } },
    })
    return ok(reply, item)
  })

  app.delete('/admin/hospitals/:id/media/:mediaId', async (req, reply) => {
    const params = parseParams(req, HospitalMediaDeleteParams)
    await app.prisma.hospitalMedia.deleteMany({ where: { hospitalId: params.id, mediaId: params.mediaId } })
    return ok(reply, { id: params.id, mediaId: params.mediaId })
  })

  app.delete('/admin/hospitals/:id', async (req, reply) => {
    const params = parseParams(req, IdParams)
    await app.prisma.hospital.delete({ where: { id: params.id } })
    return ok(reply, { id: params.id })
  })
}
