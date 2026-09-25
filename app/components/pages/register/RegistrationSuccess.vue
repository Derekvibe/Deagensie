<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineProps<{
  title: string;
  subTitle: string;
  eyebrow?: string;
}>();
</script>

<template>
  <section class="mx-auto my-16 w-5/6 max-w-xl py-16 text-center lg:my-20 lg:py-20">
    <div
      class="mx-auto grid size-24 place-items-center rounded-full bg-[#05DED5]/15 text-[#04308F]"
    >
      <Icon icon="hugeicons:tick-double-02" class="size-12" />
    </div>

    <p v-if="eyebrow" class="mt-6 text-sm font-medium text-[#04308F] uppercase">
      {{ eyebrow }}
    </p>
    <h1 class="mt-3 text-3xl leading-tight font-semibold lg:text-5xl">
      {{ title }}
    </h1>
    <p class="text-foreground/60 mt-4">
      {{ subTitle }}
    </p>

    <slot />

    <div class="mt-8">
      <slot name="actions" />
    </div>
  </section>
</template>
