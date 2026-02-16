/**
 * Portfolio link component.
 */
import styles from './Header.module.css'

export default function PortfolioLink() {
  return (
    <div className={styles.portfolioLinkContainer}>
      <a className={styles.portfolioLink} href="https://younghoonam.com" target="_blank" rel="noopener noreferrer">
        <span>
          Portfolio <span style={{ fontSize: '1rem' }}>🡕</span>
        </span>
      </a>
    </div>
  )
}
