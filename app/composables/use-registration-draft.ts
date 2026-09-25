import { useIDBKeyval } from '@vueuse/integrations/useIDBKeyval';
import { until } from '@vueuse/core';
import {
  businessRegistrationDefaultValues,
  businessRegistrationStorageKey,
  creativeRegistrationDefaultValues,
  creativeRegistrationStorageKey,
  type BusinessRegistrationFormValues,
  type CreativeRegistrationFormValues,
} from '~/lib/register/progress';

type RegistrationDraftValues = BusinessRegistrationFormValues | CreativeRegistrationFormValues;

function cloneDefaults<T extends RegistrationDraftValues>(defaults: T) {
  return structuredClone(toRaw(defaults));
}

function normalizeDraft<T extends RegistrationDraftValues>(
  defaults: T,
  draft?: Partial<T> | null
): T {
  return {
    ...cloneDefaults(defaults),
    ...draft,
  } as T;
}

function cloneDraft<T extends RegistrationDraftValues>(values: T) {
  return structuredClone(toRaw(values));
}

function useRegistrationDraft<T extends RegistrationDraftValues>(key: string, defaults: T) {
  if (import.meta.server) {
    const data = ref(cloneDefaults(defaults));
    const isFinished = shallowRef(true);

    return {
      data,
      isFinished,
      ready: Promise.resolve(),
      save: async (_values: T) => {},
      clear: async () => {
        data.value = cloneDefaults(defaults);
      },
    };
  }

  const draft = useIDBKeyval<T>(key, cloneDefaults(defaults), {
    writeDefaults: false,
    deep: true,
    serializer: {
      read: (raw) => normalizeDraft(defaults, raw as Partial<T>),
      write: (value) => cloneDraft(normalizeDraft(defaults, value)),
    },
  });

  return {
    data: draft.data,
    isFinished: draft.isFinished,
    ready: until(draft.isFinished).toBe(true),
    save: async (values: T) => {
      await draft.set(normalizeDraft(defaults, cloneDraft(values)));
    },
    clear: async () => {
      await draft.set(cloneDefaults(defaults));
    },
  };
}

export function useBusinessRegistrationDraft() {
  return useRegistrationDraft(businessRegistrationStorageKey, businessRegistrationDefaultValues);
}

export function useCreativeRegistrationDraft() {
  return useRegistrationDraft(creativeRegistrationStorageKey, creativeRegistrationDefaultValues);
}
