<template>
  <section
    id="about_who-we-are"
    class="overflow-hidden border-b border-gray-100 bg-white py-20 text-gray-900 lg:py-32"
  >
    <div
      class="mx-auto grid w-5/6 max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16"
    >
      <div v-reveal="'fade-right'" class="space-y-6">
        <span
          class="inline-block rounded-full bg-[#04308F]/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#04308F] uppercase"
        >
          Who We Are
        </span>
        <h2
          class="font-serif text-3xl leading-tight font-normal tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
        >
          Engineering dominance through tech & creativity
        </h2>
        <div class="space-y-4 text-base leading-relaxed font-normal text-gray-500">
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
            Unlike traditional creative agencies, Deagensie is a tech-driven, ecosystem-based
            creative growth agency—the first of its kind. We build bridges between creative talent
            and businesses, ensuring startups scale faster and creatives thrive without borders.
          </p>
        </div>
      </div>

      <div v-reveal="'fade-left'" class="relative mx-auto w-full max-w-lg lg:max-w-none">
        <div
          class="relative aspect-4/3 overflow-hidden rounded-3xl border border-gray-100 bg-gray-100 shadow-2xl shadow-gray-200/60 sm:aspect-16/10"
        >
          <NuxtImg
            src="/images/pages/about/who-we-are.webp"
            alt="Who We Are - Deagensie"
            class="size-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div
            class="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css"></style>
