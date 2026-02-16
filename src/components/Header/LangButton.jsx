import { useParams, useNavigate, useLocation } from 'react-router-dom'
import styles from './Header.module.css'

export default function LangButton({ lang }) {
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname

  const toggleLang = () => {
    const newLang = lang === 'ko' ? 'en' : 'ko'
    const newPath = pathname.replace(new RegExp(`^/${lang}(/|$)`), `/${newLang}$1`)
    navigate(newPath, { replace: true })
  }

  return (
    <button type="button" className={styles.langButton} onClick={toggleLang}>
      {lang === 'ko' ? 'EN' : 'KR'}
    </button>
  )
}
