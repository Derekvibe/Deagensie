<template>
  <section class="bg-[#04308F] text-white py-20 lg:py-28">
    <div
      v-reveal="'fade-up'"
      class="mx-auto w-5/6 max-w-5xl text-center space-y-6"
    >
      <h2 class="text-3xl font-serif font-normal tracking-tight sm:text-4xl lg:text-5xl text-white leading-tight">
        Join Deagensie Today
      </h2>
      <p class="mx-auto max-w-2xl text-base sm:text-lg text-gray-200 leading-relaxed font-normal">
        Unlock your potential, connect with global brands, and build a career without boundaries.
      </p>
      <div class="pt-4">
        <NuxtLink
          to="/register"
          class="inline-flex items-center gap-2 rounded-full bg-[#05DED5] px-8 py-4 text-base font-semibold text-gray-900 transition-all duration-300 hover:bg-white hover:scale-105 shadow-lg shadow-black/20"
        >
          Create Free Profile
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
</style>
