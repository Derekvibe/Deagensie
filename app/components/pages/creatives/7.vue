<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <section class="bg-gray-50/50 py-20 lg:py-28 border-b border-gray-100 text-gray-900">
    <div class="mx-auto w-5/6 max-w-5xl text-center space-y-8">
      <div v-reveal="'fade-up'" class="space-y-3">
        <span class="text-xs uppercase tracking-widest text-[#04308F] font-semibold bg-[#04308F]/10 px-4 py-1.5 rounded-full inline-block">
          Talent Voices
        </span>
        <h2 class="text-3xl font-serif font-normal text-gray-900 sm:text-4xl">
          Hear From Our Creative Community
        </h2>
      </div>

      <div v-reveal="'scale-in'" class="p-8 sm:p-12 rounded-3xl bg-white border border-gray-100 shadow-lg space-y-6 max-w-3xl mx-auto text-left">
        <div class="flex items-center gap-1 text-[#05DED5] text-xl">
          <Icon icon="material-symbols:star" v-for="i in 5" :key="i" />
        </div>
        <p class="text-lg sm:text-xl font-serif font-normal text-gray-800 leading-relaxed">
          &ldquo;Before Deagensie, I was stuck choosing between staying local or chasing opportunities abroad. Now I don&apos;t have to pick. I get to work with global teams while still being rooted in where I come from.&rdquo;
        </p>
        <div class="flex items-center gap-4 pt-4 border-t border-gray-100">
          <div class="size-12 rounded-full bg-[#04308F] text-white flex items-center justify-center font-serif font-bold text-lg">
            DK
          </div>
          <div>
            <h3 class="text-base font-serif font-normal text-gray-900">Daniel K.</h3>
            <p class="text-xs font-semibold text-[#04308F]">Product Designer • Lagos, Nigeria</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
</style>
