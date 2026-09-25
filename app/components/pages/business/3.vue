<script setup lang="ts">
import { Icon } from '@iconify/vue';

const capabilities = [
  {
    icon: 'mage:book',
    title: 'Strategy',
    description: 'Clear direction. Smart decisions. Sustainable advantage. We translate vision into actionable, measurable plans.',
  },
  {
    icon: 'basil:star-outline',
    title: 'Brand Development',
    description: 'Distinct identities that command attention and loyalty. Brands that transcend logos and build lasting relationships.',
  },
  {
    icon: 'mdi-light:chart-line',
    title: 'Marketing',
    description: 'Data-driven campaigns that convert and scale. AI-integrated strategies that adapt to market signals in real time.',
  },
  {
    icon: 'uil:desktop',
    title: 'Digital Products',
    description: 'Intelligent digital experiences built for performance. We research, design, develop, and deploy result-oriented web solutions.',
  },
  {
    icon: 'material-symbols:medical-services-outline',
    title: 'Talent-as-a-Service',
    description: 'Flexible, high-impact creative support on demand. Pre-vetted professionals matched to your exact project needs.',
  },
  {
    icon: 'formkit:people',
    title: 'Build Teams',
    description: 'Build a forward-thinking creative team. We train, embed, and develop high-performing teams that drive innovation.',
  },
];
</script>

<template>
  <section class="bg-white text-gray-900 py-20 lg:py-32 border-b border-gray-100">
    <div class="mx-auto w-5/6 max-w-7xl space-y-16">
      <div v-reveal="'fade-up'" class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div class="space-y-4 max-w-2xl">
          <span class="text-xs uppercase tracking-widest text-[#04308F] font-semibold bg-[#04308F]/10 px-4 py-1.5 rounded-full inline-block">
            Our Capabilities
          </span>
          <h2 class="text-3xl font-serif font-normal tracking-tight sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
            How Our Experts Elevate Your Business
          </h2>
        </div>
        <NuxtLink
          to="/contact"
          class="inline-flex items-center gap-2 rounded-full bg-[#04308F] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#05DED5] hover:text-gray-900 shadow-md shadow-[#04308F]/20"
        >
          Explore Solutions <Icon icon="lucide:arrow-right" class="text-base" />
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(cap, cIndex) in capabilities"
          :key="cap.title"
          v-reveal="{ animation: 'fade-up', delay: cIndex * 100 }"
          class="p-8 rounded-3xl bg-gray-50/60 border border-gray-100 shadow-xs transition-all duration-300 hover:bg-white hover:shadow-xl hover:border-[#04308F]/20 hover:-translate-y-1 group"
        >
          <div class="size-14 rounded-2xl bg-[#04308F]/10 text-[#04308F] flex items-center justify-center text-2xl mb-6 group-hover:bg-[#04308F] group-hover:text-white transition-all duration-300">
            <Icon :icon="cap.icon" />
          </div>
          <h3 class="text-xl font-serif font-normal text-gray-900 mb-3">{{ cap.title }}</h3>
          <p class="text-sm text-gray-500 leading-relaxed font-normal mb-6">{{ cap.description }}</p>
          <NuxtLink
            to="/contact"
            class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#04308F] group-hover:text-[#05DED5] transition-colors"
          >
            Learn more <Icon icon="lucide:arrow-right" class="text-sm" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
</style>
