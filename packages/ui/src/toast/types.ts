export type ToastVariant = 'success' | 'error' | 'info'

export type ToastItem = {
  id: string
  title: string
  message?: string
  variant: ToastVariant
  createdAt: number
}
