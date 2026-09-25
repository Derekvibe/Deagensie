<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <section class="mx-auto w-5/6 max-w-7xl">
    <div
      class="flex flex-col gap-13 lg:flex-row lg:items-stretch lg:gap-10 lg:rounded-[calc(var(--radius)+2px)] lg:border lg:p-8"
    >
      <div class="">
        <span
          class="mb-5 inline-block rounded-full bg-[#E6EAF4] px-4 py-1.5 text-sm leading-relaxed text-[#04308F] uppercase"
        >
          Website Tiers
        </span>
        <aside
          class="text-background flex h-[70%] flex-col rounded-[calc(var(--radius)+2px)] bg-[#02143C] px-3 py-5 lg:px-6 lg:py-5"
        >
          <h4 class="mt-2 text-2xl leading-normal font-semibold xl:text-3xl xl:leading-snug">
            From a landing page to a full-blown e-commerce platform
          </h4>

          <p class="mt-4 text-sm leading-relaxed xl:text-xl xl:leading-normal">
            Every website we build is fully responsive, SEO-optimized, and engineered for conversion
            from day one.
          </p>

          <ul class="mt-6 flex flex-wrap gap-4">
            <li
              v-for="(value, i) in [
                'Up to 5 pages',
                'Up to 10 pages',
                'Up to 20 pages + E-Commerce ★',
                'Google Analytics setup',
                'Blog integration',
              ]"
              :key="value"
              :class="[
                'rounded-full border bg-[#032266] px-6 py-3 text-sm leading-relaxed',
                i === 2 ? 'border-[#5DF34F] text-[#07DE20]' : 'border-[#04308F]',
              ]"
            >
              {{ value }}
            </li>
          </ul>
        </aside>
      </div>

      <div class="lg:flex lg:w-615/1220 lg:shrink-0 lg:flex-col">
        <span
          class="w-fit rounded-full bg-[#E6EAF4] px-4 py-1.5 text-sm leading-relaxed text-[#04308F] uppercase"
        >
          04 — Digital Products
        </span>

        <h3 class="mt-2 text-3xl leading-snug font-semibold">
          Intelligent digital experiences built for performance.
        </h3>

        <p class="mt-4 text-xl leading-normal">
          We deploy well-crafted and strategic digital design to help our client businesses stand
          out above the noise. As a reliable web development agency, we research, design, develop,
          and deploy client-based, result-oriented web solutions for tangible growth.
        </p>

        <ul class="mt-4 flex-1 space-y-4">
          <li
            v-for="point in [
              'Conversion-optimized website design & development',
              'E-commerce platforms & payment integration',
              'Mobile-first responsive design',
              'SEO optimization (on-page, technical, link building)',
              'UI/UX design & user testing',
            ]"
            :key="point"
            class="flex items-center gap-2.5 p-2.5 text-sm leading-relaxed xl:text-lg xl:leading-tight"
          >
            <Icon icon="hugeicons:tick-02" class="text-2xl text-[#34C759]" />
            {{ point }}
          </li>
        </ul>

        <div class="mt-20 flex justify-end">
          <NuxtLink
            to="/"
            class="text-foreground mt-4 flex w-fit justify-end rounded-full bg-[#05DED5] px-18 py-3.5 text-center font-medium"
          >
            Get Started
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
