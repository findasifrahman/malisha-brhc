import type { FastifyPluginAsync } from 'fastify'
import { z } from 'zod'
import { ok } from '../../lib/http.js'
import { ListQuerySchema, parseSort, toSkipTake } from '../../lib/pagination.js'
import { parseBody, parseParams, parseQuery } from '../../lib/zod.js'

const IdParams = z.object({ id: z.string().uuid() })

const DoctorCreate = z.object({
  name: z.string().min(1),
  slug: z.string().min(1).optional(),
  title: z.string().optional(),
  specialty: z.string().optional(),
  isFeatured: z.boolean().optional(),
  hospitalId: z.string().uuid().nullable().optional(),
  nameCn: z.string().optional(),
  socialAppointments: z.string().optional(),
  professionalExpertise: z.string().optional(),
  clinicalExperience: z.string().optional(),
  academicAchievement: z.string().optional(),
  other1DescName: z.string().optional(),
  otherDesc: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  wechat: z.string().optional(),
  bio: z.string().optional(),
  shortDetails: z.array(z.string()).optional(),
})

const DoctorUpdate = DoctorCreate.partial()

const DoctorMediaSetBody = z.object({ mediaIds: z.array(z.string().uuid()) })
const DoctorMediaDeleteParams = z.object({ id: z.string().uuid(), mediaId: z.string().uuid() })

export const adminDoctorsRoutes: FastifyPluginAsync = async (app) => {
  app.get('/admin/doctors', async (req, reply) => {
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
      app.prisma.doctor.findMany({
        where,
        include: { hospital: true },
        skip,
        take,
        orderBy: { [sort.field]: sort.direction } as any,
      }),
      app.prisma.doctor.count({ where }),
    ])

    return ok(reply, items, { page: query.page, pageSize: query.pageSize, total })
  })

  app.get('/admin/doctors/:id', async (req, reply) => {
    const params = parseParams(req, IdParams)
    const item = await app.prisma.doctor.findUnique({
      where: { id: params.id },
      include: { hospital: true, media: { include: { media: true } } },
    })
    if (!item) return reply.status(404).send({ ok: false, error: { code: 'NOT_FOUND', message: 'Doctor not found' } })
    return ok(reply, item)
  })

  app.post('/admin/doctors', async (req, reply) => {
    const body = parseBody(req, DoctorCreate)
    const created = await app.prisma.doctor.create({
      data: {
        name: body.name,
        slug: body.slug ?? body.name.toLowerCase().replace(/\s+/g, '-'),
        title: body.title,
        specialty: body.specialty,
        isFeatured: body.isFeatured ?? false,
        hospitalId: body.hospitalId ?? null,
        nameCn: body.nameCn,
        socialAppointments: body.socialAppointments,
        professionalExpertise: body.professionalExpertise,
        clinicalExperience: body.clinicalExperience,
        academicAchievement: body.academicAchievement,
        other1DescName: body.other1DescName,
        otherDesc: body.otherDesc,
        address: body.address,
        phone: body.phone,
        wechat: body.wechat,
        bio: body.bio,
        shortDetails: body.shortDetails ?? [],
      },
    })
    return ok(reply, created)
  })

  app.put('/admin/doctors/:id', async (req, reply) => {
    const params = parseParams(req, IdParams)
    const body = parseBody(req, DoctorUpdate)
    const updated = await app.prisma.doctor.update({ where: { id: params.id }, data: body as any })
    return ok(reply, updated)
  })

  app.post('/admin/doctors/:id/media', async (req, reply) => {
    const params = parseParams(req, IdParams)
    const body = parseBody(req, DoctorMediaSetBody)

    await app.prisma.doctorMedia.deleteMany({ where: { doctorId: params.id } })

    if (body.mediaIds.length) {
      await app.prisma.doctorMedia.createMany({
        data: body.mediaIds.map((mediaId, idx) => ({ doctorId: params.id, mediaId, sortOrder: idx })),
        skipDuplicates: true,
      })
    }

    const item = await app.prisma.doctor.findUnique({
      where: { id: params.id },
      include: { hospital: true, media: { include: { media: true } } },
    })
    return ok(reply, item)
  })

  app.delete('/admin/doctors/:id/media/:mediaId', async (req, reply) => {
    const params = parseParams(req, DoctorMediaDeleteParams)
    await app.prisma.doctorMedia.deleteMany({ where: { doctorId: params.id, mediaId: params.mediaId } })
    return ok(reply, { id: params.id, mediaId: params.mediaId })
  })

  app.delete('/admin/doctors/:id', async (req, reply) => {
    const params = parseParams(req, IdParams)
    await app.prisma.doctor.delete({ where: { id: params.id } })
    return ok(reply, { id: params.id })
  })
}
