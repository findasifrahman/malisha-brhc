import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { env } from './env.js'

export function requireR2() {
  if (!env.R2_ACCOUNT_ID) throw new Error('Missing R2_ACCOUNT_ID')
  if (!env.R2_ACCESS_KEY_ID) throw new Error('Missing R2_ACCESS_KEY_ID')
  if (!env.R2_SECRET_ACCESS_KEY) throw new Error('Missing R2_SECRET_ACCESS_KEY')
  if (!env.R2_BUCKET) throw new Error('Missing R2_BUCKET')
  if (!env.R2_PUBLIC_BASE_URL) throw new Error('Missing R2_PUBLIC_BASE_URL')

  const endpoint =
    env.R2_API_DEFAULT_VALUE?.trim() || `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`

  const client = new S3Client({
    region: 'auto',
    endpoint,
    forcePathStyle: true,
    credentials: {
      accessKeyId: env.R2_ACCESS_KEY_ID,
      secretAccessKey: env.R2_SECRET_ACCESS_KEY,
    },
  })

  return {
    client,
    bucket: env.R2_BUCKET,
    publicBaseUrl: env.R2_PUBLIC_BASE_URL.replace(/\/$/, ''),
  }
}

export async function putPublicObject(params: {
  key: string
  body: Buffer
  contentType: string
}) {
  const { client, bucket, publicBaseUrl } = requireR2()

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: params.key,
      Body: params.body,
      ContentType: params.contentType,
    }),
  )

  return {
    key: params.key,
    url: `${publicBaseUrl}/${params.key}`,
  }
}

export async function deleteObjectIfExists(key: string | null | undefined) {
  if (!key) return
  const { client, bucket } = requireR2()

  try {
    await client.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: key,
      }),
    )
  } catch {
    // ignore
  }
}
