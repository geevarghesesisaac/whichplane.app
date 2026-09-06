import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

/**
 * Formats ISO flight timestamps into scheduled local airport clock time (e.g. "6:30 PM").
 * Deterministic between server and browser to prevent React SSR hydration mismatches.
 */
export function formatTime(isoString: string): string {
  if (!isoString) return '--:--';
  const match = isoString.match(/T(\d{2}):(\d{2})/);
  if (match) {
    let h = parseInt(match[1], 10);
    const m = match[2];
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h}:${m} ${ampm}`;
  }
  return isoString.slice(11, 16) || '--:--';
}

/**
 * Formats ISO date strings (e.g. "2026-09-20") deterministically.
 */
export function formatDate(isoString: string): string {
  if (!isoString) return '';
  const match = isoString.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    const [, y, m, d] = match;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthName = months[parseInt(m, 10) - 1] || m;
    return `${monthName} ${parseInt(d, 10)}, ${y}`;
  }
  const dateObj = new Date(isoString);
  return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
