<template>
  <div class="space-y-0">
    <!-- Right Side Social Icons - Desktop Only -->
    <div class="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col gap-3 z-50">
      <a href="#" class="w-10 h-10 rounded-full bg-red-600 text-white backdrop-blur-sm border border-red-500/40 flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 transition-all duration-200 hover:scale-110 shadow-lg">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      </a>
      <a href="#" class="w-10 h-10 rounded-full bg-red-600 text-white backdrop-blur-sm border border-red-500/40 flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 transition-all duration-200 hover:scale-110 shadow-lg">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      </a>
      <a href="#" class="w-10 h-10 rounded-full bg-red-600 text-white backdrop-blur-sm border border-red-500/40 flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 transition-all duration-200 hover:scale-110 shadow-lg">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      </a>
      <a href="#" class="w-10 h-10 rounded-full bg-red-600 text-white backdrop-blur-sm border border-red-500/40 flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 transition-all duration-200 hover:scale-110 shadow-lg">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </a>
    </div>
    <!-- Full-width hero section with background image -->
    <section class="relative w-full min-h-[85vh] overflow-hidden pb-24">
      <!-- Background Image with Overlay -->
      <img 
        src="/hero.jpg" 
        alt="Hero background"
        class="absolute inset-0 w-full h-full object-cover"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
      />
      <div 
        class="absolute inset-0 bg-gradient-to-br from-red-600 via-red-700 to-red-800"
        style="display: none;"
      >
        <!-- Fallback gradient if image fails to load -->
      </div>
      <!-- Overlay for better text readability -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>

      <!-- Hero Content Container -->
      <div class="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-6 min-h-[560px] flex items-center">
        <div class="w-full max-w-[920px] mx-auto text-center">
          <!-- Main Title -->
          <h1 class="text-5xl lg:text-6xl font-bold text-white tracking-tight drop-shadow-lg mb-6">
            Belt and Road Healthcare Center
          </h1>
          
          <!-- Subtitle -->
          <p class="text-sm lg:text-xl text-yellow-100/95 max-w-2xl mx-auto drop-shadow-md mb-8">
            To establish itself as the leading global hub for medical tourism, empowering individuals with access to China's advanced healthcare system while promoting global health equity and collaboration
          </p>

          <!-- Search Bar Section - Integrated Pill -->
          <div ref="searchBoxRef" class="relative mx-auto w-full max-w-[820px]">
            <div class="flex items-stretch rounded-full overflow-hidden bg-white/90 backdrop-blur-md border border-white/20 shadow-xl focus-within:ring-4 focus-within:ring-white/30 transition-all duration-200">
              <input
                v-model="search"
                placeholder="Search hospital name or doctor specialty..."
                class="flex-1 h-12 px-5 text-gray-900 placeholder-gray-500 bg-transparent outline-none"
                @focus="searchOpen = true"
                @keydown.enter.prevent="submitSearch(search)"
              />
              <button
                class="h-12 px-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold transition-all duration-200 flex items-center gap-2"
                @click="submitSearch(search)"
              >
                <Search class="h-4 w-4" />
                Search
              </button>
            </div>

            <div
              v-if="searchOpen && (suggestLoading || hospitalSuggestions.length || specialtySuggestions.length)"
              class="absolute left-0 right-0 top-[3.35rem] z-40 overflow-hidden rounded-2xl border border-white/20 bg-white/95 shadow-2xl backdrop-blur"
            >
              <div v-if="suggestLoading" class="px-5 py-4 text-sm text-gray-600">Searching…</div>

              <div v-else class="max-h-80 overflow-auto py-2">
                <div v-if="hospitalSuggestions.length" class="px-3 pb-2">
                  <div class="px-2 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Hospitals</div>
                  <button
                    v-for="h in hospitalSuggestions"
                    :key="`h-${h}`"
                    type="button"
                    class="w-full rounded-xl px-3 py-2 text-left text-sm text-gray-800 hover:bg-red-50"
                    @click="pickSuggestion(h)"
                  >
                    {{ h }}
                  </button>
                </div>

                <div v-if="specialtySuggestions.length" class="px-3 pb-2">
                  <div class="px-2 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Doctor Specialties</div>
                  <button
                    v-for="s in specialtySuggestions"
                    :key="`s-${s}`"
                    type="button"
                    class="w-full rounded-xl px-3 py-2 text-left text-sm text-gray-800 hover:bg-red-50"
                    @click="pickSuggestion(s)"
                  >
                    {{ s }}
                  </button>
                </div>

                <div
                  v-if="!hospitalSuggestions.length && !specialtySuggestions.length"
                  class="px-5 py-4 text-sm text-gray-600"
                >
                  No suggestions.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Overlap Row - Bottom Center -->
      <div class="absolute left-0 right-0 -bottom-5 z-2000">
        <div class="max-w-7xl mx-auto px-4 lg:px-6">
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-white-500/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all duration-200 border-t-4 border-red-500">
              <div class="text-3xl lg:text-4xl font-bold text-yellow-100 mb-2">+8</div>
              <div class="text-sm lg:text-base text-yellow-600  font-medium">Years of experience</div>
            </div>
            <div class="bg-white-500/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all duration-200 border-t-4 border-yellow-500">
              <div class="text-3xl lg:text-4xl font-bold text-gray-100 mb-2">+500</div>
              <div class="text-sm lg:text-base text-yellow-100 font-medium">Patients Cured</div>
            </div>
            <div class="bg-white-500/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all duration-200 border-t-4 border-red-600">
              <div class="text-3xl lg:text-4xl font-bold text-yellow-100 mb-2">+3</div>
              <div class="text-sm lg:text-base text-yellow-600  font-medium">Worldwide Branches</div>
            </div>
            <div class="bg-white-500/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all duration-200 border-t-4 border-red-700">
              <div class="text-3xl lg:text-4xl font-bold text-gray-100 mb-2">+250</div>
              <div class="text-sm lg:text-base text-yellow-100  font-medium">Hospital Cooperations</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About section -->
    <section id="about" class="w-full pt-20 pb-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 lg:px-6">
        <div class="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
          <div class="flex items-center justify-between gap-4 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 px-6 py-5">
            <div>
              <h2 class="text-2xl lg:text-3xl font-bold text-gray-100">Why Choose BRHC?</h2>
              <p class="mt-1 text-sm lg:text-base text-gray-300">Access to China's Superior Healthcare System.</p>
            </div>
          </div>

          <div class="p-6">
            <div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch">
              <div class="lg:col-span-5">
                <div class="overflow-hidden rounded-3xl border border-gray-200 shadow-2xl h-full bg-white">
                  <img 
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                    alt="BRHC Healthcare - China Medical Support"
                    class="w-full h-full object-cover"
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                  />
                  <div class="aspect-[4/3] w-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center" style="display: none;">
                    <div class="text-center text-white p-8">
                      <svg class="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                      </svg>
                      <div class="text-lg font-semibold">BRHC</div>
                      <div class="text-sm opacity-90 mt-2">China Medical Support</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="lg:col-span-7 flex flex-col justify-center">
                <div class="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                  <ul class="space-y-5 text-lg text-gray-700">
                    <li class="flex items-start gap-4">
                      <div class="flex-shrink-0 mt-1">
                        <CheckCircle class="h-7 w-7 text-teal-600" />
                      </div>
                      <span class="font-medium text-red-500">Comprehensive End-to-End Support</span>
                    </li>
                    <li class="flex items-start gap-4">
                      <div class="flex-shrink-0 mt-1">
                        <CheckCircle class="h-7 w-7 text-teal-600" />
                      </div>
                      <span class="font-medium">Affordable Medical Tourism Packages</span>
                    </li>
                    <li class="flex items-start gap-4">
                      <div class="flex-shrink-0 mt-1">
                        <CheckCircle class="h-7 w-7 text-teal-600" />
                      </div>
                      <span class="font-medium text-red-500">World-Class Facilities and Expertise</span>
                    </li>
                    <li class="flex items-start gap-4">
                      <div class="flex-shrink-0 mt-1">
                        <CheckCircle class="h-7 w-7 text-teal-600" />
                      </div>
                      <span class="font-medium">Holistic Services</span>
                    </li>
                  </ul>

                  <div class="mt-8 pt-6 border-t border-gray-200 flex items-center gap-3 text-lg">
                    <Phone class="h-6 w-6 text-teal-600" />
                    <span class="text-gray-600">Call us:</span>
                    <a class="font-semibold text-teal-600 hover:text-teal-700 transition" :href="`tel:${phoneNumber}`">{{ phoneLabel }}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    
    <!-- Featured sections -->
    <section class="w-full py-20 bg-gradient-to-b from-gray-50 to-white">
      <div class="max-w-7xl mx-auto px-4 lg:px-6">
        <div class="space-y-16">
          <!-- Services Section -->
          <div class="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
            <div class="flex items-center justify-between gap-4 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 px-6 py-5">
              <div>
                <h2 class="text-2xl lg:text-3xl font-bold text-white">Our Services</h2>
                <p class="mt-1 text-sm lg:text-base text-gray-300">Featured healthcare services</p>
              </div>
              <button
                class="group shrink-0 rounded-xl bg-white/10 px-5 py-2.5 text-sm font-semibold text-white shadow-sm backdrop-blur transition hover:bg-white/15"
                @click="router.push('/services')"
              >
                <span class="inline-flex items-center gap-2">
                  See All
                  <ChevronRight class="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </div>

            <div class="space-y-8 p-6">
            
            <div v-if="featuredLoading" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div v-for="i in 3" :key="i" class="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 h-40 border border-red-200">
                <Skeleton height="1.5rem" />
                <div class="mt-3"><SkeletonText :lines="3" /></div>
              </div>
            </div>
            
            <div v-else-if="featured.services.length === 0" class="text-center py-12">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <p class="text-lg text-gray-500">No featured services yet — check back soon.</p>
            </div>
            
            <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <RouterLink v-for="s in featured.services.slice(0, 3)" :key="s.id" :to="`/services/${s.slug}`">
                <div class="group bg-gradient-to-br from-white to-red-50 rounded-2xl p-6 flex flex-col justify-between border border-red-100 hover:border-red-300 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                  <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500/10 to-yellow-500/10 rounded-bl-2xl"></div>
                  <div class="relative">
                    <div class="flex items-start justify-between gap-3">
                      <div class="flex-1">
                        <div class="text-lg font-bold text-gray-900 group-hover:text-red-500 transition-colors">{{ s.name }}</div>
                        <div class="mt-1 text-sm text-gray-500">{{ s.serviceType }}</div>
                      </div>
                      <div class="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.022.547c-.611.305-1.088.822-1.317 1.445A8.96 8.96 0 0012 20c1.727 0 3.34-.49 4.704-1.34.23-.623.706-1.14 1.317-1.445a2 2 0 001.022-.547 8.96 8.96 0 00.185-2.34z"/>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12c0 1.387-.393 2.683-1.073 3.78"/>
                        </svg>
                      </div>
                    </div>
                    <div v-if="s.heroUrl" class="mt-4 overflow-hidden rounded-xl border border-red-100 bg-white">
                      <img :src="s.heroUrl" :alt="s.name" class="h-28 w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" loading="lazy" />
                    </div>
                    <ul class="mt-4 space-y-1 text-sm text-gray-600 line-clamp-3">
                      <li v-for="(d, idx) in (s.shortDetails ?? []).slice(0, 3)" :key="idx" class="flex items-center gap-2">
                        <span class="w-1.5 h-1.5 rounded-full" :class="Number(idx) % 2 === 0 ? 'bg-red-500' : 'bg-yellow-500'"></span>
                        {{ d }}
                      </li>
                    </ul>
                  </div>
                  <Badge v-if="s.isFeatured" class="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white border-0">Featured</Badge>
                </div>
              </RouterLink>
            </div>
          </div>
          </div>

          <!-- Doctors Section -->
          <div class="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
            <div class="flex items-center justify-between gap-4 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 px-6 py-5">
              <div>
                <h2 class="text-2xl lg:text-3xl font-bold text-white">Expert Doctors</h2>
                <p class="mt-1 text-sm lg:text-base text-gray-300">Featured medical specialists</p>
              </div>
              <button
                class="group shrink-0 rounded-xl bg-white/10 px-5 py-2.5 text-sm font-semibold text-white shadow-sm backdrop-blur transition hover:bg-white/15"
                @click="router.push('/doctors')"
              >
                <span class="inline-flex items-center gap-2">
                  See All
                  <ChevronRight class="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </div>

            <div class="space-y-8 p-6">
            
            <div v-if="featuredLoading" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div v-for="i in 3" :key="i" class="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 h-40 border border-red-200">
                <Skeleton height="1.5rem" />
                <div class="mt-3"><SkeletonText :lines="3" /></div>
              </div>
            </div>
            
            <div v-else-if="featured.doctors.length === 0" class="text-center py-12">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <p class="text-lg text-gray-500">No featured doctors yet — check back soon.</p>
            </div>
            
            <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <RouterLink v-for="d in featured.doctors.slice(0, 3)" :key="d.id" :to="`/doctors/${d.slug}`">
                <div class="group bg-gradient-to-br from-white to-red-50 rounded-2xl p-6 border border-red-100 hover:border-red-300 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                  <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500/10 to-yellow-500/10 rounded-bl-2xl"></div>
                  <div class="relative grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-stretch">
                    <div class="lg:col-span-7 flex flex-col">
                      <div class="flex items-start justify-between gap-3">
                        <div class="flex-1">
                          <div class="text-lg font-bold text-gray-900 group-hover:text-red-500 transition-colors">{{ d.name }}</div>
                          <div class="mt-1 text-sm text-gray-500">{{ d.specialty ?? d.title ?? '' }}</div>
                          <div v-if="d.hospital?.name" class="mt-1 text-xs font-medium text-gray-500">{{ d.hospital.name }}</div>
                        </div>
                        <div class="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                          <Heart class="h-5 w-5 text-white transition-transform duration-500 group-hover:rotate-6" />
                        </div>
                      </div>

                      <div class="mt-4 space-y-2 text-sm text-gray-600">
                        <div v-for="(sd, idx) in (d.shortDetails ?? []).slice(0, 3)" :key="idx" class="flex items-start gap-2">
                          <span class="mt-2 h-1.5 w-1.5 rounded-full" :class="Number(idx) % 2 === 0 ? 'bg-red-500' : 'bg-yellow-500'"></span>
                          <span :class="Number(idx) % 2 === 0 ? 'text-gray-700' : 'text-red-600'">{{ sd }}</span>
                        </div>
                      </div>
                    </div>

                    <div class="lg:col-span-5">
                      <div class="h-full overflow-hidden rounded-2xl border border-red-100 bg-white shadow-sm">
                        <img
                          v-if="d.heroUrl"
                          :src="d.heroUrl"
                          :alt="d.name"
                          class="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-105 lg:h-full"
                          loading="lazy"
                        />
                        <div v-else class="h-44 w-full bg-gradient-to-br from-red-100 to-yellow-100 flex items-center justify-center lg:h-full">
                          <div class="text-sm font-semibold text-red-600">Doctor Profile</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Badge v-if="d.isFeatured" class="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white border-0">Featured</Badge>
                </div>
              </RouterLink>
            </div>
          </div>
          </div>

          <!-- Hospitals Section -->
          <div class="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
            <div class="flex items-center justify-between gap-4 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 px-6 py-5">
              <div>
                <h2 class="text-2xl lg:text-3xl font-bold text-white">Top Hospitals</h2>
                <p class="mt-1 text-sm lg:text-base text-gray-300">Trusted facilities across China</p>
              </div>
              <button
                class="group shrink-0 rounded-xl bg-white/10 px-5 py-2.5 text-sm font-semibold text-white shadow-sm backdrop-blur transition hover:bg-white/15"
                @click="router.push('/hospitals')"
              >
                <span class="inline-flex items-center gap-2">
                  See All
                  <ChevronRight class="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </div>

            <div class="space-y-8 p-6">

            <div v-if="featuredLoading" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div v-for="i in 3" :key="i" class="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 h-40 border border-red-200">
                <Skeleton height="1.5rem" />
                <div class="mt-3"><SkeletonText :lines="3" /></div>
              </div>
            </div>

            <div v-else-if="featured.hospitals.length === 0" class="text-center py-12">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                <Globe class="h-8 w-8 text-yellow-600" />
              </div>
              <p class="text-lg text-gray-500">No hospitals available yet — check back soon.</p>
            </div>

            <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <RouterLink v-for="h in featured.hospitals.slice(0, 3)" :key="h.id" :to="`/hospitals/${h.slug}`">
                <div class="group bg-gradient-to-br from-white to-red-50 rounded-2xl p-6 border border-red-100 hover:border-red-300 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                  <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500/10 to-yellow-500/10 rounded-bl-2xl"></div>
                  <div class="relative">
                    <div class="flex items-start justify-between gap-3">
                      <div class="flex-1">
                        <div class="text-lg font-bold text-gray-900 group-hover:text-red-500 transition-colors">{{ h.name }}</div>
                        <div class="mt-1 text-sm text-gray-500">
                          {{ [h.city?.name, h.province?.name].filter(Boolean).join(', ') }}
                        </div>
                      </div>
                      <div class="w-10 h-10 bg-gradient-to-br from-yellow-500 to-red-500 rounded-lg flex items-center justify-center">
                        <Globe class="h-5 w-5 text-white transition-transform duration-500 group-hover:rotate-6" />
                      </div>
                    </div>
                    <div v-if="h.heroUrl" class="mt-4 overflow-hidden rounded-xl border border-red-100 bg-white">
                      <img :src="h.heroUrl" :alt="h.name" class="h-36 w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                    </div>
                    <ul class="mt-4 space-y-1 text-sm text-gray-600 line-clamp-3">
                      <li v-for="(d, idx) in (h.shortDetails ?? []).slice(0, 3)" :key="idx" class="flex items-center gap-2">
                        <span class="w-1.5 h-1.5 rounded-full" :class="Number(idx) % 2 === 0 ? 'bg-yellow-500' : 'bg-red-500'"></span>
                        <span :class="Number(idx) % 2 === 0 ? 'text-gray-700' : 'text-red-600'">{{ d }}</span>
                      </li>
                    </ul>
                  </div>
                  <Badge v-if="h.isFeatured" class="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white border-0">Featured</Badge>
                </div>
              </RouterLink>
            </div>
          </div>
          </div>

          <!-- Patient Stories Section -->
          <div class="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
            <div class="flex items-center justify-between gap-4 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 px-6 py-5">
              <div>
                <h2 class="text-2xl lg:text-3xl font-bold text-white">Patient Stories</h2>
                <p class="mt-1 text-sm lg:text-base text-gray-300">Success stories from our patients</p>
              </div>
              <button
                class="group shrink-0 rounded-xl bg-white/10 px-5 py-2.5 text-sm font-semibold text-white shadow-sm backdrop-blur transition hover:bg-white/15"
                @click="router.push('/patient-stories')"
              >
                <span class="inline-flex items-center gap-2">
                  See All
                  <ChevronRight class="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </div>

            <div class="space-y-8 p-6">
            
            <div v-if="featuredLoading" class="space-y-6">
              <div v-for="i in 2" :key="i" class="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 h-32 border border-red-200">
                <Skeleton height="1.5rem" />
                <div class="mt-3"><SkeletonText :lines="3" /></div>
              </div>
            </div>
            
            <div v-else-if="featured.patientStories.length === 0" class="text-center py-12">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                </svg>
              </div>
              <p class="text-lg text-gray-500">No patient stories yet — check back soon.</p>
            </div>
            
            <div v-else class="space-y-6">
              <div
                v-for="(s, idx) in featured.patientStories.slice(0, 2)"
                :key="s.id"
                class="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch"
              >
                <div :class="patientStoryMediaColClass(idx)">
                  <div class="h-full bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-4 border border-red-200">
                    <div class="h-full min-h-72 w-full overflow-hidden rounded-xl border border-red-100 bg-white">
                      <video
                        v-if="s.heroIsVideo && s.heroUrl"
                        class="h-full w-full object-cover"
                        :src="s.heroUrl"
                        controls
                        playsinline
                      />
                      <img
                        v-else-if="s.heroUrl"
                        :src="s.heroUrl"
                        :alt="s.title"
                        class="h-full w-full object-cover"
                        loading="lazy"
                      />
                      <div v-else class="h-full w-full bg-gradient-to-br from-red-100 to-yellow-100 flex items-center justify-center">
                        <div class="text-sm font-semibold text-red-600">Patient Story</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div :class="patientStoryTextColClass(idx)">
                  <RouterLink :to="`/patient-stories/${s.slug}`">
                    <div class="group bg-gradient-to-br from-white to-red-50 rounded-2xl p-8 min-h-72 flex flex-col justify-between border border-red-100 hover:border-red-300 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                      <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500/10 to-yellow-500/10 rounded-bl-2xl"></div>
                      <div class="relative">
                        <div class="flex items-start justify-between gap-3">
                          <div class="flex-1">
                            <div class="text-lg font-bold text-gray-900 group-hover:text-red-500 transition-colors">{{ s.title }}</div>
                            <div v-if="s.excerpt" class="mt-2 text-sm text-gray-600 line-clamp-3">{{ s.excerpt }}</div>
                          </div>
                          <div class="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                            </svg>
                          </div>
                        </div>
                        <div class="mt-4 space-y-2">
                          <div v-for="(sd, sidx) in (s.shortDetails ?? []).slice(0, 3)" :key="sidx" class="flex items-start gap-2 text-sm">
                            <span class="mt-2 h-1.5 w-1.5 rounded-full" :class="Number(sidx) % 2 === 0 ? 'bg-red-500' : 'bg-yellow-500'"></span>
                            <span :class="Number(sidx) % 2 === 0 ? 'text-gray-700' : 'text-red-600'">{{ sd }}</span>
                          </div>
                        </div>
                      </div>
                      <Badge v-if="s.isFeatured" class="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white border-0">Featured</Badge>
                    </div>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
          </div>

          <!-- Gallery Section -->
          <section id="gallery" class="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl scroll-mt-28">
            <div class="flex items-center justify-between gap-4 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 px-6 py-5">
              <div>
                <h2 class="text-2xl lg:text-3xl font-bold text-white">Gallery</h2>
                <p class="mt-1 text-sm lg:text-base text-gray-300">A glimpse into our facilities & patient journeys</p>
              </div>
              <RouterLink
                class="group shrink-0 rounded-xl bg-white/10 px-5 py-2.5 text-sm font-semibold text-white shadow-sm backdrop-blur transition hover:bg-white/15"
                to="/#gallery"
              >
                <span class="inline-flex items-center gap-2">
                  View Gallery
                  <ChevronRight class="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </RouterLink>
            </div>

            <div class="space-y-8 p-6">

            <div v-if="featuredLoading" class="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div v-for="i in 8" :key="i" class="aspect-[4/3] rounded-2xl bg-gradient-to-br from-red-50 to-red-100 border border-red-200">
                <Skeleton height="100%" />
              </div>
            </div>

            <div v-else-if="featured.gallery.length === 0" class="text-center py-12">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p class="text-lg text-gray-500">No gallery images yet — upload some in Admin Media.</p>
            </div>

            <div v-else class="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div
                v-for="m in featured.gallery.slice(0, 12)"
                :key="m.id"
                class="group rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-2xl"
              >
                <div class="aspect-[4/3] overflow-hidden rounded-xl border border-gray-200 bg-white">
                  <img
                    :src="m.urlThumb || m.url"
                    :alt="m.alt || m.title || 'Gallery image'"
                    class="h-full w-full cursor-pointer object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    @click="openSlideshow(m)"
                  />
                </div>
              </div>
            </div>
            </div>
          </section>

          <!-- Advanced Treatment Section -->
          <div class="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
            <div class="flex items-center justify-between gap-4 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 px-6 py-5">
              <div>
                <h2 class="text-2xl lg:text-3xl font-bold text-white">Advanced Treatment</h2>
                <p class="mt-1 text-sm lg:text-base text-gray-300">Modern innovations shaping better outcomes</p>
              </div>
              <button
                class="group shrink-0 rounded-xl bg-white/10 px-5 py-2.5 text-sm font-semibold text-white shadow-sm backdrop-blur transition hover:bg-white/15"
                @click="router.push('/healthcare-in-china')"
              >
                <span class="inline-flex items-center gap-2">
                  See All
                  <ChevronRight class="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </div>

            <div class="space-y-8 p-6">

            <div v-if="featuredLoading" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div v-for="i in 3" :key="i" class="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 h-40 border border-red-200">
                <Skeleton height="1.5rem" />
                <div class="mt-3"><SkeletonText :lines="3" /></div>
              </div>
            </div>

            <div v-else-if="featured.advanced.length === 0" class="text-center py-12">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <p class="text-lg text-gray-500">No topics yet — check back soon.</p>
            </div>

            <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <RouterLink v-for="a in featured.advanced.slice(0, 3)" :key="a.id" :to="`/healthcare-in-china/${a.slug}`">
                <div class="group bg-gradient-to-br from-white to-red-50 rounded-2xl p-6 flex flex-col justify-between border border-red-100 hover:border-red-300 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                  <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500/10 to-yellow-500/10 rounded-bl-2xl"></div>
                  <div class="relative">
                    <div class="text-lg font-bold text-gray-900 group-hover:text-red-500 transition-colors">{{ a.name }}</div>
                    <ul class="mt-3 space-y-1 text-sm text-gray-600 line-clamp-3">
                      <li v-for="(d, idx) in (a.shortDetails ?? []).slice(0, 3)" :key="idx" class="flex items-center gap-2">
                        <span class="w-1.5 h-1.5 rounded-full" :class="Number(idx) % 2 === 0 ? 'bg-red-500' : 'bg-yellow-500'"></span>
                        <span :class="Number(idx) % 2 === 0 ? 'text-gray-700' : 'text-red-600'">{{ d }}</span>
                      </li>
                    </ul>
                  </div>
                  <div v-if="a.heroUrl" class="mt-4 overflow-hidden rounded-xl border border-red-100 bg-white">
                    <img :src="a.heroUrl" :alt="a.name" class="h-36 w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div class="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-white transition-transform duration-500 group-hover:rotate-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                    </svg>
                  </div>
                </div>
              </RouterLink>
            </div>
          </div>
          </div>

          <!-- Our Team Section -->
          <section id="our-team" class="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl scroll-mt-28">
            <div class="flex items-end justify-between gap-4 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 px-6 py-5">
              <div>
                <h2 class="text-2xl lg:text-3xl font-bold text-white">Our Team</h2>
                <p class="mt-1 text-sm lg:text-base text-gray-300">People behind your smooth medical journey</p>
              </div>
              <div class="hidden lg:block text-sm text-gray-300">Available 24/7 for guidance</div>
            </div>

            <div class="space-y-8 p-6">
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div v-for="m in teamMembers" :key="m.name" class="group rounded-2xl border border-red-100 bg-gradient-to-br from-white to-red-50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                  <div class="relative">
                    <div class="absolute -top-3 -right-3 h-12 w-12 rounded-2xl bg-gradient-to-br from-yellow-400/30 to-red-500/20 blur-xl"></div>
                    <div class="flex items-start justify-between gap-3">
                      <div class="flex-1">
                        <div class="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors">{{ m.name }}</div>
                        <div class="mt-1 text-sm font-semibold" :class="m.accent">{{ m.designation }}</div>
                      </div>
                      <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                        <svg class="h-5 w-5 text-white transition-transform duration-500 group-hover:rotate-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div class="mt-4 overflow-hidden rounded-xl border border-red-100 bg-white">
                    <img :src="m.image" :alt="m.name" class="h-40 w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  </div>

                  <div class="mt-4 space-y-2 text-sm leading-6 text-gray-600">
                    <div>{{ m.line1 }}</div>
                    <div class="text-gray-700 font-medium">{{ m.line2 }}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>

  <Teleport to="body">
    <div v-if="slideshowOpen" class="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm">
      <div class="absolute inset-0" @click="closeSlideshow"></div>

      <button
        class="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        @click="closeSlideshow"
      >
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <button
        class="absolute left-4 top-1/2 z-50 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        :class="slideshowIndex <= 0 ? 'opacity-40 pointer-events-none' : ''"
        @click="prevSlide"
      >
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        class="absolute right-4 top-1/2 z-50 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        :class="slideshowIndex >= slideshowImages.length - 1 ? 'opacity-40 pointer-events-none' : ''"
        @click="nextSlide"
      >
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div class="relative z-40 flex h-full w-full items-center justify-center p-6">
        <img
          v-if="slideshowImages[slideshowIndex]"
          :src="slideshowImages[slideshowIndex].urlOriginal || slideshowImages[slideshowIndex].url"
          :alt="slideshowImages[slideshowIndex].alt || slideshowImages[slideshowIndex].title || 'Gallery image'"
          class="max-h-[86vh] max-w-[92vw] object-contain"
        />
      </div>

      <div
        v-if="slideshowImages[slideshowIndex]?.title || slideshowImages[slideshowIndex]?.alt"
        class="absolute bottom-4 left-1/2 z-50 -translate-x-1/2 max-w-[90vw] rounded-xl bg-black/60 px-4 py-2 text-center text-sm text-white"
      >
        {{ slideshowImages[slideshowIndex].title || slideshowImages[slideshowIndex].alt }}
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, reactive, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { Badge, BaseButton, BaseInput, Skeleton, SkeletonText, useToast } from '@brhc/ui'
import { ChevronRight, Phone, Search, Heart, Globe, CheckCircle } from 'lucide-vue-next'
import SectionHeader from '../components/SectionHeader.vue'
import { listServices, listDoctors, listHospitals, listPatientStories, listGallery, listHealthcareInChina, getService, getDoctor, getHospital, getPatientStory, getHealthcareInChina, searchAll } from '../lib/publicApi'

const router = useRouter()

const phoneNumber = '++86-20-83701936'
const phoneLabel = '+86 20 8370 1936'

const search = ref('')
const searchOpen = ref(false)
const suggestLoading = ref(false)
const suggestHospitals = ref<string[]>([])
const suggestSpecialties = ref<string[]>([])
const searchBoxRef = ref<HTMLElement | null>(null)
let suggestDebounce: number | undefined
const intakeDates = ['March - 2026', 'September - 2026']

const featuredLoading = ref(false)
const featured = reactive({
  services: [] as any[],
  doctors: [] as any[],
  advanced: [] as any[],
  patientStories: [] as any[],
  hospitals: [] as any[],
  gallery: [] as any[],
})

const slideshowOpen = ref(false)
const slideshowIndex = ref(0)
const slideshowImages = ref<any[]>([])

const teamMembers = [
  {
    name: 'Sheikh Korban Ali',
    designation: 'Assitant',
    accent: 'text-red-600',
    image: '/korban.png',
    line1: 'Coordinates care plans with China’s top hospital networks.',
    line2: 'Focused on safety, clarity, and outcomes.',
  },
  {
    name: 'Dr. Maruf Mollah',
    designation: 'Patient Relations Lead',
    accent: 'text-yellow-600',
    image: '/maruf.jpg',
    line1: 'Guides families through appointments, logistics, and follow-ups.',
    line2: 'Ensures you always have a clear next step.',
  },
  {
    name: 'Sheikh Rashed',
    designation: 'International Coordinator',
    accent: 'text-purple-600',
    image: '/rashed.jpg',
    line1: 'Supports translation, documentation, and travel coordination.',
    line2: 'Brings comfort through clear communication.',
  },
  {
    name: 'Komol Sheikh',
    designation: 'COO',
    accent: 'text-purple-600',
    image: '/komol.jpg',
    line1: 'Monitors service quality and patient experience end-to-end.',
    line2: 'Improving every detail—every day.',
  },
]

function patientStoryMediaColClass(idx: number) {
  return idx % 2 === 0 ? 'lg:col-span-5' : 'lg:col-span-5 lg:order-2'
}

function patientStoryTextColClass(idx: number) {
  return idx % 2 === 0 ? 'lg:col-span-7' : 'lg:col-span-7 lg:order-1'
}

const hospitalSuggestions = computed(() => suggestHospitals.value.slice(0, 6))
const specialtySuggestions = computed(() => suggestSpecialties.value.slice(0, 8))

function normalizeTerm(v: unknown) {
  return typeof v === 'string' ? v.trim() : ''
}

function submitSearch(term: unknown) {
  const q = normalizeTerm(term)
  if (!q) return
  searchOpen.value = false
  router.push({ path: '/doctors', query: { q } })
}

function pickSuggestion(term: string) {
  search.value = term
  submitSearch(term)
}

async function fetchSuggestions(q: string) {
  suggestLoading.value = true
  try {
    const res = await searchAll(q, 12)
    const hospitals = (res.data?.hospitals ?? []).map((h: any) => normalizeTerm(h?.name)).filter(Boolean)
    const specialties = (res.data?.doctors ?? [])
      .map((d: any) => normalizeTerm(d?.specialty || d?.title))
      .filter(Boolean)

    suggestHospitals.value = Array.from(new Set(hospitals)).slice(0, 10)
    suggestSpecialties.value = Array.from(new Set(specialties)).slice(0, 12)
  } catch {
    suggestHospitals.value = []
    suggestSpecialties.value = []
  } finally {
    suggestLoading.value = false
  }
}

function onDocPointerDown(e: Event) {
  const el = searchBoxRef.value
  if (!el) return
  if (e.target instanceof Node && !el.contains(e.target)) searchOpen.value = false
}

function openSlideshow(image: any) {
  slideshowImages.value = featured.gallery
  const idx = featured.gallery.findIndex((m: any) => m.id === image.id)
  slideshowIndex.value = idx >= 0 ? idx : 0
  slideshowOpen.value = true
}

function closeSlideshow() {
  slideshowOpen.value = false
  slideshowIndex.value = 0
}

function prevSlide() {
  if (slideshowIndex.value > 0) slideshowIndex.value -= 1
}

function nextSlide() {
  if (slideshowIndex.value < slideshowImages.value.length - 1) slideshowIndex.value += 1
}

function onKeydown(e: KeyboardEvent) {
  if (!slideshowOpen.value) return
  if (e.key === 'Escape') closeSlideshow()
  if (e.key === 'ArrowLeft') prevSlide()
  if (e.key === 'ArrowRight') nextSlide()
}

onMounted(async () => {
  window.addEventListener('keydown', onKeydown)
  document.addEventListener('pointerdown', onDocPointerDown)
  featuredLoading.value = true
  try {
    const [servicesRes, doctorsRes, hospitalsRes, storiesRes, galleryRes, advancedRes] = await Promise.all([
      listServices({ page: 1, pageSize: 3, sort: 'updatedAt:desc' }),
      listDoctors({ page: 1, pageSize: 3, sort: 'updatedAt:desc' }),
      listHospitals({ page: 1, pageSize: 3, sort: 'updatedAt:desc' }),
      listPatientStories({ page: 1, pageSize: 2, sort: 'updatedAt:desc' }),
      listGallery({ page: 1, pageSize: 24 }),
      listHealthcareInChina({ page: 1, pageSize: 3, sort: 'updatedAt:desc' }),
    ])

    const serviceDetails = await Promise.all(
      (servicesRes.items ?? []).slice(0, 3).map(async (s: any) => {
        try {
          const full = await getService(s.slug)
          const media = (full.data as any)?.media?.[0]?.media
          const heroUrl = media?.urlThumb || media?.url || null
          return { ...s, heroUrl }
        } catch {
          return { ...s, heroUrl: null }
        }
      }),
    )

    const doctorDetails = await Promise.all(
      (doctorsRes.items ?? []).slice(0, 3).map(async (d: any) => {
        try {
          const full = await getDoctor(d.slug)
          const media = (full.data as any)?.media?.[0]?.media
          const heroUrl = media?.urlThumb || media?.url || null
          return { ...d, heroUrl }
        } catch {
          return { ...d, heroUrl: null }
        }
      }),
    )

    const hospitalDetails = await Promise.all(
      (hospitalsRes.items ?? []).slice(0, 3).map(async (h: any) => {
        try {
          const full = await getHospital(h.slug)
          const media = (full.data as any)?.media?.[0]?.media
          const heroUrl = media?.urlThumb || media?.url || null
          return { ...h, heroUrl }
        } catch {
          return { ...h, heroUrl: null }
        }
      }),
    )

    const storyDetails = await Promise.all(
      (storiesRes.items ?? []).slice(0, 2).map(async (s: any) => {
        try {
          const full = await getPatientStory(s.slug)
          const media = (full.data as any)?.media?.[0]?.media
          const url = media?.urlOriginal || media?.url || null
          const isVideo = typeof url === 'string' ? /\.mp4(\?|$)/i.test(url) : false
          const heroUrl = isVideo ? url : (media?.urlThumb || url)
          return { ...s, heroUrl, heroIsVideo: isVideo }
        } catch {
          return { ...s, heroUrl: null, heroIsVideo: false }
        }
      }),
    )

    const advancedDetails = await Promise.all(
      (advancedRes.items ?? []).slice(0, 3).map(async (a: any) => {
        try {
          const full = await getHealthcareInChina(a.slug)
          const media = (full.data as any)?.media?.[0]?.media
          const heroUrl = media?.urlThumb || media?.url || null
          return { ...a, heroUrl }
        } catch {
          return { ...a, heroUrl: null }
        }
      }),
    )

    featured.services = serviceDetails
    featured.doctors = doctorDetails
    featured.hospitals = hospitalDetails
    featured.patientStories = storyDetails
    featured.gallery = galleryRes.items ?? []
    featured.advanced = advancedDetails
  } catch {
    featured.services = []
    featured.doctors = []
    featured.hospitals = []
    featured.patientStories = []
    featured.gallery = []
    featured.advanced = []
  } finally {
    featuredLoading.value = false
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.removeEventListener('pointerdown', onDocPointerDown)
})

watch(
  () => search.value,
  (v) => {
    const q = normalizeTerm(v)
    if (suggestDebounce) window.clearTimeout(suggestDebounce)
    if (!q || q.length < 2) {
      suggestLoading.value = false
      suggestHospitals.value = []
      suggestSpecialties.value = []
      return
    }
    searchOpen.value = true
    suggestDebounce = window.setTimeout(() => {
      void fetchSuggestions(q)
    }, 250)
  },
)
</script>
