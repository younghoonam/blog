/**
 * Footer component.
 */
import { memo } from 'react'
import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.copywrite}>© 2025 Younghoo Nam</div>
      <div className={styles.links}>
        <a href="https://www.github.com/younghoonam" target="_blank" rel="noopener noreferrer">
          <img className={styles.icon} src="/icons/github-mark.svg" alt="GitHub" />
        </a>
        <a href="https://www.instagram.com/younghoo_nam/" target="_blank" rel="noopener noreferrer">
          <img className={styles.icon} src="/icons/Instagram_Glyph_Black.svg" alt="Instagram" />
        </a>
      </div>
    </footer>
  )
}

export default memo(Footer)
