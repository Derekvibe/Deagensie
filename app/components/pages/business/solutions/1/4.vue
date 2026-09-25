<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <section class="mx-auto w-5/6 max-w-7xl">
    <div
      class="flex flex-col gap-13 lg:flex-row lg:items-center lg:gap-10 lg:rounded-[calc(var(--radius)+2px)] lg:border lg:p-8"
    >
      <aside
        class="rounded-[calc(var(--radius)+2px)] bg-[#F6F6F6] px-3 py-5 lg:flex-1 lg:px-6 lg:py-5"
      >
        <span
          class="inline-block rounded-full bg-[#E6EAF4] px-4 py-1.5 text-sm leading-relaxed text-[#04308F] uppercase"
        >
          Brand Packages
        </span>

        <h4 class="mt-2 text-2xl leading-normal font-semibold xl:text-3xl xl:leading-snug">
          Flexible access to world-class creative talent
        </h4>

        <div class="bg-background mt-4 rounded-[calc(var(--radius)+2px)] p-4">
          <p class="text-sm leading-relaxed xl:text-xl xl:leading-normal">
            Choose the commitment level that works for your business. Scale up or down at any time.
          </p>

          <dl class="mt-6 grid grid-cols-2 gap-x-2 gap-y-6 xl:gap-x-4.5">
            <div
              v-for="{ value, label } in [
                { value: '$50', label: 'Monthly plan' },
                { value: '$135', label: 'Quarterly plan' },
                { value: '$540', label: 'Annual plan' },
                { value: '30%', label: 'faster hire rate' },
              ]"
              :key="label"
              class="rounded-[calc(var(--radius)+2px)] border border-[#D5D5D5] bg-[#FCFCFE] px-4.5 py-6"
            >
              <dt class="xl:leading-start text-3xl leading-snug font-semibold xl:text-4xl">
                {{ value }}
              </dt>
              <dd class="mt-1 text-xs leading-normal xl:text-sm xl:leading-relaxed">{{ label }}</dd>
            </div>
          </dl>
        </div>
      </aside>

      <div class="lg:w-615/1220 lg:shrink-0">
        <span
          class="rounded-full bg-[#E6EAF4] px-4 py-1.5 text-sm leading-relaxed text-[#04308F] uppercase"
        >
          05 — Talent-As-A-Service
        </span>

        <h3 class="mt-2 text-3xl leading-snug font-semibold">
          Flexible, high-impact creative support on demand.
        </h3>

        <p class="mt-4 text-xl leading-normal">
          We empower aspiring and established creatives with the skills needed to thrive in the Our
          platform ensures African creatives can find fulfilling careers while staying connected to
          their roots. For startup founders, our platform provides access to in-demand creative
          talents needed to thrive — all within your resource constraints.
        </p>

        <ul class="mt-4 space-y-4">
          <li
            v-for="point in [
              'Access to 6,000+ vetted African creatives',
              'Monthly, quarterly & annual subscription plans',
              'Escrow payment system & project monitoring',
              'AI-powered matching for speed & precision',
              'Designers, developers, strategists, media & more',
            ]"
            :key="point"
            class="flex items-center gap-2.5 p-2.5 text-sm leading-relaxed xl:text-lg xl:leading-tight"
          >
            <Icon icon="hugeicons:tick-02" class="text-2xl text-[#34C759]" />
            {{ point }}
          </li>
        </ul>

        <NuxtLink
          to="/"
          class="text-foreground mt-4 inline-block rounded-full bg-[#05DED5] px-18 py-3.5 font-medium"
        >
          Get Started
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
