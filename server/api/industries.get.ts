import type { PaginatedResponse } from '~/types/api';
import { industryOptions } from '~/lib/register/industry-options';
import { fuzzySearch } from '~~/server/utils/fuzzy-search';

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const search = query.q?.toString().trim() || '';
  const page = Math.max(Number(query.page || 1), 1);
  const limit = Math.max(Number(query.limit || 10), 1);

  const filtered = fuzzySearch(industryOptions, search, ['label', 'id']);

  const total = filtered.length;
  const totalPages = Math.max(Math.ceil(total / limit), 1);
  const start = (page - 1) * limit;

  return {
    data: filtered.slice(start, start + limit),
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  } satisfies PaginatedResponse<{ id: string; label: string }>;
});
