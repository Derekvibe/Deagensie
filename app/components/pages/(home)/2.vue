<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <section class="bg-white text-gray-900 py-24 lg:py-32 overflow-hidden">
    <div class="mx-auto w-5/6 max-w-7xl space-y-16 lg:space-y-20">
      <!-- Section Editorial Header -->
      <div v-reveal="'fade-up'" class="mx-auto max-w-4xl text-center space-y-4">
        <span class="text-xs uppercase tracking-widest text-[#04308F] font-semibold bg-[#04308F]/10 px-4 py-1.5 rounded-full inline-block">
          Unmatched Growth Architecture
        </span>
        <h2
          class="text-center text-3xl font-serif font-normal tracking-tight leading-tight sm:text-4xl lg:text-5xl 2xl:text-6xl text-gray-900"
        >
          The future of business growth is here.<br class="hidden sm:inline" />
          <span class="text-[#04308F] italic">It&apos;s bold</span>,
          <span class="text-[#05DED5]">It&apos;s intelligent</span>,
          <span>It&apos;s Deagensie.</span>
        </h2>
      </div>

      <!-- Andela-Style Sticky Stacked Elevated Cards Container -->
      <div class="relative space-y-10 lg:space-y-16">
        <!-- Card 1: AI-Driven Branding -->
        <article
          v-reveal="'fade-up'"
          class="sticky top-28 sm:top-32 z-10 group relative rounded-3xl border border-gray-100 bg-white p-8 sm:p-10 lg:p-12 shadow-2xl shadow-gray-200/80 transition-all duration-500"
        >
          <div class="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-center">
            <!-- Left Info Content -->
            <div class="lg:col-span-6 space-y-6">
              <span class="inline-block rounded-md bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
                AI-DRIVEN BRANDING & MARKETING
              </span>
              <h3 class="text-2xl font-serif font-normal leading-snug tracking-tight text-gray-900 lg:text-3xl xl:text-4xl">
                AI-Driven Branding & Marketing Intelligence
              </h3>
              <p class="text-base leading-relaxed text-gray-600 font-normal">
                Most agencies create stunning visuals and run ads, but Deagensie goes deeper—we integrate AI to analyze market trends, predict consumer behavior, and optimize branding in real-time.
              </p>

              <!-- Checkmark Bullet List -->
              <ul class="space-y-3 text-sm sm:text-base text-gray-700 font-medium">
                <li class="flex items-start gap-3">
                  <Icon icon="lucide:check" class="text-[#05DED5] text-xl font-bold mt-0.5 shrink-0" />
                  <span>Market Intelligence & Predictive Trend Analysis</span>
                </li>
                <li class="flex items-start gap-3">
                  <Icon icon="lucide:check" class="text-[#05DED5] text-xl font-bold mt-0.5 shrink-0" />
                  <span>Automated Brand Asset Alignment & Fine-tuning</span>
                </li>
                <li class="flex items-start gap-3">
                  <Icon icon="lucide:check" class="text-[#05DED5] text-xl font-bold mt-0.5 shrink-0" />
                  <span>Dynamic Multi-Channel Campaign Optimization</span>
                </li>
              </ul>

              <div class="pt-2">
                <NuxtLink
                  to="/business"
                  class="inline-flex items-center gap-2 font-bold text-[#04308F] transition-colors duration-200 hover:text-[#05DED5] text-base"
                >
                  <span>Learn more</span>
                  <Icon icon="lucide:arrow-right" class="text-lg transition-transform duration-200 group-hover:translate-x-1.5" />
                </NuxtLink>
              </div>
            </div>

            <!-- Right Preview UI Widget -->
            <div class="lg:col-span-6 rounded-2xl bg-emerald-50/70 p-6 sm:p-8 border border-emerald-100/80 flex items-center justify-center min-h-70">
              <div class="w-full max-w-sm rounded-2xl bg-white p-6 shadow-md border border-gray-100 space-y-4">
                <div class="flex items-center gap-3">
                  <div class="size-10 rounded-xl bg-[#026662] text-[#05F4EA] flex items-center justify-center text-xl">
                    <Icon icon="solar:cpu-bold" />
                  </div>
                  <div>
                    <h4 class="font-bold text-sm text-gray-900">Brand Intelligence Engine</h4>
                    <p class="text-xs text-gray-500">Automated Strategy Agent</p>
                  </div>
                </div>
                <div class="rounded-xl bg-gray-50 p-3.5 border border-gray-200 text-xs space-y-2">
                  <div class="flex justify-between font-semibold text-gray-700">
                    <span>Market Fit Score</span>
                    <span class="text-emerald-600">96% High Match</span>
                  </div>
                  <div class="h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
                    <div class="h-full rounded-full bg-emerald-500 w-[96%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <!-- Card 2: Talent-as-a-Service (TaaS) -->
        <article
          v-reveal="'fade-up'"
          class="sticky top-34 sm:top-40 z-20 group relative rounded-3xl border border-gray-100 bg-white p-8 sm:p-10 lg:p-12 shadow-2xl shadow-gray-200/80 transition-all duration-500"
        >
          <div class="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-center">
            <!-- Left Info Content -->
            <div class="lg:col-span-6 space-y-6">
              <span class="inline-block rounded-md bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#04308F]">
                TALENT-AS-A-SERVICE (TAAS)
              </span>
              <h3 class="text-2xl font-serif font-normal leading-snug tracking-tight text-gray-900 lg:text-3xl xl:text-4xl">
                Deploy Top-Tier Creatives into Your Workflow
              </h3>
              <p class="text-base leading-relaxed text-gray-600 font-normal">
                African creatives can now find fulfilling careers while staying connected to their roots. For startup founders, our platform provides access to in-demand creative talent needed to thrive.
              </p>

              <!-- Checkmark Bullet List -->
              <ul class="space-y-3 text-sm sm:text-base text-gray-700 font-medium">
                <li class="flex items-start gap-3">
                  <Icon icon="lucide:check" class="text-[#05DED5] text-xl font-bold mt-0.5 shrink-0" />
                  <span>Pre-Vetted Global Creative & Tech Specialists</span>
                </li>
                <li class="flex items-start gap-3">
                  <Icon icon="lucide:check" class="text-[#05DED5] text-xl font-bold mt-0.5 shrink-0" />
                  <span>On-Demand Embedded Team Extensions</span>
                </li>
                <li class="flex items-start gap-3">
                  <Icon icon="lucide:check" class="text-[#05DED5] text-xl font-bold mt-0.5 shrink-0" />
                  <span>Optimized Hiring Cost & High Turnaround Speed</span>
                </li>
              </ul>

              <div class="pt-2">
                <NuxtLink
                  to="/creatives"
                  class="inline-flex items-center gap-2 font-bold text-[#04308F] transition-colors duration-200 hover:text-[#05DED5] text-base"
                >
                  <span>Learn more</span>
                  <Icon icon="lucide:arrow-right" class="text-lg transition-transform duration-200 group-hover:translate-x-1.5" />
                </NuxtLink>
              </div>
            </div>

            <!-- Right Preview UI Widget -->
            <div class="lg:col-span-6 rounded-2xl bg-blue-50/70 p-6 sm:p-8 border border-blue-100/80 flex items-center justify-center min-h-70">
              <div class="w-full max-w-sm rounded-2xl bg-white p-6 shadow-md border border-gray-100 space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-gray-500 uppercase">Talent Pipeline</span>
                  <span class="rounded-full bg-blue-100 text-[#04308F] px-2.5 py-0.5 text-xs font-bold">Active</span>
                </div>
                <div class="space-y-3">
                  <div class="flex items-center gap-3 p-2 rounded-xl bg-gray-50 border border-gray-100">
                    <NuxtImg src="/images/pages/(home)/testimonials/victor-ephraim.png" class="size-10 rounded-full object-cover" />
                    <div>
                      <p class="text-xs font-bold text-gray-900">Victor E.</p>
                      <p class="text-[11px] text-gray-500">Lead Product Designer</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3 p-2 rounded-xl bg-gray-50 border border-gray-100">
                    <NuxtImg src="/images/pages/(home)/testimonials/don-okhufou.png" class="size-10 rounded-full object-cover" />
                    <div>
                      <p class="text-xs font-bold text-gray-900">Don O.</p>
                      <p class="text-[11px] text-gray-500">Brand Strategist</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <!-- Card 3: Founders' Growth Lab -->
        <article
          v-reveal="'fade-up'"
          class="sticky top-40 sm:top-48 z-30 group relative rounded-3xl border border-gray-100 bg-white p-8 sm:p-10 lg:p-12 shadow-2xl shadow-gray-200/80 transition-all duration-500"
        >
          <div class="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-center">
            <!-- Left Info Content -->
            <div class="lg:col-span-6 space-y-6">
              <span class="inline-block rounded-md bg-purple-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-purple-700">
                FOUNDERS' GROWTH LAB
              </span>
              <h3 class="text-2xl font-serif font-normal leading-snug tracking-tight text-gray-900 lg:text-3xl xl:text-4xl">
                Upskill & Scale Your Business Vision
              </h3>
              <p class="text-base leading-relaxed text-gray-600 font-normal">
                Startups struggle with strategy, execution, and funding. Deagensie&apos;s Growth Lab is an exclusive accelerator providing branding, investor pitch decks, digital presence, and growth capital.
              </p>

              <!-- Checkmark Bullet List -->
              <ul class="space-y-3 text-sm sm:text-base text-gray-700 font-medium">
                <li class="flex items-start gap-3">
                  <Icon icon="lucide:check" class="text-[#05DED5] text-xl font-bold mt-0.5 shrink-0" />
                  <span>Investor Pitch Decks & Valuation Positioning</span>
                </li>
                <li class="flex items-start gap-3">
                  <Icon icon="lucide:check" class="text-[#05DED5] text-xl font-bold mt-0.5 shrink-0" />
                  <span>MVP Product Acceleration & Scalability</span>
                </li>
                <li class="flex items-start gap-3">
                  <Icon icon="lucide:check" class="text-[#05DED5] text-xl font-bold mt-0.5 shrink-0" />
                  <span>Access to Global Growth Capital & Mentors</span>
                </li>
              </ul>

              <div class="pt-2">
                <NuxtLink
                  to="/subscription"
                  class="inline-flex items-center gap-2 font-bold text-[#04308F] transition-colors duration-200 hover:text-[#05DED5] text-base"
                >
                  <span>Learn more</span>
                  <Icon icon="lucide:arrow-right" class="text-lg transition-transform duration-200 group-hover:translate-x-1.5" />
                </NuxtLink>
              </div>
            </div>

            <!-- Right Preview UI Widget -->
            <div class="lg:col-span-6 rounded-2xl bg-purple-50/70 p-6 sm:p-8 border border-purple-100/80 flex items-center justify-center min-h-70">
              <div class="w-full max-w-sm rounded-2xl bg-white p-6 shadow-md border border-gray-100 space-y-4">
                <div class="flex items-center gap-3">
                  <div class="size-10 rounded-xl bg-[#8F039C] text-white flex items-center justify-center text-xl">
                    <Icon icon="solar:rocket-bold" />
                  </div>
                  <div>
                    <h4 class="font-bold text-sm text-gray-900">Growth Lab Accelerator</h4>
                    <p class="text-xs text-gray-500">Fundraising & Scaling</p>
                  </div>
                </div>
                <div class="rounded-xl bg-purple-50 p-3 border border-purple-100 text-xs text-purple-900 space-y-1">
                  <p class="font-bold">Stage 3: Market Expansion</p>
                  <p class="text-gray-600">Pitch deck approved • Funding active</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- Andela-Style Dual CTA Pill Buttons -->
      <div v-reveal="'fade-up'" class="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 pt-8">
        <NuxtLink
          to="/contact"
          class="w-full sm:w-auto text-center rounded-full bg-[#020B1E] px-8 py-4 text-base font-bold text-white shadow-xl transition-all duration-300 hover:bg-[#04308F] hover:scale-105 lg:text-lg"
        >
          Book a Discovery Call
        </NuxtLink>
        <NuxtLink
          to="/business"
          class="w-full sm:w-auto text-center rounded-full border-2 border-[#04308F] bg-white px-8 py-4 text-base font-bold text-[#04308F] shadow-md transition-all duration-300 hover:bg-[#04308F] hover:text-white hover:scale-105 lg:text-lg"
        >
          Explore Our Model
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
</style>
