/**
 * Core domain types for the blog application.
 */

export type Lang = 'en' | 'ko'

export type PostSlug = string

export interface PostMetadata {
  slug: PostSlug
  lang: Lang
  title: string
  date: string
}

export interface PostListItem {
  slug: PostSlug
  lang: Lang
  path: string
}

export interface RouteParams extends Record<string, string | undefined> {
  lang?: Lang
  slug?: PostSlug
}

export interface LayoutProps {
  children?: React.ReactNode
}

export interface HeaderProps {
  lang: Lang
}

export interface UniversalDateProps {
  lang: Lang
  date: string
}

export interface HoverUnderlineProps {
  children: React.ReactNode
  className?: string
  lineWidth?: string
}

export interface MDXModule {
  default: React.ComponentType<any>
  frontmatter?: Record<string, any>
  [key: string]: any
}
