<script setup lang="ts">
import { normalizeWebsiteInput } from '~/lib/utils';

defineProps<{
  errors: Partial<Record<string, string>>;
}>();

const businessName = defineModel<string>('businessName', { required: true });
const industry = defineModel<string>('industry', { required: true });
const firstName = defineModel<string>('firstName', { required: true });
const lastName = defineModel<string>('lastName', { required: true });
const businessEmail = defineModel<string>('businessEmail', { required: true });
const country = defineModel<string>('country', { required: true });
const companyWebsite = defineModel<string | undefined>('companyWebsite', { required: true });
</script>

<template>
  <FieldGroup class="gap-6">
    <div class="grid gap-6 md:grid-cols-2">
      <Field :data-invalid="!!errors.businessName">
        <FieldLabel for="register-business-name">Business Name</FieldLabel>
        <Input id="register-business-name" v-model="businessName" />
        <FieldError v-if="errors.businessName">{{ errors.businessName }}</FieldError>
      </Field>

      <Field :data-invalid="!!errors.industry">
        <FieldLabel>Industry</FieldLabel>
        <SharedIndustryCombobox v-model="industry" placeholder="Select an industry" />
        <FieldError v-if="errors.industry">{{ errors.industry }}</FieldError>
      </Field>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <Field :data-invalid="!!errors.firstName">
        <FieldLabel for="register-first-name">First Name</FieldLabel>
        <Input id="register-first-name" v-model="firstName" />
        <FieldError v-if="errors.firstName">{{ errors.firstName }}</FieldError>
      </Field>

      <Field :data-invalid="!!errors.lastName">
        <FieldLabel for="register-last-name">Last Name</FieldLabel>
        <Input id="register-last-name" v-model="lastName" />
        <FieldError v-if="errors.lastName">{{ errors.lastName }}</FieldError>
      </Field>
    </div>

    <Field :data-invalid="!!errors.businessEmail">
      <FieldLabel for="register-email">Business Email</FieldLabel>
      <Input id="register-email" v-model="businessEmail" type="email" />
      <FieldError v-if="errors.businessEmail">{{ errors.businessEmail }}</FieldError>
    </Field>

    <div class="grid gap-6 md:grid-cols-2">
      <Field :data-invalid="!!errors.phone">
        <FieldLabel for="register-phone">Phone Number</FieldLabel>
        <PhoneInput id="register-phone" name="phone" />
        <FieldError v-if="errors.phone">{{ errors.phone }}</FieldError>
      </Field>

      <Field :data-invalid="!!errors.country">
        <FieldLabel>Country</FieldLabel>
        <SharedCountryCombobox v-model="country" placeholder="Select a country" />
        <FieldError v-if="errors.country">{{ errors.country }}</FieldError>
      </Field>
    </div>

    <Field :data-invalid="!!errors.companyWebsite">
      <FieldLabel for="register-website">Company Website</FieldLabel>
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput
          id="register-website"
          v-model="companyWebsite"
          type="text"
          placeholder="example.company.com"
          @blur="companyWebsite = normalizeWebsiteInput(companyWebsite)"
        />
      </InputGroup>
      <FieldError v-if="errors.companyWebsite">{{ errors.companyWebsite }}</FieldError>
    </Field>
  </FieldGroup>
</template>
