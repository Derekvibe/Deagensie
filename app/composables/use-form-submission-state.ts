/**
 * Manages form submission state for protecting confirmation pages
 * Ensures users can only access confirmation pages after successful form submission
 */

type FormSubmissionState = {
  submitted: boolean;
  timestamp: number;
  scopes: Record<string, number>;
};

export const useFormSubmissionState = () => {
  const state = useState<FormSubmissionState>('formSubmission', () => ({
    submitted: false,
    timestamp: 0,
    scopes: {},
  }));

  const markAsSubmitted = (scope?: string) => {
    const timestamp = Date.now();

    state.value = {
      ...state.value,
      submitted: true,
      timestamp,
      scopes: scope ? { ...state.value.scopes, [scope]: timestamp } : state.value.scopes,
    };
  };

  const clearSubmission = (scope?: string) => {
    if (scope) {
      const { [scope]: _removed, ...scopes } = state.value.scopes;

      state.value = {
        ...state.value,
        scopes,
      };

      return;
    }

    state.value = {
      submitted: false,
      timestamp: 0,
      scopes: {},
    };
  };

  const isSubmitted = (scope?: string) => {
    if (scope) {
      return Boolean(state.value.scopes[scope]);
    }

    return state.value.submitted;
  };

  return {
    markAsSubmitted,
    clearSubmission,
    isSubmitted,
  };
};
