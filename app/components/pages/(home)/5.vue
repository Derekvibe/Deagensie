<script setup lang="ts">
import { Icon } from '@iconify/vue';

const works = [
  {
    logo: '/images/works/lw-trade-and-investment-forum/logo.png',
    thumbnail: '/images/works/lw-trade-and-investment-forum/showcase.webp',
    title:
      "What if trade wasn't just transactional—but transformational?",
    description:
      'When the Department of Commerce at Loveworld Inc envisioned a global platform that would inspire trust, spark innovation, and drive authentic economic partnerships, they turned to Deagensie.',
    tags: [{ label: 'Strategy' }, { label: 'Branding' }, { label: 'Website' }],
    cta: { label: 'Learn more', href: '/portfolio' },
    altText: 'Showcase of Loveworld Trade and Investment platform building',
    logoAlt: 'Loveworld Trade and Investment',
    color: 'emerald',
  },
  {
    logo: '/images/works/lw-registry/logo.png',
    thumbnail: '/images/works/lw-registry/showcase.webp',
    title:
      'How do you build trust at scale across an entire economic ecosystem?',
    description:
      'The Department of Commerce envisioned a unified digital infrastructure where every SBO, vendor, contractor, merchant, and entrepreneur within the Loveworld Nation could operate transparently.',
    tags: [{ label: 'Strategy' }, { label: 'Branding' }, { label: 'Product Development' }],
    cta: { label: 'Learn more', href: '/portfolio' },
    altText: 'Showcase of Loveworld Registry platform building',
    logoAlt: 'Loveworld Registry',
    color: 'blue',
  },
  {
    logo: '/images/works/green-plains/logo.png',
    thumbnail: '/images/works/green-plains/showcase.webp',
    title: 'A powerful vision needs a powerful roadmap.',
    description:
      'When Green Plains Agro first approached Deagensie, they carried a vision of fertile fields powered by innovation, of ethical farming guided by technology, and of nourishing communities.',
    tags: [{ label: 'Strategy' }, { label: 'Branding' }, { label: 'Website' }],
    cta: { label: 'Learn more', href: '/portfolio' },
    altText: 'Showcase of GreenPlains platform building',
    logoAlt: 'Green Plains',
    color: 'purple',
  },
];

const colorMap: Record<string, string> = {
  emerald: 'bg-emerald-50 border-emerald-100',
  blue: 'bg-blue-50 border-blue-100',
  purple: 'bg-purple-50 border-purple-100',
};
</script>

<template>
  <section class="bg-white text-gray-900 py-24 lg:py-32 overflow-hidden border-t border-gray-100">
    <!-- Section Editorial Header -->
    <div class="mx-auto w-5/6 max-w-7xl mb-14 lg:mb-20 text-center">
      <span class="text-xs uppercase tracking-widest text-[#04308F] font-semibold bg-[#04308F]/10 px-4 py-1.5 rounded-full inline-block mb-4">
        Case Studies & Proof of Impact
      </span>
      <h2
        class="text-center text-3xl font-serif font-normal tracking-tight leading-tight sm:text-4xl lg:text-5xl text-gray-900"
      >
        Our work speaks for itself
      </h2>
      <p class="text-base text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
        Real projects. Real impact. Delivered with precision, strategy, and creative excellence.
      </p>
    </div>

    <!-- Andela-style Project Cards Grid (3 columns) -->
    <div class="mx-auto w-5/6 max-w-7xl grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="work in works"
        :key="work.title"
        class="group flex flex-col rounded-3xl border border-gray-100 bg-white overflow-hidden shadow-md shadow-gray-100/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
      >
        <!-- Card Thumbnail -->
        <div
          class="relative overflow-hidden aspect-video w-full"
          :class="colorMap[work.color]"
        >
          <NuxtImg
            :src="work.thumbnail"
            :alt="work.altText"
            class="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />

          <!-- Tags overlay -->
          <div class="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            <span
              v-for="tag in work.tags"
              :key="tag.label"
              class="rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gray-700 shadow-sm"
            >
              {{ tag.label }}
            </span>
          </div>
        </div>

        <!-- Card Content -->
        <div class="flex flex-col flex-1 p-7 space-y-4">
          <!-- Logo -->
          <NuxtImg
            :src="work.logo"
            :alt="work.logoAlt"
            class="h-7 w-auto object-contain"
          />

          <!-- Title -->
          <h3 class="text-base font-serif font-normal leading-snug text-gray-900 sm:text-lg lg:text-xl">
            {{ work.title }}
          </h3>

          <!-- Description -->
          <p class="text-sm leading-relaxed text-gray-500 flex-1">
            {{ work.description }}
          </p>

          <!-- CTA -->
          <NuxtLink
            :to="work.cta.href"
            class="inline-flex items-center gap-2 text-sm font-bold text-[#04308F] transition-colors duration-200 hover:text-[#05DED5] mt-2"
          >
            <span>{{ work.cta.label }}</span>
            <Icon icon="lucide:arrow-right" class="text-base transition-transform duration-200 group-hover:translate-x-1" />
          </NuxtLink>
        </div>
      </article>
    </div>

    <!-- Bottom CTA -->
    <div class="mx-auto w-5/6 max-w-7xl mt-14 text-center">
      <NuxtLink
        to="/portfolio"
        class="inline-flex items-center gap-2 rounded-full border-2 border-[#04308F] px-8 py-4 text-base font-bold text-[#04308F] transition-all duration-300 hover:bg-[#04308F] hover:text-white hover:scale-105"
      >
        View All Case Studies
        <Icon icon="lucide:arrow-right" class="text-lg" />
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped lang="css">
</style>


