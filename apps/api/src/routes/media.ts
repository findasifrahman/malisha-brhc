import type { FastifyPluginAsync } from 'fastify'
import { z } from 'zod'
import sharp from 'sharp'
import { randomUUID } from 'node:crypto'

import { ok } from '../lib/http.js'
import { putPublicObject, deleteObjectIfExists } from '../lib/r2.js'
import { sanitizeFilename, extFromMime } from '../lib/filename.js'

const CategorySchema = z.enum([
  'gallery',
  'service',
  'blogs',
  'users',
  'partners',
  'hospitals',
  'doctors',
  'advancedhealthcareinchina',
  'patientstory',
])

export const mediaRoutes: FastifyPluginAsync = async (app) => {
  app.post(
    '/media/upload',
    {
      preHandler: app.requireAuth,
    },
    async (req, reply) => {
      const mp = await req.file({ limits: { fileSize: 25 * 1024 * 1024 } }) // 25MB limit for videos
      if (!mp) {
        return reply.status(400).send({ ok: false, error: { code: 'NO_FILE', message: 'Missing file' } })
      }

      const categoryRaw = (mp.fields?.category as any)?.value || (mp.fields?.category as any)?.toString?.()
      const category = CategorySchema.safeParse(categoryRaw)
      if (!category.success) {
        req.log.warn({ categoryField: mp.fields?.category, categoryRaw }, 'Invalid category field')
        return reply
          .status(400)
          .send({ ok: false, error: { code: 'INVALID_CATEGORY', message: 'Invalid category' } })
      }

      if (req.authUser?.role === 'partner' && category.data !== 'partners') {
        return reply.status(403).send({ ok: false, error: { code: 'FORBIDDEN', message: 'Insufficient role' } })
      }

      const mimeType = mp.mimetype
      const isImage = mimeType.startsWith('image/')
      const isVideo = mimeType === 'video/mp4'
      req.log.info({ mimeType, isImage, isVideo, filename: mp.filename, size: mp.file?.bytesRead }, 'File received')
      if (!isImage && !isVideo) {
        return reply.status(400).send({
          ok: false,
          error: { code: 'UNSUPPORTED_FILE_TYPE', message: 'Only jpg/png/webp images and mp4 videos are supported' },
        })
      }

      // Enforce size limits: 1MB for images, 25MB for videos
      const maxSize = isImage ? 1 * 1024 * 1024 : 25 * 1024 * 1024
      if (mp.file && mp.file.bytesRead > maxSize) {
        const limit = isImage ? '1MB' : '25MB'
        req.log.warn({ size: mp.file.bytesRead, maxSize, limit }, 'File too large')
        return reply.status(413).send({
          ok: false,
          error: { code: 'FILE_TOO_LARGE', message: `File size exceeds ${limit} limit` },
        })
      }

      const ext = extFromMime(mimeType)
      if (!ext) {
        return reply.status(400).send({
          ok: false,
          error: { code: 'UNSUPPORTED_FILE_TYPE', message: 'Could not determine file extension' },
        })
      }

      const now = new Date()
      const yyyy = String(now.getUTCFullYear())
      const mm = String(now.getUTCMonth() + 1).padStart(2, '0')

      const uuid = randomUUID()
      const originalName = sanitizeFilename(mp.filename)

      const providedTitle = ((mp.fields?.title as any)?.value || (mp.fields?.title as any)?.toString?.())?.trim() || ''
      const title = providedTitle || originalName

      const baseKey = `${category.data}/${yyyy}/${mm}/${uuid}`
      const keyOriginal = `${baseKey}-original.${ext}`
      const keyThumb = `${baseKey}-thumb.webp`

      const originalBuffer = await mp.toBuffer()

      let thumbBuffer: Buffer | null = null
      if (isImage) {
        thumbBuffer = await sharp(originalBuffer)
          .rotate()
          .resize({ width: 480, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toBuffer()
      }

      let urlOriginal: string
      let urlThumb: string | null = null
      try {
        const uploads = [putPublicObject({ key: keyOriginal, body: originalBuffer, contentType: mimeType })]
        if (thumbBuffer) {
          uploads.push(putPublicObject({ key: keyThumb, body: thumbBuffer, contentType: 'image/webp' }))
        }
        const uploaded = await Promise.all(uploads)
        urlOriginal = uploaded[0].url
        urlThumb = thumbBuffer ? uploaded[1].url : null
        req.log.info({ keyOriginal, keyThumb: urlThumb, urlOriginal }, 'R2 upload success')
      } catch (e) {
        req.log.error({ err: e, keyOriginal, keyThumb }, 'R2 upload failed')
        return reply.status(500).send({
          ok: false,
          error: {
            code: 'R2_UPLOAD_FAILED',
            message: e instanceof Error ? e.message : 'R2 upload failed',
          },
        })
      }

      const media = await app.prisma.media.create({
        data: {
          key: keyOriginal,
          url: urlOriginal,
          keyOriginal,
          keyThumb: thumbBuffer ? keyThumb : null,
          urlOriginal,
          urlThumb,
          mimeType,
          title,
          sizeBytes: originalBuffer.length,
        },
      })

      return ok(reply, media)
    },
  )

  app.delete('/media/:id', { preHandler: app.requireRole('admin') }, async (req, reply) => {
    const params = z.object({ id: z.string().uuid() }).parse(req.params)

    const media = await app.prisma.media.findUnique({ where: { id: params.id } })
    if (!media) {
      return reply.status(404).send({ ok: false, error: { code: 'NOT_FOUND', message: 'Media not found' } })
    }

    await Promise.all([
      deleteObjectIfExists(media.keyOriginal ?? media.key ?? null),
      deleteObjectIfExists(media.keyThumb ?? null),
    ])

    await app.prisma.media.delete({ where: { id: media.id } })

    return ok(reply, { id: media.id })
  })
}
