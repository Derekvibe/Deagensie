import { offerings } from '~~/server/utils/offerings';

export default defineEventHandler((event) => {
  const code = getRouterParam(event, 'code');
  const offering = offerings.find((item) => item.code === code);

  if (!offering) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Offering not found',
    });
  }

  return offering;
});
