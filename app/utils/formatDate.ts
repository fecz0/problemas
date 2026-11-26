// UTC keeps a plain `YYYY-MM-DD` on the same day in every time zone
const formatter = new Intl.DateTimeFormat('hu-HU', { dateStyle: 'long', timeZone: 'UTC' })

export function formatDate(date: string) {
  return formatter.format(new Date(date))
}
