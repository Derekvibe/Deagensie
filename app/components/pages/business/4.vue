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
          Internal Team Upskilling
        </span>
        <h2
          class="font-serif text-3xl leading-tight font-normal tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
        >
          Build a forward-thinking team that drives magic
        </h2>
        <p class="text-base leading-relaxed font-normal text-gray-500">
          Your people are your greatest asset. We equip your creative teams with the mindset, tools,
          and frameworks to innovate confidently and execute brilliantly.
        </p>

        <ul class="space-y-3 pt-2 text-sm font-medium text-gray-700">
          <li class="flex items-center gap-3">
            <Icon icon="hugeicons:tick-02" class="shrink-0 text-xl font-bold text-[#05DED5]" />
            <span>Strategic thinking &amp; creative excellence frameworks</span>
          </li>
          <li class="flex items-center gap-3">
            <Icon icon="hugeicons:tick-02" class="shrink-0 text-xl font-bold text-[#05DED5]" />
            <span>Tailored training programs for your industry</span>
          </li>
          <li class="flex items-center gap-3">
            <Icon icon="hugeicons:tick-02" class="shrink-0 text-xl font-bold text-[#05DED5]" />
            <span>Build an internal powerhouse for sustained growth</span>
          </li>
          <li class="flex items-center gap-3">
            <Icon icon="hugeicons:tick-02" class="shrink-0 text-xl font-bold text-[#05DED5]" />
            <span>Ongoing mentorship and skills development</span>
          </li>
        </ul>

        <div class="pt-4">
          <NuxtLink
            to="/contact"
            class="inline-flex items-center gap-2 rounded-full bg-[#04308F] px-8 py-4 text-base font-semibold text-white shadow-md shadow-[#04308F]/20 transition-all duration-300 hover:bg-[#05DED5] hover:text-gray-900"
          >
            Train Your Team <Icon icon="lucide:arrow-right" class="text-base" />
          </NuxtLink>
        </div>
      </div>

      <div
        v-reveal="'scale-in'"
        class="relative aspect-16/10 overflow-hidden rounded-3xl border border-gray-100 bg-gray-100 shadow-2xl shadow-gray-200/60"
      >
        <NuxtImg
          src="/images/pages/business/hero-3.png"
          alt="Build a Forward Thinking Team"
          class="size-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="css"></style>
