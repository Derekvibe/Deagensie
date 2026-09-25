<template>
  <section id="about_who-we-are" class="bg-white text-gray-900 py-20 lg:py-32 overflow-hidden border-b border-gray-100">
    <div
      class="mx-auto w-5/6 max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
    >
      <div v-reveal="'fade-right'" class="space-y-6">
        <span class="text-xs uppercase tracking-widest text-[#04308F] font-semibold bg-[#04308F]/10 px-4 py-1.5 rounded-full inline-block">
          Who We Are
        </span>
        <h2 class="text-3xl font-serif font-normal tracking-tight sm:text-4xl lg:text-5xl text-gray-900 leading-tight">
          Engineering dominance through tech & creativity
        </h2>
        <div class="space-y-4 text-base text-gray-500 leading-relaxed font-normal">
          <p>
            Deagensie isn&apos;t just an agency—it&apos;s a growth engine, a predictive intelligence
            platform, and a business accelerator in one. We don&apos;t just design brands. We build
            legacies. We don&apos;t just market businesses. We engineer their dominance.
          </p>
          <p>
            Imagine a business growth agency that doesn&apos;t just brand, market, or build digital
            products—but seamlessly integrates all three into a single, AI-powered ecosystem that
            fuels business success from ideation to market dominance.
          </p>
          <p>
            Unlike traditional creative agencies, Deagensie is a tech-driven, ecosystem-based creative growth agency—the first of its kind. We build bridges between creative talent and businesses, ensuring startups scale faster and creatives thrive without borders.
          </p>
        </div>
      </div>

      <div v-reveal="'fade-left'" class="relative mx-auto w-full max-w-lg lg:max-w-none">
        <div class="relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-100 shadow-2xl shadow-gray-200/60 aspect-4/3 sm:aspect-16/10">
          <NuxtImg
            src="/images/pages/about/who-we-are.webp"
            alt="Who We Are - Deagensie"
            class="size-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div class="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
</style>
