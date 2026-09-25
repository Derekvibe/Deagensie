<script setup lang="ts">
import { Icon } from '@iconify/vue';

const latestArticles = [
  {
    category: 'Editorial Insights',
    title: 'Why Creative Strategy in 2026 Demands Human & Machine Synergy',
    description: 'Generative tools accelerate ideation, but human empathy determines what resonates. Explore the 80/20 rule of modern brand storytelling.',
    image: '/images/pages/about/hero-2.png',
    readTime: '5 min read',
    date: 'September 2026',
  },
  {
    category: 'Talent & Ecosystem',
    title: 'Building Borderless Design Teams: Lessons from 100+ Distributed Projects',
    description: 'Best practices for async communication, cultural synergy, and continuous handoffs across time zones.',
    image: '/images/pages/(home)/hero.webp',
    readTime: '6 min read',
    date: 'August 2026',
  },
  {
    category: 'AI Growth Playbook',
    title: 'Predictive Audience Signaling: Outperforming Traditional Ad Campaigns',
    description: 'How real-time signal analysis outperforms static ad creative by 340% in high-growth consumer markets.',
    image: '/images/pages/why/hero.webp',
    readTime: '8 min read',
    date: 'July 2026',
  },
];
</script>

<template>
  <section class="bg-gray-50/50 text-gray-900 py-20 lg:py-32 border-t border-b border-gray-100">
    <div class="mx-auto w-5/6 max-w-7xl space-y-16">
      <div v-reveal="'fade-up'" class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div class="space-y-4 max-w-2xl">
          <span class="text-xs uppercase tracking-widest text-[#04308F] font-semibold bg-[#04308F]/10 px-4 py-1.5 rounded-full inline-block">
            From The Deagensie Desk
          </span>
          <h2 class="text-3xl font-serif font-normal tracking-tight sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
            Latest Insights, Playbooks &amp; Editorial Stories
          </h2>
        </div>
        <NuxtLink
          to="/resource"
          class="inline-flex items-center gap-2 rounded-full bg-[#04308F] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#05DED5] hover:text-gray-900 shadow-md shadow-[#04308F]/20 shrink-0"
        >
          Explore All Articles <Icon icon="lucide:arrow-right" class="text-base" />
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <NuxtLink
          v-for="(art, aIndex) in latestArticles"
          :key="art.title"
          to="/resource"
          v-reveal="{ animation: 'fade-up', delay: aIndex * 100 }"
          class="group flex flex-col justify-between rounded-3xl border border-gray-100 bg-white overflow-hidden shadow-xs transition-all duration-300 hover:shadow-xl hover:border-[#04308F]/20 hover:-translate-y-1"
        >
          <div>
            <div class="relative aspect-16/10 overflow-hidden bg-gray-100">
              <NuxtImg
                :src="art.image"
                :alt="art.title"
                class="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span class="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold text-[#04308F]">
                {{ art.category }}
              </span>
            </div>

            <div class="p-6 space-y-3">
              <div class="flex items-center justify-between text-xs text-gray-400 font-medium">
                <span>{{ art.date }}</span>
                <span>{{ art.readTime }}</span>
              </div>
              <h3 class="text-lg font-serif font-normal text-gray-900 group-hover:text-[#04308F] transition-colors leading-snug">
                {{ art.title }}
              </h3>
              <p class="text-xs text-gray-500 leading-relaxed font-normal">
                {{ art.description }}
              </p>
            </div>
          </div>

          <div class="px-6 pb-6 pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
            <span class="text-xs font-semibold text-[#04308F] group-hover:text-[#05DED5] transition-colors inline-flex items-center gap-1.5">
              Read Story <Icon icon="lucide:arrow-right" class="text-sm" />
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
</style>
