export function getDateParts(dateString: string) {
  const date = new Date(dateString)

  return {
    day: date.getDate(),
    month: date.toLocaleString('en-US', { month: 'long' }),
    year: date.getFullYear(),
  }
}
