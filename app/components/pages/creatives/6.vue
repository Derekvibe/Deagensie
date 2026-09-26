<template>
  <section class="border-b border-gray-100 bg-white py-20 text-gray-900 lg:py-32">
    <div class="mx-auto w-5/6 max-w-7xl space-y-16">
      <div v-reveal="'fade-up'" class="mx-auto max-w-3xl space-y-4 text-center">
        <span
          class="inline-block rounded-full bg-[#04308F]/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#04308F] uppercase"
        >
          The Deagensie Difference
        </span>
        <h2
          class="font-serif text-3xl leading-tight font-normal tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
        >
          What Makes Deagensie Revolutionary?
        </h2>
        <p class="text-base leading-relaxed font-normal text-gray-500">
          We don&apos;t just place creatives. We build long-term careers, ownership, and sustainable
          ecosystems that evolve with you.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div
          v-reveal="{ animation: 'fade-up', delay: 100 }"
          class="space-y-3 rounded-3xl border border-gray-100 bg-gray-50 p-6"
        >
          <span class="font-serif text-2xl font-normal text-[#04308F]">01</span>
          <h3 class="font-serif text-lg font-normal text-gray-900">Talent Ownership</h3>
          <p class="text-xs leading-relaxed font-normal text-gray-500">
            Most platforms focus on simple gig placement. Deagensie integrates talent ownership,
            skills training, and ecosystem acceleration.
          </p>
        </div>

        <div
          v-reveal="{ animation: 'fade-up', delay: 200 }"
          class="space-y-3 rounded-3xl border border-gray-100 bg-gray-50 p-6"
        >
          <span class="font-serif text-2xl font-normal text-[#04308F]">02</span>
          <h3 class="font-serif text-lg font-normal text-gray-900">Growth-as-a-Service</h3>
          <p class="text-xs leading-relaxed font-normal text-gray-500">
            Why hire multiple fragmented agencies when our subscription model continuously refines
            brand identity and product design with zero downtime?
          </p>
        </div>

        <div
          v-reveal="{ animation: 'fade-up', delay: 300 }"
          class="space-y-3 rounded-3xl border border-gray-100 bg-gray-50 p-6"
        >
          <span class="font-serif text-2xl font-normal text-[#04308F]">03</span>
          <h3 class="font-serif text-lg font-normal text-gray-900">AI-Powered Matching</h3>
          <p class="text-xs leading-relaxed font-normal text-gray-500">
            Our intelligent matching platform learns your skills, career ambitions, and work style
            to place you where you will truly excel.
          </p>
        </div>

        <div
          v-reveal="{ animation: 'fade-up', delay: 400 }"
          class="space-y-3 rounded-3xl border border-gray-100 bg-gray-50 p-6"
        >
          <span class="font-serif text-2xl font-normal text-[#04308F]">04</span>
          <h3 class="font-serif text-lg font-normal text-gray-900">Continuous Upskilling</h3>
          <p class="text-xs leading-relaxed font-normal text-gray-500">
            Through the Talent Academy and mentorship, we continuously upskill creatives to keep
            them ahead in the global economy.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css"></style>
