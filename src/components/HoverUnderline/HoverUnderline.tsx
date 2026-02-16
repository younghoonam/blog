/**
 * Hover underline animation component.
 */
import { memo } from 'react'
import styles from './HoverUnderline.module.css'
import type { HoverUnderlineProps } from '@/types'

function HoverUnderline({ children, className, lineWidth = '5px' }: HoverUnderlineProps) {
  return (
    <div className={styles.wrapper + ' ' + (className || '')}>
      {children}
      <span style={{ height: lineWidth }} className={styles.underline} />
    </div>
  )
}

export default memo(HoverUnderline)
