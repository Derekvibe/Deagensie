<template>
  <section class="bg-white text-gray-900 py-24 lg:py-32 overflow-hidden border-t border-gray-100">
    <div class="mx-auto grid w-5/6 max-w-7xl gap-8 lg:grid-cols-2 lg:gap-10">
      <article
        class="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#02143C] p-8 text-white shadow-2xl transition-transform duration-300 hover:-translate-y-1.5 lg:p-12"
      >
        <div class="absolute -right-20 -top-20 size-60 rounded-full bg-[#05DED5]/20 blur-3xl pointer-events-none transition-transform duration-500 group-hover:scale-150" />
        <div>
          <span class="mb-4 inline-block text-xs uppercase tracking-widest text-[#05F4EA] font-semibold">
            For Businesses & Founders
          </span>
          <h3 class="text-2xl font-serif font-normal leading-snug tracking-tight lg:text-3xl xl:text-4xl">
            Build a creative team of the future with Deagensie
          </h3>
          <p class="mt-4 mb-8 text-sm leading-relaxed text-gray-300 lg:text-base lg:leading-relaxed">
            Partner with top-tier creatives, strategists, and technologists ready to turn bold ideas
            into scalable digital experiences.
          </p>
        </div>
        <div>
          <NuxtLink
            to="/contact"
            class="inline-flex items-center justify-center rounded-full bg-[#05DED5] px-7 py-4 text-base font-semibold text-[#060607] transition-all duration-300 hover:bg-[#05F4EA] hover:scale-105 hover:shadow-[0_0_25px_rgba(5,222,213,0.5)] lg:text-lg"
          >
            Get Started
          </NuxtLink>
        </div>
      </article>

      <article
        class="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-linear-to-br from-[#04ADA6] to-[#04308F] p-8 text-white shadow-2xl transition-transform duration-300 hover:-translate-y-1.5 lg:p-12"
      >
        <div class="absolute -right-20 -top-20 size-60 rounded-full bg-white/20 blur-3xl pointer-events-none transition-transform duration-500 group-hover:scale-150" />
        <div>
          <span class="mb-4 inline-block text-xs uppercase tracking-widest text-white/90 font-semibold">
            Custom Consultation
          </span>
          <h3 class="text-2xl font-serif font-normal leading-snug tracking-tight lg:text-3xl xl:text-4xl">
            Have a project in mind? Let us know how we can help
          </h3>
          <p class="mt-4 mb-8 text-sm leading-relaxed text-white/90 lg:text-base lg:leading-relaxed">
            Tell us your goals, challenges, or next big move, and we&apos;ll craft a solution tailored
            to your vision.
          </p>
        </div>
        <div>
          <NuxtLink
            to="/contact"
            class="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-base font-semibold text-[#060607] transition-all duration-300 hover:bg-gray-100 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] lg:text-lg"
          >
            Schedule Now
          </NuxtLink>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped lang="css">
</style>


