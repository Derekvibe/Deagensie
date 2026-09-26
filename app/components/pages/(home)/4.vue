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
  <section class="overflow-hidden bg-white py-24 text-gray-900 lg:py-32">
    <div class="mx-auto w-5/6 max-w-7xl space-y-16">
      <!-- Andela Rating Header Badge (Image 1 Header) -->
      <div class="mx-auto max-w-3xl space-y-5 text-center">
        <div
          class="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-semibold text-gray-800 shadow-sm sm:text-sm"
        >
          <span
            class="flex size-5 items-center justify-center rounded-full bg-[#DD6A05] text-[10px] font-bold text-white"
            >G</span
          >
          <span class="font-bold text-gray-900">4.9</span>
          <div class="flex text-sm text-[#DD6A05]">
            <Icon v-for="n in 5" :key="n" icon="mdi:star" />
          </div>
          <span class="text-gray-300">|</span>
          <span class="font-normal text-gray-600">Verified Partner Reviews</span>
        </div>

        <h2
          class="font-serif text-3xl leading-tight font-normal tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
        >
          Trusted by tech leaders
        </h2>
      </div>

      <!-- Andela Testimonial Card Grid (Image 1 Layout - 3 Original Testimonials) -->
      <div class="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3 lg:gap-8">
        <article
          v-for="item in testimonials"
          :key="item.name"
          class="group relative flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-8 shadow-lg shadow-gray-100/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div class="space-y-5">
            <!-- 5 Gold Stars Header -->
            <div class="flex text-sm text-[#DD6A05]">
              <Icon v-for="n in 5" :key="n" icon="mdi:star" />
            </div>

            <!-- Quote Text -->
            <blockquote class="text-sm leading-relaxed font-normal text-gray-700 sm:text-base">
              &ldquo;{{ item.testimonial }}&rdquo;
            </blockquote>
          </div>

          <!-- Bottom Author Info & Company Avatar -->
          <div class="mt-6 flex items-center justify-between pt-6">
            <div>
              <p class="text-sm font-bold text-gray-900">{{ item.name }}</p>
              <p class="text-xs font-medium text-gray-500">{{ item.company }}</p>
              <p class="mt-0.5 text-[11px] text-gray-400">{{ item.role }}</p>
            </div>

            <!-- Company / Person Avatar -->
            <div
              class="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200/60 bg-gray-50"
            >
              <NuxtImg :src="item.photo" :alt="item.name" class="size-full object-cover" />
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css"></style>
