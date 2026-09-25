<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <section class="mx-auto w-5/6 max-w-7xl">
    <div
      class="flex flex-col gap-13 lg:flex-row lg:items-center lg:gap-10 lg:rounded-[calc(var(--radius)+2px)] lg:border lg:p-8"
    >
      <div class="w-1/2">
        <span
          class="rounded-full bg-[#E6EAF4] px-4 py-1.5 text-sm leading-relaxed text-[#04308F] uppercase"
        >
          01 — Strategy
        </span>

        <h3 class="mt-2 text-3xl leading-snug font-semibold">
          Clear direction. Smart decisions. Sustainable advantage.
        </h3>

        <p class="mt-4 text-xl leading-normal">
          We combine research, creativity, and strategic frameworks to translate your vision into
          actionable plans. Our process ensures your brand and business strategy are not just
          aspirational — but practical, measurable, and capable of driving long-term success.
        </p>

        <ul class="mt-4 space-y-4">
          <li
            v-for="point in [
              'Market research & competitive analysis',
              'Brand positioning & differentiation mapping',
              'Go-to-market strategy development',
              'Growth roadmap & KPI framework design',
              'Investor pitch strategy & narrative development',
            ]"
            :key="point"
            class="flex items-center gap-2.5 p-2.5 text-sm leading-relaxed xl:text-lg xl:leading-tight"
          >
            <Icon icon="hugeicons:tick-02" class="text-2xl text-[#34C759]" />
            {{ point }}
          </li>
        </ul>
      </div>

      <div class="flex w-1/2 flex-col">
        <span
          class="mb-5 inline-block w-fit rounded-full bg-[#E6EAF4] px-4 py-1.5 text-sm leading-relaxed text-[#04308F] uppercase"
        >
          Strategy Output
        </span>

        <aside
          class="text-background rounded-[calc(var(--radius)+2px)] bg-[#02143C] px-3 py-5 lg:flex-1 lg:px-6 lg:py-5"
        >
          <h4 class="mt-2 text-2xl leading-normal font-semibold xl:text-3xl xl:leading-snug">
            What a strategy engagement delivers
          </h4>

          <p class="mt-4 text-sm leading-relaxed xl:text-xl xl:leading-normal">
            A complete strategic blueprint built specifically for your market, goals, and growth
            stage.
          </p>

          <dl class="mt-6 grid grid-cols-2 gap-x-2 gap-y-6 xl:gap-x-4.5">
            <div
              v-for="{ value, label } in [
                { value: '2-3', label: 'Week turnaround' },
                { value: '100%', label: 'Custom to your brand' },
                { value: '5+', label: 'Senior strategists' },
                { value: 'AI', label: 'Powered insights' },
              ]"
              :key="label"
              class="rounded-[calc(var(--radius)+2px)] border border-[#04308F] bg-[#032266] px-4.5 py-6"
            >
              <dt class="xl:leading-start text-3xl leading-snug font-semibold xl:text-4xl">
                {{ value }}
              </dt>
              <dd class="mt-1 text-xs leading-normal xl:text-sm xl:leading-relaxed">{{ label }}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>

    <NuxtLink
      to="/"
      class="text-foreground mt-4 inline-block rounded-full bg-[#05DED5] px-18 py-3.5 font-medium"
    >
      Get Started
    </NuxtLink>
  </section>
</template>
