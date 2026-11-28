// UTC keeps a plain `YYYY-MM-DD` on the same day in every time zone
const options: Intl.DateTimeFormatOptions = { dateStyle: 'long', timeZone: 'UTC' }
const formatters = {
  hu: new Intl.DateTimeFormat('hu-HU', options),
  en: new Intl.DateTimeFormat('en-GB', options),
}

export function formatDate(date: string, language: PageLanguage = 'hu') {
  return formatters[language].format(new Date(date))
}
