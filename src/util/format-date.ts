import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export function compareDates(date: Date) {
  return dayjs().to(date)
}
