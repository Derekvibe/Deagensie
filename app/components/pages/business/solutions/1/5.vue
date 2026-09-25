<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <section class="mx-auto w-5/6 max-w-7xl">
    <div
      class="flex flex-col gap-13 lg:flex-row lg:items-center lg:gap-10 lg:rounded-[calc(var(--radius)+2px)] lg:border lg:p-8"
    >
      <div class="lg:w-615/1220 lg:shrink-0">
        <span
          class="rounded-full bg-[#E6EAF4] px-4 py-1.5 text-sm leading-relaxed text-[#04308F] uppercase"
        >
          06 — Build Teams
        </span>

        <h3 class="mt-2 text-3xl leading-snug font-semibold">
          Equip your teams with tools and frameworks to innovate.
        </h3>

        <p class="mt-4 text-xl leading-normal">
          We empower aspiring and established creatives with the skills needed to thrive in the
          modern creative economy. Through tailored training programs, we upskill individuals across
          disciplines like design, media, and content production.
        </p>

        <ul class="mt-4 space-y-4">
          <li
            v-for="point in [
              'Strategic thinking & creative leadership workshops',
              'Tailored training programs by industry',
              'Embedded creative talent integration',
              'Ongoing mentorship & skills development',
              'Build an internal creative powerhouse',
            ]"
            :key="point"
            class="flex items-center gap-2.5 p-2.5 text-sm leading-relaxed xl:text-lg xl:leading-tight"
          >
            <Icon icon="hugeicons:tick-02" class="text-2xl text-[#34C759]" />
            {{ point }}
          </li>
        </ul>
      </div>

      <div class="h-full flex-1 lg:w-470/1220 lg:shrink-0">
        <span
          class="mb-5 inline-block rounded-full bg-[#E6EAF4] px-4 py-1.5 text-sm leading-relaxed text-[#04308F] uppercase"
        >
          Team Outcomes
        </span>
        <aside
          class="text-background rounded-[calc(var(--radius)+2px)] bg-[#02143C] px-3 py-5 lg:flex-1 lg:px-6 lg:py-5"
        >
          <h4 class="mt-2 text-2xl leading-normal font-semibold xl:text-3xl xl:leading-snug">
            What your team gains from training
          </h4>

          <p class="mt-4 text-sm leading-relaxed xl:text-xl xl:leading-normal">
            Every engagement is customized to your team's current level and your business's growth
            stage.
          </p>

          <ul class="mt-6 flex flex-wrap gap-4">
            <li
              v-for="(value, i) in [
                'Strategic clarity',
                'Creative confidence',
                'Brand consistency',
                'Execution speed',
                'Innovation culture',
                'Cross-team collaboration',
              ]"
              :key="value"
              :class="[
                'rounded-full border bg-[#032266] px-6 py-3 text-sm leading-relaxed',
                i < 2 ? 'border-[#5DF34F] text-[#07DE20]' : 'border-[#04308F]',
              ]"
            >
              {{ value }}
            </li>
          </ul>
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
