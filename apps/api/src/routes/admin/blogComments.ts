import type { FastifyPluginAsync } from 'fastify'
import { z } from 'zod'
import { ok } from '../../lib/http.js'
import { parseParams } from '../../lib/zod.js'

const IdParams = z.object({ id: z.string().uuid() })

export const adminBlogCommentsRoutes: FastifyPluginAsync = async (app) => {
  app.delete('/admin/blog-comments/:id', async (req, reply) => {
    const params = parseParams(req, IdParams)

    const existing = await app.prisma.blogComment.findUnique({ where: { id: params.id } })
    if (!existing) {
      return reply.status(404).send({ ok: false, error: { code: 'NOT_FOUND', message: 'Comment not found' } })
    }

    await app.prisma.blogComment.delete({ where: { id: params.id } })
    return ok(reply, { id: params.id })
  })
}
