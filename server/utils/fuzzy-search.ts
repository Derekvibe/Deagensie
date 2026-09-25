import Fuse from 'fuse.js';

export function fuzzySearch<T>(
  items: readonly T[],
  query: string,
  searchKeys: string[]
): readonly T[] {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return items;

  const fuse = new Fuse(items, {
    keys: searchKeys,
    includeScore: true,
    threshold: 0.35,
    ignoreLocation: true,
    minMatchCharLength: 1,
  });

  return fuse.search(trimmedQuery).map((result) => result.item);
}
