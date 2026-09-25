<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <section class="mx-auto min-h-dvh w-5/6 max-w-xl content-center py-16 text-center lg:py-20">
    <p class="text-xs leading-normal font-medium text-[#04308F]">Get Started</p>
    <h1 class="my-2 text-xl font-semibold sm:text-3xl sm:leading-snug">
      How would you like to begin?
    </h1>
    <p class="text-sm sm:text-base">
      Choose the path that best describes your needs <span>&nbsp;<br /></span> and we'll customize
      your experience
    </p>
    <ul
      class="mt-10 space-y-6 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 **:[a]:flex **:[a]:items-center **:[a]:gap-6 **:[a]:rounded-[calc(var(--radius)+2px)] **:[a]:border **:[a]:p-4 **:[a]:text-xl **:[a]:font-semibold sm:**:[a]:flex-col sm:**:[a]:gap-3 xl:**:[a]:text-2xl xl:**:[a]:leading-snug **:[svg]:shrink-0 **:[svg]:rounded-full **:[svg]:bg-current/5 **:[svg]:p-4 **:[svg]:text-6xl"
    >
      <li>
        <NuxtLink to="/register/business"
          ><Icon icon="streamline-plump:bag-suitcase-4-solid" class="text-[#04308F]" /><span
            >I&apos;m a Business</span
          ></NuxtLink
        >
      </li>
      <li>
        <NuxtLink to="/register/creative"
          ><Icon icon="mage:laptop-fill" class="text-[#026662]" /><span
            >I&apos;m a Creative</span
          ></NuxtLink
        >
      </li>
    </ul>
  </section>
</template>
