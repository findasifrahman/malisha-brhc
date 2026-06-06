import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '../stores/auth'

type SeoMeta = {
  title: string
  description: string
  keywords: string[]
  noindex?: boolean
}

const seoByRoute: Record<string, SeoMeta> = {
  home: {
    title: 'BRHC | Bangladesh Medical Tourism to China',
    description: 'BRHC helps Bangladeshi patients access trusted hospitals, doctors, visa support, and treatment coordination in China.',
    keywords: [
      'Bangladesh medical tourism to China',
      'China medical visa from Bangladesh',
      'Bangladeshi patients treatment in China',
      'বাংলাদেশ থেকে চীনে চিকিৎসা',
      'চীনে চিকিৎসা',
      'চীনা চিকিৎসা ভিসা',
      'medical tourism in China',
      'medical travel China',
      'China hospital support for Bangladesh patients',
      'affordable treatment in China',
    ],
  },
  services: {
    title: 'Services | BRHC',
    description: 'Explore BRHC medical tourism services for Bangladeshi patients seeking treatment in China.',
    keywords: [
      'medical tourism services',
      'China treatment support',
      'Bangladesh patient services',
      'hospital coordination',
      'medical visa assistance',
    ],
  },
  hospitals: {
    title: 'Hospitals in China | BRHC',
    description: 'Browse trusted hospitals and specialist care options in China for Bangladeshi patients.',
    keywords: [
      'hospitals in China',
      'best hospitals in China for Bangladeshi patients',
      'China hospital list',
      'treatment hospitals in China',
    ],
  },
  doctors: {
    title: 'Doctors | BRHC',
    description: 'Find specialist doctors and medical expertise in China with support for Bangladeshi patients.',
    keywords: [
      'doctors in China',
      'specialist doctors',
      'medical experts in China',
      'Bangladesh patient doctor search',
    ],
  },
  healthcare: {
    title: 'Advanced Healthcare in China | BRHC',
    description: 'Guides and insights on advanced healthcare in China, medical travel, and treatment planning for Bangladeshi patients.',
    keywords: [
      'advanced healthcare in China',
      'medical tourism China',
      'treatment in China from Bangladesh',
      'China healthcare guide',
    ],
  },
  'patient-stories': {
    title: 'Patient Stories | BRHC',
    description: 'Read patient stories about treatment journeys in China and medical travel support for Bangladeshi families.',
    keywords: ['patient stories', 'medical tourism stories', 'Bangladesh patient experiences', 'treatment journey'],
  },
  blogs: {
    title: 'Blogs | BRHC',
    description: 'Read updates on medical tourism in China, treatment tips, and guidance for Bangladeshi patients.',
    keywords: ['medical tourism blog', 'China treatment blog', 'Bangladesh healthcare blog', 'patient guide'],
  },
  search: {
    title: 'Search | BRHC',
    description: 'Search hospitals, doctors, and medical services for treatment in China.',
    keywords: ['search hospitals', 'search doctors', 'medical search', 'China treatment search'],
  },
  contact: {
    title: 'Contact | BRHC',
    description: 'Contact BRHC in Bangladesh or China for medical tourism guidance and treatment support.',
    keywords: ['contact BRHC', 'Bangladesh office', 'China office', 'medical tourism contact'],
  },
  'sign-in': {
    title: 'Sign In | BRHC',
    description: 'Sign in to BRHC partner and admin access.',
    keywords: ['BRHC sign in', 'partner login', 'admin login'],
    noindex: true,
  },
  'sign-up': {
    title: 'Sign Up | BRHC',
    description: 'Create a BRHC account for partner access.',
    keywords: ['BRHC sign up', 'partner registration', 'account creation'],
    noindex: true,
  },
}

function setMetaTag(attribute: 'name' | 'property', key: string, content: string) {
  if (typeof document === 'undefined') return

  const selector = `meta[${attribute}="${key}"]`
  let tag = document.head.querySelector<HTMLMetaElement>(selector)

  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, key)
    document.head.appendChild(tag)
  }

  tag.setAttribute('content', content)
}

function applySeo(routeName: string | symbol | undefined) {
  if (typeof document === 'undefined') return

  const key = typeof routeName === 'string' ? routeName : String(routeName ?? '')
  const seo = seoByRoute[key] ?? seoByRoute.home

  document.title = seo.title
  setMetaTag('name', 'description', seo.description)
  setMetaTag('name', 'keywords', seo.keywords.join(', '))
  setMetaTag('property', 'og:title', seo.title)
  setMetaTag('property', 'og:description', seo.description)
  setMetaTag('name', 'twitter:title', seo.title)
  setMetaTag('name', 'twitter:description', seo.description)
  setMetaTag('name', 'robots', seo.noindex ? 'noindex, nofollow' : 'index, follow')
}

export const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 96,
      }
    }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },

    { path: '/services', name: 'services', component: () => import('../views/ServicesView.vue') },
    { path: '/services/:slug', name: 'service-detail', component: () => import('../views/ServiceDetailView.vue') },

    { path: '/hospitals', name: 'hospitals', component: () => import('../views/HospitalsView.vue') },
    { path: '/hospitals/:slug', name: 'hospital-detail', component: () => import('../views/HospitalDetailView.vue') },

    { path: '/doctors', name: 'doctors', component: () => import('../views/DoctorsView.vue') },
    { path: '/doctors/:slug', name: 'doctor-detail', component: () => import('../views/DoctorDetailView.vue') },

    { path: '/healthcare-in-china', name: 'healthcare', component: () => import('../views/HealthcareInChinaView.vue') },
    { path: '/healthcare-in-china/:slug', name: 'healthcare-detail', component: () => import('../views/HealthcareInChinaDetailView.vue') },

    { path: '/patient-stories', name: 'patient-stories', component: () => import('../views/PatientStoriesView.vue') },
    { path: '/patient-stories/:slug', name: 'patient-story-detail', component: () => import('../views/PatientStoryDetailView.vue') },

    { path: '/teams/:slug', name: 'team-detail', component: () => import('../views/TeamDetailView.vue') },

    { path: '/blogs', name: 'blogs', component: () => import('../views/BlogsView.vue') },
    { path: '/blogs/:slug', name: 'blog-detail', component: () => import('../views/BlogDetailView.vue') },

    { path: '/search', name: 'search', component: () => import('../views/SearchView.vue') },

    { path: '/contact', name: 'contact', component: () => import('../views/ContactView.vue') },

    { path: '/sign-in', name: 'sign-in', component: () => import('../views/SignInView.vue') },
    { path: '/sign-up', name: 'sign-up', component: () => import('../views/SignUpView.vue') },

    {
      path: '/partner',
      name: 'partner',
      component: () => import('../views/PartnerView.vue'),
      meta: { requiresAuth: true, role: 'partner' },
    },

    {
      path: '/admin',
      meta: { layout: 'admin', requiresAuth: true, role: 'admin' },
      children: [
        { path: '', name: 'admin', component: () => import('../views/admin/AdminDashboardView.vue') },
        { path: 'doctors', name: 'admin-doctors', component: () => import('../views/admin/AdminDoctorsView.vue') },
        { path: 'hospitals', name: 'admin-hospitals', component: () => import('../views/admin/AdminHospitalsView.vue') },
        { path: 'services', name: 'admin-services', component: () => import('../views/admin/AdminServicesView.vue') },
        { path: 'advanced', name: 'admin-advanced', component: () => import('../views/admin/AdminAdvancedView.vue') },
        { path: 'blogs', name: 'admin-blogs', component: () => import('../views/admin/AdminBlogsView.vue') },
        { path: 'patient-stories', name: 'admin-patient-stories', component: () => import('../views/admin/AdminPatientStoriesView.vue') },
        { path: 'teams', name: 'admin-teams', component: () => import('../views/admin/AdminTeamsView.vue') },
        { path: 'locations', name: 'admin-locations', component: () => import('../views/admin/AdminLocationsView.vue') },
        { path: 'media', name: 'admin-media', component: () => import('../views/admin/AdminMediaView.vue') },
        { path: 'users', name: 'admin-users', component: () => import('../views/admin/AdminUsersView.vue') },
      ],
    },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (!auth.isAuthed) auth.loadFromStorage()

  const requiresAuth = Boolean(to.meta.requiresAuth)
  if (!requiresAuth) return true

  if (!auth.isAuthed) {
    return { path: '/sign-in', query: { next: to.fullPath } }
  }

  const role = to.meta.role as 'admin' | 'partner' | undefined
  if (role && auth.role !== role) {
    return auth.role === 'admin' ? { path: '/admin' } : { path: '/partner' }
  }

  return true
})

router.afterEach((to) => {
  applySeo(to.name)
})

applySeo(router.currentRoute.value.name)
