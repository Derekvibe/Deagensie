<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <section class="border-b border-gray-100 bg-gray-50/50 py-20 text-gray-900 lg:py-28">
    <div class="mx-auto w-5/6 max-w-5xl space-y-8 text-center">
      <div v-reveal="'fade-up'" class="space-y-3">
        <span
          class="inline-block rounded-full bg-[#04308F]/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#04308F] uppercase"
        >
          Talent Voices
        </span>
        <h2 class="font-serif text-3xl font-normal text-gray-900 sm:text-4xl">
          Hear From Our Creative Community
        </h2>
      </div>

      <div
        v-reveal="'scale-in'"
        class="mx-auto max-w-3xl space-y-6 rounded-3xl border border-gray-100 bg-white p-8 text-left shadow-lg sm:p-12"
      >
        <div class="flex items-center gap-1 text-xl text-[#05DED5]">
          <Icon v-for="i in 5" :key="i" icon="material-symbols:star" />
        </div>
        <p class="font-serif text-lg leading-relaxed font-normal text-gray-800 sm:text-xl">
          &ldquo;Before Deagensie, I was stuck choosing between staying local or chasing
          opportunities abroad. Now I don&apos;t have to pick. I get to work with global teams while
          still being rooted in where I come from.&rdquo;
        </p>
        <div class="flex items-center gap-4 border-t border-gray-100 pt-4">
          <div
            class="flex size-12 items-center justify-center rounded-full bg-[#04308F] font-serif text-lg font-bold text-white"
          >
            DK
          </div>
          <div>
            <h3 class="font-serif text-base font-normal text-gray-900">Daniel K.</h3>
            <p class="text-xs font-semibold text-[#04308F]">Product Designer • Lagos, Nigeria</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css"></style>
