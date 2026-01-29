import 'dotenv/config'

import { readFile } from 'node:fs/promises'

async function main() {
  const apiBase = process.env.API_BASE_URL ?? 'http://localhost:3001'
  const adminToken = process.env.ADMIN_TOKEN
  const filePath = process.env.FILE_PATH
  const category = process.env.CATEGORY ?? 'gallery'

  if (!adminToken) throw new Error('Missing ADMIN_TOKEN')
  if (!filePath) throw new Error('Missing FILE_PATH')

  const file = await readFile(filePath)
  const filename = filePath.split(/[\\/]/).pop() || 'file.jpg'

  const form = new FormData()
  form.set('category', category)
  form.set('file', new Blob([file]), filename)

  const res = await fetch(`${apiBase}/media/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
    body: form,
  })

  const json = await res.json()
  console.log('status', res.status)
  console.log(JSON.stringify(json, null, 2))
}

main().catch((e) => {
  console.error(e)
  process.exitCode = 1
})
