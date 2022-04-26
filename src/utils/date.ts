import { zeroPadding } from './string'

export const getLastDayOfMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0)

export const getDateText = (date: Date) => {
  return `${date.getFullYear()}-${zeroPadding(
    date.getMonth() + 1,
    2
  )}-${zeroPadding(date.getDate(), 2)}`
}

export const getTimeText = (date: Date) => {
  return `${date.getFullYear()}-${zeroPadding(
    date.getMonth() + 1,
    2
  )}-${zeroPadding(date.getDate(), 2)} ${zeroPadding(
    date.getHours(),
    2
  )}:${zeroPadding(date.getMinutes(), 2)}`
}
