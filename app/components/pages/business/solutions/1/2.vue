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
          03 — Marketing
        </span>

        <h3 class="mt-2 text-3xl leading-snug font-semibold">
          Data-driven campaigns that convert and scale.
        </h3>

        <p class="mt-4 text-xl leading-normal">
          When you're looking to stand out, doing the ordinary won't do. You need a team with a mix
          of creative and technical skill sets to deliver bold ideas and innovative marketing
          strategies. We use AI to analyze market trends, predict consumer behavior, and optimize
          strategies in real time.
        </p>

        <ul class="mt-4 space-y-4">
          <li
            v-for="point in [
              'Social media strategy & content calendars',
              'Paid advertising (Google, Meta, LinkedIn)',
              'Email marketing design & automation',
              '500 qualified buyer engine (GrowthOS)',
              'Analytics, tracking & monthly performance reports',
            ]"
            :key="point"
            class="flex items-center gap-2.5 p-2.5 text-sm leading-relaxed xl:text-lg xl:leading-tight"
          >
            <Icon icon="hugeicons:tick-02" class="text-2xl text-[#34C759]" />
            {{ point }}
          </li>
        </ul>
      </div>

      <div class="lg:w-490/1220 lg:shrink-0">
        <span
          class="mb-5 inline-block rounded-full bg-[#E6EAF4] px-4 py-1.5 text-sm leading-relaxed text-[#04308F] uppercase"
        >
          GrowthOS
        </span>
        <aside
          class="stack-card bg-background before:bg-background after:bg-background relative translate-y-3 rounded-[calc(var(--radius)+2px)] border border-black/10 px-3 py-5 shadow-lg before:absolute before:inset-0 before:-top-3 before:-z-1 before:rounded-[inherit] before:border before:border-black/10 before:shadow-[inherit] after:absolute after:inset-0 after:-top-1 after:-z-2 after:rounded-[inherit] after:border after:border-black/10 after:shadow-[inherit] lg:flex-1 lg:px-6 lg:py-5"
        >
          <h4 class="mt-2 text-2xl leading-normal font-semibold xl:text-3xl xl:leading-snug">
            500 qualified buyers per month
          </h4>

          <p class="mt-4 text-sm leading-relaxed xl:text-xl xl:leading-normal">
            Our flagship marketing product generates and remarketing 500 high-intent leads monthly,
            converting 10% into paying customers. stage.
          </p>

          <dl class="mt-6 grid grid-cols-2 gap-x-2 gap-y-6 xl:gap-x-4.5">
            <div
              v-for="{ value, label } in [
                { value: '500', label: 'Monthly prospects' },
                { value: '10%', label: 'Conversion rate' },
                { value: '50', label: 'New customers / mo' },
                { value: '₦100K', label: 'Per month' },
              ]"
              :key="label"
              class="bg-background rounded-[calc(var(--radius)+2px)] border border-[#D5D5D5] px-4.5 py-6"
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

<style scoped lang="css">
.stack-card {
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.stack-card::before,
.stack-card::after {
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.stack-card:hover {
  transform: translateY(calc(var(--tw-translate-y, 0px) - 6px));
}

.stack-card:hover::before {
  transform: translateY(3px) rotate(-1.5deg) skewX(-1deg);
}

.stack-card:hover::after {
  transform: translateY(7px) rotate(-3deg) skewX(-2deg);
}

@keyframes ripple {
  to {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
