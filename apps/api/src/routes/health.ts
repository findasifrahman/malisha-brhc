import type { FastifyPluginAsync } from 'fastify'
import { ok } from '../lib/http.js'

export const healthRoutes: FastifyPluginAsync = async (app) => {
  app.get('/health', async (_req, reply) => {
    return ok(reply, {
      service: 'api',
      name: 'Belt and Road Healthcare System',
      time: new Date().toISOString(),
    })
  })
}
