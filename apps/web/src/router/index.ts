import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '../stores/auth'

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
