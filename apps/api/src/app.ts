import Fastify from 'fastify'
import cors from '@fastify/cors'
import sensible from '@fastify/sensible'
import rateLimit from '@fastify/rate-limit'
import multipart from '@fastify/multipart'

import { env } from './lib/env.js'
import { prismaPlugin } from './plugins/prisma.js'
import { authPlugin } from './plugins/auth.js'
import { healthRoutes } from './routes/health.js'
import { authRoutes } from './routes/auth.js'
import { publicRoutes } from './routes/public.js'
import { partnerRoutes } from './routes/partner.js'
import { adminRoutes } from './routes/admin/index.js'
import { mediaRoutes } from './routes/media.js'

export async function buildApp() {
  const app = Fastify({ logger: true })

  const r2Endpoint = env.R2_API_DEFAULT_VALUE?.trim() || (env.R2_ACCOUNT_ID ? `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com` : undefined)
  app.log.info(
    {
      r2: {
        configured: Boolean(
          env.R2_ACCOUNT_ID &&
            env.R2_ACCESS_KEY_ID &&
            env.R2_SECRET_ACCESS_KEY &&
            env.R2_BUCKET &&
            env.R2_PUBLIC_BASE_URL,
        ),
        endpoint: r2Endpoint,
        bucket: env.R2_BUCKET,
        publicBaseUrl: env.R2_PUBLIC_BASE_URL,
      },
    },
    'R2 configuration',
  )

  await app.register(sensible)

  await app.register(cors, {
    origin:
      env.CORS_ORIGIN === '*'
        ? true
        : env.CORS_ORIGIN.split(',').map((s: string) => s.trim()),
    credentials: true,
  })

  await app.register(rateLimit, {
    max: 200,
    timeWindow: '1 minute',
  })

  await app.register(multipart, {
    limits: {
      fileSize: 2 * 1024 * 1024,
    },
  })

  await app.register(prismaPlugin)
  await app.register(authPlugin)

  await app.register(healthRoutes)
  await app.register(authRoutes)
  await app.register(publicRoutes)
  await app.register(partnerRoutes)
  await app.register(mediaRoutes)
  await app.register(adminRoutes)

  app.setErrorHandler((err: any, _req, reply) => {
    if (err?.name === 'ZodError') {
      return reply
        .status(400)
        .send({ ok: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid request', details: err } })
    }

    if (err?.statusCode && err?.message) {
      return reply.status(err.statusCode).send({ ok: false, error: { code: 'HTTP_ERROR', message: err.message } })
    }

    app.log.error(err)
    return reply.status(500).send({ ok: false, error: { code: 'INTERNAL', message: 'Internal server error' } })
  })

  return app
}
