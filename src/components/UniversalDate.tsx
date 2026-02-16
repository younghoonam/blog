/**
 * Universal date display component.
 */
import { memo } from 'react'
import { formatDate } from '@/utils/date'
import type { UniversalDateProps } from '@/types'
import styles from './UniversalDate.module.css'

function UniversalDate({ lang, date }: UniversalDateProps) {
  return <span className={styles.date}>{formatDate(date, lang)}</span>
}

export default memo(UniversalDate)
