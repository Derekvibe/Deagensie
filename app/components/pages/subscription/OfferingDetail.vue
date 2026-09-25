<script setup lang="ts">
import type { OfferingPlan } from '~/types/api';
import { Icon } from '@iconify/vue';

const { code, offering, pending, error, refresh } = await useSubscriptionPlanContext();

const planCardClass = (plan: OfferingPlan) => [
  'flex h-full flex-col rounded-3xl border py-8 px-6 transition-all duration-300 relative group',
  plan.highlighted
    ? 'border-[#04308F] bg-[#04308F] text-white shadow-xl shadow-[#04308F]/20 scale-102 z-10'
    : 'border-gray-100 bg-white text-gray-900 shadow-sm hover:shadow-xl hover:border-gray-200',
];

const buttonClass = (plan: OfferingPlan) => [
  'mt-8 w-full rounded-full py-3.5 text-center text-sm font-semibold transition-all duration-300 block',
  plan.highlighted
    ? 'bg-[#05DED5] text-gray-900 hover:bg-white'
    : 'bg-[#04308F] text-white hover:bg-[#05DED5] hover:text-gray-900 shadow-md shadow-[#04308F]/20',
];

const getGridClasses = (planCount: number) => {
  if (planCount === 1) return 'grid-cols-1 max-w-md mx-auto';
  if (planCount === 2) return 'md:grid-cols-2 max-w-4xl mx-auto';
  if (planCount === 3) return 'lg:grid-cols-3 max-w-6xl mx-auto';
  if (planCount >= 4) return 'lg:grid-cols-4';
  return '';
};
</script>

<template>
  <section class="mx-auto w-5/6 max-w-7xl">
    <div v-if="error" class="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-sm">
      <p>Failed to load offering details.</p>
      <button type="button" class="mt-3 font-semibold text-[#04308F]" @click="refresh()">
        Retry
      </button>
    </div>

    <div v-else-if="pending" class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <Skeleton v-for="n in 3" :key="n" class="h-[520px] rounded-3xl" />
    </div>

    <template v-else-if="offering">
      <!-- Pricing Cards Container -->
      <div v-reveal="'scale-in'" class="py-8">
        <div class="grid items-stretch gap-8" :class="getGridClasses(offering.plans.length)">
          <article v-for="plan in offering.plans" :key="plan.code" :class="planCardClass(plan)">
            <!-- Most Popular Badge -->
            <div
              v-if="plan.mostPopular"
              class="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#05DED5] px-4 py-1 text-xs font-semibold uppercase tracking-wider text-gray-900 shadow-sm"
            >
              Most Popular
            </div>

            <div class="space-y-3">
              <h4 class="text-2xl font-serif font-normal tracking-tight">
                {{ plan.name }}
              </h4>
              <p
                class="text-xs sm:text-sm leading-relaxed font-normal min-h-[3lh]"
                :class="plan.highlighted ? 'text-gray-200' : 'text-gray-500'"
              >
                {{ plan.description }}
              </p>
            </div>

            <div
              v-if="plan.note"
              class="mt-4 rounded-xl border-l-3 p-3.5 text-xs leading-relaxed"
              :class="
                plan.highlighted
                  ? 'border-[#05DED5] bg-white/10 text-gray-200'
                  : 'border-[#04308F] bg-gray-50 text-gray-700'
              "
            >
              {{ plan.note }}
            </div>

            <div class="mt-6 border-t border-b py-6" :class="plan.highlighted ? 'border-white/10' : 'border-gray-100'">
              <div class="flex items-baseline gap-1">
                <strong class="text-3xl sm:text-4xl font-serif font-normal">
                  {{ formatPlanMoney(plan.price, plan.currency) }}
                </strong>
                <span
                  class="text-xs font-medium"
                  :class="plan.highlighted ? 'text-gray-300' : 'text-gray-500'"
                >
                  / {{ plan.billingLabel }}
                </span>
              </div>
            </div>

            <NuxtLink :to="getPlanRoute(code, plan.code)" :class="buttonClass(plan)">
              {{ plan.ctaLabel }}
            </NuxtLink>

            <div class="mt-8 space-y-4 flex-1">
              <section
                v-for="sec in plan.featureSections"
                :key="`${plan.code}-${sec.title || 'features'}`"
              >
                <h5
                  v-if="sec.title"
                  class="mb-3 text-xs uppercase tracking-wider font-semibold"
                  :class="plan.highlighted ? 'text-[#05DED5]' : 'text-[#04308F]'"
                >
                  {{ sec.title }}
                </h5>

                <ul class="space-y-2">
                  <li
                    v-for="item in sec.items"
                    :key="item"
                    class="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed"
                  >
                    <Icon
                      icon="hugeicons:tick-02"
                      class="text-base shrink-0 mt-0.5"
                      :class="plan.highlighted ? 'text-[#05DED5]' : 'text-[#04308F]'"
                    />
                    <span :class="plan.highlighted ? 'text-gray-200' : 'text-gray-600'">
                      {{ item }}
                    </span>
                  </li>
                </ul>
              </section>
            </div>
          </article>
        </div>
      </div>

      <!-- Content Sections -->
      <div v-if="offering.contentSections.length" class="space-y-16 py-16 lg:space-y-24">
        <section
          v-for="(section, sectionIndex) in offering.contentSections"
          :key="`${offering.code}-content-${sectionIndex}`"
          v-reveal="'fade-up'"
        >
          <template v-if="section.type === 'feature-grid'">
            <h2
              v-if="section.title"
              class="mx-auto mb-10 max-w-4xl text-center text-3xl font-serif font-normal text-gray-900 sm:text-4xl"
            >
              {{ section.title }}
            </h2>

            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <article
                v-for="item in section.items"
                :key="item.title"
                class="rounded-3xl border border-gray-100 bg-gray-50/50 p-6 shadow-2xs space-y-4"
              >
                <div class="size-12 rounded-2xl bg-[#04308F]/10 text-[#04308F] flex items-center justify-center text-2xl">
                  <Icon :icon="item.icon" />
                </div>
                <h3 class="text-xl font-serif font-normal text-gray-900">
                  {{ item.title }}
                </h3>
                <p class="text-xs text-gray-500 leading-relaxed font-normal">
                  {{ item.description }}
                </p>
              </article>
            </div>
          </template>

          <template v-else-if="section.type === 'cta-band'">
            <div class="rounded-3xl bg-[#04308F] text-white p-8 sm:p-12 text-center space-y-6">
              <h2 class="text-2xl sm:text-4xl font-serif font-normal text-white">
                {{ section.title }}
              </h2>
              <p class="max-w-2xl mx-auto text-sm sm:text-base text-gray-200 font-normal leading-relaxed">
                {{ section.subtitle }}
              </p>
              <div class="pt-2">
                <NuxtLink
                  :to="section.buttonHref || '/contact'"
                  class="inline-flex items-center gap-2 rounded-full bg-[#05DED5] px-8 py-3.5 text-sm font-semibold text-gray-900 hover:bg-white transition-colors"
                >
                  {{ section.buttonLabel }}
                </NuxtLink>
              </div>
            </div>
          </template>
        </section>
      </div>
    </template>
  </section>
</template>

<style scoped lang="css">
</style>
