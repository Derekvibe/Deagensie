<script setup lang="ts">
import { Icon } from '@iconify/vue';

const services = [
  {
    icon: 'streamline-ultimate:idea-strategy',
    title: 'Strategy',
    description: 'We combine research, creativity, and strategic frameworks to translate vision into actionable plans.',
  },
  {
    icon: 'streamline:paint-palette-solid',
    title: 'Brand Development',
    description: 'Effective brands transcend logos and social media presence. We craft cohesive visual systems and identity strategy.',
  },
  {
    icon: 'fluent:arrow-growth-24-filled',
    title: 'Business Growth',
    description: 'When you are looking to stand out from the crowd, we deploy creative growth mechanisms to scale your revenue.',
  },
  {
    icon: 'mingcute:laptop-fill',
    title: 'Digital Innovation',
    description: 'We deploy well-crafted and strategic digital design to help client businesses stand out above the noise.',
  },
  {
    icon: 'fluent:people-audience-20-filled',
    title: 'Talent Academy',
    description: 'We empower aspiring and established creatives with the skills needed to thrive in the modern global economy.',
  },
  {
    icon: 'uil:chart',
    title: 'Growth Lab',
    description: 'An exclusive accelerator built to transform early-stage ideas into scalable brands through structured strategy.',
  },
];
</script>

<template>
  <section class="bg-white text-gray-900 py-20 lg:py-32 border-b border-gray-100">
    <div class="mx-auto w-5/6 max-w-7xl space-y-16">
      <div v-reveal="'fade-up'" class="text-center max-w-3xl mx-auto space-y-4">
        <span class="text-xs uppercase tracking-widest text-[#04308F] font-semibold bg-[#04308F]/10 px-4 py-1.5 rounded-full inline-block">
          Capabilities
        </span>
        <h2 class="text-3xl font-serif font-normal tracking-tight sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
          What we do
        </h2>
        <p class="text-base text-gray-500 leading-relaxed font-normal">
          Delivering end-to-end creative and technology solutions tailored to scale global enterprises.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(service, sIndex) in services"
          :key="service.title"
          v-reveal="{ animation: 'fade-up', delay: sIndex * 100 }"
          class="p-8 rounded-3xl bg-gray-50/60 border border-gray-100 shadow-xs transition-all duration-300 hover:bg-white hover:shadow-xl hover:border-[#04308F]/30 hover:-translate-y-1 group"
        >
          <div class="size-14 rounded-2xl bg-[#04308F]/10 text-[#04308F] flex items-center justify-center text-2xl mb-6 group-hover:bg-[#04308F] group-hover:text-white transition-all duration-300">
            <Icon :icon="service.icon" />
          </div>
          <h3 class="text-xl font-serif font-normal text-gray-900 mb-3">{{ service.title }}</h3>
          <p class="text-sm text-gray-500 leading-relaxed font-normal mb-6">{{ service.description }}</p>
          <NuxtLink
            to="/contact"
            class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#04308F] hover:text-[#05DED5] transition-colors"
          >
            Explore capability <Icon icon="lucide:arrow-right" class="text-sm" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
</style>
