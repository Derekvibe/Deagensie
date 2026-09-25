import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeWebsiteInput(raw = '') {
  const trimmed = raw.trim();

  if (!trimmed) return '';

  return trimmed.replace(/^https?:\/\//i, '');
}

export function normalizeBehanceInput(raw = '') {
  const trimmed = raw.trim();

  if (!trimmed) return '';

  return trimmed
    .replace(/^https?:\/\//i, '')
    .replace(/^www\./i, '')
    .replace(/^behance\.com\//i, '')
    .replace(/^behance\.net\//i, '');
}

export function isValidWebsiteInput(raw = '') {
  const normalized = normalizeWebsiteInput(raw);

  if (!normalized) return true;
  if (/\s/.test(normalized)) return false;

  try {
    const url = new URL(`https://${normalized}`);

    return Boolean(url.hostname) && url.hostname.includes('.');
  } catch {
    return false;
  }
}

export function isValidBehanceHandle(raw = '') {
  const normalized = normalizeBehanceInput(raw);

  if (!normalized) return true;
  if (/\s/.test(normalized)) return false;

  // Behance usernames are alphanumeric and hyphens, typically 3-30 characters
  return /^[a-z0-9-]{1,30}$/i.test(normalized);
}
