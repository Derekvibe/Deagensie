<script setup lang="ts">
import { Icon } from '@iconify/vue';

const capabilities = [
  {
    icon: 'mage:book',
    title: 'Strategy',
    description:
      'Clear direction. Smart decisions. Sustainable advantage. We translate vision into actionable, measurable plans.',
  },
  {
    icon: 'basil:star-outline',
    title: 'Brand Development',
    description:
      'Distinct identities that command attention and loyalty. Brands that transcend logos and build lasting relationships.',
  },
  {
    icon: 'mdi-light:chart-line',
    title: 'Marketing',
    description:
      'Data-driven campaigns that convert and scale. AI-integrated strategies that adapt to market signals in real time.',
  },
  {
    icon: 'uil:desktop',
    title: 'Digital Products',
    description:
      'Intelligent digital experiences built for performance. We research, design, develop, and deploy result-oriented web solutions.',
  },
  {
    icon: 'material-symbols:medical-services-outline',
    title: 'Talent-as-a-Service',
    description:
      'Flexible, high-impact creative support on demand. Pre-vetted professionals matched to your exact project needs.',
  },
  {
    icon: 'formkit:people',
    title: 'Build Teams',
    description:
      'Build a forward-thinking creative team. We train, embed, and develop high-performing teams that drive innovation.',
  },
];
</script>

<template>
  <section class="border-b border-gray-100 bg-white py-20 text-gray-900 lg:py-32">
    <div class="mx-auto w-5/6 max-w-7xl space-y-16">
      <div
        v-reveal="'fade-up'"
        class="flex flex-col justify-between gap-6 md:flex-row md:items-end"
      >
        <div class="max-w-2xl space-y-4">
          <span
            class="inline-block rounded-full bg-[#04308F]/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#04308F] uppercase"
          >
            Our Capabilities
          </span>
          <h2
            class="font-serif text-3xl leading-tight font-normal tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
          >
            How Our Experts Elevate Your Business
          </h2>
        </div>
        <NuxtLink
          to="/contact"
          class="inline-flex items-center gap-2 rounded-full bg-[#04308F] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#04308F]/20 transition-all duration-300 hover:bg-[#05DED5] hover:text-gray-900"
        >
          Explore Solutions <Icon icon="lucide:arrow-right" class="text-base" />
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(cap, cIndex) in capabilities"
          :key="cap.title"
          v-reveal="{ animation: 'fade-up', delay: cIndex * 100 }"
          class="group rounded-3xl border border-gray-100 bg-gray-50/60 p-8 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#04308F]/20 hover:bg-white hover:shadow-xl"
        >
          <div
            class="mb-6 flex size-14 items-center justify-center rounded-2xl bg-[#04308F]/10 text-2xl text-[#04308F] transition-all duration-300 group-hover:bg-[#04308F] group-hover:text-white"
          >
            <Icon :icon="cap.icon" />
          </div>
          <h3 class="mb-3 font-serif text-xl font-normal text-gray-900">{{ cap.title }}</h3>
          <p class="mb-6 text-sm leading-relaxed font-normal text-gray-500">
            {{ cap.description }}
          </p>
          <NuxtLink
            to="/contact"
            class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#04308F] transition-colors group-hover:text-[#05DED5]"
          >
            Learn more <Icon icon="lucide:arrow-right" class="text-sm" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css"></style>
