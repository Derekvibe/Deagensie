<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <section class="bg-gray-50/50 text-gray-900 py-20 lg:py-32 border-b border-gray-100">
    <div class="mx-auto w-5/6 max-w-7xl space-y-16">
      <div v-reveal="'fade-up'" class="text-center max-w-3xl mx-auto space-y-4">
        <h2 class="text-3xl font-serif font-normal tracking-tight sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
          We don&apos;t just support businesses <br class="hidden lg:inline" />— we architect scalable growth
        </h2>
        <p class="text-base text-gray-500 lg:text-lg leading-relaxed font-normal">
          In a world where brands compete for attention every second, growth belongs to the bold. Deagensie is where AI strategy meets creative execution to build magnetic brands.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div v-reveal="'scale-in'" class="relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-100 shadow-2xl shadow-gray-200/60 aspect-16/10">
          <NuxtImg
            src="/images/pages/business/hero-2.png"
            alt="Talent as a Service"
            class="size-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>

        <div v-reveal="'fade-left'" class="space-y-6">
          <span class="text-xs uppercase tracking-widest text-[#04308F] font-semibold bg-[#04308F]/10 px-4 py-1.5 rounded-full inline-block">
            Talent as a Service (TaaS)
          </span>
          <h3 class="text-2xl font-serif font-normal text-gray-900 sm:text-3xl lg:text-4xl leading-tight">
            Hire Africa&apos;s top creative talent. On demand.
          </h3>
          <p class="text-sm sm:text-base text-gray-500 leading-relaxed font-normal">
            From designers and strategists to digital innovators, we connect you with exceptional talent, seamlessly and efficiently. Access brilliance without borders.
          </p>

          <ul class="space-y-3 text-sm text-gray-700 font-medium pt-2">
            <li class="flex items-center gap-3">
              <Icon icon="hugeicons:tick-02" class="text-[#05DED5] text-xl shrink-0 font-bold" />
              <span>Pre-vetted, high-performing creative professionals</span>
            </li>
            <li class="flex items-center gap-3">
              <Icon icon="hugeicons:tick-02" class="text-[#05DED5] text-xl shrink-0 font-bold" />
              <span>Flexible project-based or retainer engagement</span>
            </li>
            <li class="flex items-center gap-3">
              <Icon icon="hugeicons:tick-02" class="text-[#05DED5] text-xl shrink-0 font-bold" />
              <span>AI-powered matching for faster placement</span>
            </li>
            <li class="flex items-center gap-3">
              <Icon icon="hugeicons:tick-02" class="text-[#05DED5] text-xl shrink-0 font-bold" />
              <span>Save up to $10,000 in traditional hiring overhead</span>
            </li>
          </ul>

          <div class="pt-4">
            <NuxtLink
              to="/contact"
              class="inline-flex items-center gap-2 rounded-full bg-[#04308F] px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#05DED5] hover:text-gray-900 shadow-md shadow-[#04308F]/20"
            >
              Get Started <Icon icon="lucide:arrow-right" class="text-base" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
</style>
