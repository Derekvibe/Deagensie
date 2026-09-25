<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { Icon } from '@iconify/vue';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import type { SuccessResponse, TailoredSolution } from '~/types/api';
import { isValidWebsiteInput, normalizeWebsiteInput } from '~/lib/utils';
import { normalizeApiError, notifyApiFailure, pickFormErrors } from '~/utils/api-errors';

type TailoredSolutionFormValues = TailoredSolution & {
  termsAccepted: boolean;
};

const tailoredFields = [
  'firstName',
  'lastName',
  'businessEmail',
  'businessName',
  'phone',
  'country',
  'industry',
  'companySize',
  'companyWebsite',
  'problemToSolve',
  'offeringCode',
  'planCode',
  'termsAccepted',
] as const satisfies readonly (keyof TailoredSolutionFormValues)[];

const schema = toTypedSchema(
  z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    businessEmail: z.email('Enter a valid business email'),
    businessName: z.string().min(1, 'Business name is required'),
    phone: z
      .string()
      .min(1, 'Phone number is required')
      .refine(isValidPhoneNumber, 'Invalid phone number'),
    country: z.string().min(1, 'Country is required'),
    industry: z.string().min(1, 'Industry is required'),
    companySize: z.string().min(1, 'Company size is required'),
    companyWebsite: z
      .string()
      .trim()
      .optional()
      .refine((value) => !value || isValidWebsiteInput(value), 'Enter a valid website'),
    problemToSolve: z.string().min(10, 'Tell us a little more about the problem'),
    offeringCode: z.string().min(1),
    planCode: z.string().min(1),
    termsAccepted: z.literal(true, {
      error: 'You must agree to the terms before submitting',
    }),
  })
);

const router = useRouter();
const { $api } = useNuxtApp();
const { code, planCode, offering, plan, pending, error } = await useSubscriptionPlanContext();
const { markAsSubmitted } = useFormSubmissionState();

const { defineField, errors, handleSubmit, isSubmitting, meta, resetForm } =
  useForm<TailoredSolutionFormValues>({
    validationSchema: schema,
    initialValues: {
      firstName: '',
      lastName: '',
      businessEmail: '',
      businessName: '',
      phone: '',
      country: 'United States',
      industry: '',
      companySize: '',
      companyWebsite: '',
      problemToSolve: '',
      offeringCode: code.value,
      planCode: planCode.value,
      termsAccepted: false,
    },
  });

const [firstName, firstNameAttrs] = defineField('firstName');
const [lastName, lastNameAttrs] = defineField('lastName');
const [businessEmail, businessEmailAttrs] = defineField('businessEmail');
const [businessName, businessNameAttrs] = defineField('businessName');
const [country] = defineField('country');
const [industry] = defineField('industry');
const [companySize, companySizeAttrs] = defineField('companySize');
const [companyWebsite, companyWebsiteAttrs] = defineField('companyWebsite');
const [problemToSolve, problemToSolveAttrs] = defineField('problemToSolve');
const [termsAccepted, termsAcceptedAttrs] = defineField('termsAccepted');

const isSubmitDisabled = computed(() => isSubmitting.value || !meta.value.valid || !plan.value);

const onSubmit = handleSubmit(async ({ companyWebsite, ...values }, actions) => {
  try {
    await $api<SuccessResponse>('/tailored-solutions', {
      method: 'POST',
      body: {
        ...values,
        ...(isValidWebsiteInput(companyWebsite) && {
          companyWebsite: `https://${companyWebsite}`,
        }),
      },
    });

    resetForm();
    markAsSubmitted();

    await router.replace(`${getPlanRoute(code.value, planCode.value)}/request/received`);
  } catch (err) {
    const failure = normalizeApiError(err);
    actions.setErrors(pickFormErrors(failure.fieldErrors, tailoredFields));
    notifyApiFailure(failure);
  }
});
</script>

<template>
  <section class="mx-auto my-16 w-5/6 max-w-2xl py-16 lg:my-20 lg:py-20">
    <div v-if="pending" class="bg-background space-y-5 rounded-lg border p-5 lg:p-6">
      <Skeleton class="h-8 w-1/3" />
      <Skeleton class="h-12 w-2/3" />
      <Skeleton class="h-[640px] w-full" />
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

    <form v-else class="bg-background rounded-lg border p-5 lg:p-6" @submit="onSubmit">
      <p class="text-sm leading-normal font-medium text-[#04308F] uppercase">
        Business Registration
      </p>
      <h1 class="mt-4 text-3xl leading-tight font-semibold">Request a tailored solution</h1>
      <p class="text-foreground/60 mt-4 text-lg leading-relaxed">
        Tell us about your business and goals. Our team will review your request and send a custom
        proposal within 24-48 hours.
      </p>

      <FieldGroup class="mt-8 gap-6">
        <div class="grid gap-6 md:grid-cols-2">
          <Field :data-invalid="!!errors.firstName">
            <FieldLabel for="request-first-name">First Name</FieldLabel>
            <Input
              id="request-first-name"
              v-model="firstName"
              v-bind="firstNameAttrs"
              placeholder="Name on payment card"
            />
            <FieldError v-if="errors.firstName">{{ errors.firstName }}</FieldError>
          </Field>

          <Field :data-invalid="!!errors.lastName">
            <FieldLabel for="request-last-name">Last Name</FieldLabel>
            <Input
              id="request-last-name"
              v-model="lastName"
              v-bind="lastNameAttrs"
              placeholder="Name on payment card"
            />
            <FieldError v-if="errors.lastName">{{ errors.lastName }}</FieldError>
          </Field>
        </div>

        <Field :data-invalid="!!errors.businessEmail">
          <FieldLabel for="request-email">Business Email</FieldLabel>
          <Input
            id="request-email"
            v-model="businessEmail"
            v-bind="businessEmailAttrs"
            type="email"
            placeholder="Enter email"
          />
          <FieldError v-if="errors.businessEmail">{{ errors.businessEmail }}</FieldError>
        </Field>

        <Field :data-invalid="!!errors.businessName">
          <FieldLabel for="request-business-name"> Business Name </FieldLabel>
          <Input
            id="request-business-name"
            v-model="businessName"
            v-bind="businessNameAttrs"
            placeholder="Name on payment card"
          />
          <FieldError v-if="errors.businessName">{{ errors.businessName }}</FieldError>
        </Field>

        <div class="grid gap-6 md:grid-cols-2">
          <Field :data-invalid="!!errors.phone">
            <FieldLabel for="request-phone">Phone Number</FieldLabel>
            <PhoneInput id="request-phone" name="phone" />
            <FieldError v-if="errors.phone">{{ errors.phone }}</FieldError>
          </Field>

          <Field :data-invalid="!!errors.country">
            <FieldLabel>Country</FieldLabel>
            <SharedCountryCombobox v-model="country" placeholder="Select a country" />
            <FieldError v-if="errors.country">{{ errors.country }}</FieldError>
          </Field>
        </div>

        <div class="grid gap-6 md:grid-cols-2">
          <Field :data-invalid="!!errors.industry">
            <FieldLabel>Industry</FieldLabel>
            <SharedIndustryCombobox v-model="industry" placeholder="Select an industry" />
            <FieldError v-if="errors.industry">{{ errors.industry }}</FieldError>
          </Field>

          <Field :data-invalid="!!errors.companySize">
            <FieldLabel for="request-company-size">Company size</FieldLabel>
            <Select v-model="companySize" v-bind="companySizeAttrs">
              <SelectTrigger id="request-company-size" class="w-full">
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent class="w-(--reka-select-trigger-width)">
                <SelectItem value="1-10">1-10</SelectItem>
                <SelectItem value="11-50">11-50</SelectItem>
                <SelectItem value="51-200">51-200</SelectItem>
                <SelectItem value="201-500">201-500</SelectItem>
                <SelectItem value="500+">500+</SelectItem>
              </SelectContent>
            </Select>
            <FieldError v-if="errors.companySize">{{ errors.companySize }}</FieldError>
          </Field>
        </div>

        <Field :data-invalid="!!errors.companyWebsite">
          <FieldLabel for="request-website">Company Website</FieldLabel>
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <InputGroupText>https://</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              id="request-website"
              v-model="companyWebsite"
              type="text"
              v-bind="companyWebsiteAttrs"
              placeholder="example.company.com"
              @blur="companyWebsite = normalizeWebsiteInput(companyWebsite)"
            />
          </InputGroup>
          <FieldError v-if="errors.companyWebsite">{{ errors.companyWebsite }}</FieldError>
        </Field>

        <Field :data-invalid="!!errors.problemToSolve">
          <FieldLabel for="request-problem">What problem are you trying to solve?</FieldLabel>
          <Textarea
            id="request-problem"
            v-model="problemToSolve"
            v-bind="problemToSolveAttrs"
            placeholder="Write message"
            :rows="4"
          />
          <FieldError v-if="errors.problemToSolve">{{ errors.problemToSolve }}</FieldError>
        </Field>

        <FieldGroup>
          <Field :data-invalid="!!errors.termsAccepted" orientation="horizontal">
            <Checkbox v-bind="termsAcceptedAttrs" id="request-terms" v-model="termsAccepted" />
            <FieldLabel for="request-terms">
              I agree to Deagensie's Terms of Service, Privacy Policy, and Cookie Policy.
            </FieldLabel>
          </Field>
          <FieldError v-if="errors.termsAccepted">{{ errors.termsAccepted }}</FieldError>
        </FieldGroup>
      </FieldGroup>

      <button
        type="submit"
        :disabled="isSubmitDisabled"
        class="mt-10 flex w-full items-center justify-center rounded-md bg-[#05DED5] p-3.5 text-xl leading-tight font-medium disabled:opacity-50"
      >
        <template v-if="isSubmitting">
          Submitting
          <Icon icon="svg-spinners:3-dots-fade" class="mb-[-0.25lh]" />
        </template>
        <template v-else>Submit request</template>
      </button>

      <p class="text-foreground/40 mt-5 text-center text-sm leading-relaxed">
        Our team will respond within 24-48 hours with a tailored proposal.
      </p>
    </form>
  </section>
</template>
