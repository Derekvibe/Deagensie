<template>
  <section class="bg-white text-gray-900 py-20 lg:py-32 border-b border-gray-100">
    <div class="mx-auto w-5/6 max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <div v-reveal="'fade-right'" class="space-y-6">
        <span class="text-xs uppercase tracking-widest text-[#04308F] font-semibold bg-[#04308F]/10 px-4 py-1.5 rounded-full inline-block">
          Why Deagensie
        </span>
        <h2 class="text-3xl font-serif font-normal tracking-tight sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
          Because the future belongs to brands that think differently
        </h2>
        <p class="text-base text-gray-500 leading-relaxed font-normal">
          Growth requires more than effort — it requires insight. Creativity, when properly harnessed, becomes a competitive weapon. At Deagensie, we blend strategy, talent, and innovation to build businesses that don&apos;t just compete — they lead.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          <div class="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
            <h3 class="text-base font-serif font-normal text-gray-900">Think Differently</h3>
            <p class="text-xs text-gray-500 font-normal">Strategy, talent &amp; tech fused.</p>
          </div>
          <div class="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
            <h3 class="text-base font-serif font-normal text-gray-900">Insight-Driven</h3>
            <p class="text-xs text-gray-500 font-normal">Data-guided decision making.</p>
          </div>
          <div class="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
            <h3 class="text-base font-serif font-normal text-gray-900">Competitive Edge</h3>
            <p class="text-xs text-gray-500 font-normal">Unlocking borderless talent.</p>
          </div>
        </div>
      </div>

      <div v-reveal="'scale-in'" class="relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-100 shadow-2xl shadow-gray-200/60 aspect-16/10">
        <NuxtImg
          src="/images/pages/business/hero-4.png"
          alt="Why Deagensie for Business"
          class="size-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
</style>
