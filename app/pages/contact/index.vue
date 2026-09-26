<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { push } from 'notivue';
import { useForm } from 'vee-validate';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { z } from 'zod';
import { Icon } from '@iconify/vue';
import type { ContactMessage, SuccessResponse } from '~/types/api';
import { normalizeApiError, notifyApiFailure, pickFormErrors } from '~/utils/api-errors';

type ContactFormValues = Omit<ContactMessage, 'companyName' | 'serviceInterest'> & {
  companyName: string;
  serviceInterest: string;
};

const contactFields = [
  'firstName',
  'lastName',
  'email',
  'phone',
  'companyName',
  'serviceInterest',
  'message',
] as const satisfies readonly (keyof ContactFormValues)[];

const schema = toTypedSchema(
  z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.email('Enter a valid email'),
    phone: z
      .string()
      .min(1, 'Phone number is required')
      .refine(isValidPhoneNumber, 'Invalid phone number'),
    companyName: z.string().optional(),
    serviceInterest: z.string().optional(),
    message: z.string().min(10, 'Message too short'),
  })
);

const { $api } = useNuxtApp();

const { defineField, errors, handleSubmit, isSubmitting, meta, resetForm } =
  useForm<ContactFormValues>({
    validationSchema: schema,
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      companyName: '',
      serviceInterest: '',
      message: '',
    },
  });

const [firstName, firstNameAttrs] = defineField('firstName');
const [lastName, lastNameAttrs] = defineField('lastName');
const [email, emailAttrs] = defineField('email');
const [companyName, companyNameAttrs] = defineField('companyName');
const [serviceInterest, serviceInterestAttrs] = defineField('serviceInterest');
const [message, messageAttrs] = defineField('message');

const isSubmitDisabled = computed(() => isSubmitting.value || !meta.value.valid);

const onSubmit = handleSubmit(async (values, actions) => {
  try {
    await $api<SuccessResponse>('/contact', {
      method: 'POST',
      body: values,
    });

    resetForm();
    push.success({
      title: 'Message sent',
      message: "Thanks. We'll get back to you within 24 hours.",
    });
  } catch (error: unknown) {
    const failure = normalizeApiError(error);
    actions.setErrors(pickFormErrors(failure.fieldErrors, contactFields));
    notifyApiFailure(failure);
  }
});
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Andela-Style Editorial Header -->
    <section class="border-b border-gray-100 pt-28 pb-16 lg:pt-36 lg:pb-20">
      <div class="mx-auto w-5/6 max-w-7xl space-y-5 text-center">
        <span
          class="inline-block rounded-full bg-[#04308F]/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#04308F] uppercase"
        >
          Get In Touch
        </span>
        <h1
          class="font-serif text-3xl font-normal tracking-tight text-gray-900 sm:text-4xl lg:text-5xl xl:text-6xl"
        >
          Let us know how<br class="hidden sm:inline" />
          we can help
        </h1>
        <p class="mx-auto max-w-2xl text-base leading-relaxed font-normal text-gray-500 lg:text-lg">
          Whether you're looking to scale your business or find your next opportunity, we're here to
          make it happen.
        </p>
      </div>
    </section>

    <!-- Contact Form + Info Panel -->
    <section class="py-16 lg:py-24">
      <div class="mx-auto w-5/6 max-w-7xl lg:flex lg:gap-14">
        <!-- Left Info Panel -->
        <div class="mb-10 space-y-6 lg:mb-0 lg:w-96 lg:shrink-0">
          <!-- Get In Touch Card -->
          <div class="space-y-7 rounded-3xl border border-gray-100 bg-gray-50 p-8 shadow-sm">
            <p class="font-serif text-xl font-normal text-gray-900">Get In Touch</p>
            <ul class="space-y-6">
              <li class="flex items-start gap-4">
                <div
                  class="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#04308F]/10"
                >
                  <Icon icon="hugeicons:mail-02" class="text-lg text-[#04308F]" />
                </div>
                <div class="space-y-0.5">
                  <p class="text-sm font-bold text-gray-900">Email</p>
                  <a
                    href="mailto:hello@deagensie.com"
                    class="text-sm text-gray-500 transition-colors hover:text-[#04308F] hover:underline"
                  >
                    hello@deagensie.com
                  </a>
                </div>
              </li>
              <li class="flex items-start gap-4">
                <div
                  class="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#04308F]/10"
                >
                  <Icon icon="hugeicons:call-02" class="text-lg text-[#04308F]" />
                </div>
                <div class="space-y-0.5">
                  <p class="text-sm font-bold text-gray-900">Phone</p>
                  <a
                    href="tel:+2348063836398"
                    class="text-sm text-gray-500 transition-colors hover:text-[#04308F] hover:underline"
                  >
                    +234 806 383 6398
                  </a>
                </div>
              </li>
              <li class="flex items-start gap-4">
                <div
                  class="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#04308F]/10"
                >
                  <Icon icon="hugeicons:clock-01" class="text-lg text-[#04308F]" />
                </div>
                <div class="space-y-0.5">
                  <p class="text-sm font-bold text-gray-900">Availability</p>
                  <p class="text-sm text-gray-500">Monday – Friday: 9:00 AM – 6:00 PM WAT</p>
                  <p class="text-sm text-gray-500">Saturday: By Appointment</p>
                </div>
              </li>
            </ul>
          </div>

          <!-- Follow Us Card -->
          <div class="rounded-3xl border border-gray-100 bg-gray-50 p-8 shadow-sm">
            <p class="mb-1 font-serif text-xl font-normal text-gray-900">Follow Us</p>
            <p class="mb-6 text-sm text-gray-500">Stay connected with the Deagensie community</p>
            <ul class="flex gap-3">
              <li>
                <a
                  href="https://linkedin.com/company/deagensie"
                  target="_blank"
                  rel="noopener"
                  class="flex size-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-all duration-200 hover:border-[#04308F] hover:text-[#04308F] hover:shadow-md"
                >
                  <Icon icon="mingcute:linkedin-fill" class="text-xl" />
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/deagensie"
                  target="_blank"
                  rel="noopener"
                  class="flex size-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-all duration-200 hover:border-[#8F039C] hover:text-[#8F039C] hover:shadow-md"
                >
                  <Icon icon="ri:instagram-line" class="text-xl" />
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/deagensie"
                  target="_blank"
                  rel="noopener"
                  class="flex size-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-all duration-200 hover:border-gray-900 hover:text-gray-900 hover:shadow-md"
                >
                  <Icon icon="devicon:twitter" class="text-xl" />
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com/@deagensie"
                  target="_blank"
                  rel="noopener"
                  class="flex size-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-all duration-200 hover:border-gray-900 hover:text-gray-900 hover:shadow-md"
                >
                  <Icon icon="ri:tiktok-fill" class="text-xl" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Right Form Panel -->
        <form
          class="flex-1 space-y-8 rounded-3xl border border-gray-100 bg-white p-8 shadow-md shadow-gray-100/60 lg:p-12"
          @submit="onSubmit"
        >
          <FieldSet>
            <FieldLegend class="mb-1 font-serif text-xl font-normal text-gray-900"
              >Send us a message</FieldLegend
            >
            <FieldDescription class="text-sm leading-relaxed text-gray-500">
              Fill out the form below and we&apos;ll get back to you within 24 hours.
            </FieldDescription>

            <FieldGroup class="mt-8 space-y-6">
              <div class="grid gap-5 lg:grid-cols-2">
                <Field :data-invalid="!!errors.firstName">
                  <FieldLabel for="firstName" class="text-sm font-semibold text-gray-700"
                    >First Name</FieldLabel
                  >
                  <Input
                    id="firstName"
                    v-model="firstName"
                    v-bind="firstNameAttrs"
                    placeholder="e.g. John"
                    class="mt-1.5 rounded-xl border-gray-200"
                  />
                  <FieldError v-if="errors.firstName" class="mt-1 text-xs text-red-500">{{
                    errors.firstName
                  }}</FieldError>
                </Field>

                <Field :data-invalid="!!errors.lastName">
                  <FieldLabel for="lastName" class="text-sm font-semibold text-gray-700"
                    >Last Name</FieldLabel
                  >
                  <Input
                    id="lastName"
                    v-model="lastName"
                    v-bind="lastNameAttrs"
                    placeholder="e.g. Doe"
                    class="mt-1.5 rounded-xl border-gray-200"
                  />
                  <FieldError v-if="errors.lastName" class="mt-1 text-xs text-red-500">{{
                    errors.lastName
                  }}</FieldError>
                </Field>
              </div>

              <div class="grid gap-5 lg:grid-cols-2">
                <Field :data-invalid="!!errors.email">
                  <FieldLabel for="email" class="text-sm font-semibold text-gray-700"
                    >Email Address</FieldLabel
                  >
                  <Input
                    id="email"
                    v-model="email"
                    type="email"
                    v-bind="emailAttrs"
                    placeholder="hello@company.com"
                    class="mt-1.5 rounded-xl border-gray-200"
                  />
                  <FieldError v-if="errors.email" class="mt-1 text-xs text-red-500">{{
                    errors.email
                  }}</FieldError>
                </Field>

                <Field :data-invalid="!!errors.phone">
                  <FieldLabel for="phone" class="text-sm font-semibold text-gray-700"
                    >Phone Number</FieldLabel
                  >
                  <PhoneInput id="phone" name="phone" class="mt-1.5" />
                  <FieldError v-if="errors.phone" class="mt-1 text-xs text-red-500">{{
                    errors.phone
                  }}</FieldError>
                </Field>
              </div>

              <Field :data-invalid="!!errors.companyName">
                <FieldLabel for="company" class="text-sm font-semibold text-gray-700">
                  Company Name <span class="font-normal text-gray-400">(optional)</span>
                </FieldLabel>
                <Input
                  id="company"
                  v-model="companyName"
                  v-bind="companyNameAttrs"
                  placeholder="Acme Inc."
                  class="mt-1.5 rounded-xl border-gray-200"
                />
                <FieldError v-if="errors.companyName" class="mt-1 text-xs text-red-500">{{
                  errors.companyName
                }}</FieldError>
              </Field>

              <Field :data-invalid="!!errors.serviceInterest">
                <FieldLabel class="text-sm font-semibold text-gray-700">
                  Service Interest <span class="font-normal text-gray-400">(optional)</span>
                </FieldLabel>
                <PagesContactServiceInterestCombobox
                  v-model="serviceInterest"
                  v-bind="serviceInterestAttrs"
                  class="mt-1.5"
                />
                <FieldError v-if="errors.serviceInterest" class="mt-1 text-xs text-red-500">{{
                  errors.serviceInterest
                }}</FieldError>
              </Field>

              <Field :data-invalid="!!errors.message">
                <FieldLabel for="message" class="text-sm font-semibold text-gray-700"
                  >Message</FieldLabel
                >
                <Textarea
                  id="message"
                  v-model="message"
                  v-bind="messageAttrs"
                  placeholder="Tell us about your project, goals, or challenges..."
                  :rows="5"
                  class="mt-1.5 rounded-xl border-gray-200"
                />
                <FieldError v-if="errors.message" class="mt-1 text-xs text-red-500">{{
                  errors.message
                }}</FieldError>
              </Field>
            </FieldGroup>
          </FieldSet>

          <button
            type="submit"
            :disabled="isSubmitDisabled"
            class="flex w-full items-center justify-center gap-2 rounded-full bg-[#04308F] px-8 py-4 text-base font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#05DED5] hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <template v-if="isSubmitting">
              Sending
              <Icon icon="svg-spinners:3-dots-fade" class="mb-[-0.25lh]" />
            </template>
            <template v-else>
              Send Message
              <Icon icon="lucide:send" class="text-base" />
            </template>
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<style scoped lang="css"></style>
