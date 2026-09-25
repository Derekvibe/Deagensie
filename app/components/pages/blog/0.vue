<template>
  <section class="bg-foreground text-background">
    <div class="mx-auto w-5/6 max-w-7xl">
      <div class="h-dvh content-end py-16 lg:w-7/10 lg:py-20">
        <p class="text-lg leading-snug font-medium text-[#05F4EA] uppercase">Blog & Insights</p>
        <h1
          class="mt-4 text-2xl leading-normal font-semibold lg:text-4xl xl:text-5xl xl:leading-tight"
        >
          Where Businesses Grow <br />
          and Creatives Thrive
        </h1>
        <p class="mt-4 lg:mt-6 lg:mb-10 lg:text-lg xl:text-xl xl:leading-tight">
          Empowering businesses and creatives <br />
          with skills, insights, and strategies <br />
          to innovate and succeed in the digital creative economy.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
section {
  background-image:
    linear-gradient(
      256.6deg,
      rgb(from black r g b / 0%) 21.56%,
      rgb(from black r g b / 94%) 71.03%
    ),
    url(/images/pages/blog/hero.webp);
  background-repeat: no-repeat, no-repeat;
  background-size: auto, cover;
  background-position:
    50% 50%,
    50% 50%;

  @media (width >= 64rem) {
    background-size: auto, cover;
  }
}
</style>
