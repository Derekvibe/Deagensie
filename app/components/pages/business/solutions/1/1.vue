<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <section class="bg-[#F6F6F6] py-6.5 lg:py-13">
    <div class="mx-auto w-5/6 max-w-7xl">
      <div
        class="bg-background flex flex-col gap-13 border border-[#E2E2E2] lg:flex-row lg:items-center lg:gap-10 lg:rounded-[calc(var(--radius)+2px)] lg:p-8"
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
            From Bronze to Platinum<br />— a tier for every stage
          </h4>

          <div class="bg-background mt-4 rounded-[calc(var(--radius)+2px)] p-4">
            <p class="text-sm leading-relaxed xl:text-xl xl:leading-normal">
              A complete strategic blueprint built specifically for your market, goals, and growth
              stage.
            </p>

            <ul class="mt-6 flex flex-wrap gap-4">
              <li
                v-for="(value, i) in [
                  'Bronze · ₦350K',
                  'Silver · ₦500K',
                  'Gold · ₦2M ★',
                  'Platinum · ₦3.5M',
                ]"
                :key="value"
                :class="[
                  'rounded-full border px-6 py-3 text-sm leading-relaxed',
                  i === 2
                    ? 'border-[#5DF34F] bg-[#E7F4E6] text-[#07DE20]'
                    : 'border-[#949494] bg-[#F6F6F6] text-[#444444]',
                ]"
              >
                {{ value }}
              </li>
            </ul>

            <ul class="mt-7 space-y-4">
              <li
                v-for="point in [
                  'Color palette, typography & iconography',
                  'Color palette, typography & iconography',
                ]"
                :key="point"
                class="flex items-center gap-2.5 p-2.5 text-sm leading-relaxed xl:text-lg xl:leading-tight"
              >
                <Icon icon="hugeicons:tick-02" class="text-2xl text-[#34C759]" />
                {{ point }}
              </li>
            </ul>
          </div>
        </aside>

        <div class="lg:w-615/1220 lg:shrink-0">
          <span
            class="rounded-full bg-[#E6EAF4] px-4 py-1.5 text-sm leading-relaxed text-[#04308F] uppercase"
          >
            02 — Brand Development
          </span>

          <h3 class="mt-2 text-3xl leading-snug font-semibold">
            Distinct identities that command attention and loyalty.
          </h3>

          <p class="mt-4 text-xl leading-normal">
            Effective brands transcend logos, advertising campaigns, and social media presence. The
            real power of a brand today lies in creating dynamic, meaningful relationships with
            customers that evolve over time. We build brands that don't just exist — they lead.
          </p>

          <ul class="mt-4 space-y-4">
            <li
              v-for="point in [
                'Logo design & visual identity system',
                'Brand guidelines & style documentation',
                'Brand voice architecture & messaging framework',
              ]"
              :key="point"
              class="flex items-center gap-2.5 p-2.5 text-sm leading-relaxed xl:text-lg xl:leading-tight"
            >
              <Icon icon="hugeicons:tick-02" class="text-2xl text-[#34C759]" />
              {{ point }}
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-3 flex justify-end lg:mt-5">
        <NuxtLink
          to="/"
          class="text-foreground inline-block rounded-full bg-[#05DED5] px-18 py-3.5 font-medium"
        >
          Get Started
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
