<template>
  <section class="bg-gray-50/50 text-gray-900 py-16 lg:py-24 border-b border-gray-100">
    <div
      v-reveal="'scale-in'"
      class="mx-auto w-5/6 max-w-5xl rounded-3xl bg-white border border-gray-100 p-8 lg:p-14 text-center space-y-6 shadow-sm"
    >
      <span class="text-xs uppercase tracking-widest text-[#04308F] font-semibold bg-[#04308F]/10 px-4 py-1.5 rounded-full inline-block">
        Smart Matching
      </span>
      <h2 class="text-2xl font-serif font-normal tracking-tight sm:text-3xl lg:text-5xl text-gray-900 leading-tight">
        Create a standout portfolio and get matched with premium job opportunities
      </h2>
      <p class="mx-auto max-w-3xl text-base text-gray-500 lg:text-lg leading-relaxed font-normal">
        No noise. No endless searching. Just intelligent matching that connects your skills with ambitious startups and global brands seeking top African talent.
      </p>
      <div class="flex flex-wrap justify-center gap-3 pt-2">
        <span class="rounded-full bg-gray-50 border border-gray-200 px-5 py-2 text-xs font-semibold text-gray-700">AI-Powered Matching</span>
        <span class="rounded-full bg-gray-50 border border-gray-200 px-5 py-2 text-xs font-semibold text-gray-700">Premium Global Brands</span>
        <span class="rounded-full bg-gray-50 border border-gray-200 px-5 py-2 text-xs font-semibold text-gray-700">Zero Relocation</span>
        <span class="rounded-full bg-gray-50 border border-gray-200 px-5 py-2 text-xs font-semibold text-gray-700">Competitive Pay</span>
      </div>
      <div class="pt-4">
        <NuxtLink
          to="/register"
          class="inline-flex items-center gap-2 rounded-full bg-[#04308F] px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#05DED5] hover:text-gray-900 shadow-md shadow-[#04308F]/20"
        >
          Get Started
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
</style>
