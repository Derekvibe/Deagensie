<template>
  <section class="border-b border-gray-100 bg-gray-50/50 py-16 text-gray-900 lg:py-24">
    <div
      v-reveal="'scale-in'"
      class="mx-auto w-5/6 max-w-5xl space-y-6 rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm lg:p-14"
    >
      <span
        class="inline-block rounded-full bg-[#04308F]/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#04308F] uppercase"
      >
        Smart Matching
      </span>
      <h2
        class="font-serif text-2xl leading-tight font-normal tracking-tight text-gray-900 sm:text-3xl lg:text-5xl"
      >
        Create a standout portfolio and get matched with premium job opportunities
      </h2>
      <p class="mx-auto max-w-3xl text-base leading-relaxed font-normal text-gray-500 lg:text-lg">
        No noise. No endless searching. Just intelligent matching that connects your skills with
        ambitious startups and global brands seeking top African talent.
      </p>
      <div class="flex flex-wrap justify-center gap-3 pt-2">
        <span
          class="rounded-full border border-gray-200 bg-gray-50 px-5 py-2 text-xs font-semibold text-gray-700"
          >AI-Powered Matching</span
        >
        <span
          class="rounded-full border border-gray-200 bg-gray-50 px-5 py-2 text-xs font-semibold text-gray-700"
          >Premium Global Brands</span
        >
        <span
          class="rounded-full border border-gray-200 bg-gray-50 px-5 py-2 text-xs font-semibold text-gray-700"
          >Zero Relocation</span
        >
        <span
          class="rounded-full border border-gray-200 bg-gray-50 px-5 py-2 text-xs font-semibold text-gray-700"
          >Competitive Pay</span
        >
      </div>
      <div class="pt-4">
        <NuxtLink
          to="/register"
          class="inline-flex items-center gap-2 rounded-full bg-[#04308F] px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#04308F]/20 transition-all duration-300 hover:bg-[#05DED5] hover:text-gray-900"
        >
          Get Started
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css"></style>
