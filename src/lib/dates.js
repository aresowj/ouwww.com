export function formatPostDate({ year, month, day }) {
  return new Date(`${year}-${month}-${day}T12:00:00Z`).toLocaleDateString('en-US', { dateStyle: 'long', timeZone: 'UTC' });
}
