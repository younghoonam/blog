/**
 * Header component with logo and navigation.
 */
import { Link } from 'react-router-dom'
import { memo } from 'react'
import LangButton from './LangButton'
import styles from './Header.module.css'
import HoverUnderline from '../HoverUnderline/HoverUnderline'
import ThemeToggle from './ThemeToggle'
import type { HeaderProps } from '@/types'

function Header({ lang }: HeaderProps) {
  return (
    <header>
      <div className={styles.header}>
        <Link to={`/${lang}`} className={styles.logo}>
          Younghoo Nam
        </Link>
        <div className={styles.toggleWrapper}>
          <HoverUnderline>
            <LangButton lang={lang} />
          </HoverUnderline>
          <HoverUnderline>
            <ThemeToggle />
          </HoverUnderline>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
