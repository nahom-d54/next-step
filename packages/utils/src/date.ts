export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString();
}

export function timeAgo(date: string | Date): string {
  const diffMs = Date.now() - new Date(date).getTime();
  const diffMins = Math.round(diffMs / 60000);
  if (diffMins < 60) return `${diffMins} minutes ago`;
  return `${Math.round(diffMins / 60)} hours ago`;
}

export function parseDate(dateStr: string): Date {
  return new Date(dateStr);
}
