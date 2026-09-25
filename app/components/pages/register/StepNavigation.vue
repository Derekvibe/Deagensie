<script setup lang="ts">
import { Icon } from '@iconify/vue';

interface StepItem {
  id: string;
  title: string;
  description: string;
}

const props = withDefaults(
  defineProps<{
    type: string;
    currentStepId?: string;
    steps: readonly StepItem[];
    invalidStepIds: string[];
    maxAccessibleStepIndex?: number;
    disabled?: boolean;
  }>(),
  { currentStepId: undefined, maxAccessibleStepIndex: 0, disabled: false }
);

const router = useRouter();

const currentStepIndex = computed(() =>
  props.steps.findIndex((step) => step.id === props.currentStepId)
);
const allowedStepIndex = computed(() =>
  typeof props.maxAccessibleStepIndex === 'number'
    ? props.maxAccessibleStepIndex
    : props.steps.length - 1
);

function navigateToStep(step: StepItem, index: number) {
  if (props.disabled || index > allowedStepIndex.value) return;
  router.push(`/register/${props.type}/${step.id}`);
}
</script>

<template>
  <nav class="w-full" aria-label="Registration steps">
    <ol class="flex w-full items-center">
      <template v-for="(step, index) in props.steps" :key="step.id">
        <li v-if="index !== 0" class="flex-1"><hr /></li>
        <li>
          <button
            type="button"
            :aria-label="`Step ${index + 1}: ${step.title}${step.id === props.currentStepId ? ' (current step)' : index < currentStepIndex ? ' (completed)' : props.invalidStepIds.includes(step.id) ? ' (has invalid fields)' : ' (future step)'}`"
            :class="[
              'box-content grid size-8 shrink-0 grid-cols-1 grid-rows-1 place-items-center rounded-full border font-semibold transition *:[grid-area:1/1] xl:size-10 xl:text-lg',
              {
                'border-[#04308F] text-[#04308F]':
                  step.id === props.currentStepId && !props.invalidStepIds.includes(step.id),
                'text-background border-[#04308F] bg-[#04308F]':
                  step.id !== props.currentStepId &&
                  index < currentStepIndex &&
                  !(props.invalidStepIds.includes(step.id) ?? false),
                'border-red-500 text-red-500': props.invalidStepIds.includes(step.id) ?? false,
                'cursor-default opacity-50': index > allowedStepIndex,
              },
            ]"
            :disabled="props.disabled || index > allowedStepIndex"
            @click="navigateToStep(step, index)"
          >
            <span>{{ index + 1 }}</span>
            <Tooltip v-if="props.invalidStepIds.includes(step.id)">
              <TooltipTrigger as-child>
                <Icon
                  icon="tabler:exclamation-mark"
                  class="bg-background translate-x-1/2 self-start justify-self-end rounded-full text-red-500"
                />
              </TooltipTrigger>
              <TooltipContent
                >This step contains invalid fields. Please review and correct them.</TooltipContent
              >
            </Tooltip>
          </button>
        </li>
      </template>
    </ol>
  </nav>
</template>
