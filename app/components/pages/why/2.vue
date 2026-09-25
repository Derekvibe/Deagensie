<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <section class="bg-[#FCFCFE] py-15 lg:py-24">
    <div class="mx-auto w-5/6 max-w-7xl space-y-10 lg:space-y-12">
      <h2 class="text-center text-2xl leading-normal font-semibold lg:text-5xl lg:leading-normal">
        Our AI Capabilities Include
      </h2>
      <ul
        class="*:bg-background **:[div]:text-background space-y-6 *:rounded-[calc(var(--radius)+2px)] *:border *:border-[#E2E2E2] *:px-5 *:py-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0 **:[div]:box-content **:[div]:grid **:[div]:size-12 **:[div]:place-items-center **:[div]:rounded-full **:[div]:border **:[div]:bg-(--bg-color) **:[div]:text-3xl **:[h3]:mt-5 **:[h3]:mb-4 **:[h3]:min-h-[2lh] **:[h3]:text-xl **:[h3]:leading-snug **:[h3]:font-medium xl:**:[h3]:min-h-0"
      >
        <li>
          <div style="--bg-color: #026662">
            <Icon icon="icon-park-solid:trend-two" />
          </div>
          <h3>Market Trend Analysis</h3>
          <p>Spotting emerging movements before they become mainstream</p>
        </li>
        <li>
          <div style="--bg-color: #cb30e0">
            <Icon icon="fluent:people-audience-20-filled" />
          </div>
          <h3>Consumer Behavior Prediction</h3>
          <p>Understanding what your audience will want next</p>
        </li>
        <li>
          <div style="--bg-color: #6155f5">
            <Icon icon="heroicons-solid:lightning-bolt" />
          </div>
          <h3>Performance Intelligence</h3>
          <p>Real-time campaign optimization</p>
        </li>
        <li>
          <div style="--bg-color: #34c759">
            <Icon icon="mingcute:target-fill" />
          </div>
          <h3>Brand Positioning Modeling</h3>
          <p>Testing strategic directions before launch</p>
        </li>
        <li>
          <div style="--bg-color: #ff8d28">
            <Icon icon="fluent:data-pie-32-filled" />
          </div>
          <h3>Data-Driven Creative Optimization</h3>
          <p>Refining messaging using behavioral data</p>
        </li>
        <li>
          <div style="--bg-color: #04308f">
            <Icon icon="uil:chart" />
          </div>
          <h3>Predictive Growth Analytics</h3>
          <p>Forecasting market opportunities and trends</p>
        </li>
      </ul>
    </div>
  </section>
</template>
