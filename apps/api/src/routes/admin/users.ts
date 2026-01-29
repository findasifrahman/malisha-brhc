import type { FastifyPluginAsync } from 'fastify'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { ok } from '../../lib/http.js'
import { ListQuerySchema, parseSort, toSkipTake } from '../../lib/pagination.js'
import { parseBody, parseParams, parseQuery } from '../../lib/zod.js'

const IdParams = z.object({ id: z.string().uuid() })

const UserCreate = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['admin', 'partner']),
})

const UserUpdate = z.object({
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
  role: z.enum(['admin', 'partner']).optional(),
})

export const adminUsersRoutes: FastifyPluginAsync = async (app) => {
  app.get('/admin/users', async (req, reply) => {
    const query = parseQuery(req, ListQuerySchema)
    const { skip, take } = toSkipTake(query.page, query.pageSize)
    const sort = parseSort(query.sort, { field: 'updatedAt', direction: 'desc' })

    const where = query.q
      ? {
          OR: [{ email: { contains: query.q, mode: 'insensitive' as const } }],
        }
      : {}

    const [items, total] = await Promise.all([
      app.prisma.user.findMany({
        where,
        skip,
        take,
        orderBy: { [sort.field]: sort.direction } as any,
        select: { id: true, email: true, role: true, createdAt: true, updatedAt: true },
      }),
      app.prisma.user.count({ where }),
    ])

    return ok(reply, items, { page: query.page, pageSize: query.pageSize, total })
  })

  app.get('/admin/users/:id', async (req, reply) => {
    const params = parseParams(req, IdParams)
    const item = await app.prisma.user.findUnique({
      where: { id: params.id },
      select: { id: true, email: true, role: true, createdAt: true, updatedAt: true },
    })
    if (!item) return reply.status(404).send({ ok: false, error: { code: 'NOT_FOUND', message: 'User not found' } })
    return ok(reply, item)
  })

  app.post('/admin/users', async (req, reply) => {
    const body = parseBody(req, UserCreate)
    const passwordHash = await bcrypt.hash(body.password, 12)
    const created = await app.prisma.user.create({
      data: {
        email: body.email,
        passwordHash,
        role: body.role,
      },
      select: { id: true, email: true, role: true, createdAt: true, updatedAt: true },
    })
    return ok(reply, created)
  })

  app.put('/admin/users/:id', async (req, reply) => {
    const params = parseParams(req, IdParams)
    const body = parseBody(req, UserUpdate)

    const data: { email?: string; role?: 'admin' | 'partner'; passwordHash?: string } = {}
    if (body.email) data.email = body.email
    if (body.role) data.role = body.role
    if (body.password) data.passwordHash = await bcrypt.hash(body.password, 12)

    const updated = await app.prisma.user.update({
      where: { id: params.id },
      data,
      select: { id: true, email: true, role: true, createdAt: true, updatedAt: true },
    })
    return ok(reply, updated)
  })

  app.delete('/admin/users/:id', async (req, reply) => {
    const params = parseParams(req, IdParams)
    await app.prisma.user.delete({ where: { id: params.id } })
    return ok(reply, { id: params.id })
  })
}
