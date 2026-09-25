<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <section class="bg-gray-50/50 text-gray-900 py-20 lg:py-32 border-b border-gray-100">
    <div class="mx-auto w-5/6 max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <div v-reveal="'fade-right'" class="space-y-6">
        <span class="text-xs uppercase tracking-widest text-[#04308F] font-semibold bg-[#04308F]/10 px-4 py-1.5 rounded-full inline-block">
          Creative Community
        </span>
        <h2 class="text-3xl font-serif font-normal tracking-tight sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
          Join Our Community — Where Emerging Leaders Are Built
        </h2>
        <p class="text-base text-gray-500 leading-relaxed font-normal">
          Deagensie is more than a platform — it&apos;s a movement. Become part of a growing network of young creative leaders and entrepreneurs dedicated to innovation and global impact.
        </p>

        <ul class="space-y-3 text-sm text-gray-700 font-medium pt-2">
          <li class="flex items-center gap-3">
            <Icon icon="hugeicons:tick-02" class="text-[#05DED5] text-xl shrink-0 font-bold" />
            <span>Meaningful global connections &amp; peer mentorship</span>
          </li>
          <li class="flex items-center gap-3">
            <Icon icon="hugeicons:tick-02" class="text-[#05DED5] text-xl shrink-0 font-bold" />
            <span>Exclusive industry insights &amp; masterclasses</span>
          </li>
          <li class="flex items-center gap-3">
            <Icon icon="hugeicons:tick-02" class="text-[#05DED5] text-xl shrink-0 font-bold" />
            <span>Growth-focused conversations &amp; collaborative gigs</span>
          </li>
          <li class="flex items-center gap-3">
            <Icon icon="hugeicons:tick-02" class="text-[#05DED5] text-xl shrink-0 font-bold" />
            <span>Structured leadership development pathways</span>
          </li>
        </ul>

        <div class="pt-4">
          <NuxtLink
            to="/register"
            class="inline-flex items-center gap-2 rounded-full bg-[#04308F] px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-[#05DED5] hover:text-gray-900 shadow-md shadow-[#04308F]/20"
          >
            Join Creative Community <Icon icon="lucide:arrow-right" class="text-base" />
          </NuxtLink>
        </div>
      </div>

      <div v-reveal="'scale-in'" class="relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-100 shadow-2xl shadow-gray-200/60 aspect-16/10">
        <NuxtImg
          src="/images/pages/creatives/hero-2.png"
          alt="Deagensie Creative Community"
          class="size-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
</style>
