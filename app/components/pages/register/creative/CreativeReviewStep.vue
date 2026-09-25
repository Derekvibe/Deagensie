<script setup lang="ts">
interface ReviewGroup {
  title: string;
  rows: [string, string][];
}

defineProps<{
  errors: Partial<Record<string, string>>;
  reviewGroups: ReviewGroup[];
  disabled?: boolean;
}>();

const agreeToTerms = defineModel<boolean>('agreeToTerms', { required: true });
const sendUpdates = defineModel<boolean>('sendUpdates', { required: true });
</script>

<template>
  <FieldGroup class="gap-6">
    <div class="grid gap-4 md:grid-cols-3">
      <div v-for="group in reviewGroups" :key="group.title" class="rounded-lg border p-4">
        <h2 class="font-semibold">{{ group.title }}</h2>
        <dl class="mt-4 space-y-3">
          <div
            v-for="([label, value], index) in group.rows"
            :key="`${group.title}-${label}-${index}`"
          >
            <dt class="text-muted-foreground text-xs font-medium uppercase">{{ label }}</dt>
            <dd class="mt-1 text-sm break-words">{{ value }}</dd>
          </div>
        </dl>
      </div>
    </div>

    <FieldGroup>
      <Field :data-invalid="!!errors.agreeToTerms" orientation="horizontal">
        <Checkbox id="creative-terms" v-model="agreeToTerms" :disabled="disabled" />
        <FieldLabel for="creative-terms">
          I agree to Deagensie's Terms of Service, Privacy Policy, and Cookie Policy.
        </FieldLabel>
      </Field>
      <FieldError v-if="errors.agreeToTerms">{{ errors.agreeToTerms }}</FieldError>

      <Field orientation="horizontal">
        <Checkbox id="creative-updates" v-model="sendUpdates" :disabled="disabled" />
        <FieldLabel for="creative-updates">
          Send me useful updates about new projects and opportunities.
        </FieldLabel>
      </Field>
    </FieldGroup>
  </FieldGroup>
</template>
