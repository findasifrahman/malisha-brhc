import type { FastifyPluginAsync } from 'fastify'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { ok } from '../lib/http.js'
import { parseBody } from '../lib/zod.js'

const UpdateProfileSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
  phone: z.string().min(1).optional(),
  wechat: z.string().min(1).optional(),
  whatsapp: z.string().min(1).optional(),
  country: z.string().min(1).optional(),
  contactPerson: z.string().min(1).optional(),
  companyName: z.string().min(1).optional(),
  address: z.string().min(1).optional(),
  age: z.number().int().min(0).optional(),
  profileImageId: z.string().uuid().optional(),
})

export const partnerRoutes: FastifyPluginAsync = async (app) => {
  app.get('/partner/profile', { preHandler: app.requireRole('partner') }, async (req, reply) => {
    const userId = req.authUser!.id
    const user = await app.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
        phone: true,
        wechat: true,
        whatsapp: true,
        country: true,
        contactPerson: true,
        companyName: true,
        address: true,
        age: true,
        profileImageId: true,
        profileImage: { select: { id: true, url: true, urlOriginal: true, urlThumb: true } },
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!user) {
      return reply.status(404).send({ ok: false, error: { code: 'NOT_FOUND', message: 'User not found' } })
    }

    return ok(reply, user)
  })

  app.put('/partner/profile', { preHandler: app.requireRole('partner') }, async (req, reply) => {
    const userId = req.authUser!.id
    const body = parseBody(req, UpdateProfileSchema)

    const data: {
      email?: string
      passwordHash?: string
      phone?: string
      wechat?: string
      whatsapp?: string
      country?: string
      contactPerson?: string
      companyName?: string
      address?: string
      age?: number
      profileImageId?: string
    } = {}
    if (body.email) data.email = body.email
    if (body.password) data.passwordHash = await bcrypt.hash(body.password, 12)
    if (body.phone) data.phone = body.phone
    if (body.wechat) data.wechat = body.wechat
    if (body.whatsapp) data.whatsapp = body.whatsapp
    if (body.country) data.country = body.country
    if (body.contactPerson) data.contactPerson = body.contactPerson
    if (body.companyName) data.companyName = body.companyName
    if (body.address) data.address = body.address
    if (body.age !== undefined) data.age = body.age
    if (body.profileImageId) data.profileImageId = body.profileImageId

    const user = await app.prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        email: true,
        role: true,
        phone: true,
        wechat: true,
        whatsapp: true,
        country: true,
        contactPerson: true,
        companyName: true,
        address: true,
        age: true,
        profileImageId: true,
        profileImage: { select: { id: true, url: true, urlOriginal: true, urlThumb: true } },
        createdAt: true,
        updatedAt: true,
      },
    })

    return ok(reply, user)
  })
}
