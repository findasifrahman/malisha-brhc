import type { Directive, DirectiveBinding } from 'vue'

type ElWithCleanup = HTMLElement & { __brhcCleanup?: () => void }

export const vReveal: Directive<ElWithCleanup, { once?: boolean } | undefined> = {
  mounted(el: ElWithCleanup, binding: DirectiveBinding<{ once?: boolean } | undefined>) {
    const once = binding.value?.once ?? true

    el.style.opacity = '0'
    el.style.transform = 'translateY(10px)'
    el.style.transition = 'opacity 500ms ease, transform 600ms cubic-bezier(0.22, 1, 0.36, 1)'

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return

        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0px)'
          if (once) observer.disconnect()
        } else if (!once) {
          el.style.opacity = '0'
          el.style.transform = 'translateY(10px)'
        }
      },
      { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    )

    observer.observe(el)

    el.__brhcCleanup = () => observer.disconnect()
  },
  unmounted(el: ElWithCleanup) {
    el.__brhcCleanup?.()
  },
}
