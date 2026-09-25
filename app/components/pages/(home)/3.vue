<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <section class="bg-white text-gray-900 py-24 lg:py-32 overflow-hidden border-t border-gray-100">
    <div class="mx-auto w-5/6 max-w-7xl space-y-16 lg:space-y-20">
      <!-- Andela-Style Section Editorial Header (Screenshot 5 Header) -->
      <div class="mx-auto max-w-3xl text-center space-y-4">
        <h2
          class="text-3xl font-serif font-normal tracking-tight leading-tight sm:text-4xl lg:text-5xl 2xl:text-6xl text-gray-900"
        >
          One platform to scale brand, talent, and AI
        </h2>
        <p class="text-base text-gray-600 lg:text-lg leading-relaxed font-normal">
          Access world-class creatives, production delivery, and AI workforce workflows in a single platform designed for enterprise digital transformation.
        </p>
      </div>

      <!-- Andela Single Platform Split Card Container (Screenshot 5 Split Card) -->
      <div class="rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-100/80 overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <!-- Left Column Content -->
          <div class="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-center space-y-6">
            <span class="inline-block rounded-md bg-gray-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-600 w-fit">
              INTEGRATED ECOSYSTEM
            </span>
            <h3 class="text-2xl font-serif font-normal leading-snug tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
              Deploy AI-native teams into production systems
            </h3>
            <p class="text-base leading-relaxed text-gray-600 font-normal">
              Imagine a business growth partner that doesn&apos;t just brand or market—but seamlessly integrates talent, strategy, and tech into a unified execution machine.
            </p>

            <!-- Checkmark Bullet List (Screenshot 5 Checkmarks) -->
            <ul class="space-y-3.5 text-sm sm:text-base text-gray-700 font-medium pt-2">
              <li class="flex items-start gap-3">
                <Icon icon="lucide:check" class="text-[#05DED5] text-xl font-bold mt-0.5 shrink-0" />
                <span><strong>Builders:</strong> AI & Brand Strategy Architects</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon icon="lucide:check" class="text-[#05DED5] text-xl font-bold mt-0.5 shrink-0" />
                <span><strong>Integrators:</strong> Scalable UI/UX & Web Infrastructure</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon icon="lucide:check" class="text-[#05DED5] text-xl font-bold mt-0.5 shrink-0" />
                <span><strong>Scalers:</strong> On-Demand Embedded Creative Talents</span>
              </li>
            </ul>

            <div class="pt-4">
              <NuxtLink
                to="/"
                class="inline-flex items-center gap-2 font-bold text-[#04308F] transition-colors duration-200 hover:text-[#05DED5] text-base"
              >
                <span>Learn more</span>
                <Icon icon="lucide:arrow-right" class="text-lg transition-transform duration-200 hover:translate-x-1" />
              </NuxtLink>
            </div>
          </div>

          <!-- Right Column Media Container with Floating Profile Badge (Screenshot 5 Right Media) -->
          <div class="lg:col-span-6 bg-emerald-50/60 p-6 sm:p-10 flex items-center justify-center relative min-h-90">
            <div class="relative w-full h-full max-h-105 rounded-2xl overflow-hidden shadow-md">
              <NuxtImg
                src="/images/pages/(home)/image2.png"
                alt="Deagensie Integrated Talent Platform"
                class="size-full object-cover"
              />
              <div class="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

              <!-- Floating Profile Badge (Screenshot 5 Overlay) -->
              <div class="absolute bottom-6 left-6 rounded-2xl bg-white/95 backdrop-blur-md px-4 py-3 shadow-xl border border-white/40 text-gray-900 space-y-1">
                <p class="font-bold text-sm text-gray-900">Victor Ephraim</p>
                <p class="text-xs text-[#04308F] font-semibold">Head of Creative Operations</p>
                <div class="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium pt-1">
                  <Icon icon="simple-icons:github" class="text-black text-xs" />
                  <span>GitHub Verified • Deagensie Ecosystem</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Feature Grid Cards -->
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10 pt-4">
        <article
          class="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#04308F]/40 hover:shadow-xl lg:p-10"
        >
          <div class="mb-4 size-3 rounded-full bg-[#05DED5] transition-transform duration-300 group-hover:scale-150" />
          <h3 class="mb-3 text-xl font-serif font-normal text-gray-900 group-hover:text-[#04308F] lg:text-2xl">
            Beyond Branding — Growth Pipelines
          </h3>
          <p class="text-sm leading-relaxed text-gray-600 font-normal lg:text-base">
            We don&apos;t just design logos or campaigns; we engineer business growth. Our talent community matches businesses with in-demand creative professionals.
          </p>
        </article>

        <article
          class="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#04308F]/40 hover:shadow-xl lg:p-10"
        >
          <div class="mb-4 size-3 rounded-full bg-[#04308F] transition-transform duration-300 group-hover:scale-150" />
          <h3 class="mb-3 text-xl font-serif font-normal text-gray-900 group-hover:text-[#04308F] lg:text-2xl">
            From Outsourcing to Talent Ownership
          </h3>
          <p class="text-sm leading-relaxed text-gray-600 font-normal lg:text-base">
            Unlike traditional gig platforms, we upskill and nurture creatives, offering startups long-term, cost-effective partnerships instead of short-term hires.
          </p>
        </article>

        <article
          class="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#04308F]/40 hover:shadow-xl lg:p-10"
        >
          <div class="mb-4 size-3 rounded-full bg-[#8F039C] transition-transform duration-300 group-hover:scale-150" />
          <h3 class="mb-3 text-xl font-serif font-normal text-gray-900 group-hover:text-[#04308F] lg:text-2xl">
            Growth-as-a-Service (GaaS)
          </h3>
          <p class="text-sm leading-relaxed text-gray-600 font-normal lg:text-base">
            Subscription-based creative solutions allowing startups to scale branding, marketing, and digital needs without agency friction.
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
</style>


