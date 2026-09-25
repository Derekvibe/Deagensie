<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <section class="bg-gray-50/50 text-gray-900 py-20 lg:py-32 border-b border-gray-100">
    <div class="mx-auto w-5/6 max-w-7xl space-y-16">
      <div v-reveal="'fade-up'" class="text-center max-w-3xl mx-auto space-y-4">
        <h2 class="text-3xl font-serif font-normal tracking-tight sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
          Most agencies create visuals and run campaigns. <br class="hidden lg:inline" />Deagensie goes deeper.
        </h2>
        <p class="text-base text-gray-500 lg:text-lg leading-relaxed font-normal">
          We fuse AI-driven intelligence, African creative excellence, and founder-focused growth systems to build brands that don&apos;t just look good — they evolve, adapt, and scale.
        </p>
      </div>

      <!-- Modern Side-by-Side Comparison Card -->
      <div v-reveal="'scale-in'" class="rounded-3xl border border-gray-100 bg-white p-8 lg:p-12 shadow-md space-y-10">
        <div class="max-w-2xl space-y-3">
          <span class="text-xs font-semibold uppercase tracking-widest text-[#04308F]">Core Differentiator</span>
          <h3 class="text-2xl font-serif font-normal text-gray-900">
            AI-Driven Branding & Marketing Intelligence
          </h3>
          <p class="text-sm text-gray-500 leading-relaxed font-normal">
            In today&apos;s fast-moving digital economy, intuition alone is not enough. We embed Artificial Intelligence at the core of our branding and marketing systems.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Traditional Agencies -->
          <div class="rounded-2xl bg-gray-50 p-6 space-y-4 border border-gray-100">
            <h4 class="text-lg font-serif font-normal text-gray-700">Most Agencies</h4>
            <ul class="space-y-3 text-sm text-gray-600 font-normal">
              <li class="flex items-center gap-3">
                <Icon icon="hugeicons:cancel-circle" class="text-red-500 text-lg shrink-0" />
                <span>Create basic visuals</span>
              </li>
              <li class="flex items-center gap-3">
                <Icon icon="hugeicons:cancel-circle" class="text-red-500 text-lg shrink-0" />
                <span>Run unoptimized ad campaigns</span>
              </li>
              <li class="flex items-center gap-3">
                <Icon icon="hugeicons:cancel-circle" class="text-red-500 text-lg shrink-0" />
                <span>Measure surface-level metrics</span>
              </li>
              <li class="flex items-center gap-3">
                <Icon icon="hugeicons:cancel-circle" class="text-red-500 text-lg shrink-0" />
                <span>Focus solely on short-term wins</span>
              </li>
            </ul>
          </div>

          <!-- Deagensie -->
          <div class="rounded-2xl bg-[#04308F]/5 p-6 space-y-4 border border-[#04308F]/20">
            <h4 class="text-lg font-serif font-normal text-[#04308F]">Deagensie</h4>
            <ul class="space-y-3 text-sm text-gray-800 font-medium">
              <li class="flex items-center gap-3">
                <Icon icon="hugeicons:tick-02" class="text-[#05DED5] text-lg shrink-0 font-bold" />
                <span>Analyzes market signals in real time</span>
              </li>
              <li class="flex items-center gap-3">
                <Icon icon="hugeicons:tick-02" class="text-[#05DED5] text-lg shrink-0 font-bold" />
                <span>Predicts consumer behavior shifts</span>
              </li>
              <li class="flex items-center gap-3">
                <Icon icon="hugeicons:tick-02" class="text-[#05DED5] text-lg shrink-0 font-bold" />
                <span>Identifies untapped growth opportunities</span>
              </li>
              <li class="flex items-center gap-3">
                <Icon icon="hugeicons:tick-02" class="text-[#05DED5] text-lg shrink-0 font-bold" />
                <span>Continuously optimizes strategy through AI insights</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
</style>
