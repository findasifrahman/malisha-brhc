export function sanitizeFilename(name: string) {
  const base = name
    .replace(/\\/g, '/')
    .split('/')
    .pop()
    ?.trim()

  const cleaned = (base || 'file')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9._-]/g, '')
    .replace(/-{2,}/g, '-')

  return cleaned || 'file'
}

export function extFromMime(mime: string) {
  switch (mime) {
    case 'image/jpeg':
      return 'jpg'
    case 'image/png':
      return 'png'
    case 'image/webp':
      return 'webp'
    case 'video/mp4':
      return 'mp4'
    default:
      return null
  }
}
