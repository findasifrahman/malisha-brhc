import type { FastifyPluginAsync } from 'fastify'
import { z } from 'zod'
import { ok } from '../lib/http.js'
import { ListQuerySchema, parseSort, toSkipTake } from '../lib/pagination.js'
import { parseQuery, parseParams, parseBody } from '../lib/zod.js'

export const publicRoutes: FastifyPluginAsync = async (app) => {
  app.get('/public/featured', async (_req, reply) => {
    const [services, doctors, advanced, patientStories, hospitals] = await Promise.all([
      app.prisma.service.findMany({ where: { isFeatured: true }, orderBy: { updatedAt: 'desc' }, take: 12 }),
      app.prisma.doctor.findMany({ where: { isFeatured: true }, include: { hospital: true }, orderBy: { updatedAt: 'desc' }, take: 12 }),
      app.prisma.advancedHealthcareInChina.findMany({ where: { isFeatured: true }, orderBy: { updatedAt: 'desc' }, take: 12 }),
      app.prisma.patientStory.findMany({ where: { isFeatured: true }, orderBy: { updatedAt: 'desc' }, take: 12 }),
      app.prisma.hospital.findMany({ where: { isFeatured: true }, include: { city: true, province: true }, orderBy: { updatedAt: 'desc' }, take: 12 }),
    ])

    return ok(reply, {
      services,
      doctors,
      advanced,
      patientStories,
      hospitals,
    })
  })

  app.get('/public/services', async (req, reply) => {
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

  app.get('/public/services/:slug', async (req, reply) => {
    const params = parseParams(req, z.object({ slug: z.string().min(1) }))
    const item = await app.prisma.service.findUnique({ where: { slug: params.slug }, include: { media: { include: { media: true } } } })
    if (!item) return reply.status(404).send({ ok: false, error: { code: 'NOT_FOUND', message: 'Service not found' } })
    return ok(reply, item)
  })

  app.get('/public/services/types', async (_req, reply) => {
    const rows = await app.prisma.service.findMany({ select: { serviceType: true }, distinct: ['serviceType'] as any, orderBy: { serviceType: 'asc' } })
    return ok(reply, rows.map((r) => r.serviceType))
  })

  app.get('/public/hospitals', async (req, reply) => {
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
      app.prisma.hospital.findMany({ where, include: { city: true, province: true }, skip, take, orderBy: { [sort.field]: sort.direction } as any }),
      app.prisma.hospital.count({ where }),
    ])

    return ok(reply, items, { page: query.page, pageSize: query.pageSize, total })
  })

  app.get('/public/hospitals/:slug', async (req, reply) => {
    const params = parseParams(req, z.object({ slug: z.string().min(1) }))
    const item = await app.prisma.hospital.findUnique({
      where: { slug: params.slug },
      include: { city: true, province: true, doctors: true, media: { include: { media: true } } },
    })
    if (!item) return reply.status(404).send({ ok: false, error: { code: 'NOT_FOUND', message: 'Hospital not found' } })
    return ok(reply, item)
  })

  app.get('/public/doctors', async (req, reply) => {
    const query = parseQuery(req, ListQuerySchema)
    const { skip, take } = toSkipTake(query.page, query.pageSize)
    const sort = parseSort(query.sort, { field: 'updatedAt', direction: 'desc' })

    const where = query.q
      ? {
          OR: [
            { name: { contains: query.q, mode: 'insensitive' as const } },
            { specialty: { contains: query.q, mode: 'insensitive' as const } },
            { title: { contains: query.q, mode: 'insensitive' as const } },
          ],
        }
      : {}

    const [items, total] = await Promise.all([
      app.prisma.doctor.findMany({ where, include: { hospital: true }, skip, take, orderBy: { [sort.field]: sort.direction } as any }),
      app.prisma.doctor.count({ where }),
    ])

    return ok(reply, items, { page: query.page, pageSize: query.pageSize, total })
  })

  app.get('/public/doctors/:slug', async (req, reply) => {
    const params = parseParams(req, z.object({ slug: z.string().min(1) }))
    const item = await app.prisma.doctor.findUnique({ where: { slug: params.slug }, include: { hospital: true, media: { include: { media: true } } } })
    if (!item) return reply.status(404).send({ ok: false, error: { code: 'NOT_FOUND', message: 'Doctor not found' } })
    return ok(reply, item)
  })

  app.get('/public/healthcare-in-china', async (req, reply) => {
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

  app.get('/public/healthcare-in-china/:slug', async (req, reply) => {
    const params = parseParams(req, z.object({ slug: z.string().min(1) }))
    const item = await app.prisma.advancedHealthcareInChina.findUnique({
      where: { slug: params.slug },
      include: { media: { include: { media: true } } },
    })
    if (!item) return reply.status(404).send({ ok: false, error: { code: 'NOT_FOUND', message: 'Item not found' } })
    return ok(reply, item)
  })

  app.get('/public/healthcare-in-china/names', async (_req, reply) => {
    const items = await app.prisma.advancedHealthcareInChina.findMany({ select: { name: true, slug: true }, orderBy: { name: 'asc' } })
    return ok(reply, items)
  })

  app.get('/public/patient-stories', async (req, reply) => {
    const query = parseQuery(req, ListQuerySchema)
    const { skip, take } = toSkipTake(query.page, query.pageSize)
    const sort = parseSort(query.sort, { field: 'updatedAt', direction: 'desc' })

    const where = query.q
      ? {
          OR: [{ title: { contains: query.q, mode: 'insensitive' as const } }],
        }
      : {}

    const [items, total] = await Promise.all([
      app.prisma.patientStory.findMany({ where, include: { author: { select: { id: true, email: true } } }, skip, take, orderBy: { [sort.field]: sort.direction } as any }),
      app.prisma.patientStory.count({ where }),
    ])

    return ok(reply, items, { page: query.page, pageSize: query.pageSize, total })
  })

  app.get('/public/patient-stories/:slug', async (req, reply) => {
    const params = parseParams(req, z.object({ slug: z.string().min(1) }))
    const item = await app.prisma.patientStory.findUnique({
      where: { slug: params.slug },
      include: { author: { select: { id: true, email: true } }, media: { include: { media: true } } },
    })
    if (!item) return reply.status(404).send({ ok: false, error: { code: 'NOT_FOUND', message: 'Patient story not found' } })
    return ok(reply, item)
  })

  app.get('/public/blogs', async (req, reply) => {
    const query = parseQuery(req, ListQuerySchema)
    const { skip, take } = toSkipTake(query.page, query.pageSize)
    const sort = parseSort(query.sort, { field: 'publishedAt', direction: 'desc' })

    const where = query.q
      ? {
          OR: [
            { title: { contains: query.q, mode: 'insensitive' as const } },
            { excerpt: { contains: query.q, mode: 'insensitive' as const } },
          ],
        }
      : {}

    const [items, total] = await Promise.all([
      app.prisma.blog.findMany({ where, include: { author: { select: { id: true, email: true } } }, skip, take, orderBy: { [sort.field]: sort.direction } as any }),
      app.prisma.blog.count({ where }),
    ])

    return ok(reply, items, { page: query.page, pageSize: query.pageSize, total })
  })

  app.get('/public/blogs/:slug', async (req, reply) => {
    const params = parseParams(req, z.object({ slug: z.string().min(1) }))
    const item = await app.prisma.blog.findUnique({
      where: { slug: params.slug },
      include: { author: { select: { id: true, email: true } }, comments: true, media: { include: { media: true } } },
    })
    if (!item) return reply.status(404).send({ ok: false, error: { code: 'NOT_FOUND', message: 'Blog not found' } })
    return ok(reply, item)
  })

  app.post('/public/blogs/:slug/comments', async (req, reply) => {
    const params = parseParams(req, z.object({ slug: z.string().min(1) }))
    const body = parseBody(
      req,
      z.object({
        name: z.string().min(1),
        email: z.string().email().optional(),
        content: z.string().min(1),
      }),
    )

    const blog = await app.prisma.blog.findUnique({ where: { slug: params.slug }, select: { id: true } })
    if (!blog) return reply.status(404).send({ ok: false, error: { code: 'NOT_FOUND', message: 'Blog not found' } })

    const comment = await app.prisma.blogComment.create({
      data: {
        blogId: blog.id,
        name: body.name,
        email: body.email,
        content: body.content,
      },
    })

    return ok(reply, comment)
  })

  app.get('/public/media/gallery', async (req, reply) => {
    const query = parseQuery(req, ListQuerySchema)
    const { skip, take } = toSkipTake(query.page, query.pageSize)

    const where = query.q
      ? {
          OR: [
            { title: { contains: query.q, mode: 'insensitive' as const } },
            { alt: { contains: query.q, mode: 'insensitive' as const } },
            { keyOriginal: { contains: query.q, mode: 'insensitive' as const } },
            { key: { contains: query.q, mode: 'insensitive' as const } },
          ],
        }
      : {}

    const galleryWhere = {
      AND: [
        where,
        {
          OR: [
            { keyOriginal: { startsWith: 'gallery/' } },
            { key: { startsWith: 'gallery/' } },
          ],
        },
      ],
    }

    const [items, total] = await Promise.all([
      app.prisma.media.findMany({ where: galleryWhere as any, skip, take, orderBy: { createdAt: 'desc' } }),
      app.prisma.media.count({ where: galleryWhere as any }),
    ])

    return ok(reply, items, { page: query.page, pageSize: query.pageSize, total })
  })

  app.get('/public/search', async (req, reply) => {
    const query = parseQuery(req, z.object({ q: z.string().min(1), limit: z.coerce.number().int().min(1).max(50).default(10) }))

    const [hospitals, doctors, advanced] = await Promise.all([
      app.prisma.hospital.findMany({ where: { name: { contains: query.q, mode: 'insensitive' } }, take: query.limit, orderBy: { updatedAt: 'desc' } }),
      app.prisma.doctor.findMany({ where: { name: { contains: query.q, mode: 'insensitive' } }, take: query.limit, orderBy: { updatedAt: 'desc' } }),
      app.prisma.advancedHealthcareInChina.findMany({ where: { name: { contains: query.q, mode: 'insensitive' } }, take: query.limit, orderBy: { updatedAt: 'desc' } }),
    ])

    return ok(reply, { hospitals, doctors, advanced })
  })
}
