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
          Most agencies create visuals and run campaigns. <br class="hidden lg:inline" />Deagensie
          goes deeper.
        </h2>
        <p class="text-base leading-relaxed font-normal text-gray-500 lg:text-lg">
          We fuse AI-driven intelligence, African creative excellence, and founder-focused growth
          systems to build brands that don&apos;t just look good — they evolve, adapt, and scale.
        </p>
      </div>

      <!-- Modern Side-by-Side Comparison Card -->
      <div
        v-reveal="'scale-in'"
        class="space-y-10 rounded-3xl border border-gray-100 bg-white p-8 shadow-md lg:p-12"
      >
        <div class="max-w-2xl space-y-3">
          <span class="text-xs font-semibold tracking-widest text-[#04308F] uppercase"
            >Core Differentiator</span
          >
          <h3 class="font-serif text-2xl font-normal text-gray-900">
            AI-Driven Branding & Marketing Intelligence
          </h3>
          <p class="text-sm leading-relaxed font-normal text-gray-500">
            In today&apos;s fast-moving digital economy, intuition alone is not enough. We embed
            Artificial Intelligence at the core of our branding and marketing systems.
          </p>
        </div>

        <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
          <!-- Traditional Agencies -->
          <div class="space-y-4 rounded-2xl border border-gray-100 bg-gray-50 p-6">
            <h4 class="font-serif text-lg font-normal text-gray-700">Most Agencies</h4>
            <ul class="space-y-3 text-sm font-normal text-gray-600">
              <li class="flex items-center gap-3">
                <Icon icon="hugeicons:cancel-circle" class="shrink-0 text-lg text-red-500" />
                <span>Create basic visuals</span>
              </li>
              <li class="flex items-center gap-3">
                <Icon icon="hugeicons:cancel-circle" class="shrink-0 text-lg text-red-500" />
                <span>Run unoptimized ad campaigns</span>
              </li>
              <li class="flex items-center gap-3">
                <Icon icon="hugeicons:cancel-circle" class="shrink-0 text-lg text-red-500" />
                <span>Measure surface-level metrics</span>
              </li>
              <li class="flex items-center gap-3">
                <Icon icon="hugeicons:cancel-circle" class="shrink-0 text-lg text-red-500" />
                <span>Focus solely on short-term wins</span>
              </li>
            </ul>
          </div>

          <!-- Deagensie -->
          <div class="space-y-4 rounded-2xl border border-[#04308F]/20 bg-[#04308F]/5 p-6">
            <h4 class="font-serif text-lg font-normal text-[#04308F]">Deagensie</h4>
            <ul class="space-y-3 text-sm font-medium text-gray-800">
              <li class="flex items-center gap-3">
                <Icon icon="hugeicons:tick-02" class="shrink-0 text-lg font-bold text-[#05DED5]" />
                <span>Analyzes market signals in real time</span>
              </li>
              <li class="flex items-center gap-3">
                <Icon icon="hugeicons:tick-02" class="shrink-0 text-lg font-bold text-[#05DED5]" />
                <span>Predicts consumer behavior shifts</span>
              </li>
              <li class="flex items-center gap-3">
                <Icon icon="hugeicons:tick-02" class="shrink-0 text-lg font-bold text-[#05DED5]" />
                <span>Identifies untapped growth opportunities</span>
              </li>
              <li class="flex items-center gap-3">
                <Icon icon="hugeicons:tick-02" class="shrink-0 text-lg font-bold text-[#05DED5]" />
                <span>Continuously optimizes strategy through AI insights</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css"></style>
