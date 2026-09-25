<template>
  <section class="bg-white text-gray-900 pt-28 pb-16 lg:pt-36 lg:pb-24 border-b border-gray-100">
    <div class="mx-auto w-5/6 max-w-7xl">
      <div v-reveal="'fade-up'" class="max-w-3xl space-y-6">
        <span class="text-xs uppercase tracking-widest text-[#04308F] font-semibold bg-[#04308F]/10 px-4 py-1.5 rounded-full inline-block">
          For Creatives
        </span>
        <h1 class="text-3xl font-serif font-normal tracking-tight sm:text-4xl lg:text-6xl text-gray-900 leading-tight">
          Connecting African Creatives with Global Opportunities
        </h1>
        <p class="text-base text-gray-500 sm:text-lg lg:text-xl leading-relaxed font-normal">
          Our platform ensures that African creatives build fulfilling global careers while staying deeply connected to their roots, culture, and heritage.
        </p>
        <div class="pt-4 flex flex-wrap items-center gap-4">
          <NuxtLink
            to="/register"
            class="inline-flex items-center gap-2 rounded-full bg-[#04308F] px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-[#05DED5] hover:text-gray-900 hover:scale-105 shadow-md shadow-[#04308F]/20"
          >
            Join Creative Network
          </NuxtLink>
          <NuxtLink
            to="/subscription"
            class="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-8 py-4 text-base font-semibold text-gray-900 transition-all duration-300 hover:border-[#04308F] hover:text-[#04308F]"
          >
            Creative Match
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
</style>
