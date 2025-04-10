const formatRelativeTime = (value: number, unit: string): string =>
  `${value} ${unit}${value === 1 ? '' : 's'} ago`

export const getTimeAgo = (timestamp: string): string => {
  let result = ''

  const diff = new Date().getTime() - new Date(timestamp).getTime()

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) {
    result = formatRelativeTime(days, 'day')
  } else if (hours > 0) {
    result = formatRelativeTime(hours, 'hour')
  } else if (minutes > 0) {
    result = formatRelativeTime(minutes, 'minute')
  } else if (seconds > 0) {
    result = formatRelativeTime(seconds, 'second')
  }

  return result
}
