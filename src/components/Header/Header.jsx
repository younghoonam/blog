import { Link } from 'react-router-dom'
import LangButton from './LangButton'
import styles from './Header.module.css'
import HoverUnderline from '../HoverUnderline/HoverUnderline'
import ThemeToggle from './ThemeToggle'

export default function Header({ lang }) {
  return (
    <header>
      <div className={styles.header}>
        <Link to={lang ? `/${lang}` : '/'} className={styles.logo}>
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
