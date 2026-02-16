/**
 * Language toggle button component.
 */
import { memo } from 'react'
import { useLanguageSwitch } from '@/hooks/useLanguage'
import styles from './Header.module.css'

function LangButton({ lang }: { lang: string }) {
  const { toggleLanguage } = useLanguageSwitch()

  return (
    <button type="button" className={styles.langButton} onClick={toggleLanguage}>
      {lang === 'ko' ? 'EN' : 'KR'}
    </button>
  )
}

export default memo(LangButton)
