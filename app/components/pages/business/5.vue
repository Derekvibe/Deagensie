<template>
  <section class="border-b border-gray-100 bg-white py-20 text-gray-900 lg:py-32">
    <div
      class="mx-auto grid w-5/6 max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16"
    >
      <div v-reveal="'fade-right'" class="space-y-6">
        <span
          class="inline-block rounded-full bg-[#04308F]/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#04308F] uppercase"
        >
          Why Deagensie
        </span>
        <h2
          class="font-serif text-3xl leading-tight font-normal tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
        >
          Because the future belongs to brands that think differently
        </h2>
        <p class="text-base leading-relaxed font-normal text-gray-500">
          Growth requires more than effort — it requires insight. Creativity, when properly
          harnessed, becomes a competitive weapon. At Deagensie, we blend strategy, talent, and
          innovation to build businesses that don&apos;t just compete — they lead.
        </p>

        <div class="grid grid-cols-1 gap-6 pt-4 sm:grid-cols-3">
          <div class="space-y-1 rounded-2xl border border-gray-100 bg-gray-50 p-4">
            <h3 class="font-serif text-base font-normal text-gray-900">Think Differently</h3>
            <p class="text-xs font-normal text-gray-500">Strategy, talent &amp; tech fused.</p>
          </div>
          <div class="space-y-1 rounded-2xl border border-gray-100 bg-gray-50 p-4">
            <h3 class="font-serif text-base font-normal text-gray-900">Insight-Driven</h3>
            <p class="text-xs font-normal text-gray-500">Data-guided decision making.</p>
          </div>
          <div class="space-y-1 rounded-2xl border border-gray-100 bg-gray-50 p-4">
            <h3 class="font-serif text-base font-normal text-gray-900">Competitive Edge</h3>
            <p class="text-xs font-normal text-gray-500">Unlocking borderless talent.</p>
          </div>
        </div>
      </div>

      <div
        v-reveal="'scale-in'"
        class="relative aspect-16/10 overflow-hidden rounded-3xl border border-gray-100 bg-gray-100 shadow-2xl shadow-gray-200/60"
      >
        <NuxtImg
          src="/images/pages/business/hero-4.png"
          alt="Why Deagensie for Business"
          class="size-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="css"></style>
