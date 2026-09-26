<script setup lang="ts">
import { Icon } from '@iconify/vue';

const latestArticles = [
  {
    category: 'Editorial Insights',
    title: 'Why Creative Strategy in 2026 Demands Human & Machine Synergy',
    description:
      'Generative tools accelerate ideation, but human empathy determines what resonates. Explore the 80/20 rule of modern brand storytelling.',
    image: '/images/pages/about/hero-2.png',
    readTime: '5 min read',
    date: 'September 2026',
  },
  {
    category: 'Talent & Ecosystem',
    title: 'Building Borderless Design Teams: Lessons from 100+ Distributed Projects',
    description:
      'Best practices for async communication, cultural synergy, and continuous handoffs across time zones.',
    image: '/images/pages/(home)/hero.webp',
    readTime: '6 min read',
    date: 'August 2026',
  },
  {
    category: 'AI Growth Playbook',
    title: 'Predictive Audience Signaling: Outperforming Traditional Ad Campaigns',
    description:
      'How real-time signal analysis outperforms static ad creative by 340% in high-growth consumer markets.',
    image: '/images/pages/why/hero.webp',
    readTime: '8 min read',
    date: 'July 2026',
  },
];
</script>

<template>
  <section class="border-t border-b border-gray-100 bg-gray-50/50 py-20 text-gray-900 lg:py-32">
    <div class="mx-auto w-5/6 max-w-7xl space-y-16">
      <div
        v-reveal="'fade-up'"
        class="flex flex-col justify-between gap-6 md:flex-row md:items-end"
      >
        <div class="max-w-2xl space-y-4">
          <span
            class="inline-block rounded-full bg-[#04308F]/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#04308F] uppercase"
          >
            From The Deagensie Desk
          </span>
          <h2
            class="font-serif text-3xl leading-tight font-normal tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
          >
            Latest Insights, Playbooks &amp; Editorial Stories
          </h2>
        </div>
        <NuxtLink
          to="/resource"
          class="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#04308F] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#04308F]/20 transition-all duration-300 hover:bg-[#05DED5] hover:text-gray-900"
        >
          Explore All Articles <Icon icon="lucide:arrow-right" class="text-base" />
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <NuxtLink
          v-for="(art, aIndex) in latestArticles"
          :key="art.title"
          v-reveal="{ animation: 'fade-up', delay: aIndex * 100 }"
          to="/resource"
          class="group flex flex-col justify-between overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#04308F]/20 hover:shadow-xl"
        >
          <div>
            <div class="relative aspect-16/10 overflow-hidden bg-gray-100">
              <NuxtImg
                :src="art.image"
                :alt="art.title"
                class="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span
                class="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#04308F] backdrop-blur-xs"
              >
                {{ art.category }}
              </span>
            </div>

            <div class="space-y-3 p-6">
              <div class="flex items-center justify-between text-xs font-medium text-gray-400">
                <span>{{ art.date }}</span>
                <span>{{ art.readTime }}</span>
              </div>
              <h3
                class="font-serif text-lg leading-snug font-normal text-gray-900 transition-colors group-hover:text-[#04308F]"
              >
                {{ art.title }}
              </h3>
              <p class="text-xs leading-relaxed font-normal text-gray-500">
                {{ art.description }}
              </p>
            </div>
          </div>

          <div
            class="mt-auto flex items-center justify-between border-t border-gray-100 px-6 pt-4 pb-6"
          >
            <span
              class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#04308F] transition-colors group-hover:text-[#05DED5]"
            >
              Read Story <Icon icon="lucide:arrow-right" class="text-sm" />
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css"></style>
