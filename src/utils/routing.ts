/**
 * Routing utilities and validation.
 */
import type { Lang, RouteParams } from '@/types'

/**
 * Validate language parameter.
 */
export function isValidLang(lang: string | undefined): lang is Lang {
  return lang === 'en' || lang === 'ko'
}

/**
 * Get default language from browser preference.
 */
export function getDefaultLang(): Lang {
  const preferred = (navigator.language || '').split('-')[0]
  return preferred === 'ko' ? 'ko' : 'en'
}

/**
 * Validate route parameters.
 */
export function validateRouteParams(params: RouteParams): { lang: Lang; slug?: string } | null {
  if (!isValidLang(params.lang)) {
    return null
  }
  return { lang: params.lang, slug: params.slug }
}

/**
 * Build post URL from slug and lang.
 */
export function buildPostUrl(slug: string, lang: Lang): string {
  return `/${lang}/${slug}`
}

/**
 * Build index URL from lang.
 */
export function buildIndexUrl(lang: Lang): string {
  return `/${lang}`
}
