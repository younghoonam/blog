/**
 * Date formatting utilities.
 */
import type { Lang } from '@/types'

/**
 * Format date for display.
 */
export function formatDate(date: string, _lang: Lang): string {
  if (!date) return ''
  return date
}

/**
 * Format date with full month name (for future use).
 */
export function formatDateFull(date: string, lang: Lang): string {
  if (!date) return ''
  const dateObject = new Date(date)
  if (isNaN(dateObject.getTime())) return date

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  if (lang === 'en') {
    return `${months[dateObject.getMonth()]} ${dateObject.getDate()}, ${dateObject.getFullYear()}`
  }
  return date
}
