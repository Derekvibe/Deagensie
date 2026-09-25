type UseFetchRequest<T> = Parameters<typeof useFetch<T>>[0];
type UseFetchOptionsFor<T> = NonNullable<Parameters<typeof useFetch<T>>[1]>;

export function useApiData<T>(
  request: UseFetchRequest<T>,
  options: UseFetchOptionsFor<T> = {} as UseFetchOptionsFor<T>
) {
  const config = useRuntimeConfig();

  const fetchOptions = {
    baseURL: config.public.apiBase,
    ...(options as Record<string, unknown>),
  } as UseFetchOptionsFor<T>;

  return useFetch<T>(request, fetchOptions);
}
