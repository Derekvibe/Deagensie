<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <section class="overflow-hidden border-t border-gray-100 bg-white py-24 text-gray-900 lg:py-32">
    <div class="mx-auto w-5/6 max-w-7xl space-y-16 lg:space-y-20">
      <!-- Andela-Style Section Editorial Header (Screenshot 5 Header) -->
      <div class="mx-auto max-w-3xl space-y-4 text-center">
        <h2
          class="font-serif text-3xl leading-tight font-normal tracking-tight text-gray-900 sm:text-4xl lg:text-5xl 2xl:text-6xl"
        >
          One platform to scale brand, talent, and AI
        </h2>
        <p class="text-base leading-relaxed font-normal text-gray-600 lg:text-lg">
          Access world-class creatives, production delivery, and AI workforce workflows in a single
          platform designed for enterprise digital transformation.
        </p>
      </div>

      <!-- Andela Single Platform Split Card Container (Screenshot 5 Split Card) -->
      <div
        class="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-100/80"
      >
        <div class="grid grid-cols-1 items-stretch lg:grid-cols-12">
          <!-- Left Column Content -->
          <div class="flex flex-col justify-center space-y-6 p-8 sm:p-12 lg:col-span-6 lg:p-14">
            <span
              class="inline-block w-fit rounded-md bg-gray-100 px-3 py-1 text-xs font-bold tracking-wider text-gray-600 uppercase"
            >
              INTEGRATED ECOSYSTEM
            </span>
            <h3
              class="font-serif text-2xl leading-snug font-normal tracking-tight text-gray-900 sm:text-3xl lg:text-4xl"
            >
              Deploy AI-native teams into production systems
            </h3>
            <p class="text-base leading-relaxed font-normal text-gray-600">
              Imagine a business growth partner that doesn&apos;t just brand or market—but
              seamlessly integrates talent, strategy, and tech into a unified execution machine.
            </p>

            <!-- Checkmark Bullet List (Screenshot 5 Checkmarks) -->
            <ul class="space-y-3.5 pt-2 text-sm font-medium text-gray-700 sm:text-base">
              <li class="flex items-start gap-3">
                <Icon
                  icon="lucide:check"
                  class="mt-0.5 shrink-0 text-xl font-bold text-[#05DED5]"
                />
                <span><strong>Builders:</strong> AI & Brand Strategy Architects</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  icon="lucide:check"
                  class="mt-0.5 shrink-0 text-xl font-bold text-[#05DED5]"
                />
                <span><strong>Integrators:</strong> Scalable UI/UX & Web Infrastructure</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  icon="lucide:check"
                  class="mt-0.5 shrink-0 text-xl font-bold text-[#05DED5]"
                />
                <span><strong>Scalers:</strong> On-Demand Embedded Creative Talents</span>
              </li>
            </ul>

            <div class="pt-4">
              <NuxtLink
                to="/"
                class="inline-flex items-center gap-2 text-base font-bold text-[#04308F] transition-colors duration-200 hover:text-[#05DED5]"
              >
                <span>Learn more</span>
                <Icon
                  icon="lucide:arrow-right"
                  class="text-lg transition-transform duration-200 hover:translate-x-1"
                />
              </NuxtLink>
            </div>
          </div>

          <!-- Right Column Media Container with Floating Profile Badge (Screenshot 5 Right Media) -->
          <div
            class="relative flex min-h-90 items-center justify-center bg-emerald-50/60 p-6 sm:p-10 lg:col-span-6"
          >
            <div class="relative h-full max-h-105 w-full overflow-hidden rounded-2xl shadow-md">
              <NuxtImg
                src="/images/pages/(home)/image2.png"
                alt="Deagensie Integrated Talent Platform"
                class="size-full object-cover"
              />
              <div
                class="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"
              />

              <!-- Floating Profile Badge (Screenshot 5 Overlay) -->
              <div
                class="absolute bottom-6 left-6 space-y-1 rounded-2xl border border-white/40 bg-white/95 px-4 py-3 text-gray-900 shadow-xl backdrop-blur-md"
              >
                <p class="text-sm font-bold text-gray-900">Victor Ephraim</p>
                <p class="text-xs font-semibold text-[#04308F]">Head of Creative Operations</p>
                <div class="flex items-center gap-1.5 pt-1 text-[11px] font-medium text-gray-500">
                  <Icon icon="simple-icons:github" class="text-xs text-black" />
                  <span>GitHub Verified • Deagensie Ecosystem</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Feature Grid Cards -->
      <div class="grid grid-cols-1 gap-8 pt-4 md:grid-cols-3 lg:gap-10">
        <article
          class="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#04308F]/40 hover:shadow-xl lg:p-10"
        >
          <div
            class="mb-4 size-3 rounded-full bg-[#05DED5] transition-transform duration-300 group-hover:scale-150"
          />
          <h3
            class="mb-3 font-serif text-xl font-normal text-gray-900 group-hover:text-[#04308F] lg:text-2xl"
          >
            Beyond Branding — Growth Pipelines
          </h3>
          <p class="text-sm leading-relaxed font-normal text-gray-600 lg:text-base">
            We don&apos;t just design logos or campaigns; we engineer business growth. Our talent
            community matches businesses with in-demand creative professionals.
          </p>
        </article>

        <article
          class="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#04308F]/40 hover:shadow-xl lg:p-10"
        >
          <div
            class="mb-4 size-3 rounded-full bg-[#04308F] transition-transform duration-300 group-hover:scale-150"
          />
          <h3
            class="mb-3 font-serif text-xl font-normal text-gray-900 group-hover:text-[#04308F] lg:text-2xl"
          >
            From Outsourcing to Talent Ownership
          </h3>
          <p class="text-sm leading-relaxed font-normal text-gray-600 lg:text-base">
            Unlike traditional gig platforms, we upskill and nurture creatives, offering startups
            long-term, cost-effective partnerships instead of short-term hires.
          </p>
        </article>

        <article
          class="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#04308F]/40 hover:shadow-xl lg:p-10"
        >
          <div
            class="mb-4 size-3 rounded-full bg-[#8F039C] transition-transform duration-300 group-hover:scale-150"
          />
          <h3
            class="mb-3 font-serif text-xl font-normal text-gray-900 group-hover:text-[#04308F] lg:text-2xl"
          >
            Growth-as-a-Service (GaaS)
          </h3>
          <p class="text-sm leading-relaxed font-normal text-gray-600 lg:text-base">
            Subscription-based creative solutions allowing startups to scale branding, marketing,
            and digital needs without agency friction.
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css"></style>
