<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { Icon } from '@iconify/vue';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import type { PaymentInitRequest, PaymentInitResponse } from '~/types/api';
import { normalizeApiError, notifyApiFailure, pickFormErrors } from '~/utils/api-errors';
import { useMediaQuery } from '@vueuse/core';

interface CheckoutFormValues {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  phone: string;
  country: string;
  stateCity: string;
  termsAccepted: boolean;
}

const checkoutFields = [
  'firstName',
  'lastName',
  'email',
  'companyName',
  'phone',
  'country',
  'stateCity',
  'termsAccepted',
] as const satisfies readonly (keyof CheckoutFormValues)[];

const schema = toTypedSchema(
  z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    email: z.email('Enter a valid email'),
    companyName: z.string().min(1, 'Company name is required'),
    phone: z
      .string()
      .min(1, 'Phone number is required')
      .refine(isValidPhoneNumber, 'Invalid phone number'),
    country: z.string().min(1, 'Country or region is required'),
    stateCity: z.string().min(1, 'State or city is required'),
    termsAccepted: z.literal(true, {
      error: 'You must agree to the terms before continuing',
    }),
  })
);

const { $api } = useNuxtApp();
const { code, planCode, offering, plan, pending, error } = await useSubscriptionPlanContext();

const { defineField, errors, handleSubmit, isSubmitting, meta, resetForm } =
  useForm<CheckoutFormValues>({
    validationSchema: schema,
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      companyName: '',
      phone: '',
      country: 'United States',
      stateCity: '',
      termsAccepted: false,
    },
  });

const [firstName, firstNameAttrs] = defineField('firstName');
const [lastName, lastNameAttrs] = defineField('lastName');
const [email, emailAttrs] = defineField('email');
const [companyName, companyNameAttrs] = defineField('companyName');
const [country] = defineField('country');
const [stateCity, stateCityAttrs] = defineField('stateCity');
const [termsAccepted, termsAcceptedAttrs] = defineField('termsAccepted');

const subtotal = computed(() => plan.value?.price || 0);
const vatAmount = computed(() =>
  Math.round((subtotal.value * (plan.value?.vatPercent || 0)) / 100)
);
const total = computed(() => subtotal.value + vatAmount.value);
const features = computed(() => (plan.value ? getPlanFeatures(plan.value) : []));
const isSubmitDisabled = computed(() => isSubmitting.value || !meta.value.valid || !plan.value);

// Tab state for mobile
const activeTab = ref('form');

const onSubmit = handleSubmit(async (values, actions) => {
  if (!plan.value) {
    return;
  }

  const callbackUrl = `${window.location.origin}${getPlanRoute(
    code.value,
    planCode.value
  )}/checkout/callback`;
  const payload: PaymentInitRequest = {
    planCode: plan.value.code,
    email: values.email,
    customerName: `${values.firstName} ${values.lastName}`,
    callbackUrl,
    metadata: {
      source: 'website',
      offeringCode: code.value,
      planCode: plan.value.code,
      companyName: values.companyName,
      phone: values.phone,
      country: values.country,
      stateCity: values.stateCity,
    },
  };

  try {
    const result = await $api<PaymentInitResponse>('/payments/initialize', {
      method: 'POST',
      body: payload,
    });

    resetForm();

    await navigateTo(result.authorizationUrl, {
      external: true,
    });
  } catch (err) {
    const failure = normalizeApiError(err);
    actions.setErrors(pickFormErrors(failure.fieldErrors, checkoutFields));
    notifyApiFailure(failure);
  }
});

const isMobile = useMediaQuery('(max-width: 1023px)');
</script>

<template>
  <section class="mx-auto my-16 w-5/6 max-w-7xl py-16 lg:my-20 lg:py-20">
    <div v-if="pending" class="grid gap-6 lg:grid-cols-[1fr_0.7fr]">
      <Skeleton class="h-[720px] rounded-[calc(var(--radius)+2px)]">{{}}</Skeleton>
      <Skeleton class="h-[640px] rounded-[calc(var(--radius)+2px)]">{{}}</Skeleton>
    </div>

    <div v-else-if="error || !offering || !plan" class="bg-background rounded-lg border p-8">
      <h1 class="text-3xl leading-tight font-semibold">Plan unavailable</h1>
      <p class="text-foreground/70 mt-3">
        We could not find the selected plan. Return to the offering and choose a plan again.
      </p>
      <NuxtLink
        :to="getOfferingRoute(code)"
        class="mt-6 inline-flex rounded-md bg-[#05DED5] px-6 py-3.5 text-lg leading-tight font-medium"
      >
        Back to offering
      </NuxtLink>
    </div>

    <template v-else>
      <header class="mb-10 lg:mb-12">
        <h1 class="text-3xl font-semibold lg:text-5xl lg:leading-normal">Complete Your Order</h1>
        <p class="text-foreground/65 mt-4 lg:text-lg lg:leading-snug">
          Fill in your details to get started with your {{ plan.name }}
        </p>
      </header>

      <!-- Desktop Side-by-Side Layout -->
      <div v-if="!isMobile" class="grid grid-cols-[1fr_0.7fr] gap-6">
        <form class="rounded-[calc(var(--radius)+2px)] border p-5 lg:p-6" @submit="onSubmit">
          <FieldSet>
            <FieldLegend class="mb-6 text-xl leading-normal">Account Information</FieldLegend>

            <FieldGroup class="gap-5">
              <div class="grid gap-5 lg:grid-cols-2">
                <Field :data-invalid="!!errors.firstName">
                  <FieldLabel for="checkout-first-name">First Name</FieldLabel>
                  <Input
                    id="checkout-first-name"
                    v-model="firstName"
                    v-bind="firstNameAttrs"
                    placeholder="First name"
                  />
                  <FieldError v-if="errors.firstName">{{ errors.firstName }}</FieldError>
                </Field>

                <Field :data-invalid="!!errors.lastName">
                  <FieldLabel for="checkout-last-name">Last Name</FieldLabel>
                  <Input
                    id="checkout-last-name"
                    v-model="lastName"
                    v-bind="lastNameAttrs"
                    placeholder="Last name"
                  />
                  <FieldError v-if="errors.lastName">{{ errors.lastName }}</FieldError>
                </Field>
              </div>

              <Field :data-invalid="!!errors.email">
                <FieldLabel for="checkout-email">Email address</FieldLabel>
                <Input
                  id="checkout-email"
                  v-model="email"
                  v-bind="emailAttrs"
                  type="email"
                  placeholder="Enter email"
                />
                <FieldError v-if="errors.email">{{ errors.email }}</FieldError>
              </Field>

              <Field :data-invalid="!!errors.companyName">
                <FieldLabel for="checkout-company">Company name</FieldLabel>
                <Input
                  id="checkout-company"
                  v-model="companyName"
                  v-bind="companyNameAttrs"
                  placeholder="Enter company name"
                />
                <FieldError v-if="errors.companyName">{{ errors.companyName }}</FieldError>
              </Field>

              <div class="grid gap-5 md:grid-cols-2">
                <Field :data-invalid="!!errors.phone">
                  <FieldLabel for="checkout-phone">Phone number</FieldLabel>
                  <PhoneInput id="checkout-phone" name="phone" />
                  <FieldError v-if="errors.phone">{{ errors.phone }}</FieldError>
                </Field>

                <Field :data-invalid="!!errors.country">
                  <FieldLabel>Country or region</FieldLabel>
                  <SharedCountryCombobox v-model="country" placeholder="Select country" />
                  <FieldError v-if="errors.country">{{ errors.country }}</FieldError>
                </Field>
              </div>

              <Field :data-invalid="!!errors.stateCity">
                <FieldLabel for="checkout-state-city">State / city</FieldLabel>
                <Input
                  id="checkout-state-city"
                  v-model="stateCity"
                  v-bind="stateCityAttrs"
                  placeholder="Lagos"
                />
                <FieldError v-if="errors.stateCity">{{ errors.stateCity }}</FieldError>
              </Field>

              <FieldGroup>
                <Field :data-invalid="!!errors.termsAccepted" orientation="horizontal">
                  <Checkbox
                    id="checkout-terms"
                    v-model="termsAccepted"
                    v-bind="termsAcceptedAttrs"
                  />
                  <FieldLabel for="checkout-terms">
                    I agree to the
                    <NuxtLink to="/" class="text-[#04308F]">Terms of Service</NuxtLink>
                    and
                    <NuxtLink to="/" class="text-[#04308F]">Privacy Policy</NuxtLink>
                  </FieldLabel>
                </Field>
                <FieldError v-if="errors.termsAccepted">{{ errors.termsAccepted }}</FieldError>
              </FieldGroup>
            </FieldGroup>
          </FieldSet>

          <button
            type="submit"
            :disabled="isSubmitDisabled"
            class="mt-8 flex w-full items-center justify-center rounded-full bg-[#05DED5] p-3.5 text-lg leading-snug font-medium disabled:opacity-50"
          >
            <template v-if="isSubmitting">
              Initializing
              <Icon icon="svg-spinners:3-dots-fade" class="-mb-[0.25lh]" />
            </template>
            <template v-else>Complete Payment</template>
          </button>

          <p
            class="text-foreground/45 mt-5 flex items-center justify-center gap-2 text-sm leading-relaxed"
          >
            <Icon icon="hugeicons:square-lock-02" />
            Secure checkout powered by Paystack
          </p>
        </form>

        <aside class="rounded-[calc(var(--radius)+2px)] p-5 shadow-lg lg:p-6">
          <h2 class="text-3xl leading-tight font-semibold">Order detail</h2>

          <div class="text-background mt-7 rounded-lg bg-[#04308F] p-5">
            <p
              v-if="plan.highlighted"
              class="text-foreground mb-4 inline-flex rounded-full bg-[#05DED5] px-5 py-1 text-xs font-medium"
            >
              Most Popular
            </p>
            <h3 class="text-2xl leading-tight font-medium">{{ plan.name }}</h3>
            <p class="mt-5 text-4xl leading-none font-semibold">
              {{ formatPlanMoney(plan.price, plan.currency) }}/
            </p>
            <p class="text-background/75 mt-3 text-sm">{{ plan.billingLabel }}</p>
          </div>

          <dl class="mt-7 space-y-0 text-lg leading-relaxed">
            <div class="flex justify-between border-b py-4">
              <dt class="text-foreground/45">Subtotal</dt>
              <dd>{{ formatPlanMoney(subtotal, plan.currency) }}</dd>
            </div>
            <div class="flex justify-between border-b py-4">
              <dt class="text-foreground/45">Tax (VAT {{ plan.vatPercent }}%)</dt>
              <dd>{{ formatPlanMoney(vatAmount, plan.currency) }}</dd>
            </div>
            <div class="flex justify-between py-4 font-semibold">
              <dt>Total</dt>
              <dd>{{ formatPlanMoney(total, plan.currency) }}</dd>
            </div>
          </dl>

          <div class="mt-5">
            <label class="text-lg leading-snug font-medium" for="promo-code">Promo Code</label>
            <div class="mt-2 flex gap-2">
              <Input id="promo-code" class="h-11" placeholder="Enter Code" />
              <button
                type="button"
                class="rounded-full bg-[#05DED5] px-5 text-base leading-tight font-medium"
              >
                Apply
              </button>
            </div>
          </div>

          <div class="mt-10">
            <h3 class="text-xl leading-tight font-semibold">What's Included:</h3>
            <ul class="text-foreground/70 mt-6 space-y-5 text-base leading-relaxed">
              <li v-for="feature in features" :key="feature" class="flex gap-3">
                <Icon icon="hugeicons:tick-02" class="mt-1 text-[#087A72]" />
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      <!-- Mobile Tabs -->
      <div v-else>
        <Tabs v-model="activeTab" class="w-full">
          <TabsList class="grid w-full grid-cols-2">
            <TabsTrigger value="form" class="text-sm font-medium">Your Information</TabsTrigger>
            <TabsTrigger value="details" class="text-sm font-medium">Plan Details</TabsTrigger>
          </TabsList>

          <TabsContent value="form" class="mt-6">
            <form class="rounded-[calc(var(--radius)+2px)] border p-5" @submit="onSubmit">
              <FieldSet>
                <FieldLegend class="mb-6 text-xl leading-normal">Account Information</FieldLegend>

                <FieldGroup class="gap-5">
                  <div class="grid gap-5 lg:grid-cols-2">
                    <Field :data-invalid="!!errors.firstName">
                      <FieldLabel for="checkout-first-name">First Name</FieldLabel>
                      <Input
                        id="checkout-first-name"
                        v-model="firstName"
                        v-bind="firstNameAttrs"
                        placeholder="First name"
                      />
                      <FieldError v-if="errors.firstName">{{ errors.firstName }}</FieldError>
                    </Field>

                    <Field :data-invalid="!!errors.lastName">
                      <FieldLabel for="checkout-last-name">Last Name</FieldLabel>
                      <Input
                        id="checkout-last-name"
                        v-model="lastName"
                        v-bind="lastNameAttrs"
                        placeholder="Last name"
                      />
                      <FieldError v-if="errors.lastName">{{ errors.lastName }}</FieldError>
                    </Field>
                  </div>

                  <Field :data-invalid="!!errors.email">
                    <FieldLabel for="checkout-email">Email address</FieldLabel>
                    <Input
                      id="checkout-email"
                      v-model="email"
                      v-bind="emailAttrs"
                      type="email"
                      placeholder="Enter email"
                    />
                    <FieldError v-if="errors.email">{{ errors.email }}</FieldError>
                  </Field>

                  <Field :data-invalid="!!errors.companyName">
                    <FieldLabel for="checkout-company">Company name</FieldLabel>
                    <Input
                      id="checkout-company"
                      v-model="companyName"
                      v-bind="companyNameAttrs"
                      placeholder="Enter company name"
                    />
                    <FieldError v-if="errors.companyName">{{ errors.companyName }}</FieldError>
                  </Field>

                  <div class="grid gap-5 md:grid-cols-2">
                    <Field :data-invalid="!!errors.phone">
                      <FieldLabel for="checkout-phone">Phone number</FieldLabel>
                      <PhoneInput id="checkout-phone" name="phone" />
                      <FieldError v-if="errors.phone">{{ errors.phone }}</FieldError>
                    </Field>

                    <Field :data-invalid="!!errors.country">
                      <FieldLabel>Country or region</FieldLabel>
                      <SharedCountryCombobox v-model="country" placeholder="Select country" />
                      <FieldError v-if="errors.country">{{ errors.country }}</FieldError>
                    </Field>
                  </div>

                  <Field :data-invalid="!!errors.stateCity">
                    <FieldLabel for="checkout-state-city">State / city</FieldLabel>
                    <Input
                      id="checkout-state-city"
                      v-model="stateCity"
                      v-bind="stateCityAttrs"
                      placeholder="Lagos"
                    />
                    <FieldError v-if="errors.stateCity">{{ errors.stateCity }}</FieldError>
                  </Field>

                  <FieldGroup>
                    <Field :data-invalid="!!errors.termsAccepted" orientation="horizontal">
                      <Checkbox
                        id="checkout-terms"
                        v-model="termsAccepted"
                        v-bind="termsAcceptedAttrs"
                      />
                      <FieldLabel for="checkout-terms">
                        I agree to the
                        <NuxtLink to="/" class="text-[#04308F]">Terms of Service</NuxtLink>
                        and
                        <NuxtLink to="/" class="text-[#04308F]">Privacy Policy</NuxtLink>
                      </FieldLabel>
                    </Field>
                    <FieldError v-if="errors.termsAccepted">{{ errors.termsAccepted }}</FieldError>
                  </FieldGroup>
                </FieldGroup>
              </FieldSet>

              <button
                type="submit"
                :disabled="isSubmitDisabled"
                class="mt-8 flex w-full items-center justify-center rounded-md bg-[#05DED5] p-3.5 text-lg leading-snug font-medium disabled:opacity-50"
              >
                <template v-if="isSubmitting">
                  Initializing
                  <Icon icon="svg-spinners:3-dots-fade" class="-mb-[0.25lh]" />
                </template>
                <template v-else>Complete Payment</template>
              </button>

              <p
                class="text-foreground/45 mt-5 flex items-center justify-center gap-2 text-sm leading-relaxed"
              >
                <Icon icon="hugeicons:square-lock-02" />
                Secure checkout powered by Paystack
              </p>
            </form>
          </TabsContent>

          <TabsContent value="details" class="mt-6">
            <aside class="rounded-[calc(var(--radius)+2px)] p-5 shadow-lg">
              <h2 class="text-3xl leading-tight font-semibold">Order detail</h2>

              <div class="text-background mt-7 rounded-lg bg-[#04308F] p-5">
                <p
                  v-if="plan.highlighted"
                  class="text-foreground mb-4 inline-flex rounded-full bg-[#05DED5] px-5 py-1 text-xs font-medium"
                >
                  Most Popular
                </p>
                <h3 class="text-2xl leading-tight font-medium">{{ plan.name }}</h3>
                <p class="mt-5 text-4xl leading-none font-semibold">
                  {{ formatPlanMoney(plan.price, plan.currency) }}/
                </p>
                <p class="text-background/75 mt-3 text-sm">{{ plan.billingLabel }}</p>
              </div>

              <dl class="mt-7 space-y-0 text-lg leading-relaxed">
                <div class="flex justify-between border-b py-4">
                  <dt class="text-foreground/45">Subtotal</dt>
                  <dd>{{ formatPlanMoney(subtotal, plan.currency) }}</dd>
                </div>
                <div class="flex justify-between border-b py-4">
                  <dt class="text-foreground/45">Tax (VAT {{ plan.vatPercent }}%)</dt>
                  <dd>{{ formatPlanMoney(vatAmount, plan.currency) }}</dd>
                </div>
                <div class="flex justify-between py-4 font-semibold">
                  <dt>Total</dt>
                  <dd>{{ formatPlanMoney(total, plan.currency) }}</dd>
                </div>
              </dl>

              <div class="mt-5">
                <label class="text-lg leading-snug font-medium" for="promo-code">Promo Code</label>
                <div class="mt-2 flex gap-2">
                  <Input id="promo-code" class="h-11" placeholder="Enter Code" />
                  <button
                    type="button"
                    class="rounded-md bg-[#05DED5] px-5 text-base leading-tight font-medium"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <div class="mt-10">
                <h3 class="text-xl leading-tight font-semibold">What's Included:</h3>
                <ul class="text-foreground/70 mt-6 space-y-5 text-base leading-relaxed">
                  <li v-for="feature in features" :key="feature" class="flex gap-3">
                    <Icon icon="hugeicons:tick-02" class="mt-1 text-[#087A72]" />
                    <span>{{ feature }}</span>
                  </li>
                </ul>
              </div>
            </aside>
          </TabsContent>
        </Tabs>
      </div>
    </template>
  </section>
</template>
