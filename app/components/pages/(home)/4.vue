<script setup lang="ts">
import { Icon } from '@iconify/vue';

const testimonials = [
  {
    photo: '/images/pages/(home)/testimonials/don-okhufou.png',
    name: 'Don Okhufou',
    role: 'Chairman',
    company: 'Kuda Bank',
    testimonial:
      "Partnering with Deagensie on Green Plains Agro's branding and digital innovations projects was a seamless and rewarding experience — their strategic insight and creative excellence brought the vision to life.",
  },
  {
    photo: '/images/pages/(home)/testimonials/victor-ephraim.png',
    name: 'Victor Ephraim',
    role: "Head of People's Operation",
    company: 'Venture Gardens Group',
    testimonial:
      'From the very beginning, it was clear that we were dealing with top-notch professionals. Their approach to work can be described as robotically precise and militarily disciplined, with the entire team optimized for delivering results. Working with them was an absolute pleasure.',
  },
  {
    photo: '/images/pages/(home)/testimonials/womo-diriyai.jpg',
    name: 'Womo Diriyai',
    role: 'Founder/CEO',
    company: 'Xerdocs Health',
    testimonial:
      'From the very beginning, it was clear that we were dealing with top-notch professionals. Their approach to work can be described as robotically precise and militarily disciplined. We were thoroughly impressed by their dedication and creative solutions.',
  },
];
</script>

<template>
  <section class="bg-white text-gray-900 py-24 lg:py-32 overflow-hidden">
    <div class="mx-auto w-5/6 max-w-7xl space-y-16">
      <!-- Andela Rating Header Badge (Image 1 Header) -->
      <div class="mx-auto max-w-3xl text-center space-y-5">
        <div class="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 shadow-sm border border-gray-200 text-xs sm:text-sm font-semibold text-gray-800">
          <span class="rounded-full bg-[#DD6A05] text-white size-5 flex items-center justify-center text-[10px] font-bold">G</span>
          <span class="font-bold text-gray-900">4.9</span>
          <div class="flex text-[#DD6A05] text-sm">
            <Icon v-for="n in 5" :key="n" icon="mdi:star" />
          </div>
          <span class="text-gray-300">|</span>
          <span class="text-gray-600 font-normal">Verified Partner Reviews</span>
        </div>

        <h2
          class="text-3xl font-serif font-normal tracking-tight leading-tight sm:text-4xl lg:text-5xl text-gray-900"
        >
          Trusted by tech leaders
        </h2>
      </div>

      <!-- Andela Testimonial Card Grid (Image 1 Layout - 3 Original Testimonials) -->
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-8 max-w-6xl mx-auto">
        <article
          v-for="item in testimonials"
          :key="item.name"
          class="group relative flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-8 shadow-lg shadow-gray-100/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div class="space-y-5">
            <!-- 5 Gold Stars Header -->
            <div class="flex text-[#DD6A05] text-sm">
              <Icon v-for="n in 5" :key="n" icon="mdi:star" />
            </div>

            <!-- Quote Text -->
            <blockquote class="text-sm sm:text-base leading-relaxed text-gray-700 font-normal">
              &ldquo;{{ item.testimonial }}&rdquo;
            </blockquote>
          </div>

          <!-- Bottom Author Info & Company Avatar -->
          <div class="pt-6 flex items-center justify-between mt-6">
            <div>
              <p class="text-sm font-bold text-gray-900">{{ item.name }}</p>
              <p class="text-xs text-gray-500 font-medium">{{ item.company }}</p>
              <p class="text-[11px] text-gray-400 mt-0.5">{{ item.role }}</p>
            </div>

            <!-- Company / Person Avatar -->
            <div class="size-10 rounded-xl bg-gray-50 border border-gray-200/60 flex items-center justify-center overflow-hidden shrink-0">
              <NuxtImg :src="item.photo" :alt="item.name" class="size-full object-cover" />
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
</style>



