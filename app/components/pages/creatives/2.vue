<template>
  <section class="bg-white text-gray-900 py-20 lg:py-32 border-b border-gray-100">
    <div class="mx-auto w-5/6 max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <div v-reveal="'fade-right'" class="space-y-6">
        <span class="text-xs uppercase tracking-widest text-[#04308F] font-semibold bg-[#04308F]/10 px-4 py-1.5 rounded-full inline-block">
          Borderless Careers
        </span>
        <h2 class="text-3xl font-serif font-normal tracking-tight sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
          Build a global career. Stay rooted in your story.
        </h2>
        <p class="text-base text-[#04308F] font-medium italic">
          &ldquo;Imagine a world where a gifted African designer no longer has to choose between pursuing opportunities abroad, building a thriving career at home, or staying deeply connected to her roots.&rdquo;
        </p>
        <p class="text-sm sm:text-base text-gray-500 leading-relaxed font-normal">
          For too long, African creatives faced a trade-off: global exposure or local belonging. At Deagensie, that choice disappears. Whether you&apos;re a designer, strategist, storyteller, developer, or animator, Deagensie is your gateway to global work without losing who you are.
        </p>

        <div class="pt-2">
          <NuxtLink
            to="/register"
            class="inline-flex items-center gap-2 rounded-full bg-[#04308F] px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#05DED5] hover:text-gray-900 shadow-md shadow-[#04308F]/20"
          >
            Create Your Profile
          </NuxtLink>
        </div>
      </div>

      <div v-reveal="'scale-in'" class="relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-100 shadow-2xl shadow-gray-200/60 aspect-4/3 sm:aspect-16/10">
        <NuxtImg
          src="/images/pages/creatives/hero-1.png"
          alt="African Creative Professional"
          class="size-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
</style>
