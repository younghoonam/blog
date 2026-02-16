/**
 * Hook for language detection and switching.
 */
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { getDefaultLang, isValidLang } from '@/utils/routing'
import type { Lang, RouteParams } from '@/types'

/**
 * Get current language from route params with validation.
 */
export function useLanguage(): { lang: Lang | null; isValid: boolean } {
  const params = useParams<RouteParams>()
  const lang = params.lang
  const isValid = isValidLang(lang)
  return { lang: isValid ? lang : null, isValid }
}

/**
 * Hook for language switching functionality.
 */
export function useLanguageSwitch() {
  const navigate = useNavigate()
  const location = useLocation()
  const { lang } = useLanguage()

  const switchLanguage = (newLang: Lang) => {
    if (!lang) return
    const pathname = location.pathname
    const newPath = pathname.replace(new RegExp(`^/${lang}(/|$)`), `/${newLang}$1`)
    navigate(newPath, { replace: true })
  }

  const toggleLanguage = () => {
    if (!lang) return
    const newLang: Lang = lang === 'ko' ? 'en' : 'ko'
    switchLanguage(newLang)
  }

  return {
    lang,
    switchLanguage,
    toggleLanguage,
    getDefaultLang,
  }
}
