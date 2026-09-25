import type { OfferingDetail, OfferingPlan } from '~/types/api';

export const formatPlanMoney = (price: number, currency: string) =>
  new Intl.NumberFormat(currency === 'NGN' ? 'en-NG' : 'en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price);

export const getPlanFeatures = (plan: OfferingPlan) =>
  plan.featureSections.flatMap((section) => section.items);

export const getOfferingRoute = (code: string) => `/subscription/${encodeURIComponent(code)}`;

export const getPlanRoute = (code: string, planCode: string) =>
  `${getOfferingRoute(code)}/${encodeURIComponent(planCode)}`;

export async function useSubscriptionPlanContext() {
  const route = useRoute();
  const code = computed(() => String(route.params.code || ''));
  const planCode = computed(() => String(route.params.plan || ''));

  const {
    data: offering,
    pending,
    error,
    refresh,
  } = await useAsyncData(
    () => `offering-${code.value}`,
    () => $fetch<OfferingDetail>(`/api/offerings/${encodeURIComponent(code.value)}`),
    {
      watch: [code],
      immediate: code.value.length > 0,
    }
  );

  const plan = computed(
    () => offering.value?.plans.find((item) => item.code === planCode.value) || null
  );

  return {
    code,
    planCode,
    offering,
    plan,
    pending,
    error,
    refresh,
  };
}
