<script setup lang="ts">
import { Icon } from '@iconify/vue';

const coreValues = [
  {
    icon: 'si:shield-line',
    title: 'Integrity',
    description:
      'We deliver on our promises and maintain the trust of the communities, partners, and individuals we serve.',
  },
  {
    icon: 'system-uicons:lightbulb-on',
    title: 'Creativity',
    description:
      'Our passion for creativity allows continuous evolution, offering fresh, dynamic solutions that cater to a rapidly changing market.',
  },
  {
    icon: 'material-symbols-light:star-outline',
    title: 'Excellence',
    description:
      'We are committed to delivering exceptional solutions that empower creatives and startups to reach their full potential.',
  },
];
</script>

<template>
  <section class="border-b border-gray-100 bg-gray-50/50 py-20 text-gray-900 lg:py-28">
    <div class="mx-auto w-5/6 max-w-7xl space-y-16">
      <div v-reveal="'fade-up'" class="mx-auto max-w-3xl space-y-4 text-center">
        <span
          class="inline-block rounded-full bg-[#04308F]/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#04308F] uppercase"
        >
          Our Foundation
        </span>
        <h2
          class="font-serif text-3xl leading-tight font-normal tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
        >
          We&apos;re changing the creative economy
        </h2>
      </div>

      <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div
          v-reveal="'scale-in'"
          class="relative aspect-16/10 overflow-hidden rounded-3xl border border-gray-100 bg-gray-100 shadow-2xl shadow-gray-200/60"
        >
          <NuxtImg
            src="/images/pages/about/hero-2.png"
            alt="Deagensie Vision & Mission"
            class="size-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>

        <div class="space-y-8">
          <div
            v-reveal="{ animation: 'fade-left', delay: 100 }"
            class="space-y-2 rounded-2xl border border-gray-100 bg-white p-6 shadow-xs"
          >
            <h3 class="font-serif text-xl font-normal text-gray-900">Our Vision Statement</h3>
            <p class="text-sm leading-relaxed font-normal text-gray-500">
              We envision a borderless world where creative talents thrive—where intelligent minds,
              regardless of geography, collaborate with the world&apos;s leading brands.
            </p>
          </div>

          <div
            v-reveal="{ animation: 'fade-left', delay: 200 }"
            class="space-y-2 rounded-2xl border border-gray-100 bg-white p-6 shadow-xs"
          >
            <h3 class="font-serif text-xl font-normal text-gray-900">Our Mission Statement</h3>
            <p class="text-sm leading-relaxed font-normal text-gray-500">
              We&apos;re on a mission to become the foremost ecosystem-driven creative agency:
              empowering scalable businesses, unlocking global talent, and expanding the boundaries
              of the digital creative economy.
            </p>
          </div>
        </div>
      </div>

      <!-- Core Values 3-Column Grid -->
      <div class="space-y-8 pt-8">
        <h3 v-reveal="'fade-up'" class="text-center font-serif text-2xl font-normal text-gray-900">
          Our Core Values
        </h3>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div
            v-for="(val, valIndex) in coreValues"
            :key="val.title"
            v-reveal="{ animation: 'fade-up', delay: valIndex * 150 }"
            class="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div
              class="mb-6 flex size-12 items-center justify-center rounded-2xl bg-[#04308F]/10 text-2xl text-[#04308F] transition-colors duration-300 group-hover:bg-[#04308F] group-hover:text-white"
            >
              <Icon :icon="val.icon" />
            </div>
            <h4 class="mb-3 font-serif text-xl font-normal text-gray-900">{{ val.title }}</h4>
            <p class="text-sm leading-relaxed font-normal text-gray-500">{{ val.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css"></style>
