<script setup lang="ts">
import type { SelectTriggerProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { Icon } from '@iconify/vue';
import { SelectIcon, SelectTrigger, useForwardProps } from 'reka-ui';
import { cn } from '@/lib/utils';

const props = defineProps<SelectTriggerProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = reactiveOmit(props, 'class');

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <SelectTrigger
    v-bind="forwardedProps"
    :class="
      cn(
        'border-input ring-offset-background data-placeholder:text-muted-foreground focus:ring-ring flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-start text-sm whitespace-nowrap shadow-sm focus:ring-1 focus:outline-none disabled:cursor-default disabled:opacity-50 [&>span]:truncate',
        props.class
      )
    "
  >
    <slot />
    <SelectIcon as-child>
      <Icon icon="hugeicons:arrow-down-01" class="h-4 w-4 shrink-0 opacity-50" />
    </SelectIcon>
  </SelectTrigger>
</template>
