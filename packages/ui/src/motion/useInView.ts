import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

export function useInView<T extends Element>(
  target: Ref<T | null>,
  options?: IntersectionObserverInit,
) {
  const isInView = ref(false)

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!target.value) return

    observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        isInView.value = entry.isIntersecting
      },
      {
        root: options?.root ?? null,
        rootMargin: options?.rootMargin ?? '0px 0px -10% 0px',
        threshold: options?.threshold ?? 0.1,
      },
    )

    observer.observe(target.value)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })

  return { isInView }
}
