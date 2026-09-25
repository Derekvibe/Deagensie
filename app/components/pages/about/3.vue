<script setup lang="ts">
import { Icon } from '@iconify/vue';

const coreValues = [
  {
    icon: 'si:shield-line',
    title: 'Integrity',
    description: 'We deliver on our promises and maintain the trust of the communities, partners, and individuals we serve.',
  },
  {
    icon: 'system-uicons:lightbulb-on',
    title: 'Creativity',
    description: 'Our passion for creativity allows continuous evolution, offering fresh, dynamic solutions that cater to a rapidly changing market.',
  },
  {
    icon: 'material-symbols-light:star-outline',
    title: 'Excellence',
    description: 'We are committed to delivering exceptional solutions that empower creatives and startups to reach their full potential.',
  },
];
</script>

<template>
  <section class="bg-gray-50/50 text-gray-900 py-20 lg:py-28 border-b border-gray-100">
    <div class="mx-auto w-5/6 max-w-7xl space-y-16">
      <div v-reveal="'fade-up'" class="text-center max-w-3xl mx-auto space-y-4">
        <span class="text-xs uppercase tracking-widest text-[#04308F] font-semibold bg-[#04308F]/10 px-4 py-1.5 rounded-full inline-block">
          Our Foundation
        </span>
        <h2 class="text-3xl font-serif font-normal tracking-tight sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
          We&apos;re changing the creative economy
        </h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div v-reveal="'scale-in'" class="relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-100 shadow-2xl shadow-gray-200/60 aspect-16/10">
          <NuxtImg
            src="/images/pages/about/hero-2.png"
            alt="Deagensie Vision & Mission"
            class="size-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>

        <div class="space-y-8">
          <div v-reveal="{ animation: 'fade-left', delay: 100 }" class="p-6 rounded-2xl bg-white border border-gray-100 shadow-xs space-y-2">
            <h3 class="text-xl font-serif font-normal text-gray-900">Our Vision Statement</h3>
            <p class="text-sm text-gray-500 leading-relaxed font-normal">
              We envision a borderless world where creative talents thrive—where intelligent minds,
              regardless of geography, collaborate with the world&apos;s leading brands.
            </p>
          </div>

          <div v-reveal="{ animation: 'fade-left', delay: 200 }" class="p-6 rounded-2xl bg-white border border-gray-100 shadow-xs space-y-2">
            <h3 class="text-xl font-serif font-normal text-gray-900">Our Mission Statement</h3>
            <p class="text-sm text-gray-500 leading-relaxed font-normal">
              We&apos;re on a mission to become the foremost ecosystem-driven creative agency:
              empowering scalable businesses, unlocking global talent, and expanding the boundaries
              of the digital creative economy.
            </p>
          </div>
        </div>
      </div>

      <!-- Core Values 3-Column Grid -->
      <div class="pt-8 space-y-8">
        <h3 v-reveal="'fade-up'" class="text-2xl font-serif font-normal text-center text-gray-900">Our Core Values</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(val, valIndex) in coreValues"
            :key="val.title"
            v-reveal="{ animation: 'fade-up', delay: valIndex * 150 }"
            class="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
          >
            <div class="size-12 rounded-2xl bg-[#04308F]/10 text-[#04308F] flex items-center justify-center text-2xl mb-6 group-hover:bg-[#04308F] group-hover:text-white transition-colors duration-300">
              <Icon :icon="val.icon" />
            </div>
            <h4 class="text-xl font-serif font-normal text-gray-900 mb-3">{{ val.title }}</h4>
            <p class="text-sm text-gray-500 leading-relaxed font-normal">{{ val.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
</style>
