<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <section class="bg-gray-50/50 text-gray-900 py-20 lg:py-32 border-b border-gray-100">
    <div class="mx-auto w-5/6 max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <div v-reveal="'fade-right'" class="space-y-6">
        <span class="text-xs uppercase tracking-widest text-[#04308F] font-semibold bg-[#04308F]/10 px-4 py-1.5 rounded-full inline-block">
          Internal Team Upskilling
        </span>
        <h2 class="text-3xl font-serif font-normal tracking-tight sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
          Build a forward-thinking team that drives magic
        </h2>
        <p class="text-base text-gray-500 leading-relaxed font-normal">
          Your people are your greatest asset. We equip your creative teams with the mindset, tools, and frameworks to innovate confidently and execute brilliantly.
        </p>

        <ul class="space-y-3 text-sm text-gray-700 font-medium pt-2">
          <li class="flex items-center gap-3">
            <Icon icon="hugeicons:tick-02" class="text-[#05DED5] text-xl shrink-0 font-bold" />
            <span>Strategic thinking &amp; creative excellence frameworks</span>
          </li>
          <li class="flex items-center gap-3">
            <Icon icon="hugeicons:tick-02" class="text-[#05DED5] text-xl shrink-0 font-bold" />
            <span>Tailored training programs for your industry</span>
          </li>
          <li class="flex items-center gap-3">
            <Icon icon="hugeicons:tick-02" class="text-[#05DED5] text-xl shrink-0 font-bold" />
            <span>Build an internal powerhouse for sustained growth</span>
          </li>
          <li class="flex items-center gap-3">
            <Icon icon="hugeicons:tick-02" class="text-[#05DED5] text-xl shrink-0 font-bold" />
            <span>Ongoing mentorship and skills development</span>
          </li>
        </ul>

        <div class="pt-4">
          <NuxtLink
            to="/contact"
            class="inline-flex items-center gap-2 rounded-full bg-[#04308F] px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-[#05DED5] hover:text-gray-900 shadow-md shadow-[#04308F]/20"
          >
            Train Your Team <Icon icon="lucide:arrow-right" class="text-base" />
          </NuxtLink>
        </div>
      </div>

      <div v-reveal="'scale-in'" class="relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-100 shadow-2xl shadow-gray-200/60 aspect-16/10">
        <NuxtImg
          src="/images/pages/business/hero-3.png"
          alt="Build a Forward Thinking Team"
          class="size-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
</style>
