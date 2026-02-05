<template>
  <footer class="relative w-full bg-gradient-to-br from-red-500 via-red-550 to-red-200 text-red-300">
    <div class="max-w-7xl mx-auto px-4 lg:px-6 py-12 lg:py-16">
      <div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
        <!-- Company Info -->
        <div>
          <RouterLink to="/" class="inline-flex items-center">
            <img
              src="/logo.png"
              alt="BRHC"
              class="h-[78px] w-[238px] object-contain"
              onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
            />
            <div
              class="hidden h-[78px] w-[238px] items-center justify-center rounded-2xl bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-2xl"
              style="display: none;"
            >
              BRHC
            </div>
          </RouterLink>
          <p class="mt-3 text-sm text-red-100">Belt and Road Healthcare Center</p>
          <p class="mt-3 text-sm text-red-50">
            Connecting patients with trusted hospitals, expert doctors, and advanced healthcare in China.
          </p>
        </div>

        <!-- Useful Links -->
        <div>
          <div class="text-base font-semibold text-white mb-4">Useful Links</div>
          <div class="space-y-2 text-sm">
            <RouterLink to="/blogs" class="block hover:text-red-100 text-red-50">Blogs</RouterLink>
            <RouterLink to="/hospitals" class="block hover:text-red-100 text-red-50">Partner Hospitals</RouterLink>
            <RouterLink to="/services" class="block hover:text-red-100 text-red-50">Services</RouterLink>
            <RouterLink to="/doctors" class="block hover:text-red-100 text-red-50">Doctors</RouterLink>
            <RouterLink to="/healthcare-in-china" class="block hover:text-red-300 text-red-50">Advanced Healthcare</RouterLink>
            <RouterLink to="/patient-stories" class="block hover:text-red-300 text-red-50">Patient Stories</RouterLink>
            <RouterLink to="/#about" class="block hover:text-red-300 text-red-50">About Us</RouterLink>
          </div>
        </div>

        <!-- Contact -->
        <div>
          <div class="text-base font-semibold text-red-50 mb-4">Contact</div>
          <div class="space-y-4 text-sm text-gray-400">
            <div>
              <div class="text-xs font-semibold text-white/90">Guangzhou Office</div>
              <div class="mt-1 space-y-1">
                <a class="flex items-center gap-2 hover:text-red-300 text-red-50" href="tel:+862083701936">
                  <Phone class="h-4 w-4 text-red-100" />
                  +86-20-83701936
                </a>
                <a class="flex items-center gap-2 hover:text-red-300 text-red-50" href="tel:+8615989054366">
                  <Phone class="h-4 w-4 text-red-100" />
                  +86-15989054366
                </a>
              </div>
            </div>

            <div>
              <div class="text-xs font-semibold text-white/90">Kunming Office</div>
              <div class="mt-1">
                <a class="flex items-center gap-2 hover:text-red-300 text-red-50" href="tel:+8613577031033">
                  <Phone class="h-4 w-4 text-red-100" />
                  +86-13577031033
                </a>
              </div>
            </div>

            <div>
              <div class="text-xs font-semibold text-white/90">Dhaka Office</div>
              <div class="mt-1">
                <a class="flex items-center gap-2 hover:text-red-300 text-red-50" href="tel:+8801725158347">
                  <Phone class="h-4 w-4 text-red-100" />
                  +88-01725158347
                </a>
              </div>
            </div>

            <RouterLink to="/contact" class="inline-flex items-center gap-2 text-xs font-semibold text-white/90 hover:text-red-300 transition-colors">
              <MapPin class="h-4 w-4 text-red-100" />
              View addresses
            </RouterLink>

            <div class="flex items-center gap-2 text-xs text-white/80">
              <Clock class="h-4 w-4 text-red-100" />
              24/7 Support
            </div>
          </div>
        </div>

        <!-- Social & QR Codes -->
        <div>
          <div class="text-base font-semibold text-white mb-4">Connect With Us</div>
          <div class="flex flex-wrap gap-3">
            <a
              :href="facebookUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 transition hover:bg-white/10 hover:ring-white/20"
              aria-label="Facebook"
              title="Facebook"
            >
              <Facebook class="h-5 w-5 text-white" />
            </a>
            <a
              :href="facebookUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 transition hover:bg-white/10 hover:ring-white/20"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <Linkedin class="h-5 w-5 text-white" />
            </a>
            <a
              :href="facebookUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 transition hover:bg-white/10 hover:ring-white/20"
              aria-label="YouTube"
              title="YouTube"
            >
              <Youtube class="h-5 w-5 text-white" />
            </a>
          </div>

          <div class="mt-6">
            <div class="text-xs text-red-100 mb-2">QR</div>
            <button
              type="button"
              class="group relative inline-flex overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 transition hover:bg-white/10 hover:ring-white/20"
              @click="openFacebook"
            >
              <img :src="qrSrc" alt="Facebook QR" class="h-28 w-28 object-cover" loading="lazy" />
              <div class="absolute inset-0 flex items-end justify-between p-2">
                <div class="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur">
                  <QrCode class="h-3.5 w-3.5" />
                  Open
                </div>
                <ExternalLink class="h-3.5 w-3.5 text-white/90 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </button>
          </div>
        </div>
      </div>

      <div class="mt-8 pt-8 border-t border-gray-800 flex flex-wrap items-center justify-between gap-3">
        <div class="text-xs text-red-100">© {{ year }} BRHC. All rights reserved.</div>
        <div class="text-xs text-red-100">Built by www.asifrahman.info</div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Clock, ExternalLink, Facebook, Linkedin, MapPin, Phone, QrCode, Youtube } from 'lucide-vue-next'

const year = new Date().getFullYear()

const facebookUrl = 'https://www.facebook.com/brcchealthcare'
const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(facebookUrl)}`

function openFacebook() {
  window.open(facebookUrl, '_blank', 'noopener,noreferrer')
}
</script>
