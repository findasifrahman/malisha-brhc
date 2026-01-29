import type { FastifyPluginAsync } from 'fastify'
import { adminDoctorsRoutes } from './doctors.js'
import { adminHospitalsRoutes } from './hospitals.js'
import { adminServicesRoutes } from './services.js'
import { adminAdvancedRoutes } from './advanced.js'
import { adminBlogsRoutes } from './blogs.js'
import { adminBlogCommentsRoutes } from './blogComments.js'
import { adminUsersRoutes } from './users.js'
import { adminPatientStoriesRoutes } from './patientstories.js'
import { adminMediaRoutes } from './media.js'
import { adminLocationsRoutes } from './locations.js'

export const adminRoutes: FastifyPluginAsync = async (app) => {
  await app.register(async (admin) => {
    admin.addHook('preHandler', app.requireRole('admin'))

    await admin.register(adminDoctorsRoutes)
    await admin.register(adminHospitalsRoutes)
    await admin.register(adminServicesRoutes)
    await admin.register(adminAdvancedRoutes)
    await admin.register(adminBlogsRoutes)
    await admin.register(adminBlogCommentsRoutes)
    await admin.register(adminUsersRoutes)
    await admin.register(adminPatientStoriesRoutes)
    await admin.register(adminMediaRoutes)
    await admin.register(adminLocationsRoutes)
  })
}
