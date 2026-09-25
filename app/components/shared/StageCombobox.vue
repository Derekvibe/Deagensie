<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { watchDebounced, useIntersectionObserver } from '@vueuse/core';
import type { PaginatedResponse } from '~/types/api';

const props = withDefaults(
  defineProps<{
    modelValue: string;
    disabled?: boolean;
    placeholder?: string;
  }>(),
  {
    disabled: false,
    placeholder: 'Select stage',
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const open = ref(false);
const search = ref('');
const options = ref<{ id: string; label: string }[]>([]);
const loading = ref(false);
const page = ref(1);
const totalPages = ref(1);
const currentQuery = ref('');
const selectedItem = ref<{ id: string; label: string } | null>(null);
const loadMoreTrigger = useTemplateRef<HTMLElement>('loadMoreTrigger');

const selectedOption = computed(() => {
  return (
    options.value.find((option) => option.id === props.modelValue) || selectedItem.value || null
  );
});

const canLoadMore = computed(() => page.value < totalPages.value && !loading.value);

async function fetchStages(query = '', nextPage = 1, reset = true) {
  loading.value = true;

  try {
    const response = await $fetch<PaginatedResponse<{ id: string; label: string }>>('/api/stages', {
      query: {
        q: query,
        page: nextPage,
      },
    });

    if (reset) {
      options.value = response.data;
    } else {
      options.value = [...options.value, ...response.data];
    }

    page.value = response.pagination.page;
    totalPages.value = response.pagination.totalPages;
    currentQuery.value = query;
  } finally {
    loading.value = false;
  }
}

watch(
  open,
  (isOpen) => {
    if (isOpen) {
      void fetchStages(search.value, 1, true);
    }
  },
  { immediate: true }
);

watchDebounced(
  search,
  (query) => {
    if (open.value) {
      void fetchStages(query, 1, true);
    }
  },
  { debounce: 250 }
);

const loadMore = async () => {
  if (!canLoadMore.value) return;
  await fetchStages(currentQuery.value, page.value + 1, false);
};

useIntersectionObserver(loadMoreTrigger, ([entry]) => {
  if (entry?.isIntersecting && canLoadMore.value) {
    void loadMore();
  }
});

const onSelect = (option: { id: string; label: string }) => {
  selectedItem.value = option;
  emit('update:modelValue', option.id);
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
        :disabled="props.disabled"
        class="w-full justify-between font-normal"
      >
        <span class="truncate" :class="{ 'text-muted-foreground': !selectedOption }">
          {{ selectedOption?.label || props.placeholder }}
        </span>
        <Icon icon="hugeicons:chevrons-down-up" class="ml-2 size-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>

    <PopoverContent class="w-(--reka-popover-trigger-width) p-0">
      <Command :should-filter="false">
        <CommandInput v-model="search" placeholder="Search stage..." />
        <CommandList>
          <CommandEmpty>
            {{ loading ? 'Loading sources...' : 'No source found.' }}
          </CommandEmpty>
          <CommandGroup>
            <CommandItem
              v-for="option in options"
              :key="option.id"
              :value="option.id"
              @select="() => onSelect(option)"
            >
              <span class="truncate">{{ option.label }}</span>
              <Icon
                v-if="props.modelValue === option.id"
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
