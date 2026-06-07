<template>
  <section v-if="page" class="w-full py-8">
    <div class="mx-auto w-full max-w-7xl space-y-8 px-4 lg:px-6">
      <nav class="text-xs font-semibold uppercase tracking-[0.18em] text-red-500">
        <RouterLink to="/" class="text-gray-500 hover:text-red-600">Home</RouterLink>
        <span class="mx-2 text-gray-300">/</span>
        <RouterLink to="/healthcare-in-china" class="text-gray-500 hover:text-red-600">Guides</RouterLink>
        <span class="mx-2 text-gray-300">/</span>
        <span class="text-gray-700">{{ page.title }}</span>
      </nav>

      <div class="overflow-hidden rounded-[2rem] border border-red-100 bg-gradient-to-br from-white via-red-50/50 to-yellow-50/40 shadow-xl">
        <div class="grid lg:grid-cols-12">
          <div class="lg:col-span-8 px-6 py-8 lg:px-10 lg:py-10">
            <p class="text-xs font-bold uppercase tracking-[0.24em] text-red-600">{{ page.eyebrow }}</p>
            <h1 class="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl">
              {{ page.title }}
            </h1>
            <p class="mt-5 max-w-3xl text-base leading-8 text-gray-700 lg:text-lg">
              {{ page.heroLead }}
            </p>

            <div class="mt-6 flex flex-wrap gap-3">
              <span
                v-for="item in page.highlights"
                :key="item"
                class="inline-flex items-center rounded-full border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 shadow-sm"
              >
                {{ item }}
              </span>
            </div>

            <p class="mt-6 max-w-3xl text-sm leading-7 text-gray-600 lg:text-base">
              {{ page.description }}
            </p>
          </div>

          <div class="lg:col-span-4 border-t border-red-100 bg-white/70 px-6 py-8 lg:border-l lg:border-t-0">
            <div class="text-sm font-bold uppercase tracking-[0.2em] text-gray-500">Quick Links</div>
            <div class="mt-4 space-y-3">
              <RouterLink
                v-for="link in page.relatedLinks.slice(0, 3)"
                :key="link.to"
                :to="link.to"
                class="block rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition hover:border-red-300 hover:bg-red-50"
              >
                {{ link.label }}
              </RouterLink>
            </div>

            <div class="mt-5 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 p-5 text-white shadow-lg">
              <div class="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-200">Need help?</div>
              <p class="mt-2 text-sm leading-6 text-white/90">
                BRHC can help with report review, hospital matching, visa guidance, and treatment coordination.
              </p>
              <div class="mt-4 flex flex-col gap-3 sm:flex-row lg:flex-col">
                <RouterLink to="/contact" class="rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-red-700">
                  Contact BRHC
                </RouterLink>
                <RouterLink to="/search" class="rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-center text-sm font-semibold text-white">
                  Search the site
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid gap-6 lg:grid-cols-2">
        <article
          v-for="section in page.sections"
          :key="section.title"
          class="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg"
        >
          <div class="border-b border-gray-100 bg-gradient-to-br from-gray-100 via-gray-50 to-white px-6 py-5">
            <h2 class="text-2xl font-bold text-red-500">{{ section.title }}</h2>
          </div>
          <div class="space-y-4 px-6 py-6">
            <p v-for="paragraph in section.paragraphs" :key="paragraph" class="text-sm leading-7 text-gray-700 lg:text-base">
              {{ paragraph }}
            </p>
            <ul v-if="section.bullets?.length" class="space-y-3 pt-2">
              <li
                v-for="bullet in section.bullets"
                :key="bullet"
                class="flex items-start gap-3 text-sm leading-7 text-gray-700 lg:text-base"
              >
                <span class="mt-2 h-2 w-2 rounded-full bg-red-500"></span>
                <span>{{ bullet }}</span>
              </li>
            </ul>
          </div>
        </article>
      </div>

      <div class="grid gap-6 lg:grid-cols-12">
        <section class="lg:col-span-7 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
          <div class="border-b border-gray-100 bg-gradient-to-br from-red-50 via-white to-yellow-50 px-6 py-5">
            <h2 class="text-2xl font-bold text-red-500">FAQ</h2>
            <p class="mt-1 text-sm text-gray-600">Short answers to the searches people usually type into Google.</p>
          </div>

          <div class="divide-y divide-gray-100 px-6">
            <details v-for="faq in page.faqs" :key="faq.question" class="group py-5">
              <summary class="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                <span class="text-base font-semibold text-gray-900 group-open:text-red-600 lg:text-lg">{{ faq.question }}</span>
                <span class="text-gray-400 transition group-open:rotate-90 group-open:text-red-600">›</span>
              </summary>
              <p class="mt-3 max-w-3xl text-sm leading-7 text-gray-600 lg:text-base">
                {{ faq.answer }}
              </p>
            </details>
          </div>
        </section>

        <section class="lg:col-span-5 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
          <div class="border-b border-gray-100 bg-gradient-to-br from-gray-100 via-gray-50 to-white px-6 py-5">
            <h2 class="text-2xl font-bold text-red-500">Research Links</h2>
            <p class="mt-1 text-sm text-gray-600">Sources used to shape this guide.</p>
          </div>

          <div class="space-y-4 px-6 py-6">
            <a
              v-for="source in page.researchLinks"
              :key="source.url"
              :href="source.url"
              target="_blank"
              rel="noopener noreferrer"
              class="block rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-red-50/40 p-4 transition hover:border-red-300 hover:shadow-md"
            >
              <div class="text-sm font-semibold text-gray-900">{{ source.label }}</div>
              <div class="mt-1 text-sm leading-6 text-gray-600">{{ source.note }}</div>
              <div class="mt-2 break-all text-xs text-red-600">{{ source.url }}</div>
            </a>
          </div>
        </section>
      </div>

      <section v-if="page.relatedBlogs?.length" class="overflow-hidden rounded-3xl border border-red-100 bg-white shadow-xl">
        <div class="border-b border-red-100 bg-gradient-to-br from-red-50 via-white to-yellow-50 px-6 py-5">
          <h2 class="text-2xl font-bold text-red-500">Related Blog Posts</h2>
          <p class="mt-1 text-sm text-gray-600">These articles link back into this guide cluster.</p>
        </div>

        <div class="grid gap-4 p-6 sm:grid-cols-2 xl:grid-cols-3">
          <RouterLink
            v-for="blog in page.relatedBlogs"
            :key="blog.to"
            :to="blog.to"
            class="group rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-red-50 p-5 transition hover:-translate-y-1 hover:border-red-300 hover:shadow-lg"
          >
            <div class="text-xs font-semibold uppercase tracking-[0.22em] text-red-500">Blog</div>
            <div class="mt-2 text-lg font-bold text-gray-900 group-hover:text-red-600">{{ blog.label }}</div>
            <div class="mt-3 text-sm leading-6 text-gray-600">Read the post and continue to the linked guide.</div>
          </RouterLink>
        </div>
      </section>

      <section class="overflow-hidden rounded-3xl border border-red-100 bg-white shadow-xl">
        <div class="flex flex-col gap-4 border-b border-red-100 bg-gradient-to-br from-red-50 via-white to-yellow-50 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 class="text-2xl font-bold text-red-500">Related Guides</h2>
            <p class="mt-1 text-sm text-gray-600">Keep reading with the next most useful pages in the cluster.</p>
          </div>
          <RouterLink to="/contact" class="inline-flex items-center rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-sm">
            Ask BRHC for help
          </RouterLink>
        </div>

        <div class="grid gap-4 p-6 sm:grid-cols-2 xl:grid-cols-4">
          <RouterLink
            v-for="link in page.relatedLinks"
            :key="link.to"
            :to="link.to"
            class="group rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-red-50 p-5 transition hover:-translate-y-1 hover:border-red-300 hover:shadow-lg"
          >
            <div class="text-sm font-semibold uppercase tracking-[0.18em] text-red-500">Internal link</div>
            <div class="mt-2 text-base font-bold text-gray-900 group-hover:text-red-600">{{ link.label }}</div>
            <div class="mt-3 text-sm leading-6 text-gray-600">Open this guide to continue the treatment-planning path.</div>
          </RouterLink>
        </div>
      </section>

      <div class="flex flex-col gap-3 rounded-3xl border border-red-100 bg-gradient-to-br from-red-600 via-red-700 to-red-800 px-6 py-6 text-white lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div class="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-200">Next step</div>
          <div class="mt-2 text-xl font-bold">Need help choosing the right hospital or getting started?</div>
          <div class="mt-1 text-sm text-white/85">Move from research to action with one clear conversation.</div>
        </div>
        <RouterLink to="/contact" class="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-red-700">
          Contact BRHC
        </RouterLink>
      </div>
    </div>
  </section>

  <section v-else class="mx-auto w-full max-w-5xl px-4 py-20 text-center">
    <div class="rounded-3xl border border-red-100 bg-white p-10 shadow-xl">
      <h1 class="text-3xl font-bold text-gray-900">Guide not found</h1>
      <p class="mt-3 text-gray-600">The requested SEO page does not exist yet.</p>
      <RouterLink to="/" class="mt-6 inline-flex rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white">
        Back to home
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { seoLandingPageMap } from '../content/seoLandingPages'

const route = useRoute()

const page = computed(() => {
  const key = typeof route.name === 'string' ? route.name : ''
  return seoLandingPageMap[key]
})

function syncFaqSchema() {
  if (typeof document === 'undefined' || !page.value) return

  const existing = document.getElementById('seo-faq-schema')
  if (existing) existing.remove()

  const script = document.createElement('script')
  script.id = 'seo-faq-schema'
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.value.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  })
  document.head.appendChild(script)
}

onMounted(syncFaqSchema)

watch(
  page,
  () => {
    syncFaqSchema()
  },
  { immediate: true },
)
</script>
