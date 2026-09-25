<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { PaymentVerifyResponse } from '~/types/api';

const route = useRoute();
const { $api } = useNuxtApp();
const { code, planCode, offering, plan } = await useSubscriptionPlanContext();
const reference = computed(() => String(route.params.reference || ''));

const {
  data: verification,
  pending,
  error,
  refresh,
} = await useAsyncData(
  () => `payment-verify-${reference.value}`,
  () => $api<PaymentVerifyResponse>(`/payments/verify/${encodeURIComponent(reference.value)}`),
  {
    watch: [reference],
    immediate: reference.value.length > 0,
  }
);

const vatAmount = computed(() =>
  plan.value ? Math.round((plan.value.price * plan.value.vatPercent) / 100) : 0
);
const amountPaid = computed(
  () => verification.value?.breakdown?.total || (plan.value?.price || 0) + vatAmount.value
);
const dateLabel = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
}).format(new Date());

const isSuccess = computed(() => verification.value?.status === 'success');
const isPending = computed(() => verification.value?.status === 'pending');
const isFailed = computed(
  () => verification.value?.status === 'failed' || verification.value?.status === 'abandoned'
);
</script>

<template>
  <section class="mx-auto my-16 w-5/6 max-w-xl py-16 lg:my-20 lg:py-20">
    <template v-if="pending">
      <Skeleton class="mx-auto aspect-square w-292/353 max-w-[292px] rounded-full" />
      <Skeleton class="mx-auto my-6 h-14 w-2/3" />
      <Skeleton class="mx-auto h-6 w-4/5" />
    </template>

    <div v-else-if="error || !verification || !plan || !offering" class="text-center">
      <Icon
        icon="hugeicons:alert-02"
        class="text-destructive inline-block w-292/353 max-w-[292px]"
      />
      <h1 class="mt-4 text-2xl leading-normal! font-semibold lg:text-5xl">
        Unable to verify payment
      </h1>
      <p
        class="mx-auto mt-3 max-w-4xl text-sm leading-relaxed text-current/60 lg:text-lg lg:leading-snug"
      >
        We could not verify this payment right now. You can retry verification or return to
        checkout.
      </p>
      <div
        class="mt-8 grid gap-4 text-lg leading-snug font-medium *:flex *:items-center *:justify-center *:gap-2 *:rounded-md *:border *:p-3.5 sm:grid-cols-2"
      >
        <button type="button" class="border-[#05DED5] bg-[#05DED5]" @click="refresh()">
          <Icon icon="hugeicons:refresh-03" />
          Retry verification
        </button>
        <NuxtLink :to="`${getPlanRoute(code, planCode)}/checkout`" class="border-current">
          Back to checkout
        </NuxtLink>
      </div>
    </div>

    <div v-else-if="isSuccess" class="text-center">
      <svg
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 292 292"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="mx-auto w-292/353 max-w-[292px]"
      >
        <path
          d="M190.622 260.656C183.723 260.63 177.011 258.409 171.459 254.314L151.749 239.896C149.304 238.095 146.346 237.124 143.309 237.124C140.271 237.124 137.314 238.095 134.868 239.896L115.158 254.314C110.061 258.036 103.993 260.198 97.6902 260.536C91.3878 260.874 85.1229 259.374 79.657 256.218C74.1912 253.062 69.7597 248.386 66.9014 242.759C64.0431 237.132 62.8809 230.796 63.5562 224.521L66.2025 200.248C66.5422 197.232 65.9057 194.186 64.3865 191.558C62.8673 188.93 60.5454 186.859 57.7618 185.648L35.4512 175.793C29.6626 173.255 24.7386 169.086 21.2812 163.795C17.8237 158.504 15.9824 152.32 15.9824 146C15.9824 139.679 17.8237 133.496 21.2812 128.205C24.7386 122.914 29.6626 118.745 35.4512 116.207L57.7618 106.352C60.5454 105.141 62.8673 103.07 64.3865 100.442C65.9057 97.814 66.5422 94.7682 66.2025 91.7518L63.5562 67.4793C62.8809 61.2041 64.0431 54.8678 66.9014 49.2406C69.7597 43.6135 74.1912 38.9379 79.657 35.7821C85.1229 32.6263 91.3878 31.1262 97.6902 31.4642C103.993 31.8023 110.061 33.9639 115.158 37.6862L134.868 52.1037C137.314 53.9046 140.271 54.8761 143.309 54.8761C146.346 54.8761 149.304 53.9046 151.749 52.1037L171.459 37.6862C174.969 35.0883 178.975 33.2378 183.228 32.2491C187.481 31.2603 191.892 31.1542 196.188 31.9375C200.577 32.7337 204.759 34.4093 208.483 36.8635C212.207 39.3176 215.397 42.4996 217.86 46.2181C218.543 47.2183 219.02 48.3444 219.263 49.5307C219.506 50.7171 219.511 51.94 219.277 53.1282C219.042 54.3164 218.574 55.446 217.899 56.4513C217.223 57.4566 216.355 58.3175 215.343 58.9836C214.332 59.6498 213.198 60.108 212.008 60.3315C210.818 60.555 209.595 60.5393 208.411 60.2854C207.227 60.0315 206.105 59.5444 205.111 58.8525C204.117 58.1606 203.271 57.2778 202.621 56.2556C201.52 54.6008 200.095 53.1859 198.433 52.0961C196.771 51.0062 194.905 50.2638 192.949 49.9137C191.065 49.5663 189.129 49.6183 187.266 50.0663C185.403 50.5143 183.656 51.3483 182.136 52.5143L162.426 66.9318C156.847 71.0205 150.111 73.2248 143.195 73.2248C136.278 73.2248 129.542 71.0205 123.964 66.9318L104.299 52.5143C102.065 50.8175 99.3794 49.8166 96.5792 49.6366C93.779 49.4567 90.9878 50.1057 88.5542 51.5025C86.1207 52.8994 84.1525 54.9823 82.8956 57.491C81.6387 59.9997 81.1487 62.8232 81.4868 65.6087L84.1331 89.8356C84.9285 96.6908 83.517 103.621 80.1036 109.619C76.6903 115.617 71.453 120.37 65.1531 123.187L42.7968 133.042C40.2628 134.167 38.1096 136.003 36.5983 138.327C35.087 140.652 34.2825 143.364 34.2825 146.137C34.2825 148.909 35.087 151.622 36.5983 153.946C38.1096 156.271 40.2628 158.106 42.7968 159.231L65.1531 168.812C71.4874 171.591 76.7677 176.321 80.2232 182.313C83.6788 188.305 85.1287 195.245 84.3612 202.119L81.715 226.346C81.3768 229.131 81.8668 231.955 83.1237 234.463C84.3807 236.972 86.3488 239.055 88.7824 240.452C91.2159 241.849 94.0071 242.498 96.8073 242.318C99.6076 242.138 102.293 241.137 104.527 239.44L124.192 225.022C129.77 220.934 136.506 218.729 143.423 218.729C150.339 218.729 157.075 220.934 162.654 225.022L182.364 239.44C184.599 241.137 187.284 242.138 190.084 242.318C192.884 242.498 195.675 241.849 198.109 240.452C200.542 239.055 202.511 236.972 203.767 234.463C205.024 231.955 205.514 229.131 205.176 226.346L202.53 202.119C201.734 195.275 203.141 188.356 206.546 182.366C209.951 176.377 215.177 171.629 221.464 168.812L243.821 158.957C246.355 157.833 248.508 155.997 250.019 153.673C251.53 151.348 252.335 148.635 252.335 145.863C252.335 143.091 251.53 140.378 250.019 138.054C248.508 135.729 246.355 133.893 243.821 132.769L231.684 127.75C230.555 127.29 229.529 126.608 228.667 125.745C227.806 124.882 227.126 123.855 226.668 122.724C226.21 121.594 225.984 120.383 226.002 119.164C226.02 117.944 226.282 116.741 226.773 115.624C227.264 114.508 227.974 113.502 228.861 112.664C229.747 111.827 230.793 111.176 231.936 110.749C233.078 110.323 234.295 110.13 235.513 110.182C236.732 110.234 237.928 110.529 239.03 111.051L251.166 116.389C256.955 118.927 261.879 123.096 265.336 128.387C268.794 133.678 270.635 139.862 270.635 146.182C270.635 152.503 268.794 158.687 265.336 163.978C261.879 169.269 256.955 173.438 251.166 175.976L228.856 185.831C226.073 187.046 223.749 189.116 222.223 191.742C220.697 194.367 220.048 197.411 220.369 200.431L223.016 224.703C223.781 230.985 222.664 237.353 219.804 242.998C216.945 248.644 212.473 253.313 206.956 256.412C201.976 259.231 196.344 260.694 190.622 260.656Z"
          fill="#0074FF"
        />
        <path
          d="M144.357 177.937C143.153 177.938 141.961 177.701 140.849 177.239C139.737 176.777 138.727 176.1 137.879 175.246L98.5955 135.962C97.6164 135.149 96.8184 134.139 96.2527 132.999C95.6871 131.858 95.3665 130.612 95.3113 129.34C95.2561 128.068 95.4677 126.799 95.9325 125.613C96.3972 124.428 97.1049 123.353 98.0099 122.458C98.9149 121.563 99.9972 120.866 101.187 120.414C102.377 119.962 103.649 119.764 104.92 119.833C106.191 119.902 107.434 120.236 108.569 120.813C109.703 121.391 110.704 122.2 111.507 123.187L144.357 156.037L260.427 39.7849C262.166 38.2151 264.442 37.374 266.783 37.4358C269.125 37.4976 271.353 38.4574 273.006 40.1167C274.66 41.776 275.612 44.0075 275.665 46.3493C275.719 48.6911 274.87 50.9638 273.294 52.6968L150.79 175.2C149.951 176.057 148.95 176.739 147.846 177.209C146.743 177.679 145.557 177.926 144.357 177.937Z"
          fill="#FFB300"
        />
      </svg>
      <h1 class="mt-4 text-2xl leading-normal! font-semibold lg:text-5xl">Payment Successful</h1>
      <p
        class="mx-auto mt-3 max-w-4xl text-sm leading-relaxed text-current/60 lg:text-lg lg:leading-snug"
      >
        You're officially in. We've received your payment and your project is about to begin.
      </p>

      <div class="mt-8 bg-current/5 px-2 py-8 lg:px-4">
        <h2 class="text-center text-lg leading-snug font-medium">Order detail</h2>
        <dl class="mt-4 divide-y">
          <div class="flex justify-between py-3.5">
            <dt class="text-foreground/40">Package</dt>
            <dd class="text-right lg:text-xl">{{ plan.name }}</dd>
          </div>
          <div class="flex justify-between py-3.5">
            <dt class="text-foreground/40">Plan Type</dt>
            <dd class="text-right lg:text-xl">{{ plan.billingLabel }}</dd>
          </div>
          <div class="flex justify-between py-3.5">
            <dt class="text-foreground/40">Amount Paid</dt>
            <dd class="text-right lg:text-xl">{{ formatPlanMoney(amountPaid, plan.currency) }}</dd>
          </div>
          <div class="flex justify-between py-3.5">
            <dt class="text-foreground/40">Payment Method</dt>
            <dd class="text-right lg:text-xl">Paystack</dd>
          </div>
          <div class="flex justify-between py-3.5">
            <dt class="text-foreground/40">Date</dt>
            <dd class="text-right lg:text-xl">{{ dateLabel }}</dd>
          </div>
        </dl>
      </div>

      <div class="mt-8">
        <h2 class="text-center text-2xl leading-normal font-semibold lg:text-left">
          What happens next
        </h2>
        <ol class="mt-6 space-y-4">
          <li
            v-for="(step, index) in [
              ['Confirm email', 'Check email for order confirmation and receipt'],
              ['Account setup', 'Our team will contact you within 24 hours to set up your account'],
              [
                'Kickoff meeting',
                'Schedule your project kickoff call with your dedicated account manager',
              ],
              ['Get Started', 'Begin your journey with exceptional growth with Deagensie'],
            ]"
            :key="step[0]"
            class="flex gap-2"
          >
            <span
              class="text-background grid size-[1lh] shrink-0 place-items-center rounded-full bg-[#04308F]"
            >
              {{ index + 1 }}
            </span>
            <span class="text-left">
              <span class="block text-sm leading-relaxed font-medium">{{ step[0] }}</span>
              <span class="text-foreground/55 mt-2 block text-xs leading-normal">
                {{ step[1] }}
              </span>
            </span>
          </li>
        </ol>
      </div>

      <div
        class="mt-8 grid gap-4 text-lg leading-snug font-medium *:flex *:items-center *:justify-center *:gap-2 *:rounded-full *:border *:p-3.5 sm:grid-cols-2"
      >
        <NuxtLink to="/" class="rounded-full border-[#05DED5] bg-[#05DED5]"> Go to Home </NuxtLink>
        <button type="button" class="rounded-full border-current">Download receipt</button>
      </div>
    </div>

    <div v-else class="text-center">
      <Icon
        :icon="isPending ? 'hugeicons:clock-01' : 'hugeicons:cancel-circle'"
        :class="[
          'linline-block w-292/353 max-w-[292px]',
          isPending ? 'text-amber-500' : 'text-destructive',
        ]"
      />
      <h1 class="mt-4 text-2xl leading-normal! font-semibold lg:text-5xl">
        {{ isPending ? 'Payment pending' : 'Payment not completed' }}
      </h1>
      <p
        class="mx-auto mt-3 max-w-4xl text-sm leading-relaxed text-current/60 lg:text-lg lg:leading-snug"
      >
        <template v-if="isPending">
          Paystack has not confirmed this payment yet. Retry verification in a moment.
        </template>
        <template v-else-if="isFailed">
          This payment was not successful. You can return to checkout and try again.
        </template>
        <template v-else>
          We received an unexpected payment status. Retry verification or return to checkout.
        </template>
      </p>
      <div
        class="mt-8 grid gap-4 text-lg leading-snug font-medium *:flex *:items-center *:justify-center *:gap-2 *:rounded-full *:border *:p-3.5 sm:grid-cols-2"
      >
        <button type="button" class="rounded-full border-[#05DED5] bg-[#05DED5]" @click="refresh()">
          Retry verification
        </button>
        <NuxtLink
          :to="`${getPlanRoute(code, planCode)}/checkout`"
          class="rounded-full border-current"
        >
          Back to checkout
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
