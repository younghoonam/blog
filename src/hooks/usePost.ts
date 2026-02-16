/**
 * Hook for loading a single blog post with caching.
 */
import { useEffect, useState, useMemo } from 'react'
import { getPostModule, getPostsWithMetadata } from '@/lib/posts'
import type { PostMetadata, PostSlug, Lang } from '@/types'
import type { MDXModule } from '@/types/mdx'

interface UsePostResult {
  Content: React.ComponentType | null
  metadata: PostMetadata | null
  error: string | null
  loading: boolean
}

// Cache for loaded post modules
const postModuleCache = new Map<string, MDXModule>()
const metadataCache = new Map<string, PostMetadata>()

/**
 * Load a single post by slug and lang.
 */
export function usePost(slug: PostSlug | undefined, lang: Lang | undefined): UsePostResult {
  const [Content, setContent] = useState<React.ComponentType | null>(null)
  const [metadata, setMetadata] = useState<PostMetadata | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug || !lang) {
      setError('Missing slug or language')
      setLoading(false)
      return
    }

    const cacheKey = `${slug}.${lang}`

    // Check cache first
    const cachedModule = postModuleCache.get(cacheKey)
    const cachedMeta = metadataCache.get(cacheKey)

    if (cachedModule && cachedMeta) {
      const Component = cachedModule.default
      if (Component && typeof Component === 'function') {
        setContent(() => Component)
        setMetadata(cachedMeta)
        setLoading(false)
        return
      }
    }

    setError(null)
    setContent(null)
    setMetadata(null)
    setLoading(true)

    Promise.all([
      getPostModule(slug, lang),
      getPostsWithMetadata().then((list) => list.find((p) => p.slug === slug && p.lang === lang)),
    ])
      .then(([mod, meta]) => {
        const Component = mod?.default
        if (!Component || typeof Component !== 'function') {
          setError('Invalid post content')
          setLoading(false)
          return
        }
        // Cache the loaded module and metadata
        postModuleCache.set(cacheKey, mod)
        if (meta) {
          metadataCache.set(cacheKey, meta)
        }
        setContent(() => Component)
        setMetadata(meta || null)
        setLoading(false)
      })
      .catch((err) => {
        setError(err?.message || 'Failed to load post')
        setLoading(false)
      })
  }, [slug, lang])

  return useMemo(
    () => ({
      Content,
      metadata,
      error,
      loading,
    }),
    [Content, metadata, error, loading]
  )
}
