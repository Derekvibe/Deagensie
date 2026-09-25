import type { FetchError } from 'ofetch';
import { push } from 'notivue';
import type { ApiErrorBody, ApiFailure } from '~/types/api';

function isApiErrorBody(value: unknown): value is ApiErrorBody {
  if (!value || typeof value !== 'object') return false;

  const candidate = value as Partial<ApiErrorBody>;
  return (
    (candidate.error === undefined || typeof candidate.error === 'string') &&
    (candidate.details === undefined || Array.isArray(candidate.details))
  );
}

function fieldNameFromPath(path: string[] | undefined): string | undefined {
  if (!path?.length) return undefined;
  return path.join('.');
}

export function normalizeApiError(error: unknown): ApiFailure {
  const fetchError = error as FetchError<ApiErrorBody>;
  const status = fetchError.response?.status;
  const data = fetchError.data;
  const fieldErrors: Record<string, string> = {};
  const nonFieldMessages: string[] = [];

  if (isApiErrorBody(data)) {
    for (const detail of data.details || []) {
      const field = fieldNameFromPath(detail.path);

      if (field) {
        fieldErrors[field] = detail.message;
      } else {
        nonFieldMessages.push(detail.message);
      }
    }

    const message = data.error || nonFieldMessages[0] || 'Something went wrong. Please try again.';

    return {
      status,
      message,
      fieldErrors,
      nonFieldMessages,
      raw: data,
    };
  }

  return {
    status,
    message: fetchError.message || 'Something went wrong. Please try again.',
    fieldErrors,
    nonFieldMessages: [],
    raw: error,
  };
}

export function notifyApiFailure(failure: ApiFailure): void {
  const hasFieldErrors = Object.keys(failure.fieldErrors).length > 0;
  const messages = failure.nonFieldMessages.length ? failure.nonFieldMessages : [];

  if (!messages.length && !hasFieldErrors) {
    messages.push(failure.message);
  }

  for (const message of messages) {
    push.error({
      title: 'Request failed',
      message,
    });
  }
}

export function pickFormErrors<TField extends string>(
  fieldErrors: Record<string, string>,
  fields: readonly TField[]
): Partial<Record<TField, string>> {
  const allowedFields = new Set<string>(fields);
  const result: Partial<Record<TField, string>> = {};

  for (const [field, message] of Object.entries(fieldErrors)) {
    if (allowedFields.has(field)) {
      result[field as TField] = message;
    }
  }

  return result;
}
