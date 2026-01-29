import fp from 'fastify-plugin'
import jwt from '@fastify/jwt'
import { env } from '../lib/env.js'

export type Role = 'admin' | 'partner'
export type JwtUser = {
  id: string
  email: string
  role: Role
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: JwtUser
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    authUser?: JwtUser
  }

  interface FastifyInstance {
    requireAuth: (req: import('fastify').FastifyRequest) => Promise<void>
    requireRole: (role: Role) => (req: import('fastify').FastifyRequest) => Promise<void>
  }
}

export const authPlugin = fp(async (app) => {
  await app.register(jwt, {
    secret: env.JWT_SECRET,
  })

  app.decorate('requireAuth', async (req) => {
    const decoded = (await req.jwtVerify()) as JwtUser
    req.authUser = decoded
  })

  app.decorate('requireRole', (role: Role) => {
    return async (req) => {
      const decoded = (await req.jwtVerify()) as JwtUser
      req.authUser = decoded

      if (decoded.role !== role) {
        throw app.httpErrors.forbidden('Insufficient role')
      }
    }
  })
})
