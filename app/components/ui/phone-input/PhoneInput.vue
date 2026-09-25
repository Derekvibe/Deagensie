<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { Icon } from '@iconify/vue';
import { countries } from 'countries-list';
import {
  AsYouType,
  getCountryCallingCode,
  getExampleNumber,
  parsePhoneNumberFromString,
  type CountryCode,
} from 'libphonenumber-js';
import examples from 'libphonenumber-js/examples.mobile.json';
import { useField } from 'vee-validate';
import { cn } from '@/lib/utils';

interface CountryRow {
  iso2: CountryCode;
  label: string;
  callingCode: string;
}

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    id?: string;
    name?: string;
    country?: CountryCode | string;
    disabled?: boolean;
    required?: boolean;
    countryCodes?: string[];
    describedBy?: string;
    invalid?: boolean;
    class?: HTMLAttributes['class'];
  }>(),
  {
    modelValue: undefined,
    id: undefined,
    name: undefined,
    country: undefined,
    disabled: false,
    required: false,
    countryCodes: () => [],
    describedBy: undefined,
    invalid: false,
    class: undefined,
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
  'update:country': [CountryCode];
  blur: [];
  focus: [];
}>();

function onFieldBlur() {
  handleFieldBlur?.();
  emit('blur');
}

const open = ref(false);
const search = ref('');
const groupRef = ref<HTMLElement | null>(null);
const popoverWidth = ref<number>(0);
const localInputValue = ref('');

const fieldName = props.name;
const field = fieldName
  ? useField<string>(() => fieldName, undefined, {
      validateOnValueUpdate: false,
    })
  : null;

const countryFieldValue = field?.value;
const countryErrorMessage = field?.errorMessage;
const countryMeta = field?.meta;
const handleFieldBlur = field?.handleBlur;

const countryRows = computed<CountryRow[]>(() => {
  const allowed =
    props.countryCodes.length > 0 ? new Set(props.countryCodes.map((c) => c.toUpperCase())) : null;

  return Object.entries(countries)
    .map(([iso2, c]) => {
      const countryCode = iso2.toUpperCase() as CountryCode;
      if (allowed && !allowed.has(countryCode)) {
        return null;
      }

      try {
        return {
          iso2: countryCode,
          label: c.name,
          callingCode: String(getCountryCallingCode(countryCode)),
        };
      } catch {
        return null;
      }
    })
    .filter((row): row is CountryRow => row !== null)
    .sort((a, b) => a.label.localeCompare(b.label));
});

const filteredRows = computed(() => {
  const q = search.value.trim().toLowerCase();
  if (!q) return countryRows.value;
  return countryRows.value.filter((r) => {
    return (
      r.label.toLowerCase().includes(q) ||
      r.iso2.toLowerCase().includes(q) ||
      r.callingCode.includes(q.replace(/^\+/, ''))
    );
  });
});

const selectedCountry = ref<CountryCode>('US');

const sourcePhoneValue = computed(() => {
  return countryFieldValue?.value || props.modelValue || '';
});

watchEffect(() => {
  if (props.country) {
    const desired = String(props.country).toUpperCase() as CountryCode;
    if (countryRows.value.some((row) => row.iso2 === desired)) {
      selectedCountry.value = desired;
    }
    return;
  }

  const value = sourcePhoneValue.value;
  if (!value) {
    if (!countryRows.value.some((row) => row.iso2 === selectedCountry.value)) {
      selectedCountry.value = 'US';
    }
    return;
  }

  if (value.startsWith('+')) {
    try {
      const p = parsePhoneNumberFromString(value);
      if (p?.country && countryRows.value.some((row) => row.iso2 === p.country)) {
        selectedCountry.value = p.country as CountryCode;
      }
    } catch {
      // ignore
    }
  }

  if (!countryRows.value.some((row) => row.iso2 === selectedCountry.value)) {
    selectedCountry.value = 'US';
  }
});

const invalid = computed(
  () => props.invalid || (!!countryErrorMessage?.value && countryMeta?.touched)
);

const dialCode = computed(() => {
  const iso = selectedCountry.value;
  return `+${getCountryCallingCode(iso)}`;
});

const computedPlaceholder = computed(() => {
  try {
    const example = getExampleNumber(selectedCountry.value, examples);
    if (example) {
      return example.formatNational();
    }
  } catch {
    // ignore
  }
  return 'Enter phone number';
});

const updateLocalInputValue = (value: string) => {
  if (!value) {
    localInputValue.value = '';
    return;
  }

  try {
    const p = parsePhoneNumberFromString(
      value,
      value.startsWith('+') ? undefined : selectedCountry.value
    );
    if (p?.isPossible()) {
      localInputValue.value = p.formatNational();
      return;
    }
  } catch {
    // ignore
  }

  if (value.startsWith('+')) {
    const currentDial = `+${getCountryCallingCode(selectedCountry.value)}`;
    if (value.startsWith(currentDial)) {
      localInputValue.value = value.slice(currentDial.length);
      return;
    }
  }

  localInputValue.value = value;
};

watch(
  sourcePhoneValue,
  (value) => {
    updateLocalInputValue(value || '');
  },
  { immediate: true }
);

const updatePhoneValue = (raw: string) => {
  const digits = raw.replace(/\D/g, '');

  if (!digits) {
    localInputValue.value = '';
    const emptyValue = '';
    if (countryFieldValue) countryFieldValue.value = emptyValue;
    emit('update:modelValue', emptyValue);
    return;
  }

  let candidate = '';
  try {
    const parsed = parsePhoneNumberFromString(digits, selectedCountry.value);
    if (parsed?.isPossible()) {
      candidate = parsed.format('E.164');
    }
  } catch {
    // ignore
  }

  if (!candidate) {
    const normalized = digits.replace(/^0+/, '') || digits;
    candidate = `${dialCode.value}${normalized}`;
  }

  try {
    const formatter = new AsYouType(selectedCountry.value);
    const formatted = formatter.input(digits);
    localInputValue.value = formatted;
  } catch {
    localInputValue.value = digits;
  }

  if (countryFieldValue) {
    countryFieldValue.value = candidate;
  }
  emit('update:modelValue', candidate);
};

watch(open, (isOpen) => {
  if (!isOpen) {
    search.value = '';
  }
});

function onSelect(iso2: CountryCode) {
  selectedCountry.value = iso2;
  open.value = false;
  emit('update:country', iso2);

  const rawDigits = localInputValue.value.replace(/\D/g, '');
  if (!rawDigits) {
    const value = `+${getCountryCallingCode(iso2)}`;
    if (countryFieldValue) countryFieldValue.value = value;
    emit('update:modelValue', value);
    return;
  }

  updatePhoneValue(localInputValue.value);
}

watch(selectedCountry, () => {
  const rawDigits = localInputValue.value.replace(/\D/g, '');
  if (rawDigits) {
    try {
      const formatter = new AsYouType(selectedCountry.value);
      const formatted = formatter.input(rawDigits);
      localInputValue.value = formatted;
    } catch {
      // keep current value
    }
  }
});

const updatePopoverWidth = () => {
  popoverWidth.value = groupRef.value?.getBoundingClientRect?.().width || 0;
};

onMounted(() => {
  updatePopoverWidth();
  const observer = new ResizeObserver(updatePopoverWidth);
  if (groupRef.value) {
    observer.observe(groupRef.value);
  }
  window.addEventListener('resize', updatePopoverWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updatePopoverWidth);
});
</script>

<template>
  <div ref="groupRef">
    <InputGroup :class="cn(props.class)">
      <InputGroupAddon align="inline-start" class="h-full p-0">
        <Popover v-model:open="open">
          <PopoverTrigger as-child>
            <InputGroupButton
              variant="ghost"
              role="combobox"
              :aria-expanded="open"
              :disabled="disabled"
              class="ml-[0.45rem] h-full px-3! py-1!"
            >
              <span class="text-muted-foreground min-w-[4ch] text-left text-sm tabular-nums">
                {{ dialCode }}
              </span>
              <Icon icon="hugeicons:chevrons-down-up" class="size-4 shrink-0 opacity-60" />
            </InputGroupButton>
          </PopoverTrigger>

          <PopoverContent
            align="start"
            :style="popoverWidth ? { width: `${popoverWidth}px` } : undefined"
            class="p-0"
          >
            <Command :should-filter="false">
              <CommandInput v-model="search" placeholder="Search country..." />
              <CommandList>
                <CommandEmpty>No countries found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    v-for="row in filteredRows"
                    :key="row.iso2"
                    :value="row.iso2"
                    @select="() => onSelect(row.iso2)"
                  >
                    <span class="flex-1 truncate">{{ row.label }}</span>
                    <span class="text-muted-foreground shrink-0 text-xs tabular-nums">
                      +{{ row.callingCode }}
                    </span>
                    <Icon
                      v-if="row.iso2 === selectedCountry"
                      icon="hugeicons:tick-02"
                      class="ml-2 size-4 shrink-0"
                    />
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </InputGroupAddon>

      <InputGroupInput
        :id="id"
        :name="name"
        :disabled="disabled"
        :required="required"
        :placeholder="computedPlaceholder"
        :model-value="localInputValue"
        inputmode="tel"
        autocomplete="tel"
        :aria-invalid="invalid || undefined"
        :aria-describedby="describedBy"
        class="tabular-nums"
        @update:model-value="updatePhoneValue(String($event || ''))"
        @blur="onFieldBlur"
        @focus="emit('focus')"
      />
    </InputGroup>
  </div>
</template>
