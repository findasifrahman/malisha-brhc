import type { FastifyPluginAsync } from 'fastify'
import { z } from 'zod'
import { ok } from '../../lib/http.js'
import { ListQuerySchema, parseSort, toSkipTake } from '../../lib/pagination.js'
import { parseBody, parseParams, parseQuery } from '../../lib/zod.js'

const IdParams = z.object({ id: z.string().uuid() })

const PatientStoryCreate = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).optional(),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  isFeatured: z.boolean().optional(),
  shortDetails: z.array(z.string()).optional(),
  authorId: z.string().uuid().nullable().optional(),
  publishedAt: z.coerce.date().optional().nullable(),
})

const PatientStoryUpdate = PatientStoryCreate.partial()

const PatientStoryMediaSetBody = z.object({ mediaIds: z.array(z.string().uuid()) })
const PatientStoryMediaDeleteParams = z.object({ id: z.string().uuid(), mediaId: z.string().uuid() })

export const adminPatientStoriesRoutes: FastifyPluginAsync = async (app) => {
  app.get('/admin/patientstory', async (req, reply) => {
    const query = parseQuery(req, ListQuerySchema)
    const { skip, take } = toSkipTake(query.page, query.pageSize)
    const sort = parseSort(query.sort, { field: 'updatedAt', direction: 'desc' })

    const where = query.q
      ? {
          OR: [{ title: { contains: query.q, mode: 'insensitive' as const } }],
        }
      : {}

    const [items, total] = await Promise.all([
      app.prisma.patientStory.findMany({
        where,
        include: { author: { select: { id: true, email: true, role: true } } },
        skip,
        take,
        orderBy: { [sort.field]: sort.direction } as any,
      }),
      app.prisma.patientStory.count({ where }),
    ])

    return ok(reply, items, { page: query.page, pageSize: query.pageSize, total })
  })

  app.get('/admin/patientstory/:id', async (req, reply) => {
    const params = parseParams(req, IdParams)
    const item = await app.prisma.patientStory.findUnique({
      where: { id: params.id },
      include: { author: { select: { id: true, email: true, role: true } }, media: { include: { media: true } } },
    })
    if (!item) return reply.status(404).send({ ok: false, error: { code: 'NOT_FOUND', message: 'Patient story not found' } })
    return ok(reply, item)
  })

  app.post('/admin/patientstory', async (req, reply) => {
    const body = parseBody(req, PatientStoryCreate)
    const created = await app.prisma.patientStory.create({
      data: {
        title: body.title,
        slug: body.slug ?? body.title.toLowerCase().replace(/\s+/g, '-'),
        excerpt: body.excerpt,
        content: body.content,
        isFeatured: body.isFeatured ?? false,
        shortDetails: body.shortDetails ?? [],
        authorId: body.authorId ?? null,
        publishedAt: body.publishedAt ?? null,
      },
    })
    return ok(reply, created)
  })

  app.put('/admin/patientstory/:id', async (req, reply) => {
    const params = parseParams(req, IdParams)
    const body = parseBody(req, PatientStoryUpdate)
    const updated = await app.prisma.patientStory.update({ where: { id: params.id }, data: body as any })
    return ok(reply, updated)
  })

  app.post('/admin/patientstory/:id/media', async (req, reply) => {
    const params = parseParams(req, IdParams)
    const body = parseBody(req, PatientStoryMediaSetBody)

    await app.prisma.patientStoryMedia.deleteMany({ where: { patientStoryId: params.id } })

    if (body.mediaIds.length) {
      await app.prisma.patientStoryMedia.createMany({
        data: body.mediaIds.map((mediaId, idx) => ({ patientStoryId: params.id, mediaId, sortOrder: idx })),
        skipDuplicates: true,
      })
    }

    const item = await app.prisma.patientStory.findUnique({
      where: { id: params.id },
      include: { author: { select: { id: true, email: true, role: true } }, media: { include: { media: true } } },
    })
    return ok(reply, item)
  })

  app.delete('/admin/patientstory/:id/media/:mediaId', async (req, reply) => {
    const params = parseParams(req, PatientStoryMediaDeleteParams)
    await app.prisma.patientStoryMedia.deleteMany({ where: { patientStoryId: params.id, mediaId: params.mediaId } })
    return ok(reply, { id: params.id, mediaId: params.mediaId })
  })

  app.delete('/admin/patientstory/:id', async (req, reply) => {
    const params = parseParams(req, IdParams)
    await app.prisma.patientStory.delete({ where: { id: params.id } })
    return ok(reply, { id: params.id })
  })
}
