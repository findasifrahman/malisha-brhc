import type { FastifyPluginAsync } from 'fastify'
import { z } from 'zod'
import { ok } from '../../lib/http.js'
import { ListQuerySchema, parseSort, toSkipTake } from '../../lib/pagination.js'
import { parseBody, parseParams, parseQuery } from '../../lib/zod.js'

const IdParams = z.object({ id: z.string().uuid() })

const BlogCreate = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).optional(),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  isFeatured: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  shortDetails: z.array(z.string()).optional(),
  authorId: z.string().uuid(),
  publishedAt: z.coerce.date().optional().nullable(),
})

const BlogUpdate = BlogCreate.partial()

const BlogMediaSetBody = z.object({ mediaIds: z.array(z.string().uuid()) })
const BlogMediaDeleteParams = z.object({ id: z.string().uuid(), mediaId: z.string().uuid() })

export const adminBlogsRoutes: FastifyPluginAsync = async (app) => {
  app.get('/admin/blogs', async (req, reply) => {
    const query = parseQuery(req, ListQuerySchema)
    const { skip, take } = toSkipTake(query.page, query.pageSize)
    const sort = parseSort(query.sort, { field: 'updatedAt', direction: 'desc' })

    const where = query.q
      ? {
          OR: [
            { title: { contains: query.q, mode: 'insensitive' as const } },
            { excerpt: { contains: query.q, mode: 'insensitive' as const } },
          ],
        }
      : {}

    const [items, total] = await Promise.all([
      app.prisma.blog.findMany({
        where,
        include: { author: { select: { id: true, email: true, role: true } } },
        skip,
        take,
        orderBy: { [sort.field]: sort.direction } as any,
      }),
      app.prisma.blog.count({ where }),
    ])

    return ok(reply, items, { page: query.page, pageSize: query.pageSize, total })
  })

  app.get('/admin/blogs/:id', async (req, reply) => {
    const params = parseParams(req, IdParams)
    const item = await app.prisma.blog.findUnique({
      where: { id: params.id },
      include: {
        author: { select: { id: true, email: true, role: true } },
        comments: true,
        media: { include: { media: true } },
      },
    })
    if (!item) return reply.status(404).send({ ok: false, error: { code: 'NOT_FOUND', message: 'Blog not found' } })
    return ok(reply, item)
  })

  app.post('/admin/blogs', async (req, reply) => {
    const body = parseBody(req, BlogCreate)
    const created = await app.prisma.blog.create({
      data: {
        title: body.title,
        slug: body.slug ?? body.title.toLowerCase().replace(/\s+/g, '-'),
        excerpt: body.excerpt,
        content: body.content,
        isFeatured: body.isFeatured ?? false,
        tags: body.tags ?? [],
        shortDetails: body.shortDetails ?? [],
        authorId: body.authorId,
        publishedAt: body.publishedAt ?? null,
      },
    })
    return ok(reply, created)
  })

  app.put('/admin/blogs/:id', async (req, reply) => {
    const params = parseParams(req, IdParams)
    const body = parseBody(req, BlogUpdate)
    const updated = await app.prisma.blog.update({ where: { id: params.id }, data: body as any })
    return ok(reply, updated)
  })

  app.post('/admin/blogs/:id/media', async (req, reply) => {
    const params = parseParams(req, IdParams)
    const body = parseBody(req, BlogMediaSetBody)

    await app.prisma.blogMedia.deleteMany({ where: { blogId: params.id } })

    if (body.mediaIds.length) {
      await app.prisma.blogMedia.createMany({
        data: body.mediaIds.map((mediaId, idx) => ({ blogId: params.id, mediaId, sortOrder: idx })),
        skipDuplicates: true,
      })
    }

    const item = await app.prisma.blog.findUnique({
      where: { id: params.id },
      include: {
        author: { select: { id: true, email: true, role: true } },
        comments: true,
        media: { include: { media: true } },
      },
    })
    return ok(reply, item)
  })

  app.delete('/admin/blogs/:id/media/:mediaId', async (req, reply) => {
    const params = parseParams(req, BlogMediaDeleteParams)
    await app.prisma.blogMedia.deleteMany({ where: { blogId: params.id, mediaId: params.mediaId } })
    return ok(reply, { id: params.id, mediaId: params.mediaId })
  })

  app.delete('/admin/blogs/:id', async (req, reply) => {
    const params = parseParams(req, IdParams)
    await app.prisma.blog.delete({ where: { id: params.id } })
    return ok(reply, { id: params.id })
  })
}
