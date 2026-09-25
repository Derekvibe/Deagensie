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
  <div class="bg-white min-h-screen">
    <!-- Andela-Style Editorial Header -->
    <section class="pt-28 pb-16 lg:pt-36 lg:pb-20 border-b border-gray-100">
      <div class="mx-auto w-5/6 max-w-7xl text-center space-y-5">
        <span class="text-xs uppercase tracking-widest text-[#04308F] font-semibold bg-[#04308F]/10 px-4 py-1.5 rounded-full inline-block">
          Get In Touch
        </span>
        <h1 class="text-3xl font-serif font-normal tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl text-gray-900">
          Let us know how<br class="hidden sm:inline" /> we can help
        </h1>
        <p class="text-base text-gray-500 lg:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
          Whether you're looking to scale your business or find your next opportunity, we're here to
          make it happen.
        </p>
      </div>
    </section>

    <!-- Contact Form + Info Panel -->
    <section class="py-16 lg:py-24">
      <div class="mx-auto w-5/6 max-w-7xl lg:flex lg:gap-14">
        <!-- Left Info Panel -->
        <div class="mb-10 lg:mb-0 lg:w-96 lg:shrink-0 space-y-6">
          <!-- Get In Touch Card -->
          <div class="rounded-3xl border border-gray-100 bg-gray-50 p-8 shadow-sm space-y-7">
            <p class="text-xl font-serif font-normal text-gray-900">Get In Touch</p>
            <ul class="space-y-6">
              <li class="flex items-start gap-4">
                <div class="size-11 rounded-full bg-[#04308F]/10 flex items-center justify-center shrink-0">
                  <Icon icon="hugeicons:mail-02" class="text-[#04308F] text-lg" />
                </div>
                <div class="space-y-0.5">
                  <p class="text-sm font-bold text-gray-900">Email</p>
                  <a href="mailto:hello@deagensie.com" class="text-sm text-gray-500 hover:text-[#04308F] hover:underline transition-colors">
                    hello@deagensie.com
                  </a>
                </div>
              </li>
              <li class="flex items-start gap-4">
                <div class="size-11 rounded-full bg-[#04308F]/10 flex items-center justify-center shrink-0">
                  <Icon icon="hugeicons:call-02" class="text-[#04308F] text-lg" />
                </div>
                <div class="space-y-0.5">
                  <p class="text-sm font-bold text-gray-900">Phone</p>
                  <a href="tel:+2348063836398" class="text-sm text-gray-500 hover:text-[#04308F] hover:underline transition-colors">
                    +234 806 383 6398
                  </a>
                </div>
              </li>
              <li class="flex items-start gap-4">
                <div class="size-11 rounded-full bg-[#04308F]/10 flex items-center justify-center shrink-0">
                  <Icon icon="hugeicons:clock-01" class="text-[#04308F] text-lg" />
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
            <p class="text-xl font-serif font-normal text-gray-900 mb-1">Follow Us</p>
            <p class="text-sm text-gray-500 mb-6">Stay connected with the Deagensie community</p>
            <ul class="flex gap-3">
              <li>
                <a href="https://linkedin.com/company/deagensie" target="_blank" rel="noopener"
                  class="size-11 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:text-[#04308F] hover:border-[#04308F] hover:shadow-md transition-all duration-200"
                >
                  <Icon icon="mingcute:linkedin-fill" class="text-xl" />
                </a>
              </li>
              <li>
                <a href="https://instagram.com/deagensie" target="_blank" rel="noopener"
                  class="size-11 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:text-[#8F039C] hover:border-[#8F039C] hover:shadow-md transition-all duration-200"
                >
                  <Icon icon="ri:instagram-line" class="text-xl" />
                </a>
              </li>
              <li>
                <a href="https://x.com/deagensie" target="_blank" rel="noopener"
                  class="size-11 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:text-gray-900 hover:border-gray-900 hover:shadow-md transition-all duration-200"
                >
                  <Icon icon="devicon:twitter" class="text-xl" />
                </a>
              </li>
              <li>
                <a href="https://tiktok.com/@deagensie" target="_blank" rel="noopener"
                  class="size-11 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:text-gray-900 hover:border-gray-900 hover:shadow-md transition-all duration-200"
                >
                  <Icon icon="ri:tiktok-fill" class="text-xl" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Right Form Panel -->
        <form
          class="flex-1 rounded-3xl border border-gray-100 bg-white p-8 shadow-md shadow-gray-100/60 space-y-8 lg:p-12"
          @submit="onSubmit"
        >
          <FieldSet>
            <FieldLegend class="text-xl font-serif font-normal text-gray-900 mb-1">Send us a message</FieldLegend>
            <FieldDescription class="text-sm text-gray-500 leading-relaxed">
              Fill out the form below and we&apos;ll get back to you within 24 hours.
            </FieldDescription>

            <FieldGroup class="mt-8 space-y-6">
              <div class="grid gap-5 lg:grid-cols-2">
                <Field :data-invalid="!!errors.firstName">
                  <FieldLabel for="firstName" class="text-sm font-semibold text-gray-700">First Name</FieldLabel>
                  <Input
                    id="firstName"
                    v-model="firstName"
                    v-bind="firstNameAttrs"
                    placeholder="e.g. John"
                    class="mt-1.5 rounded-xl border-gray-200"
                  />
                  <FieldError v-if="errors.firstName" class="text-xs text-red-500 mt-1">{{ errors.firstName }}</FieldError>
                </Field>

                <Field :data-invalid="!!errors.lastName">
                  <FieldLabel for="lastName" class="text-sm font-semibold text-gray-700">Last Name</FieldLabel>
                  <Input
                    id="lastName"
                    v-model="lastName"
                    v-bind="lastNameAttrs"
                    placeholder="e.g. Doe"
                    class="mt-1.5 rounded-xl border-gray-200"
                  />
                  <FieldError v-if="errors.lastName" class="text-xs text-red-500 mt-1">{{ errors.lastName }}</FieldError>
                </Field>
              </div>

              <div class="grid gap-5 lg:grid-cols-2">
                <Field :data-invalid="!!errors.email">
                  <FieldLabel for="email" class="text-sm font-semibold text-gray-700">Email Address</FieldLabel>
                  <Input
                    id="email"
                    v-model="email"
                    type="email"
                    v-bind="emailAttrs"
                    placeholder="hello@company.com"
                    class="mt-1.5 rounded-xl border-gray-200"
                  />
                  <FieldError v-if="errors.email" class="text-xs text-red-500 mt-1">{{ errors.email }}</FieldError>
                </Field>

                <Field :data-invalid="!!errors.phone">
                  <FieldLabel for="phone" class="text-sm font-semibold text-gray-700">Phone Number</FieldLabel>
                  <PhoneInput id="phone" name="phone" class="mt-1.5" />
                  <FieldError v-if="errors.phone" class="text-xs text-red-500 mt-1">{{ errors.phone }}</FieldError>
                </Field>
              </div>

              <Field :data-invalid="!!errors.companyName">
                <FieldLabel for="company" class="text-sm font-semibold text-gray-700">
                  Company Name <span class="text-gray-400 font-normal">(optional)</span>
                </FieldLabel>
                <Input
                  id="company"
                  v-model="companyName"
                  v-bind="companyNameAttrs"
                  placeholder="Acme Inc."
                  class="mt-1.5 rounded-xl border-gray-200"
                />
                <FieldError v-if="errors.companyName" class="text-xs text-red-500 mt-1">{{ errors.companyName }}</FieldError>
              </Field>

              <Field :data-invalid="!!errors.serviceInterest">
                <FieldLabel class="text-sm font-semibold text-gray-700">
                  Service Interest <span class="text-gray-400 font-normal">(optional)</span>
                </FieldLabel>
                <PagesContactServiceInterestCombobox
                  v-model="serviceInterest"
                  v-bind="serviceInterestAttrs"
                  class="mt-1.5"
                />
                <FieldError v-if="errors.serviceInterest" class="text-xs text-red-500 mt-1">{{ errors.serviceInterest }}</FieldError>
              </Field>

              <Field :data-invalid="!!errors.message">
                <FieldLabel for="message" class="text-sm font-semibold text-gray-700">Message</FieldLabel>
                <Textarea
                  id="message"
                  v-model="message"
                  v-bind="messageAttrs"
                  placeholder="Tell us about your project, goals, or challenges..."
                  :rows="5"
                  class="mt-1.5 rounded-xl border-gray-200"
                />
                <FieldError v-if="errors.message" class="text-xs text-red-500 mt-1">{{ errors.message }}</FieldError>
              </Field>
            </FieldGroup>
          </FieldSet>

          <button
            type="submit"
            :disabled="isSubmitDisabled"
            class="flex w-full items-center justify-center gap-2 rounded-full bg-[#04308F] px-8 py-4 text-base font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#05DED5] hover:text-gray-900 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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

<style scoped lang="css">
</style>
