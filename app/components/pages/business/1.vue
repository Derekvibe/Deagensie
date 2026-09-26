<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <section class="border-b border-gray-100 bg-gray-50/50 py-20 text-gray-900 lg:py-32">
    <div class="mx-auto w-5/6 max-w-7xl space-y-16">
      <div v-reveal="'fade-up'" class="mx-auto max-w-3xl space-y-4 text-center">
        <h2
          class="font-serif text-3xl leading-tight font-normal tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
        >
          We don&apos;t just support businesses <br class="hidden lg:inline" />— we architect
          scalable growth
        </h2>
        <p class="text-base leading-relaxed font-normal text-gray-500 lg:text-lg">
          In a world where brands compete for attention every second, growth belongs to the bold.
          Deagensie is where AI strategy meets creative execution to build magnetic brands.
        </p>
      </div>

      <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div
          v-reveal="'scale-in'"
          class="relative aspect-16/10 overflow-hidden rounded-3xl border border-gray-100 bg-gray-100 shadow-2xl shadow-gray-200/60"
        >
          <NuxtImg
            src="/images/pages/business/hero-2.png"
            alt="Talent as a Service"
            class="size-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>

        <div v-reveal="'fade-left'" class="space-y-6">
          <span
            class="inline-block rounded-full bg-[#04308F]/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#04308F] uppercase"
          >
            Talent as a Service (TaaS)
          </span>
          <h3
            class="font-serif text-2xl leading-tight font-normal text-gray-900 sm:text-3xl lg:text-4xl"
          >
            Hire Africa&apos;s top creative talent. On demand.
          </h3>
          <p class="text-sm leading-relaxed font-normal text-gray-500 sm:text-base">
            From designers and strategists to digital innovators, we connect you with exceptional
            talent, seamlessly and efficiently. Access brilliance without borders.
          </p>

          <ul class="space-y-3 pt-2 text-sm font-medium text-gray-700">
            <li class="flex items-center gap-3">
              <Icon icon="hugeicons:tick-02" class="shrink-0 text-xl font-bold text-[#05DED5]" />
              <span>Pre-vetted, high-performing creative professionals</span>
            </li>
            <li class="flex items-center gap-3">
              <Icon icon="hugeicons:tick-02" class="shrink-0 text-xl font-bold text-[#05DED5]" />
              <span>Flexible project-based or retainer engagement</span>
            </li>
            <li class="flex items-center gap-3">
              <Icon icon="hugeicons:tick-02" class="shrink-0 text-xl font-bold text-[#05DED5]" />
              <span>AI-powered matching for faster placement</span>
            </li>
            <li class="flex items-center gap-3">
              <Icon icon="hugeicons:tick-02" class="shrink-0 text-xl font-bold text-[#05DED5]" />
              <span>Save up to $10,000 in traditional hiring overhead</span>
            </li>
          </ul>

          <div class="pt-4">
            <NuxtLink
              to="/contact"
              class="inline-flex items-center gap-2 rounded-full bg-[#04308F] px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#04308F]/20 transition-all duration-300 hover:bg-[#05DED5] hover:text-gray-900"
            >
              Get Started <Icon icon="lucide:arrow-right" class="text-base" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css"></style>
