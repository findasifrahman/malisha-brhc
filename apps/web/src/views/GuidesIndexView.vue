<template>
  <section class="w-full py-10 lg:py-14">
    <div class="mx-auto w-full max-w-7xl px-4 lg:px-6">
      <nav class="text-xs font-semibold uppercase tracking-[0.18em] text-red-500">
        <RouterLink to="/" class="text-gray-500 hover:text-red-600">Home</RouterLink>
        <span class="mx-2 text-gray-300">/</span>
        <span class="text-gray-700">Guides</span>
      </nav>

      <div class="mt-4 overflow-hidden rounded-[2rem] border border-red-100 bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white shadow-2xl">
        <div class="grid gap-0 lg:grid-cols-12">
          <div class="lg:col-span-8 px-6 py-10 lg:px-10 lg:py-14">
            <p class="text-xs font-bold uppercase tracking-[0.28em] text-yellow-200">SEO Guide Hub</p>
            <h1 class="mt-4 max-w-4xl text-4xl font-bold tracking-tight lg:text-6xl">
              Guides for Bangladeshi Patients Searching for Treatment in China
            </h1>
            <p class="mt-5 max-w-3xl text-base leading-8 text-white/90 lg:text-lg">
              Start here if you are comparing hospitals, looking for a China medical visa from Bangladesh,
              estimating surgery cost in Guangzhou, or trying to understand the full treatment journey in China.
            </p>

            <div class="mt-6 flex flex-wrap gap-3">
              <span
                v-for="tag in heroTags"
                :key="tag"
                class="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm backdrop-blur"
              >
                {{ tag }}
              </span>
            </div>

            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <RouterLink to="/contact" class="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-red-700 shadow-sm">
                Ask BRHC for help
              </RouterLink>
              <RouterLink :to="{ path: '/guides', hash: '#guide-grid' }" class="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur">
                Browse all guides
              </RouterLink>
            </div>
          </div>

          <div class="lg:col-span-4 border-t border-white/10 bg-white/10 px-6 py-8 lg:border-l lg:border-t-0 lg:px-8">
            <div class="text-sm font-bold uppercase tracking-[0.2em] text-yellow-200">Quick Start</div>
            <div class="mt-4 space-y-3">
              <RouterLink
                v-for="item in featuredLinks"
                :key="item.to"
                :to="item.to"
                class="block rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                {{ item.label }}
              </RouterLink>
            </div>

            <div class="mt-6 rounded-2xl bg-white p-5 text-gray-800 shadow-lg">
              <div class="text-xs font-bold uppercase tracking-[0.2em] text-red-600">Why this hub exists</div>
              <p class="mt-2 text-sm leading-6 text-gray-600">
                Google understands clusters better when one central page points to the detailed guides and city pages.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id="guide-grid" class="mt-10 space-y-8">
        <section class="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
          <div class="flex flex-col gap-4 border-b border-red-100 bg-gradient-to-br from-red-50 via-white to-yellow-50 px-6 py-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 class="text-2xl font-bold text-red-500">Core Guides</h2>
              <p class="mt-1 text-sm text-gray-600">These pages answer the most common Bangladesh-to-China searches.</p>
            </div>
            <RouterLink to="/contact" class="inline-flex items-center rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-sm">
              Contact BRHC
            </RouterLink>
          </div>

          <div class="grid gap-4 p-6 sm:grid-cols-2 xl:grid-cols-3">
            <RouterLink
              v-for="page in guidePages"
              :key="page.routeName"
              :to="page.path"
              class="group rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-red-50 p-5 transition hover:-translate-y-1 hover:border-red-300 hover:shadow-lg"
            >
              <div class="text-xs font-semibold uppercase tracking-[0.22em] text-red-500">{{ page.eyebrow }}</div>
              <div class="mt-2 text-lg font-bold text-gray-900 group-hover:text-red-600">{{ page.title }}</div>
              <div class="mt-3 text-sm leading-6 text-gray-600 line-clamp-4">{{ page.description }}</div>
              <div class="mt-4 text-sm font-semibold text-red-600">Open guide</div>
            </RouterLink>
          </div>
        </section>

        <section class="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
          <div class="border-b border-gray-100 bg-gradient-to-br from-gray-100 via-gray-50 to-white px-6 py-5">
            <h2 class="text-2xl font-bold text-red-500">City Pages</h2>
            <p class="mt-1 text-sm text-gray-600">Use these pages to compare Guangzhou and Kunming treatment planning.</p>
          </div>

          <div class="grid gap-4 p-6 sm:grid-cols-2 xl:grid-cols-2">
            <RouterLink
              v-for="page in locationPages"
              :key="page.routeName"
              :to="page.path"
              class="group rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-yellow-50 p-5 transition hover:-translate-y-1 hover:border-red-300 hover:shadow-lg"
            >
              <div class="text-xs font-semibold uppercase tracking-[0.22em] text-red-500">{{ page.eyebrow }}</div>
              <div class="mt-2 text-lg font-bold text-gray-900 group-hover:text-red-600">{{ page.title }}</div>
              <div class="mt-3 text-sm leading-6 text-gray-600 line-clamp-4">{{ page.description }}</div>
              <div class="mt-4 text-sm font-semibold text-red-600">Open city guide</div>
            </RouterLink>
          </div>
        </section>

        <section class="grid gap-6 lg:grid-cols-12">
          <div class="lg:col-span-7 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
            <div class="border-b border-gray-100 bg-gradient-to-br from-red-50 via-white to-yellow-50 px-6 py-5">
              <h2 class="text-2xl font-bold text-red-500">FAQ</h2>
              <p class="mt-1 text-sm text-gray-600">Short answers to common Google searches.</p>
            </div>

            <div class="divide-y divide-gray-100 px-6">
              <details v-for="faq in faqs" :key="faq.question" class="group py-5">
                <summary class="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                  <span class="text-base font-semibold text-gray-900 group-open:text-red-600 lg:text-lg">{{ faq.question }}</span>
                  <span class="text-gray-400 transition group-open:rotate-90 group-open:text-red-600">›</span>
                </summary>
                <p class="mt-3 max-w-3xl text-sm leading-7 text-gray-600 lg:text-base">
                  {{ faq.answer }}
                </p>
              </details>
            </div>
          </div>

          <div class="lg:col-span-5 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
            <div class="border-b border-gray-100 bg-gradient-to-br from-gray-100 via-gray-50 to-white px-6 py-5">
              <h2 class="text-2xl font-bold text-red-500">How to use this hub</h2>
              <p class="mt-1 text-sm text-gray-600">A simple route from search to action.</p>
            </div>

            <div class="space-y-4 px-6 py-6">
              <div
                v-for="step in steps"
                :key="step.title"
                class="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-red-50/40 p-4"
              >
                <div class="text-sm font-bold uppercase tracking-[0.18em] text-red-500">{{ step.title }}</div>
                <p class="mt-2 text-sm leading-6 text-gray-600">{{ step.body }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { seoLandingPages } from '../content/seoLandingPages'

const guidePages = computed(() => seoLandingPages.filter((page) => page.kind === 'guide'))
const locationPages = computed(() => seoLandingPages.filter((page) => page.kind === 'location'))

const heroTags = [
  'Bangladesh medical tourism to China',
  'China medical visa from Bangladesh',
  'Treatment in China from Bangladesh',
  'Surgery cost in Guangzhou',
]

const featuredLinks = [
  { label: 'Treatment in China from Bangladesh', to: '/guides/treatment-in-china-from-bangladesh' },
  { label: 'China medical visa from Bangladesh', to: '/guides/china-medical-visa-from-bangladesh' },
  { label: 'Best hospitals in China', to: '/guides/best-hospitals-in-china-for-bangladeshi-patients' },
]

const faqs = [
  {
    question: 'What should I read first?',
    answer:
      'Start with the treatment in China from Bangladesh guide, then move to the visa page if travel is likely, and finally compare the city and hospital pages.',
  },
  {
    question: 'Why do these pages matter for SEO?',
    answer:
      'A central hub with internal links helps Google understand which pages cover the broad topic and which pages answer the deeper search intents.',
  },
  {
    question: 'Can I go directly to a city page?',
    answer:
      'Yes. If you are comparing Guangzhou or Kunming, the city pages are useful starting points, especially for surgery or oncology planning.',
  },
]

const steps = [
  {
    title: '1. Read the overview',
    body: 'Use the hub to understand the full search journey before choosing a detailed guide.',
  },
  {
    title: '2. Open the matching guide',
    body: 'Go to the page that matches your need: visa, cancer treatment, hospital selection, or surgery pricing.',
  },
  {
    title: '3. Contact BRHC',
    body: 'If you want help comparing hospitals or preparing documents, move straight to the contact page.',
  },
]
</script>
