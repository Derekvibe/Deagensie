<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <section class="border-b border-gray-100 bg-gray-50/50 py-20 text-gray-900 lg:py-32">
    <div
      class="mx-auto grid w-5/6 max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16"
    >
      <div v-reveal="'fade-right'" class="space-y-6">
        <span
          class="inline-block rounded-full bg-[#04308F]/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#04308F] uppercase"
        >
          Creative Community
        </span>
        <h2
          class="font-serif text-3xl leading-tight font-normal tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
        >
          Join Our Community — Where Emerging Leaders Are Built
        </h2>
        <p class="text-base leading-relaxed font-normal text-gray-500">
          Deagensie is more than a platform — it&apos;s a movement. Become part of a growing network
          of young creative leaders and entrepreneurs dedicated to innovation and global impact.
        </p>

        <ul class="space-y-3 pt-2 text-sm font-medium text-gray-700">
          <li class="flex items-center gap-3">
            <Icon icon="hugeicons:tick-02" class="shrink-0 text-xl font-bold text-[#05DED5]" />
            <span>Meaningful global connections &amp; peer mentorship</span>
          </li>
          <li class="flex items-center gap-3">
            <Icon icon="hugeicons:tick-02" class="shrink-0 text-xl font-bold text-[#05DED5]" />
            <span>Exclusive industry insights &amp; masterclasses</span>
          </li>
          <li class="flex items-center gap-3">
            <Icon icon="hugeicons:tick-02" class="shrink-0 text-xl font-bold text-[#05DED5]" />
            <span>Growth-focused conversations &amp; collaborative gigs</span>
          </li>
          <li class="flex items-center gap-3">
            <Icon icon="hugeicons:tick-02" class="shrink-0 text-xl font-bold text-[#05DED5]" />
            <span>Structured leadership development pathways</span>
          </li>
        </ul>

        <div class="pt-4">
          <NuxtLink
            to="/register"
            class="inline-flex items-center gap-2 rounded-full bg-[#04308F] px-8 py-4 text-base font-semibold text-white shadow-md shadow-[#04308F]/20 transition-all duration-300 hover:bg-[#05DED5] hover:text-gray-900"
          >
            Join Creative Community <Icon icon="lucide:arrow-right" class="text-base" />
          </NuxtLink>
        </div>
      </div>

      <div
        v-reveal="'scale-in'"
        class="relative aspect-16/10 overflow-hidden rounded-3xl border border-gray-100 bg-gray-100 shadow-2xl shadow-gray-200/60"
      >
        <NuxtImg
          src="/images/pages/creatives/hero-2.png"
          alt="Deagensie Creative Community"
          class="size-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="css"></style>
