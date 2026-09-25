<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { watchDebounced, useIntersectionObserver } from '@vueuse/core';
import type { PaginatedResponse } from '~/types/api';

interface IndustryOption {
  id: string;
  label: string;
}

const props = withDefaults(
  defineProps<{
    modelValue: string;
    placeholder?: string;
    disabled?: boolean;
  }>(),
  {
    placeholder: 'Select an industry',
    disabled: false,
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const open = ref(false);
const search = ref('');
const industries = ref<IndustryOption[]>([]);
const loading = ref(false);
const page = ref(1);
const totalPages = ref(1);
const currentQuery = ref('');
const loadMoreTrigger = useTemplateRef<HTMLElement>('loadMoreTrigger');

const selectedIndustry = computed(() => {
  return industries.value.find((industry) => industry.id === props.modelValue) || null;
});

const canLoadMore = computed(() => page.value < totalPages.value && !loading.value);

const fetchIndustries = async (query = '', nextPage = 1, reset = true) => {
  loading.value = true;

  try {
    const response = await $fetch<PaginatedResponse<IndustryOption>>('/api/industries', {
      query: {
        q: query,
        page: nextPage,
      },
    });

    if (reset) {
      industries.value = response.data;
    } else {
      industries.value = [...industries.value, ...response.data];
    }

    page.value = response.pagination.page;
    totalPages.value = response.pagination.totalPages;
    currentQuery.value = query;
  } finally {
    loading.value = false;
  }
};

watch(
  open,
  (isOpen) => {
    if (isOpen) {
      void fetchIndustries(search.value, 1, true);
    }
  },
  { immediate: true }
);

watchDebounced(
  search,
  (query) => {
    if (open.value) {
      void fetchIndustries(query, 1, true);
    }
  },
  { debounce: 250 }
);

const loadMore = async () => {
  if (!canLoadMore.value) return;
  await fetchIndustries(currentQuery.value, page.value + 1, false);
};

useIntersectionObserver(loadMoreTrigger, ([entry]) => {
  if (entry?.isIntersecting && canLoadMore.value) {
    void loadMore();
  }
});

const onSelect = (industry: IndustryOption) => {
  emit('update:modelValue', industry.id);
  open.value = false;
};
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        :disabled="disabled"
        class="w-full justify-between font-normal"
      >
        <span class="truncate" :class="{ 'text-muted-foreground': !selectedIndustry }">
          {{ selectedIndustry?.label || placeholder }}
        </span>
        <Icon icon="hugeicons:chevrons-down-up" class="ml-2 size-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>

    <PopoverContent class="w-(--reka-popover-trigger-width) p-0">
      <Command :should-filter="false">
        <CommandInput v-model="search" placeholder="Search industry..." />
        <CommandList>
          <CommandEmpty>
            {{ loading ? 'Loading...' : 'No industry found.' }}
          </CommandEmpty>
          <CommandGroup>
            <CommandItem
              v-for="industry in industries"
              :key="industry.id"
              :value="industry.id"
              @select="() => onSelect(industry)"
            >
              <span class="truncate">{{ industry.label }}</span>
              <Icon
                v-if="props.modelValue === industry.id"
                icon="hugeicons:tick-02"
                class="ml-auto size-4 shrink-0"
              />
            </CommandItem>
            <CommandItem
              v-if="canLoadMore"
              ref="loadMoreTrigger"
              aria-hidden
              value="load-more"
              class="justify-center text-center"
            >
              <Skeleton v-if="loading" class="h-4 w-32" />
              <template v-else>
                <span class="text-sm font-medium">Load more results</span>
                <Icon icon="hugeicons:circle-arrow-down-01" class="ml-2 size-4 opacity-70" />
              </template>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
