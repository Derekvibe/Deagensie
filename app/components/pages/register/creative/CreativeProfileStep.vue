<script setup lang="ts">
defineProps<{
  errors: Partial<Record<string, string>>;
  disabled?: boolean;
}>();

const firstName = defineModel<string>('firstName', { required: true });
const lastName = defineModel<string>('lastName', { required: true });
const email = defineModel<string>('email', { required: true });
const phone = defineModel<string>('phone', { required: true });
const country = defineModel<string>('country', { required: true });
const city = defineModel<string>('city', { required: true });
</script>

<template>
  <FieldGroup class="gap-6">
    <div class="grid gap-6 md:grid-cols-2">
      <Field :data-invalid="!!errors.firstName">
        <FieldLabel for="creative-first-name">First Name</FieldLabel>
        <Input
          id="creative-first-name"
          v-model="firstName"
          :disabled="disabled"
          placeholder="Name on payment card"
        />
        <FieldError v-if="errors.firstName">{{ errors.firstName }}</FieldError>
      </Field>

      <Field :data-invalid="!!errors.lastName">
        <FieldLabel for="creative-last-name">Last Name</FieldLabel>
        <Input
          id="creative-last-name"
          v-model="lastName"
          :disabled="disabled"
          placeholder="Name on payment card"
        />
        <FieldError v-if="errors.lastName">{{ errors.lastName }}</FieldError>
      </Field>
    </div>

    <Field :data-invalid="!!errors.email">
      <FieldLabel for="creative-email">Email Address</FieldLabel>
      <Input
        id="creative-email"
        v-model="email"
        type="email"
        :disabled="disabled"
        placeholder="Email address"
      />
      <FieldError v-if="errors.email">{{ errors.email }}</FieldError>
    </Field>

    <div class="grid gap-6 md:grid-cols-2">
      <Field :data-invalid="!!errors.country">
        <FieldLabel>Country</FieldLabel>
        <SharedCountryCombobox
          v-model="country"
          placeholder="Select your country"
          :disabled="disabled"
        />
        <FieldError v-if="errors.country">{{ errors.country }}</FieldError>
      </Field>

      <Field :data-invalid="!!errors.city">
        <FieldLabel for="creative-city">City</FieldLabel>
        <Input id="creative-city" v-model="city" :disabled="disabled" placeholder="City" />
        <FieldError v-if="errors.city">{{ errors.city }}</FieldError>
      </Field>
    </div>

    <Field :data-invalid="!!errors.phone">
      <FieldLabel for="creative-phone">Phone Number</FieldLabel>
      <PhoneInput
        id="creative-phone"
        v-model="phone"
        :disabled="disabled"
        placeholder="Phone number"
      />
      <FieldError v-if="errors.phone">{{ errors.phone }}</FieldError>
    </Field>
  </FieldGroup>
</template>
