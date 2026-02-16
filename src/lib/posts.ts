/**
 * Post list and loader using Vite's import.meta.glob.
 */
import type { PostMetadata, PostListItem, PostSlug, Lang } from '@/types'
import type { MDXModule } from '@/types/mdx'

const mdxGlob = import.meta.glob('../content/**/*.mdx') as Record<string, () => Promise<MDXModule>>

const KNOWN_SLUGS: readonly PostSlug[] = ['aurora', 'bucket-hat', 'marblie'] as const

interface ParsedPath {
  slug: PostSlug
  lang: Lang
}

function parsePathToSlugLang(path: string): ParsedPath | null {
  const normalized = String(path).replace(/\\/g, '/').replace(/\?.*$/, '').trim()
  const m = normalized.match(/([^/]+)\/([^/]+)\.(en|ko)\.mdx$/i)
  if (!m) return null
  const lang = m[3] as Lang
  if (lang !== 'en' && lang !== 'ko') return null
  return { slug: m[1], lang }
}

const postLoaderMap = new Map<string, () => Promise<MDXModule>>()
for (const [path, loader] of Object.entries(mdxGlob)) {
  const parsed = parsePathToSlugLang(path)
  if (parsed) {
    postLoaderMap.set(`${parsed.slug}.${parsed.lang}`, loader)
  }
}

export function getPostList(): PostListItem[] {
  return Array.from(postLoaderMap.entries()).map(([key]) => {
    const [slug, lang] = key.split('.') as [PostSlug, Lang]
    return { slug, lang, path: key }
  })
}

/**
 * Frontmatter from Vite plugin (virtual:blog-posts-metadata).
 */
// @ts-ignore - Virtual module from Vite plugin
import postsMetadataImport from 'virtual:blog-posts-metadata'
const postsMetadata: PostMetadata[] = Array.isArray(postsMetadataImport) ? postsMetadataImport : []

/**
 * Get posts with metadata synchronously.
 */
function getPostsWithMetadataSync(): PostMetadata[] {
  if (Array.isArray(postsMetadata) && postsMetadata.length > 0) {
    return [...postsMetadata].sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
  }
  const result: PostMetadata[] = []
  for (const [key] of postLoaderMap) {
    const [slug, lang] = key.split('.') as [PostSlug, Lang]
    result.push({ slug, lang, title: slug, date: '' })
  }
  if (result.length === 0) {
    for (const slug of KNOWN_SLUGS) {
      result.push({ slug, lang: 'en', title: slug, date: '' })
      result.push({ slug, lang: 'ko', title: slug, date: '' })
    }
  }
  return result.sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
}

export function getPostsWithMetadata(): Promise<PostMetadata[]> {
  return Promise.resolve(getPostsWithMetadataSync())
}

export { getPostsWithMetadataSync }

/**
 * Load MDX component for a given slug and lang.
 */
export function getPostModule(slug: PostSlug, lang: Lang): Promise<MDXModule> {
  const loader = postLoaderMap.get(`${slug}.${lang}`)
  if (!loader) {
    return Promise.reject(new Error(`Post not found: ${slug} (${lang})`))
  }
  return loader()
}

export { mdxGlob }
