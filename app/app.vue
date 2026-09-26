<script setup lang="ts">
import { Icon } from '@iconify/vue';

const route = useRoute();
const pageSeo = computed(() => getPageSeo(route));

useHead({
  title: () => pageSeo.value.title,
  meta: [
    { name: 'description', content: () => pageSeo.value.description },
    { property: 'og:title', content: () => pageSeo.value.title },
    { property: 'og:description', content: () => pageSeo.value.description },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Deagensie' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: () => pageSeo.value.title },
    { name: 'twitter:description', content: () => pageSeo.value.description },
  ],
});
</script>

<template>
  <TooltipProvider class="overflow-x-hidden">
    <Notivue v-slot="item">
      <NotivueSwipe :item="item">
        <Notification :item="item">
          <NotificationProgress :item="item" />
        </Notification>
      </NotivueSwipe>
    </Notivue>
    <SiteHeader />
    <NuxtPage />
    <footer class="border-t border-white/10 bg-[#020B1E] py-16 text-white lg:pt-24 lg:pb-12">
      <div
        class="mx-auto flex w-5/6 max-w-7xl flex-col gap-12 lg:grid lg:grid-cols-[1.2fr_2fr] lg:gap-16"
      >
        <div class="space-y-6">
          <NuxtLink to="/" aria-label="Deagensie logo">
            <NuxtImg
              :width="182"
              :height="48"
              src="/images/logo.png"
              alt="Deagensie logo"
              class="h-10 w-auto lg:h-12"
            />
          </NuxtLink>
          <p class="max-w-md text-sm leading-relaxed text-gray-300 sm:text-base">
            Empowering businesses and creatives with intelligent AI workflows and global ecosystem
            connections to innovate and succeed.
          </p>
          <div class="flex items-center gap-4 text-2xl text-gray-300">
            <NuxtLink
              to="/"
              class="transition-all duration-300 hover:scale-110 hover:text-[#05DED5]"
              aria-label="LinkedIn"
            >
              <Icon icon="ri:linkedin-fill" />
            </NuxtLink>
            <NuxtLink
              to="/"
              class="transition-all duration-300 hover:scale-110 hover:text-[#05DED5]"
              aria-label="Instagram"
            >
              <Icon icon="ri:instagram-fill" />
            </NuxtLink>
            <NuxtLink
              to="/"
              class="transition-all duration-300 hover:scale-110 hover:text-[#05DED5]"
              aria-label="Twitter X"
            >
              <Icon icon="prime:twitter" />
            </NuxtLink>
            <NuxtLink
              to="/"
              class="transition-all duration-300 hover:scale-110 hover:text-[#05DED5]"
              aria-label="TikTok"
            >
              <Icon icon="akar-icons:tiktok-fill" />
            </NuxtLink>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8 lg:gap-6">
          <div class="flex flex-col gap-3 text-sm">
            <h3 class="mb-2 text-base font-bold tracking-wider text-white uppercase">Businesses</h3>
            <NuxtLink
              to="/business"
              class="text-gray-300 transition-colors duration-200 hover:text-[#05DED5]"
              >Hire Creatives</NuxtLink
            >
            <NuxtLink
              to="/business"
              class="text-gray-300 transition-colors duration-200 hover:text-[#05DED5]"
              >Business Growth</NuxtLink
            >
            <NuxtLink
              to="/subscription"
              class="text-gray-300 transition-colors duration-200 hover:text-[#05DED5]"
              >Talent-as-a-Service</NuxtLink
            >
            <NuxtLink
              to="/contact"
              class="text-gray-300 transition-colors duration-200 hover:text-[#05DED5]"
              >Work with us</NuxtLink
            >
          </div>

          <div class="flex flex-col gap-3 text-sm">
            <h3 class="mb-2 text-base font-bold tracking-wider text-white uppercase">Creatives</h3>
            <NuxtLink
              to="/creatives"
              class="text-gray-300 transition-colors duration-200 hover:text-[#05DED5]"
              >Find Opportunities</NuxtLink
            >
            <NuxtLink
              to="/creatives"
              class="text-gray-300 transition-colors duration-200 hover:text-[#05DED5]"
              >Join Community</NuxtLink
            >
            <NuxtLink
              to="/subscription"
              class="text-gray-300 transition-colors duration-200 hover:text-[#05DED5]"
              >Subscription Plans</NuxtLink
            >
          </div>

          <div class="flex flex-col gap-3 text-sm">
            <h3 class="mb-2 text-base font-bold tracking-wider text-white uppercase">Company</h3>
            <NuxtLink
              to="/about"
              class="text-gray-300 transition-colors duration-200 hover:text-[#05DED5]"
              >About Us</NuxtLink
            >
            <NuxtLink
              to="/why"
              class="text-gray-300 transition-colors duration-200 hover:text-[#05DED5]"
              >Why Deagensie</NuxtLink
            >
            <NuxtLink
              to="/portfolio"
              class="text-gray-300 transition-colors duration-200 hover:text-[#05DED5]"
              >Our Portfolio</NuxtLink
            >
            <NuxtLink
              to="/contact"
              class="text-gray-300 transition-colors duration-200 hover:text-[#05DED5]"
              >Contact Us</NuxtLink
            >
          </div>

          <div class="flex flex-col gap-3 text-sm">
            <h3 class="mb-2 text-base font-bold tracking-wider text-white uppercase">Resources</h3>
            <NuxtLink
              to="/blog"
              class="text-gray-300 transition-colors duration-200 hover:text-[#05DED5]"
              >Blog</NuxtLink
            >
            <NuxtLink
              to="/resource"
              class="text-gray-300 transition-colors duration-200 hover:text-[#05DED5]"
              >eBooks & Guides</NuxtLink
            >
            <NuxtLink
              to="/resource"
              class="text-gray-300 transition-colors duration-200 hover:text-[#05DED5]"
              >Knowledge Hub</NuxtLink
            >
          </div>
        </div>
      </div>

      <div
        class="mx-auto mt-12 flex w-5/6 max-w-7xl flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-xs text-gray-400 sm:flex-row"
      >
        <p>&copy; 2026 Deagensie. All rights reserved.</p>
        <div class="flex gap-6">
          <NuxtLink to="/contact" class="transition-colors duration-200 hover:text-white"
            >Privacy Policy</NuxtLink
          >
          <NuxtLink to="/contact" class="transition-colors duration-200 hover:text-white"
            >Terms of Service</NuxtLink
          >
        </div>
      </div>
    </footer>
    <BackToTop />
  </TooltipProvider>
</template>
