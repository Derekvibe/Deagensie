<template>
  <section class="bg-foreground text-background">
    <div class="mx-auto w-5/6 max-w-7xl">
      <div class="h-dvh content-end py-16 lg:w-7/10 lg:py-20">
        <p class="text-lg leading-snug font-medium text-[#05F4EA] uppercase">Our Solutions</p>
        <h1
          class="mt-4 text-2xl leading-normal font-semibold lg:text-4xl xl:text-5xl xl:leading-tight"
        >
          How Our Experts<br />Elevate Your Business
        </h1>
        <p class="mt-4 lg:mt-6 lg:mb-10 lg:text-lg xl:text-xl xl:leading-tight">
          We combine research, creativity, and strategic frameworks to deliver comprehensive
          solutions that drive long-term success and measurable results.
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
    url(/images/pages/business/hero.webp);
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
