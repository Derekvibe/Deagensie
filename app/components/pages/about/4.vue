<script setup lang="ts">
import { Icon } from '@iconify/vue';

const services = [
  {
    icon: 'streamline-ultimate:idea-strategy',
    title: 'Strategy',
    description:
      'We combine research, creativity, and strategic frameworks to translate vision into actionable plans.',
  },
  {
    icon: 'streamline:paint-palette-solid',
    title: 'Brand Development',
    description:
      'Effective brands transcend logos and social media presence. We craft cohesive visual systems and identity strategy.',
  },
  {
    icon: 'fluent:arrow-growth-24-filled',
    title: 'Business Growth',
    description:
      'When you are looking to stand out from the crowd, we deploy creative growth mechanisms to scale your revenue.',
  },
  {
    icon: 'mingcute:laptop-fill',
    title: 'Digital Innovation',
    description:
      'We deploy well-crafted and strategic digital design to help client businesses stand out above the noise.',
  },
  {
    icon: 'fluent:people-audience-20-filled',
    title: 'Talent Academy',
    description:
      'We empower aspiring and established creatives with the skills needed to thrive in the modern global economy.',
  },
  {
    icon: 'uil:chart',
    title: 'Growth Lab',
    description:
      'An exclusive accelerator built to transform early-stage ideas into scalable brands through structured strategy.',
  },
];
</script>

<template>
  <section class="border-b border-gray-100 bg-white py-20 text-gray-900 lg:py-32">
    <div class="mx-auto w-5/6 max-w-7xl space-y-16">
      <div v-reveal="'fade-up'" class="mx-auto max-w-3xl space-y-4 text-center">
        <span
          class="inline-block rounded-full bg-[#04308F]/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#04308F] uppercase"
        >
          Capabilities
        </span>
        <h2
          class="font-serif text-3xl leading-tight font-normal tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
        >
          What we do
        </h2>
        <p class="text-base leading-relaxed font-normal text-gray-500">
          Delivering end-to-end creative and technology solutions tailored to scale global
          enterprises.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(service, sIndex) in services"
          :key="service.title"
          v-reveal="{ animation: 'fade-up', delay: sIndex * 100 }"
          class="group rounded-3xl border border-gray-100 bg-gray-50/60 p-8 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#04308F]/30 hover:bg-white hover:shadow-xl"
        >
          <div
            class="mb-6 flex size-14 items-center justify-center rounded-2xl bg-[#04308F]/10 text-2xl text-[#04308F] transition-all duration-300 group-hover:bg-[#04308F] group-hover:text-white"
          >
            <Icon :icon="service.icon" />
          </div>
          <h3 class="mb-3 font-serif text-xl font-normal text-gray-900">{{ service.title }}</h3>
          <p class="mb-6 text-sm leading-relaxed font-normal text-gray-500">
            {{ service.description }}
          </p>
          <NuxtLink
            to="/contact"
            class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#04308F] transition-colors hover:text-[#05DED5]"
          >
            Explore capability <Icon icon="lucide:arrow-right" class="text-sm" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css"></style>
