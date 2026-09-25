<template>
  <section class="bg-white text-gray-900 py-20 lg:py-32 border-b border-gray-100">
    <div class="mx-auto w-5/6 max-w-7xl space-y-16">
      <div v-reveal="'fade-up'" class="text-center max-w-3xl mx-auto space-y-4">
        <span class="text-xs uppercase tracking-widest text-[#04308F] font-semibold bg-[#04308F]/10 px-4 py-1.5 rounded-full inline-block">
          The Deagensie Difference
        </span>
        <h2 class="text-3xl font-serif font-normal tracking-tight sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
          What Makes Deagensie Revolutionary?
        </h2>
        <p class="text-base text-gray-500 leading-relaxed font-normal">
          We don&apos;t just place creatives. We build long-term careers, ownership, and sustainable ecosystems that evolve with you.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-reveal="{ animation: 'fade-up', delay: 100 }" class="p-6 rounded-3xl bg-gray-50 border border-gray-100 space-y-3">
          <span class="text-2xl font-serif font-normal text-[#04308F]">01</span>
          <h3 class="text-lg font-serif font-normal text-gray-900">Talent Ownership</h3>
          <p class="text-xs text-gray-500 leading-relaxed font-normal">
            Most platforms focus on simple gig placement. Deagensie integrates talent ownership, skills training, and ecosystem acceleration.
          </p>
        </div>

        <div v-reveal="{ animation: 'fade-up', delay: 200 }" class="p-6 rounded-3xl bg-gray-50 border border-gray-100 space-y-3">
          <span class="text-2xl font-serif font-normal text-[#04308F]">02</span>
          <h3 class="text-lg font-serif font-normal text-gray-900">Growth-as-a-Service</h3>
          <p class="text-xs text-gray-500 leading-relaxed font-normal">
            Why hire multiple fragmented agencies when our subscription model continuously refines brand identity and product design with zero downtime?
          </p>
        </div>

        <div v-reveal="{ animation: 'fade-up', delay: 300 }" class="p-6 rounded-3xl bg-gray-50 border border-gray-100 space-y-3">
          <span class="text-2xl font-serif font-normal text-[#04308F]">03</span>
          <h3 class="text-lg font-serif font-normal text-gray-900">AI-Powered Matching</h3>
          <p class="text-xs text-gray-500 leading-relaxed font-normal">
            Our intelligent matching platform learns your skills, career ambitions, and work style to place you where you will truly excel.
          </p>
        </div>

        <div v-reveal="{ animation: 'fade-up', delay: 400 }" class="p-6 rounded-3xl bg-gray-50 border border-gray-100 space-y-3">
          <span class="text-2xl font-serif font-normal text-[#04308F]">04</span>
          <h3 class="text-lg font-serif font-normal text-gray-900">Continuous Upskilling</h3>
          <p class="text-xs text-gray-500 leading-relaxed font-normal">
            Through the Talent Academy and mentorship, we continuously upskill creatives to keep them ahead in the global economy.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
</style>
