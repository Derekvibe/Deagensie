<template>
  <section class="border-b border-gray-100 bg-white py-20 text-gray-900 lg:py-32">
    <div
      class="mx-auto grid w-5/6 max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16"
    >
      <div v-reveal="'fade-right'" class="space-y-6">
        <span
          class="inline-block rounded-full bg-[#04308F]/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#04308F] uppercase"
        >
          Borderless Careers
        </span>
        <h2
          class="font-serif text-3xl leading-tight font-normal tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
        >
          Build a global career. Stay rooted in your story.
        </h2>
        <p class="text-base font-medium text-[#04308F] italic">
          &ldquo;Imagine a world where a gifted African designer no longer has to choose between
          pursuing opportunities abroad, building a thriving career at home, or staying deeply
          connected to her roots.&rdquo;
        </p>
        <p class="text-sm leading-relaxed font-normal text-gray-500 sm:text-base">
          For too long, African creatives faced a trade-off: global exposure or local belonging. At
          Deagensie, that choice disappears. Whether you&apos;re a designer, strategist,
          storyteller, developer, or animator, Deagensie is your gateway to global work without
          losing who you are.
        </p>

        <div class="pt-2">
          <NuxtLink
            to="/register"
            class="inline-flex items-center gap-2 rounded-full bg-[#04308F] px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#04308F]/20 transition-all duration-300 hover:bg-[#05DED5] hover:text-gray-900"
          >
            Create Your Profile
          </NuxtLink>
        </div>
      </div>

      <div
        v-reveal="'scale-in'"
        class="relative aspect-4/3 overflow-hidden rounded-3xl border border-gray-100 bg-gray-100 shadow-2xl shadow-gray-200/60 sm:aspect-16/10"
      >
        <NuxtImg
          src="/images/pages/creatives/hero-1.png"
          alt="African Creative Professional"
          class="size-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="css"></style>
