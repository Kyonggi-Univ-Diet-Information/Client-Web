const RECENT_SEARCHES_KEY = 'recentSearches';
const MAX_RECENT_SEARCHES = 8;

export function getRecentSearches(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_SEARCHES_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function addRecentSearch(term: string): string[] {
  const trimmed = term.trim();
  if (!trimmed) return getRecentSearches();

  const next = [
    trimmed,
    ...getRecentSearches().filter(item => item !== trimmed),
  ].slice(0, MAX_RECENT_SEARCHES);

  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next));
  return next;
}

export function removeRecentSearch(term: string): string[] {
  const next = getRecentSearches().filter(item => item !== term);
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next));
  return next;
}
