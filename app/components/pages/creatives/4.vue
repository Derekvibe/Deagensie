<script setup lang="ts">
import { Icon } from '@iconify/vue';

const talentCategories = [
  {
    icon: 'jam:write',
    title: 'Design & Motion',
    description: 'Multi-purpose designs for branding, marketing, product, and motion prints.',
    roles: ['Graphic Designer', 'Brand Strategist', 'Motion Graphics & Animator'],
  },
  {
    icon: 'uil:desktop',
    title: 'Digital Transformation',
    description: 'Designing and building cross-functional websites, apps, and platforms.',
    roles: ['Website Designer', 'UI/UX Designer', 'Frontend Engineer'],
  },
  {
    icon: 'mdi-light:chart-line',
    title: 'Marketing & Communication',
    description: 'Marketing strategy, growth campaigns, content design, and public relations.',
    roles: ['Content Strategist', 'Growth Marketing Specialist', 'Media & PR Specialist'],
  },
  {
    icon: 'solar:camera-outline',
    title: 'Media Production',
    description: 'High-quality visual content supporting multi-channel brand storytelling.',
    roles: ['Photographer', 'Cinematographer', 'Video Editor'],
  },
  {
    icon: 'majesticons:user-line',
    title: 'Brand Talent & Models',
    description: 'Product showcasing, commercial campaigns, video ad promotions, and runway.',
    roles: ['Commercial Models', 'Creative Directors', 'Stylists'],
  },
  {
    icon: 'boxicons:bar-chart-filled',
    title: 'Business Intelligence',
    description: 'Analyzing data signals to inform product strategy and market expansion.',
    roles: ['Business Analyst', 'Data Analyst', 'Growth Strategist'],
  },
];
</script>

<template>
  <section class="bg-white text-gray-900 py-20 lg:py-32 border-b border-gray-100">
    <div class="mx-auto w-5/6 max-w-7xl space-y-16">
      <div v-reveal="'fade-up'" class="text-center max-w-3xl mx-auto space-y-4">
        <span class="text-xs uppercase tracking-widest text-[#04308F] font-semibold bg-[#04308F]/10 px-4 py-1.5 rounded-full inline-block">
          Talent Categories
        </span>
        <h2 class="text-3xl font-serif font-normal tracking-tight sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
          Explore Our Pool of Vetted Creative Talent
        </h2>
        <p class="text-base text-gray-500 leading-relaxed font-normal">
          From brand designers to growth marketers, Deagensie matches businesses with elite African creative professionals.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(cat, cIndex) in talentCategories"
          :key="cat.title"
          v-reveal="{ animation: 'fade-up', delay: cIndex * 100 }"
          class="p-8 rounded-3xl bg-gray-50/60 border border-gray-100 shadow-xs transition-all duration-300 hover:bg-white hover:shadow-xl hover:border-[#04308F]/20 hover:-translate-y-1 flex flex-col justify-between group"
        >
          <div class="space-y-4">
            <div class="size-12 rounded-2xl bg-[#04308F]/10 text-[#04308F] flex items-center justify-center text-2xl group-hover:bg-[#04308F] group-hover:text-white transition-all duration-300">
              <Icon :icon="cat.icon" />
            </div>
            <h3 class="text-xl font-serif font-normal text-gray-900">{{ cat.title }}</h3>
            <p class="text-xs text-gray-500 leading-relaxed font-normal">{{ cat.description }}</p>

            <div class="pt-2">
              <ul class="space-y-2 text-xs font-semibold text-gray-700">
                <li v-for="role in cat.roles" :key="role" class="flex items-center gap-2">
                  <Icon icon="lucide:check" class="text-[#05DED5] text-sm shrink-0" />
                  <span>{{ role }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="pt-6 border-t border-gray-100 mt-6">
            <NuxtLink
              to="/register"
              class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#04308F] group-hover:text-[#05DED5] transition-colors"
            >
              Hire from this pool <Icon icon="lucide:arrow-right" class="text-sm" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
</style>
