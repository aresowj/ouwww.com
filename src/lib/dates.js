export function formatPostDate({ date, year, month, day }) {
  return new Date(date ?? `${year}-${month}-${day}T12:00:00Z`).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: 'UTC', timeZoneName: 'short' });
}
